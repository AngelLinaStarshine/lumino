require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const pool = require("./db");

const app = express();

/* =========================
   Startup check
========================= */
pool
  .query("SELECT NOW()")
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database connection error:", err.message));

/* =========================
   CORS
========================= */
const allowedOrigins = [
  "https://luminolearn.ca",
  "https://www.luminolearn.ca",
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5001",
  "http://localhost:5002",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      process.env.NODE_ENV !== "production" &&
      origin.startsWith("http://localhost:")
    ) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS blocked: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

/* =========================
   Middleware
========================= */
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

/* =========================
   Cookie helpers
========================= */
function getCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";

  const secure =
    (process.env.COOKIE_SECURE ?? (isProd ? "true" : "false")) === "true";

  const sameSite = (process.env.COOKIE_SAMESITE || "lax").toLowerCase();

  return { secure, sameSite };
}

function setSessionCookie(res, token) {
  const { secure, sameSite } = getCookieOptions();

  res.cookie("ll_session", token, {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });
}

/* =========================
   Auth middleware
========================= */
function requireAuth(req, res, next) {
  try {
    const cookieToken = req.cookies?.ll_session;

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

function requireTeacher(req, res, next) {
  const role = req.user?.role;
  if (role !== "teacher" && role !== "admin") {
    return res.status(403).json({ error: "Teacher or admin access required" });
  }
  next();
}

/* =========================
   Debug cookie route
========================= */
app.get("/api/debug-cookie", (req, res) => {
  res.json({
    cookies: req.cookies || null,
    hasSession: !!req.cookies?.ll_session,
    authHeader: req.headers.authorization || null,
  });
});

/* =========================
   Static uploads
========================= */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

app.use("/uploads", express.static(uploadDir));

/* =========================
   Multer
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}_${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
});

/* =========================
   Student links routes
========================= */
const studentLinksRoutes = require("./routes/studentLinks")(pool);
app.use("/api/student-links", studentLinksRoutes);

/* =========================
   Submissions
========================= */
app.post(
  "/api/submissions/upload",
  requireAuth,
  upload.single("file"),
  async (req, res) => {
    try {
      const { email, title, note } = req.body;

      if (!email || !title) {
        return res.status(400).json({ error: "Missing email or title." });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      const requesterEmail = String(req.user?.email || "").toLowerCase();
      const targetEmail = String(email || "").toLowerCase();

      if (req.user?.role !== "admin" && requesterEmail !== targetEmail) {
        return res
          .status(403)
          .json({ error: "You can only upload for your own account." });
      }

      const storageKey = req.file.filename;
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const fileUrl = `${baseUrl}/uploads/${storageKey}`;

      const result = await pool.query(
        `INSERT INTO public.student_submissions
         (student_email, title, note, file_name, file_type, file_size, storage_key, file_url, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'Pending')
         RETURNING *`,
        [
          targetEmail,
          title.trim(),
          note?.trim() || null,
          req.file.originalname,
          req.file.mimetype,
          req.file.size,
          storageKey,
          fileUrl,
        ]
      );

      return res.json({ submission: result.rows[0] });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      return res.status(500).json({ error: "Upload failed." });
    }
  }
);

app.get("/api/submissions/:email", requireAuth, async (req, res) => {
  try {
    const targetEmail = String(req.params.email || "").toLowerCase();
    const requesterEmail = String(req.user?.email || "").toLowerCase();

    if (req.user?.role !== "admin" && requesterEmail !== targetEmail) {
      return res
        .status(403)
        .json({ error: "You can only view your own submissions." });
    }

    const r = await pool.query(
      `SELECT id, student_email, title, note, file_name, file_type, file_size,
              file_url, status, created_at
       FROM public.student_submissions
       WHERE student_email = $1
       ORDER BY created_at DESC`,
      [targetEmail]
    );

    return res.json({ submissions: r.rows });
  } catch (err) {
    console.error("LIST SUBMISSIONS ERROR:", err);
    return res.status(500).json({ error: "Failed to load submissions." });
  }
});

/* =========================
   Health
========================= */
app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.get("/ping", (req, res) => res.send("backend works"));

/* =========================
   Auth
========================= */
app.post("/api/auth/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").toLowerCase().trim();
    const password = String(req.body.password || "").trim();

    console.log("LOGIN ATTEMPT EMAIL:", email);
    console.log("JWT_SECRET EXISTS:", !!process.env.JWT_SECRET);

    const r = await pool.query(
      "SELECT id, full_name, email, role, status, password_hash FROM users WHERE email=$1 LIMIT 1",
      [email]
    );

    console.log("USER QUERY ROWS:", r.rows.length);

    if (!r.rows.length) {
      console.log("NO USER FOUND");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = r.rows[0];

    console.log("USER FOUND:", {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      hasPasswordHash: !!user.password_hash,
      passwordHashPreview: user.password_hash?.slice(0, 10) || null,
    });

    if (user.status !== "active") {
      console.log("USER NOT ACTIVE");
      return res.status(403).json({ error: "Account not active" });
    }

    const ok = await bcrypt.compare(password, user.password_hash || "");
    console.log("PASSWORD MATCH:", ok);

    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    console.log("TOKEN CREATED");

    setSessionCookie(res, token);
    res.setHeader("Cache-Control", "no-store");

    return res.json({
      ok: true,
      token,
      user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error("LOGIN ERROR FULL:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/auth/me", requireAuth, async (req, res) => {
  try {
    const r = await pool.query(
      "SELECT id, full_name, email, role, status FROM users WHERE id = $1 LIMIT 1",
      [req.user.id]
    );
    return res.json({ user: r.rows[0] || null });
  } catch (e) {
    console.error("AUTH ME ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

/* =========================
   Teacher LMS API (teacher or admin only)
========================= */
app.get("/api/teacher/students", requireAuth, requireTeacher, async (req, res) => {
  try {
    const r = await pool.query(
      `SELECT id, full_name, email, status, created_at FROM users WHERE role = 'student' ORDER BY full_name ASC NULLS LAST, email ASC`
    );
    return res.json({ students: r.rows });
  } catch (e) {
    console.error("TEACHER STUDENTS ERROR:", e);
    return res.status(500).json({ error: "Failed to load students" });
  }
});

app.get("/api/teacher/student-links", requireAuth, requireTeacher, async (req, res) => {
  try {
    const r = await pool.query(
      `SELECT student_email, google_classroom_url, class_meeting_url, updated_at FROM public.student_links ORDER BY updated_at DESC NULLS LAST`
    );
    return res.json({ links: r.rows });
  } catch (e) {
    console.error("TEACHER STUDENT-LINKS ERROR:", e);
    return res.status(500).json({ error: "Failed to load student links" });
  }
});

app.post("/api/teacher/student-links/upsert", requireAuth, requireTeacher, async (req, res) => {
  try {
    const { student_email, google_classroom_url, class_meeting_url } = req.body;
    if (!student_email) return res.status(400).json({ error: "student_email is required" });
    const email = String(student_email).toLowerCase();
    const result = await pool.query(
      `INSERT INTO public.student_links (student_email, google_classroom_url, class_meeting_url)
       VALUES ($1, $2, $3) ON CONFLICT (student_email)
       DO UPDATE SET google_classroom_url = EXCLUDED.google_classroom_url,
         class_meeting_url = EXCLUDED.class_meeting_url, updated_at = NOW()
       RETURNING student_email, google_classroom_url, class_meeting_url, updated_at`,
      [email, google_classroom_url || null, class_meeting_url || null]
    );
    return res.json({ ok: true, row: result.rows[0] });
  } catch (e) {
    console.error("TEACHER UPSERT LINKS ERROR:", e);
    return res.status(500).json({ error: "Failed to save links" });
  }
});

/* =========================
   Debug routes
========================= */
app.get("/api/debug-db-user/:email", async (req, res) => {
  try {
    const email = String(req.params.email || "").toLowerCase().trim();

    const r = await pool.query(
      "SELECT id, full_name, email, role, status, password_hash FROM users WHERE email=$1 LIMIT 1",
      [email]
    );

    let dbHost = null;
    try {
      dbHost = new URL(process.env.DATABASE_URL).host;
    } catch {
      dbHost = "invalid DATABASE_URL";
    }

    return res.json({
      dbHost,
      found: r.rows.length > 0,
      user: r.rows[0] || null,
    });
  } catch (e) {
    console.error("DEBUG DB USER ERROR:", e);
    return res.status(500).json({ error: e.message });
  }
});

app.post("/api/debug-password-check", async (req, res) => {
  try {
    const email = String(req.body.email || "").toLowerCase().trim();
    const password = String(req.body.password || "").trim();

    const r = await pool.query(
      "SELECT email, status, password_hash FROM users WHERE email=$1 LIMIT 1",
      [email]
    );

    if (!r.rows.length) {
      return res.json({ found: false });
    }

    const user = r.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash || "");

    return res.json({
      found: true,
      status: user.status,
      passwordMatch,
    });
  } catch (e) {
    console.error("DEBUG PASSWORD ERROR:", e);
    return res.status(500).json({ error: e.message });
  }
});

/* =========================
   Admin
========================= */
app.post("/api/admin/create-user", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { full_name, email, role = "student" } = req.body;

    const created = await pool.query(
      `INSERT INTO users (full_name, email, role, status)
       VALUES ($1, $2, $3, 'invited')
       ON CONFLICT (email) DO UPDATE
       SET full_name = EXCLUDED.full_name,
           role = EXCLUDED.role,
           status = 'invited',
           updated_at = now()
       RETURNING id, email, role, status`,
      [full_name, String(email || "").toLowerCase().trim(), role]
    );

    return res.json({ ok: true, user: created.rows[0] });
  } catch (e) {
    console.error("CREATE USER ERROR:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

/* =========================
   Start
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀 Backend running on", PORT));