const { Pool } = require("pg");

const isRenderDb =
  process.env.DATABASE_URL &&
  process.env.DATABASE_URL.includes("render.com");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isRenderDb ? { rejectUnauthorized: false } : false,
});

module.exports = pool;