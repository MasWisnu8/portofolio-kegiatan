// src/lib/db.ts — SQLite via built-in node:sqlite (Node 26+)
import { DatabaseSync } from "node:sqlite";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, "..", "..", "dev.db");
const db = new DatabaseSync(dbPath);

// Inisialisasi schema
const schemaFile = join(__dirname, "schema.sql");

// Helper: safely get a row as a typed object (SQLite returns objects with null prototype)
function rowToObj<T>(row: unknown): T | null {
  if (row && typeof row === "object" && !Array.isArray(row) && row !== null) {
    // Convert to plain object with normal prototype to avoid Next.js serialization issues
    const plain: any = {};
    for (const [key, value] of Object.entries(row as Record<string, unknown>)) {
      plain[key] = value;
    }
    return plain as T;
  }
  return null;
}

// Helper: safely get all rows as typed array
function rowsToArr<T>(rows: unknown): T[] {
  // SQLite returns objects with null prototype, convert to plain objects
  const converted: any[] = [];
  for (const r of (rows as any[] ?? [])) {
    if (r !== null && typeof r === "object") {
      const plain: any = {};
      for (const [k, v] of Object.entries(r)) {
        plain[k] = v;
      }
      converted.push(plain);
    }
  }
  return converted as T[];
}
if (readFileSync(schemaFile, "utf-8").length > 0) {
  db.exec(readFileSync(schemaFile, "utf-8"));
}
mkdirSync(join(__dirname, "..", "..", "uploads"), { recursive: true });

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT '',
      cover_image TEXT,
      video_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_activities_slug ON activities(slug);
    CREATE INDEX IF NOT EXISTS idx_activities_category ON activities(category);

    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY,
      activity_id TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_type TEXT NOT NULL DEFAULT 'image',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_media_activity ON media(activity_id);

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// ---- Auth helpers ----
export function bcryptHash(password: string): string {
  const bcrypt = require("bcryptjs");
  return bcrypt.hashSync(password, 12);
}

export function validateAdmin(email: string, password: string): boolean {
  const rows = rowsToArr<{password_hash: string}>(db.prepare("SELECT id, password_hash FROM admin_users WHERE email = ?").all(email));
  if (rows.length === 0) return false;
  return comparePasswords(password, rows[0].password_hash);
}

function comparePasswords(plain: string, hash: string): boolean {
  try {
    const bcrypt = require("bcryptjs");
    return bcrypt.compareSync(plain, hash);
  } catch {
    return plain === hash;
  }
}

// ---- Activities ----
export function dbGetAllActivities() {
  return rowsToArr<{
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    cover_image?: string;
    video_url?: string;
    created_at: string;
    updated_at: string;
  }>(db.prepare("SELECT * FROM activities ORDER BY created_at DESC, id DESC").all());
}

export function dbGetActivityBySlug(slug: string) {
  const row = db.prepare("SELECT * FROM activities WHERE slug = ?").get(slug);
  return rowToObj<{
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    cover_image?: string;
    video_url?: string;
    created_at: string;
    updated_at: string;
  }>(row);
}

export function dbGetActivityById(id: string) {
  const row = db.prepare("SELECT * FROM activities WHERE id = ?").get(id);
  return rowToObj<{
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    cover_image?: string;
    video_url?: string;
    created_at: string;
    updated_at: string;
  }>(row);
}

export function dbCreateActivity(data: {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  cover_image?: string;
  video_url?: string;
}) {
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  db.prepare(
    "INSERT INTO activities (id, title, slug, description, category, cover_image, video_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(
    data.id,
    data.title,
    data.slug,
    data.description,
    data.category,
    data.cover_image,
    data.video_url,
    now,
    now
  );
  const row = db.prepare("SELECT * FROM activities WHERE id = ?").get(data.id);
  return rowToObj<{
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    cover_image?: string;
    video_url?: string;
    created_at: string;
    updated_at: string;
  }>(row);
}

export function dbUpdateActivity(id: string, data: any) {
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  const fields: string[] = [];
  const values: any[] = [];
  if (data.title) {
    fields.push("title = ?");
    values.push(data.title);
  }
  if (data.slug) {
    fields.push("slug = ?");
    values.push(data.slug);
  }
  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }
  if (data.category) {
    fields.push("category = ?");
    values.push(data.category);
  }
  if (data.cover_image) {
    fields.push("cover_image = ?");
    values.push(data.cover_image);
  }
  if (data.video_url) {
    fields.push("video_url = ?");
    values.push(data.video_url);
  }
  if (fields.length > 0) {
    fields.push("updated_at = ?");
    values.push(now);
    values.push(id);
    db.prepare(`UPDATE activities SET ${fields.join(", ")} WHERE id = ?`).run(...values);
  }
  return dbGetActivityById(id);
}

export function dbDeleteActivity(id: string) {
  db.prepare("DELETE FROM activities WHERE id = ?").run(id);
  return { success: true };
}

// ---- Media ----
export function dbGetMediaByActivity(activityId: string) {
  return db
    .prepare("SELECT * FROM media WHERE activity_id = ? ORDER BY sort_order ASC, id ASC")
    .all(activityId) as any[];
}

export function dbGetMediaById(id: string) {
  return db.prepare("SELECT * FROM media WHERE id = ?").get(id) as any;
}

export function dbCreateMedia(data: any) {
  db
    .prepare(
      "INSERT INTO media (id, activity_id, file_url, file_type, sort_order) VALUES (?, ?, ?, ?, ?)"
    )
    .run(data.id, data.activity_id, data.file_url, data.file_type, data.sort_order);
  return db.prepare("SELECT * FROM media WHERE id = ?").get(data.id) as any;
}

export function dbDeleteMedia(id: string) {
  db.prepare("DELETE FROM media WHERE id = ?").run(id);
  return { success: true };
}

// ---- Admin users ----
export function dbGetAdminByEmail(email: string) {
  const row = db.prepare("SELECT * FROM admin_users WHERE email = ?").get(email);
  return rowToObj<{id: string; name: string; email: string; password_hash: string; role: string}>(row) ?? null;
}

export function dbCreateAdmin(data: any) {
  db.prepare(
    "INSERT INTO admin_users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, 'admin')"
  ).run(data.id, data.name, data.email, data.password_hash);
  return db.prepare("SELECT * FROM admin_users WHERE id = ?").get(data.id) as any;
}

export function dbDeleteAdmin(id: string) {
  db.prepare("DELETE FROM admin_users WHERE id = ?").run(id);
  return { success: true };
}

export function dbGetAdminById(id: string) {
  return db.prepare("SELECT id, name, email, role FROM admin_users WHERE id = ?").get(id) as any;
}
