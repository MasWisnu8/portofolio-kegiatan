// src/app/api/admin/activities/[id]/media/route.ts
import { NextResponse } from "next/server";
import {
  dbGetActivityById,
  dbCreateMedia,
  dbGetMediaByActivity,
  dbDeleteMedia,
  dbGetMediaById,
} from "@/lib/db";
import { getSession } from "@/lib/session";
import { mkdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper: dapatkan folder uploads
function getUploadDir(): string {
  return join(__dirname, "..", "..", "..", "..", "uploads", "activities");
}

// GET - daftar media untuk aktivitas tertentu
export async function GET(request: Request) {
  try {
    const session = getSession(request.headers.get("cookie") ?? null);
    if (!session) {
      return NextResponse.json({ success: false, message: "Harus login dulu." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const activityId = searchParams.get("activityId");
    if (!activityId) {
      return NextResponse.json({ success: false, message: "activityId wajib diisi." }, { status: 400 });
    }

    // Cek apakah aktivitas ini ada
    const activity = dbGetActivityById(activityId);
    if (!activity) {
      return NextResponse.json({ success: false, message: "Aktivitas tidak ditemukan." }, { status: 404 });
    }

    const mediaList = dbGetMediaByActivity(activityId);
    return NextResponse.json({ success: true, data: mediaList });
  } catch (error) {
    console.error("Get media error:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil media." }, { status: 500 });
  }
}

// POST - upload media (gambar/video) baru
export async function POST(request: Request) {
  try {
    const session = getSession(request.headers.get("cookie") ?? null);
    if (!session) {
      return NextResponse.json({ success: false, message: "Harus login dulu." }, { status: 401 });
    }

    const formData = await request.formData();
    const activityId = formData.get("activityId") as string;
    const file = formData.get("file") as File | null;

    if (!activityId) {
      return NextResponse.json({ success: false, message: "activityId wajib diisi." }, { status: 400 });
    }
    if (!file) {
      return NextResponse.json({ success: false, message: "File wajib diupload." }, { status: 400 });
    }

    // Cek aktivitas
    const activity = dbGetActivityById(activityId);
    if (!activity) {
      return NextResponse.json({ success: false, message: "Aktivitas tidak ditemukan." }, { status: 404 });
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "video/mp4", "video/webm"];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, message: "Format file tidak didukung. Gunakan JPG/PNG/GIF/WebP/MP4." }, { status: 415 });
    }

    if (file.size > maxSize) {
      return NextResponse.json({ success: false, message: "File terlalu besar. Maksimal 50MB." }, { status: 413 });
    }

    // Buat folder untuk aktivitas ini (di public/uploads)
    const uploadDir = getUploadDir();
    mkdirSync(uploadDir, { recursive: true });

    // Generate filename unik
    const ext = file.type.startsWith("image/") ? "jpg" : "mp4";
    const filename = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filePath = join(uploadDir, filename);

    // Konversi File ke Buffer dan tulis ke disk
    const buffer = Buffer.from(await file.arrayBuffer());
    writeFileSync(filePath, buffer);

    // URL relatif (untuk frontend)
    const fileUrl = "/uploads/activities/" + filename;

    // Simpan ke DB
    const mediaId = `med_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const media = dbCreateMedia({
      id: mediaId,
      activity_id: activityId,
      file_url: fileUrl,
      file_type: file.type.startsWith("image/") ? "image" : "video",
      sort_order: 0,
    });

    return NextResponse.json({
      success: true,
      message: "Media berhasil diupload.",
      data: { ...media, file_url: fileUrl },
    });
  } catch (error) {
    console.error("Upload media error:", error);
    return NextResponse.json({ success: false, message: "Gagal upload media." }, { status: 500 });
  }
}
