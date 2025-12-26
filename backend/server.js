require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

/* ---------------------------
   CORS (PRODUCTION + LOCAL)
   --------------------------- */
const allowedOrigins = [
  "https://luminolearn.ca",
  "https://www.luminolearn.ca",
  "http://localhost:3000",
  "http://localhost:5001",
];

// One shared config so preflight (OPTIONS) matches exactly
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no Origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) return callback(null, true);

    return callback(new Error("CORS blocked: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// Ensure preflight requests succeed with SAME options
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

/* ---------------------------
   Cookies (HTTPS cross-site)
   --------------------------- */
function isProd() {
  return process.env.NODE_ENV === "production";
}

/**
 * For production on https://luminolearn.ca:
 * - secure must be true
 * - sameSite must be "none" (frontend + backend are cross-site if backend is on render/railway etc.)
 */
function setSessionCookie(res, token) {
  const secure = isProd() ? true : process.env.COOKIE_SECURE === "true";
  const sameSite = isProd() ? "none" : (process.env.COOKIE_SAMESITE || "lax");

  res.cookie("ll_session", token, {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

function requireAuth(req, res, next) {
  try {
    const token = req.cookies.ll_session;
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

/* ---------- LOGIN ---------- */
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const r = await pool.query(
      "SELECT id,email,role,status,password_hash FROM users WHERE email=$1 LIMIT 1",
      [String(email || "").toLowerCase()]
    );

    if (!r.rows.length) return res.status(401).json({ error: "Invalid credentials" });

    const user = r.rows[0];
    if (user.status !== "active") {
      return res.status(403).json({ error: "Account not active" });
    }

    const ok = await bcrypt.compare(password, user.password_hash || "");
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    setSessionCookie(res, token);
    res.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------- ME ---------- */
app.get("/api/auth/me", requireAuth, async (req, res) => {
  try {
    const r = await pool.query(
      "SELECT id, full_name, email, role, status FROM users WHERE id=$1 LIMIT 1",
      [req.user.id]
    );
    res.json({ user: r.rows[0] });
  } catch (e) {
    console.error("ME ERROR:", e);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------- LOGOUT ---------- */
app.post("/api/auth/logout", (req, res) => {
  // Clear cookie using matching attributes
  res.clearCookie("ll_session", {
    path: "/",
    sameSite: isProd() ? "none" : "lax",
    secure: isProd() ? true : false,
  });
  res.json({ ok: true });
});

/* ---------- ADMIN: CREATE USER (invited) ---------- */
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

    res.json({ ok: true, user: created.rows[0] });
  } catch (e) {
    console.error("CREATE USER ERROR:", e);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------- START ---------- */
app.listen(process.env.PORT || 5000, () =>
  console.log("🚀 Backend running on", process.env.PORT || 5000)
);
