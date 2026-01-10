require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// DB
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Allowed origins
const allowedOrigins = [
  "https://luminolearn.ca",
  "https://www.luminolearn.ca",
  "http://localhost:3000",
  "http://localhost:5001",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman)
    if (!origin) return callback(null, true);

    // ✅ Allow ALL localhost ports in development
    if (
      process.env.NODE_ENV !== "production" &&
      origin.startsWith("http://localhost:")
    ) {
      return callback(null, true);
    }

    // ✅ Allow known production origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // ❌ Block everything else
    return callback(new Error("CORS blocked: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Debug route to confirm cookies arrive
app.get("/api/debug-cookie", (req, res) => {
  res.json({
    cookies: req.cookies || null,
    hasSession: !!req.cookies?.ll_session,
    authHeader: req.headers.authorization || null,
  });
});
app.use(express.json());
app.use(cookieParser());
app.get("/api/debug-cookie", (req, res) => {
  res.json({
    cookies: req.cookies || null,
    hasSession: !!req.cookies?.ll_session,
    authHeader: req.headers.authorization || null,
  });
});

// Routes
const studentLinksRoutes = require("./routes/studentLinks")(pool);
app.use("/api/student-links", studentLinksRoutes);

// Health
app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Cookie helpers (still fine to keep cookies as optional)
function getCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";

  const secure =
    (process.env.COOKIE_SECURE ?? (isProd ? "true" : "false")) === "true";

  // ✅ With Netlify /api proxy, cookie is first-party → lax is correct
  const sameSite = (process.env.COOKIE_SAMESITE || "lax").toLowerCase();

  return { secure, sameSite };
}

function setSessionCookie(res, token) {
  const { secure, sameSite } = getCookieOptions();

  res.cookie("ll_session", token, {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

// Auth middleware (✅ cookie OR bearer token)
function requireAuth(req, res, next) {
  try {
    // Cookie token (optional)
    const cookieToken = req.cookies?.ll_session;

    // Bearer token (recommended fallback)
    const authHeader = req.headers.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    const token = cookieToken || bearerToken;

    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid session" });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }
  next();
}

// LOGIN (✅ returns token too)
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const r = await pool.query(
      "SELECT id,email,role,status,password_hash FROM users WHERE email=$1 LIMIT 1",
      [String(email || "").toLowerCase()]
    );

    if (!r.rows.length) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = r.rows[0];

    if (user.status !== "active") {
      return res.status(403).json({ error: "Account not active" });
    }

    const ok = await bcrypt.compare(password, user.password_hash || "");
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Cookie is optional now (keep it if it works)
    setSessionCookie(res, token);

    // ✅ helps avoid caching/proxy oddities
    res.setHeader("Cache-Control", "no-store");

    return res.json({
      ok: true,
      token, // ✅ IMPORTANT (frontend will store it)
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ME
app.get("/api/auth/me", requireAuth, async (req, res) => {
  try {
    const r = await pool.query(
      "SELECT id, full_name, email, role, status FROM users WHERE id=$1 LIMIT 1",
      [req.user.id]
    );

    return res.json({ user: r.rows[0] || null });
  } catch (e) {
    console.error("ME ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

// LOGOUT
app.post("/api/auth/logout", (req, res) => {
  const { secure, sameSite } = getCookieOptions();

  res.clearCookie("ll_session", {
    path: "/",
    secure,
    sameSite,
  });

  return res.json({ ok: true });
});

// ADMIN: create user
app.post("/api/admin/create-user", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { full_name, email, role = "student" } = req.body;

    const created = await pool.query(
      `INSERT INTO users (full_name, email, role, status)
       VALUES ($1, $2, $3, 'invited')
       ON CONFLICT (email) DO UPDATE
       SET full_name=EXCLUDED.full_name, role=EXCLUDED.role, status='invited', updated_at=now()
       RETURNING id, email, role, status`,
      [full_name, String(email || "").toLowerCase(), role]
    );

    return res.json({ ok: true, user: created.rows[0] });
  } catch (e) {
    console.error("CREATE USER ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Start
app.listen(process.env.PORT || 5000, () =>
  console.log("🚀 Backend running on", process.env.PORT || 5000)
);
