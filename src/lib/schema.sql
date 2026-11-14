-- src/lib/schema.sql — skema database portofolio
-- Jalankan sekali: node src/lib/db-init.ts

CREATE TABLE IF NOT EXISTS activities (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  slug       TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category   TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  video_url  TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_activities_slug ON activities(slug);
CREATE INDEX IF NOT EXISTS idx_activities_category ON activities(category);

CREATE TABLE IF NOT EXISTS media (
  id          TEXT PRIMARY KEY,
  activity_id TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  file_type   TEXT NOT NULL DEFAULT 'image',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_media_activity ON media(activity_id);

CREATE TABLE IF NOT EXISTS admin_users (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'admin',
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);
