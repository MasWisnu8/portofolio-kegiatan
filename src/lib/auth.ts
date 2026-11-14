// src/lib/auth.ts — helpers login/logout admin (cookie-based session)
import { DatabaseSync } from "node:sqlite";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "..", "..", "dev.db");
const db = new DatabaseSync(dbPath);

export function getDb(): DatabaseSync {
  return db;
}

export function validateAdmin(email: string, password: string): boolean {
  const rows = db.prepare("SELECT id, password_hash FROM admin_users WHERE email = ?").all(email);
  if (rows.length === 0) return false;
  const hash = typeof rows[0] === "object" && rows[0] !== null ? (rows[0] as any).password_hash : "";
  return comparePasswords(password, hash);
}

function comparePasswords(plain: string, hash: unknown): boolean {
  const bcrypt = require("bcryptjs");
  if (typeof hash !== "string") return false;
  return bcrypt.compareSync(plain, hash);
}

export function createSessionToken(): string {
  const bcrypt = require("bcryptjs");
  return bcrypt.hashSync(Math.random().toString(36).slice(2), 12);
}

export function getAdminById(db: DatabaseSync, id: string) {
  return db.prepare("SELECT id, name, email, role FROM admin_users WHERE id = ?").get(id);
}

export function dbGetAllAdminUsers(db: DatabaseSync) {
  return db.prepare("SELECT id, name, email, role FROM admin_users ORDER BY created_at DESC").all() as any[];
}
