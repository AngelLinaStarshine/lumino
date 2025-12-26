require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors({
  origin: "http://localhost:5001",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.get("/health", (req, res) => {
  res.json({ ok: true });
});


function setSessionCookie(res, token) {
  res.cookie("ll_session", token, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: process.env.COOKIE_SAMESITE || "lax",
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
  } catch {
    return res.status(401).json({ error: "Invalid session" });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Admin only" });
  next();
}

/* ---------- LOGIN ---------- */
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const r = await pool.query(
    "SELECT id,email,role,status,password_hash FROM users WHERE email=$1 LIMIT 1",
    [String(email || "").toLowerCase()]
  );

  if (!r.rows.length) return res.status(401).json({ error: "Invalid credentials" });
  const user = r.rows[0];
  if (user.status !== "active") return res.status(403).json({ error: "Account not active" });

  const ok = await bcrypt.compare(password, user.password_hash || "");
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  setSessionCookie(res, token);
  res.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
});

/* ---------- ME (remember users) ---------- */
app.get("/api/auth/me", requireAuth, async (req, res) => {
  const r = await pool.query(
    "SELECT id, full_name, email, role, status FROM users WHERE id=$1 LIMIT 1",
    [req.user.id]
  );
  res.json({ user: r.rows[0] });
});

/* ---------- LOGOUT ---------- */
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("ll_session", { path: "/" });
  res.json({ ok: true });
});

/* ---------- ADMIN: CREATE USER (invited) ---------- */
app.post("/api/admin/create-user", requireAuth, requireAdmin, async (req, res) => {
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
});

app.listen(process.env.PORT || 5000, () =>
  console.log("🚀 Backend running on", process.env.PORT || 5000)
);
