import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import cors from "cors";
import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { requireInstructor } from "./auth.js";
import { pool } from "./db.js";

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === "replace-with-a-long-random-secret") throw new Error("Set a strong JWT_SECRET in Backend/.env before starting the API.");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, callback) => callback(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")}`),
});
const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024, files: 100 } });
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") || true }));
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

const toSlug = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const normalizeEmail = (value) => String(value || "").trim().toLowerCase();
const publicUser = (user) => ({ id: user.id, name: user.name, email: user.email, role: user.role });
const createSession = (user) => ({
  token: jwt.sign(publicUser(user), process.env.JWT_SECRET, { expiresIn: "8h" }),
  user: publicUser(user),
});
app.get("/api/health", async (_req, res, next) => { try { await pool.query("SELECT 1"); res.json({ status: "ok" }); } catch (error) { next(error); } });
app.post("/api/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [users] = await pool.query("SELECT id, name, email, password_hash, role FROM users WHERE email = ?", [normalizeEmail(email)]);
    const user = users[0];
    if (!user || !(await bcrypt.compare(password || "", user.password_hash))) return res.status(401).json({ message: "Incorrect email or password." });
    res.json(createSession(user));
  } catch (error) { next(error); }
});
app.patch("/api/auth/me", requireInstructor, async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const [users] = await pool.query("SELECT id, name, email, password_hash, role FROM users WHERE id = ?", [req.user.id]);
    const user = users[0];
    if (!user) return res.status(401).json({ message: "Your account is no longer available." });

    const nextName = name === undefined ? user.name : String(name).trim();
    const nextEmail = email === undefined ? user.email : normalizeEmail(email);
    const emailChanged = nextEmail !== user.email;
    const passwordChanged = Boolean(newPassword);
    if (!nextName || (!emailPattern.test(nextEmail))) return res.status(400).json({ message: "Provide a name and a valid email address." });
    if (!emailChanged && !passwordChanged && nextName === user.name) return res.status(400).json({ message: "No account changes were provided." });
    if ((emailChanged || passwordChanged) && !(await bcrypt.compare(currentPassword || "", user.password_hash))) return res.status(401).json({ message: "Your current password is incorrect." });
    if (passwordChanged && String(newPassword).length < 8) return res.status(400).json({ message: "Your new password must be at least 8 characters long." });
    if (emailChanged) {
      const [existing] = await pool.query("SELECT id FROM users WHERE email = ? AND id <> ?", [nextEmail, user.id]);
      if (existing.length) return res.status(409).json({ message: "An account already uses that email address." });
    }
    const passwordHash = passwordChanged ? await bcrypt.hash(newPassword, 12) : user.password_hash;
    await pool.query("UPDATE users SET name = ?, email = ?, password_hash = ? WHERE id = ?", [nextName, nextEmail, passwordHash, user.id]);
    res.json(createSession({ ...user, name: nextName, email: nextEmail }));
  } catch (error) { next(error); }
});
app.get("/api/deliverables", async (_req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT id, slug, title, deliverable_type AS type, status, summary, presentation_date AS presentationDate, authors, commit_url AS commitUrl, deployment_url AS deploymentUrl, file_name AS fileName, file_path AS filePath, created_at AS createdAt, updated_at AS updatedAt FROM deliverables WHERE status = 'published' ORDER BY updated_at DESC");
    res.json(rows);
  } catch (error) { next(error); }
});
app.get("/api/deliverables/:slug", async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT id, slug, title, deliverable_type AS type, status, summary, presentation_date AS presentationDate, authors, commit_url AS commitUrl, deployment_url AS deploymentUrl, file_name AS fileName, file_path AS filePath, created_at AS createdAt, updated_at AS updatedAt FROM deliverables WHERE slug = ? AND status = 'published'", [req.params.slug]);
    if (!rows.length) return res.status(404).json({ message: "Deliverable not found." });
    const [assets] = await pool.query("SELECT original_name AS originalName, storage_path AS storagePath, mime_type AS mimeType, size_bytes AS sizeBytes FROM file_assets WHERE deliverable_id = ?", [rows[0].id]);
    return res.json({ ...rows[0], assets });
  } catch (error) { return next(error); }
});
app.get("/api/versions", async (_req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT v.id, v.version_label AS version, v.change_summary AS changeSummary, v.published_at AS publishedAt, d.title, d.slug, u.name AS author FROM versions v JOIN deliverables d ON d.id = v.deliverable_id JOIN users u ON u.id = v.published_by ORDER BY v.published_at DESC");
    res.json(rows);
  } catch (error) { next(error); }
});
app.post("/api/deliverables", requireInstructor, upload.array("files", 100), async (req, res, next) => {
  const connection = await pool.getConnection();
  try {
    const { title, type, version, summary, changeSummary, date, authors, commitUrl, deploymentUrl, status = "published" } = req.body;
    if (!title || !type || !version || !summary || !changeSummary || !date || !authors) return res.status(400).json({ message: "Title, type, version, date, authors, summary and change summary are required." });
    let parsedAuthors;
    try { parsedAuthors = JSON.parse(authors); } catch { return res.status(400).json({ message: "Authors must be valid JSON." }); }
    if (!Array.isArray(parsedAuthors) || !parsedAuthors.length) return res.status(400).json({ message: "At least one author is required." });
    const slug = `${toSlug(title)}-${toSlug(version)}`;
    await connection.beginTransaction();
    const firstFile = req.files?.[0];
    const [result] = await connection.query("INSERT INTO deliverables (slug, title, deliverable_type, status, summary, presentation_date, authors, commit_url, deployment_url, file_name, file_path, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [slug, title, type, status, summary, date, JSON.stringify(parsedAuthors), commitUrl || null, deploymentUrl || null, firstFile?.originalname || null, firstFile ? `/uploads/${firstFile.filename}` : null, req.user.id]);
    for (const file of req.files || []) await connection.query("INSERT INTO file_assets (deliverable_id, original_name, storage_path, mime_type, size_bytes) VALUES (?, ?, ?, ?, ?)", [result.insertId, file.originalname, `/uploads/${file.filename}`, file.mimetype, file.size]);
    await connection.query("INSERT INTO versions (deliverable_id, version_label, change_summary, published_by) VALUES (?, ?, ?, ?)", [result.insertId, version, changeSummary, req.user.id]);
    await connection.commit();
    res.status(201).json({ id: result.insertId, slug, message: "Deliverable published." });
  } catch (error) { await connection.rollback(); for (const file of req.files || []) fs.rm(file.path, { force: true }, () => {}); next(error); } finally { connection.release(); }
});
app.use((error, _req, res, _next) => { console.error(error); res.status(error.status || 500).json({ message: error.message || "The server could not complete this request." }); });
app.listen(Number(process.env.PORT || 4000), () => console.log(`StepUp API running on port ${process.env.PORT || 4000}`));
