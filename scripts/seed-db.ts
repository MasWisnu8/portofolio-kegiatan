// Database seeder for the portfolio admin
// Run: npx tsx scripts/seed-db.ts
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const db = new Database("./dev.db");
const now = () => new Date().toISOString().slice(0, 19).replace("T", " ");

const insert = (sql: string, params: any[]) => {
  const stmt = db.prepare(sql);
  return stmt.run(...params);
};

// 1) Profile
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
  photo_url: "/uploads/profile.jpg",
};
db.prepare(`INSERT INTO profile (id, name, title, subtitle, bio, contact_email, contact_phone, location, website, photo_url)
  VALUES (@id,@name,@title,@subtitle,@bio,@contact_email,@contact_phone,@location,@website,@photo_url)
  ON CONFLICT(id) DO UPDATE SET name=excluded.name, title=excluded.title, subtitle=excluded.subtitle, bio=excluded.bio,
    contact_email=excluded.contact_email, contact_phone=excluded.contact_phone, location=excluded.location, website=excluded.website, photo_url=excluded.photo_url`)
  .run(profile);

// 2) Activities (projects)
const activities = [
  { id: "act_001", title: "Optimasi OEE & Pengurangan Reject Produksi", slug: "optimasi-oee-dan-pengurangan-reject", description: "Menerapkan Lean Manufacturing dan perbaikan proses produksi untuk meningkatkan stabilitas, mengurangi reject, serta menaikkan OEE produksi.", category: "Continuous Improvement", cover_image: "/uploads/activities/act_001_cover.jpg", video_url: "/uploads/activities/act_001_video.mp4", created_at: "2026-08-01", updated_at: now() },
  { id: "act_002", title: "Pengembangan Garis Produksi & Ekspansi Pabrik", slug: "pengembangan-garis-produksi-dan-ekspansi-pabrik", description: "Mendukung pengembangan line produksi baru dan proyek ekspansi pabrik, termasuk perencanaan, instalasi, dan pemasangan peralatan.", category: "Plant Engineering", cover_image: "/uploads/activities/act_002_cover.jpg", video_url: "/uploads/activities/act_002_video.mp4", created_at: "2026-07-01", updated_at: now() },
  { id: "act_003", title: "Perencanaan Produksi & Pengendalian Inventori (PPIC)", slug: "perencanaan-produksi-dan-pengendalian-inventori", description: "Menyiapkan rencana produksi tahunan, mingguan, dan harian berdasarkan prediksi penjualan, menghitung kebutuhan bahan baku, serta memantau tingkat persediaan.", category: "PPIC", cover_image: "/uploads/activities/act_003_cover.jpg", video_url: "/uploads/activities/act_003_video.mp4", created_at: "2026-06-01", updated_at: now() },
  { id: "act_004", title: "Dashboard KPI Produksi & Pengendalian Mutu", slug: "dashboard-kpi-produksi-dan-pengendalian-mutu", description: "Membangun dashboard KPI safety, quality, delivery, productivity, dan cost (SQDC) untuk monitoring harian serta tindakan korektif.", category: "KPIs & Quality", cover_image: "/uploads/activities/act_004_cover.jpg", video_url: "/uploads/activities/act_004_video.mp4", created_at: "2026-05-01", updated_at: now() },
  { id: "act_005", title: "Pengendalian Rantai Pasok & Pengadaan", slug: "pengendalian-rangkaian-pasok-dan-pengadaan", description: "Koordinasi jadwal pengadaan dengan Procurement, memastikan ketersediaan bahan baku, serta mengelola persediaan selesai untuk memenuhi kebutuhan pelanggan.", category: "Supply Chain", cover_image: "/uploads/activities/act_005_cover.jpg", video_url: "/uploads/activities/act_005_video.mp4", created_at: "2026-04-01", updated_at: now() },
];
const insertActivity = db.prepare(`INSERT INTO activities (id, title, slug, description, category, cover_image, video_url, created_at, updated_at)
  VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET title=excluded.title, slug=excluded.slug, description=excluded.description,
    category=excluded.category, cover_image=excluded.cover_image, video_url=excluded.video_url, created_at=excluded.created_at, updated_at=excluded.updated_at`);
for (const a of activities) insertActivity.run(a.id, a.title, a.slug, a.description, a.category, a.cover_image, a.video_url, a.created_at, a.updated_at);

// 3) Media
const media = [
  { id: "med_001", activity_id: "act_001", file_url: "/uploads/activities/act_001_01.jpg", file_type: "image", sort_order: 1, created_at: now() },
  { id: "med_002", activity_id: "act_001", file_url: "/uploads/activities/act_001_02.jpg", file_type: "image", sort_order: 2, created_at: now() },
  { id: "med_003", activity_id: "act_001", file_url: "/uploads/activities/act_001_03.jpg", file_type: "image", sort_order: 3, created_at: now() },
  { id: "med_004", activity_id: "act_002", file_url: "/uploads/activities/act_002_01.jpg", file_type: "image", sort_order: 1, created_at: now() },
  { id: "med_005", activity_id: "act_002", file_url: "/uploads/activities/act_002_02.jpg", file_type: "image", sort_order: 2, created_at: now() },
  { id: "med_006", activity_id: "act_003", file_url: "/uploads/activities/act_003_01.jpg", file_type: "image", sort_order: 1, created_at: now() },
  { id: "med_007", activity_id: "act_004", file_url: "/uploads/activities/act_004_01.jpg", file_type: "image", sort_order: 1, created_at: now() },
  { id: "med_008", activity_id: "act_004", file_url: "/uploads/activities/act_004_02.jpg", file_type: "image", sort_order: 2, created_at: now() },
  { id: "med_009", activity_id: "act_005", file_url: "/uploads/activities/act_005_01.jpg", file_type: "image", sort_order: 1, created_at: now() },
];
const insertMedia = db.prepare(`INSERT INTO media (id, activity_id, file_url, file_type, sort_order, created_at)
  VALUES (?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING`);
for (const m of media) insertMedia.run(m.id, m.activity_id, m.file_url, m.file_type, m.sort_order, m.created_at);

// 4) Admin user (auth against 'users' table)
const passwordHash = bcrypt.hashSync("admin123", 10);
const insertUser = db.prepare(`INSERT INTO users (id, email, password_hash, name) VALUES (?,?,?,?) ON CONFLICT(email) DO UPDATE SET password_hash=excluded.password_hash, name=excluded.name`);
insertUser.run(uuidv4(), "admin@portfolio.com", passwordHash, "Wisnu Pandu Hidayat");
insertUser.run(uuidv4(), "admin@portfolio.com", passwordHash, "Wisnu Pandu Hidayat");

// 5) session (empty setup)
db.prepare(`INSERT OR IGNORE INTO settings (id, key, value) VALUES (?, 'site_setup', '1')`).run(uuidv4());
db.prepare(`INSERT OR IGNORE INTO settings (id, key, value) VALUES (?, 'admin_name', ?) RETURNING 1`).run(uuidv4(), "Wisnu Pandu Hidayat");

db.close();
console.log("✅ Seed finished. Admin: admin@portfolio.com / admin123");
