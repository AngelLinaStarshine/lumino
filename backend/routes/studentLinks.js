const express = require("express");

module.exports = (pool) => {
  const router = express.Router();

  // GET links by student email
  router.get("/:email", async (req, res) => {
    try {
      const email = decodeURIComponent(req.params.email).toLowerCase();

      const result = await pool.query(
        `SELECT student_email, google_classroom_url, class_meeting_url, updated_at
         FROM public.student_links
         WHERE student_email = $1
         LIMIT 1`,
        [email]
      );

      return res.json(result.rows[0] || null);
    } catch (err) {
      console.error("student-links GET error:", err);
      return res.status(500).json({ error: "Failed to load student links" });
    }
  });

  // UPSERT links (admin tool — you can protect later)
  router.post("/upsert", async (req, res) => {
    try {
      const { student_email, google_classroom_url, class_meeting_url } = req.body;

      if (!student_email) {
        return res.status(400).json({ error: "student_email is required" });
      }

      const email = String(student_email).toLowerCase();

      const result = await pool.query(
        `INSERT INTO public.student_links (student_email, google_classroom_url, class_meeting_url)
         VALUES ($1, $2, $3)
         ON CONFLICT (student_email)
         DO UPDATE SET
           google_classroom_url = EXCLUDED.google_classroom_url,
           class_meeting_url = EXCLUDED.class_meeting_url,
           updated_at = NOW()
         RETURNING student_email, google_classroom_url, class_meeting_url, updated_at`,
        [email, google_classroom_url || null, class_meeting_url || null]
      );

      return res.json({ ok: true, row: result.rows[0] });
    } catch (err) {
      console.error("student-links UPSERT error:", err);
      return res.status(500).json({ error: "Failed to save student links" });
    }
  });

  return router;
};
