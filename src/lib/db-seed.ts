// src/lib/db-seed.ts — HANYA jalankan SEKALI (setelah db-init)
// Execute: npx tsx src/lib/db-seed.ts
import { DatabaseSync } from "node:sqlite";
import { readFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { bcryptHash, dbGetAdminByEmail, dbCreateAdmin, dbGetAllActivities } from "./db.js";
import { seed } from "./seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new DatabaseSync(join(__dirname, "..", "..", "dev.db"));

// 1. Seed admin
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@portofolio.local";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin Portofolio";

const existingAdmin = dbGetAdminByEmail(ADMIN_EMAIL);
if (!existingAdmin) {
  const adminId = `adm_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const admin = dbCreateAdmin({
    id: adminId,
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password_hash: bcryptHash(ADMIN_PASSWORD),
  });
  console.log(`✅ Admin dibuat: ${admin.name} <${admin.email}>`);
} else {
  console.log(`ℹ️  Admin sudah ada: ${existingAdmin.email}`);
}

// 2. Seed kegiatan
const activities = dbGetAllActivities();
if (activities.length === 0) {
  seed(db);
  console.log("✅ Data kegiatan di-seed.");
} else {
  console.log(`ℹ️  ${activities.length} kegiatan sudah ada.`);
}

db.close();
console.log("✅ Seeding selesai.");
