// Database wrapper for SQLite
import Database from "better-sqlite3";
import { v4 as uuidv4 } from "uuid";

const db = new Database("dev.db");

// Create tables if not exist
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    id TEXT PRIMARY KEY,
    key TEXT UNIQUE,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS profile (
    id TEXT PRIMARY KEY,
    name TEXT,
    title TEXT,
    subtitle TEXT,
    bio TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    location TEXT,
    website TEXT,
    photo_url TEXT
  );

  CREATE TABLE IF NOT EXISTS activities (
    id TEXT PRIMARY KEY,
    title TEXT,
    slug TEXT UNIQUE,
    description TEXT,
    category TEXT,
    cover_image TEXT,
    video_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY,
    activity_id TEXT,
    file_url TEXT,
    file_type TEXT,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (activity_id) REFERENCES activities(id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    password_hash TEXT,
    name TEXT
  );
`);

// Settings functions
export function getSetting(key: string): string | null {
  const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(key) as any;
  return row ? row.value : null;
}

export function setSetting(key: string, value: string): void {
  const existing = db.prepare("SELECT id FROM settings WHERE key = ?").get(key) as any;
  if (existing) {
    db.prepare("UPDATE settings SET value = ? WHERE key = ?").run(value, key);
  } else {
    db.prepare("INSERT INTO settings (id, key, value) VALUES (?, ?, ?)").run(uuidv4(), key, value);
  }
}

// Profile functions
export function getProfile(): any {
  const row = db.prepare("SELECT * FROM profile WHERE id = ?").get("main") as any;
  if (!row) {
    const profile = {
      id: "main",
      name: "Wisnu Pandu Hidayat",
      title: "Production Professional",
      subtitle: "Production Manager with 8+ Years Experience",
      bio: "Production professional with over 8 years of experience in the food manufacturing industry specializing in Production Management, PPIC, Warehouse Operations, Supply Chain Coordination, Inventory Management, Process Improvement, and Manufacturing Excellence.",
      contact_email: "Wisnupanduhidayat@gmail.com",
      contact_phone: "",
      location: "Bandung, Indonesia",
      website: "www.linkedin.com/in/wisnu-pandu-hidayat-6a7468257",
      photo_url: "/uploads/profile.jpg"
    };
    db.prepare("INSERT INTO profile (id, name, title, subtitle, bio, contact_email, contact_phone, location, website, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(
      profile.id, profile.name, profile.title, profile.subtitle, profile.bio,
      profile.contact_email, profile.contact_phone, profile.location, profile.website, profile.photo_url
    );
    return profile;
  }
  return row;
}

export function updateProfile(data: any): void {
  const existing = db.prepare("SELECT id FROM profile WHERE id = ?").get("main") as any;
  if (existing) {
    db.prepare(`
      UPDATE profile SET 
        name = ?, title = ?, subtitle = ?, bio = ?, 
        contact_email = ?, contact_phone = ?, location = ?, website = ?, photo_url = ?
      WHERE id = ?
    `).run(
      data.name, data.title, data.subtitle, data.bio,
      data.contact_email, data.contact_phone, data.location, data.website, data.photo_url,
      "main"
    );
  } else {
    db.prepare(`
      INSERT INTO profile (id, name, title, subtitle, bio, contact_email, contact_phone, location, website, photo_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      "main", data.name, data.title, data.subtitle, data.bio,
      data.contact_email, data.contact_phone, data.location, data.website, data.photo_url
    );
  }
}

// Activities functions
export function getActivities() {
  return db.prepare("SELECT * FROM activities ORDER BY created_at DESC").all() as any[];
}

export function getActivityById(id: string) {
  return db.prepare("SELECT * FROM activities WHERE id = ?").get(id) as any;
}

export function getActivityBySlug(slug: string) {
  return db.prepare("SELECT * FROM activities WHERE slug = ?").get(slug) as any;
}

export function getAllActivities(): any[] {
  return db.prepare("SELECT * FROM activities ORDER BY created_at DESC").all() as any[];
}

export function createActivity(data: any) {
  const id = uuidv4();
  db.prepare(`
    INSERT INTO activities (id, title, slug, description, category, cover_image, video_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, data.title, data.slug, data.description, data.category, data.cover_image, data.video_url);
  return id;
}

export function updateActivity(id: string, data: any) {
  db.prepare(`
    UPDATE activities SET title = ?, slug = ?, description = ?, category = ?, cover_image = ?, video_url = ?
    WHERE id = ?
  `).run(data.title, data.slug, data.description, data.category, data.cover_image, data.video_url, id);
}

export function deleteActivity(id: string) {
  db.prepare("DELETE FROM activities WHERE id = ?").run(id);
}

// Media functions
export function getMediaByActivity(activityId: string) {
  return db.prepare("SELECT * FROM media WHERE activity_id = ? ORDER BY sort_order").all(activityId) as any[];
}

export function addMedia(activityId: string, fileUrl: string, fileType: string, sortOrder: number = 0) {
  const id = uuidv4();
  db.prepare("INSERT INTO media (id, activity_id, file_url, file_type, sort_order) VALUES (?, ?, ?, ?, ?)").run(id, activityId, fileUrl, fileType, sortOrder);
  return id;
}

// Users (admin authentication)
export function getUsers() {
  return db.prepare("SELECT * FROM users").all() as any[];
}

export function getUserByEmail(email: string) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
}

export function createUser(email: string, password: string, name: string) {
  const id = uuidv4();
  const passwordHash = require("bcryptjs").hashSync(password, 10);
  db.prepare("INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)").run(id, email, passwordHash, name);
  return id;
}

export function getUserById(id: string) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as any;
}

export function getUserByEmailWithPassword(email: string) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
}

// Session management
export function createSession(sessionId: string, userId: string, expiresAt: Date) {
  db.prepare("INSERT INTO settings (id, key, value) VALUES (?, ?, ?)").run(sessionId, `session:${sessionId}`, JSON.stringify({ userId, expiresAt: expiresAt.toISOString() }));
}

export function getSession(sessionId: string) {
  const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(`session:${sessionId}`) as any;
  if (!row) return null;
  try {
    return JSON.parse(row.value);
  } catch {
    return null;
  }
}

export function deleteSession(sessionId: string) {
  db.prepare("DELETE FROM settings WHERE key = ?").run(`session:${sessionId}`);
}
