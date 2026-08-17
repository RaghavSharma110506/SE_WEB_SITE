import fs from "node:fs/promises";
import bcrypt from "bcryptjs";
import { pool } from "./db.js";

const schema = await fs.readFile(new URL("./schema.sql", import.meta.url), "utf8");
for (const statement of schema.split(";\n").map((part) => part.trim()).filter(Boolean)) await pool.query(statement);
// Safe upgrades for databases created before metadata fields were added.
const [columns] = await pool.query("SHOW COLUMNS FROM deliverables");
const knownColumns = new Set(columns.map((column) => column.Field));
const migrations = [
  ["presentation_date", "ALTER TABLE deliverables ADD COLUMN presentation_date DATE"],
  ["authors", "ALTER TABLE deliverables ADD COLUMN authors JSON NULL"],
  ["commit_url", "ALTER TABLE deliverables ADD COLUMN commit_url VARCHAR(500)"],
  ["deployment_url", "ALTER TABLE deliverables ADD COLUMN deployment_url VARCHAR(500)"],
];
for (const [column, statement] of migrations) if (!knownColumns.has(column)) await pool.query(statement);

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password || password === "change-this-before-setup") throw new Error("Set ADMIN_EMAIL and a secure ADMIN_PASSWORD in .env before setup.");
const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
if (!existing.length) {
  const hash = await bcrypt.hash(password, 12);
  await pool.query("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'instructor')", [process.env.ADMIN_NAME || "StepUp Instructor", email, hash]);
  console.log("Instructor account created.");
} else console.log("Instructor account already exists.");
await pool.end();
