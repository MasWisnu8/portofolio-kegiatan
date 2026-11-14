// src/lib/seed.ts — isi data contoh portofolio
import { DatabaseSync } from "node:sqlite";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function seed(db: DatabaseSync) {
  // Hapus dulu (jika ada), biar seed bersih
  db.exec("DELETE FROM media");
  db.exec("DELETE FROM activities");
  db.exec("DELETE FROM admin_users");

  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  const insertActivity = db.prepare(`
    INSERT INTO activities (id, title, slug, description, category, cover_image, video_url, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // --- Kegiatan 1: Pesta Perpisahan ---
  const pesta = {
    id: "act_001",
    title: "Pesta Perpisahan Serius",
    slug: "pesta-perpisahan-serius",
    description: `Pesta Perpisahan Serius adalah acara pernikahan yang memadukan nuansa tradisional Jawa dengan sentuhan modern dan surreal. Acara ini dirancang untuk menciptakan momen tak terlupakan bagi setiap tamu, dengan dekorasi yang kaya detail, tarian tradisional, serta foto-foto yang menangkap kesan emosional setiap detik.`,
    category: "Pernikahan",
    cover_image: "/uploads/activities/act_001_cover.jpg",
    video_url: "/uploads/activities/act_001_video.mp4",
    created_at: now,
    updated_at: now,
  };
  insertActivity.run(
    pesta.id, pesta.title, pesta.slug, pesta.description, pesta.category,
    pesta.cover_image, pesta.video_url, pesta.created_at, pesta.updated_at
  );

  // --- Kegiatan 2: Resepsi Modern ---
  const resepsi = {
    id: "act_002",
    title: "Resepsimala Modern & Elegance",
    slug: "resepsi-moderne-elegance",
    description: `Resepsimala Modern & Elegance adalah perayaan pernikahan dengan desain interior ceria, kecondangan ceria, dan cahaya tak bertele-tele. Setiap sudut kompleks diciptakan agar baper terasa hangat, manis, dan macet benar.`,
    category: "Pernikahan",
    cover_image: "/uploads/activities/act_002_cover.jpg",
    video_url: "/uploads/activities/act_002_video.mp4",
    created_at: now,
    updated_at: now,
  };
  insertActivity.run(
    resepsi.id, resepsi.title, resepsi.slug, resepsi.description, resepsi.category,
    resepsi.cover_image, resepsi.video_url, resepsi.created_at, resepsi.updated_at
  );

  // --- Kegiatan 3: Festival Budaya ---
  const festival = {
    id: "act_003",
    title: "Festival Kuliner & Seni Daerah",
    slug: "festival-kuliner-seni-daerah",
    description: `Festival Kuliner & Seni Daerah adalah perhelatan tahunan yang memperkenalkan kuliner dan seni lokal dari seluruh pelosok negeri. Tamu dapat mengonsumsi makanan khas, menonton panggung seni, serta berinteraksi dengan pelaku seni dan kuliner.`,
    category: "Festival",
    cover_image: "/uploads/activities/act_003_cover.jpg",
    video_url: "/uploads/activities/act_003_video.mp4",
    created_at: now,
    updated_at: now,
  };
  insertActivity.run(
    festival.id, festival.title, festival.slug, festival.description, festival.category,
    festival.cover_image, festival.video_url, festival.created_at, festival.updated_at
  );

  // --- Media untuk setiap kegiatan ---
  const insertMedia = db.prepare(`
    INSERT INTO media (id, activity_id, file_url, file_type, sort_order, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  // Media Pesta Perpisahan
  const media1 = [
    { url: "/uploads/activities/act_001_01.jpg", type: "image", order: 1 },
    { url: "/uploads/activities/act_001_02.jpg", type: "image", order: 2 },
    { url: "/uploads/activities/act_001_03.jpg", type: "image", order: 3 },
    { url: "/uploads/activities/act_001_04.jpg", type: "image", order: 4 },
    { url: "/uploads/activities/act_001_video.mp4", type: "video", order: 5 },
  ];
  for (const m of media1) {
    insertMedia.run(
      cuid(), pesta.id, m.url, m.type, m.order, new Date().toISOString().slice(0, 19).replace("T", " ")
    );
  }

  // Media Resepsi Moderne
  const media2 = [
    { url: "/uploads/activities/act_002_01.jpg", type: "image", order: 1 },
    { url: "/uploads/activities/act_002_02.jpg", type: "image", order: 2 },
    { url: "/uploads/activities/act_002_03.jpg", type: "image", order: 3 },
    { url: "/uploads/activities/act_002_04.jpg", type: "image", order: 4 },
    { url: "/uploads/activities/act_002_video.mp4", type: "video", order: 5 },
  ];
  for (const m of media2) {
    insertMedia.run(
      cuid(), resepsi.id, m.url, m.type, m.order, new Date().toISOString().slice(0, 19).replace("T", " ")
    );
  }

  // Media Festival
  const media3 = [
    { url: "/uploads/activities/act_003_01.jpg", type: "image", order: 1 },
    { url: "/uploads/activities/act_003_02.jpg", type: "image", order: 2 },
    { url: "/uploads/activities/act_003_03.jpg", type: "image", order: 3 },
    { url: "/uploads/activities/act_003_04.jpg", type: "image", order: 4 },
    { url: "/uploads/activities/act_003_video.mp4", type: "video", order: 5 },
  ];
  for (const m of media3) {
    insertMedia.run(
      cuid(), festival.id, m.url, m.type, m.order, new Date().toISOString().slice(0, 19).replace("T", " ")
    );
  }

  console.log("✅ Database seeded with 3 activities.");
}

function cuid(): string {
  return (
    Math.random().toString(36).slice(2, 11) +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8)
  );
}
