const express = require("express");
const pool = require("../db");
const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await pool.query("SELECT * FROM courses");
    res.json(courses.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new course
router.post("/", async (req, res) => {
  const { name, description, category, teacher_id } = req.body;
  try {
    const newCourse = await pool.query(
      "INSERT INTO courses (name, description, category, teacher_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, category, teacher_id]
    );
    res.json(newCourse.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
