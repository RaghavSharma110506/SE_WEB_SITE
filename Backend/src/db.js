import fs from "node:fs";
import mysql from "mysql2/promise";
import "dotenv/config";

const required = ["DB_HOST", "DB_NAME", "DB_USER", "DB_PASSWORD"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) throw new Error(`Missing required database environment variables: ${missing.join(", ")}`);
if (process.env.DB_SSL !== "false" && process.env.DB_SSL_CA && !fs.existsSync(process.env.DB_SSL_CA)) throw new Error("DB_SSL_CA does not point to a readable certificate file.");

const ssl = process.env.DB_SSL === "false" ? undefined : {
  rejectUnauthorized: true,
  ...(process.env.DB_SSL_CA ? { ca: fs.readFileSync(process.env.DB_SSL_CA) } : {}),
};

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  ssl,
});
