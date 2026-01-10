const express = require("express");
const router = express.Router();

// IMPORTANT: use the SAME pool you already created in server.js.
// So we will export a function that receives pool, OR we will require pool from server.js (not recommended).
// Best: pass pool in from server.js.

module.exports = (pool) => {
  // GET student links by email
  router.get("/:email", async (req, res) => {
    try {
      const email = decodeURIComponent(req.params.email).toLowerCase();

      const result = await pool.query(
        `SELECT google_classroom_url, class_meeting_url
         FROM public.student_links
         WHERE student_email = $1`,
        [email]
      );

      res.json(result.rows[0] || null);
    } catch (err) {
      console.error("Student links error:", err);
      res.status(500).json({ error: "Failed to load student links" });
    }
  });

  return router;
};
