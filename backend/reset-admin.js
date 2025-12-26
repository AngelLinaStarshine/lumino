require("dotenv").config();
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

(async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const email = "admin@luminolearn.org";
  const password = "Admin@12345"; // <- this will be your login password
  const hash = await bcrypt.hash(password, 12);

  await pool.query(
    `
    INSERT INTO users (full_name, email, role, status, password_hash)
    VALUES ($1, $2, 'admin', 'active', $3)
    ON CONFLICT (email) DO UPDATE
    SET full_name=EXCLUDED.full_name,
        role='admin',
        status='active',
        password_hash=EXCLUDED.password_hash,
        updated_at=now();
    `,
    ["Lumino Admin", email, hash]
  );

  const check = await pool.query(
    "SELECT email, role, status, LEFT(password_hash, 4) AS prefix FROM users WHERE email=$1",
    [email]
  );

  console.log("✅ Admin reset complete:", check.rows[0]);
  console.log("✅ Login with:", email, " / ", password);

  await pool.end();
})().catch((e) => {
  console.error("❌ Reset failed:", e);
  process.exit(1);
});
