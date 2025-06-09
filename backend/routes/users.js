const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { full_name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await pool.query(
      "INSERT INTO users (full_name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [full_name, email, hashedPassword, role]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) return res.status(401).json("User not found");

    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) return res.status(401).json("Invalid password");

    const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
