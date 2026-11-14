// Data export script - converts SQLite data to JSON for static export
import { DatabaseSync } from "node:sqlite";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, "..", "dev.db");
const db = new DatabaseSync(dbPath);

// Export activities to JSON
export async function exportActivities() {
  const rows = db.prepare(`SELECT id, title, slug, description, category, cover_image, video_url FROM activities ORDER BY created_at`).all() as any[];
  const activities = rows.map((r: any) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    description: r.description,
    category: r.category,
    cover_image: r.cover_image,
    video_url: r.video_url
  }));
  return activities;
}

export async function exportActivitiesWithMedia() {
  const activities = db.prepare(`SELECT a.*, m.id as media_id, m.file_url, m.file_type, m.sort_order 
    FROM activities a 
    LEFT JOIN media m ON a.id = m.activity_id 
    ORDER BY a.created_at, m.sort_order`).all() as any[];
  
  const activitiesWithMedia = [];
  const map: Record<string, any> = {};
  
  for (const row of activities) {
    if (!map[row.id]) {
      map[row.id] = {
        id: row.id,
        title: row.title,
        slug: row.slug,
        description: row.description,
        category: row.category,
        cover_image: row.cover_image,
        video_url: row.video_url,
        media: []
      };
      activitiesWithMedia.push(map[row.id]);
    }
    if (row.id && row.file_url) {
      map[row.id].media.push({
        id: row.id,
        file_url: row.file_url,
        file_type: row.file_type,
        sort_order: row.sort_order
      });
    }
  }
  
  return activitiesWithMedia;
}

export async function exportMedia() {
  const rows = db.prepare(`SELECT * FROM media ORDER BY activity_id, sort_order`).all() as any[];
  return rows.map((r: any) => ({
    id: r.id,
    activity_id: r.activity_id,
    file_url: r.file_url,
    file_type: r.file_type,
    sort_order: r.sort_order
  }));
}

export async function exportAll() {
  return {
    activities: await exportActivities(),
    activitiesWithMedia: await exportActivitiesWithMedia(),
    media: await exportMedia()
  };
}
