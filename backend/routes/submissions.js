import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Store files locally (simple starter)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}_${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

export default function submissionsRoutes(pool) {
  // ✅ Upload endpoint
  router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const { email, title, note } = req.body;

      if (!email || !title) {
        return res.status(400).json({ error: "Missing email or title." });
      }
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      const storageKey = req.file.filename;

      // Build a URL students/admin can open
      // (Works if backend is accessible publicly)
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const fileUrl = `${baseUrl}/uploads/${storageKey}`;

      const result = await pool.query(
        `INSERT INTO public.student_submissions
         (student_email, title, note, file_name, file_type, file_size, storage_key, file_url)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING *`,
        [
          email.toLowerCase(),
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
      console.error("Upload error:", err);
      return res.status(500).json({ error: "Upload failed." });
    }
  });

  // ✅ List submissions for a student
  router.get("/:email", async (req, res) => {
    try {
      const email = (req.params.email || "").toLowerCase();
      const r = await pool.query(
        `SELECT *
         FROM public.student_submissions
         WHERE student_email = $1
         ORDER BY created_at DESC`,
        [email]
      );
      res.json({ submissions: r.rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to load submissions." });
    }
  });

  return router;
}
