require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  const result = await pool.query("SELECT now() as time");
  console.log("? Connected to PostgreSQL. Server time:", result.rows[0].time);
  process.exit(0);
}

test().catch((err) => {
  console.error("? DB connection failed:", err);
  process.exit(1);
});
