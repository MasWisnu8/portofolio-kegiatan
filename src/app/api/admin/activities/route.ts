// src/app/api/admin/activities/route.ts
import { NextResponse } from "next/server";
import {
  dbCreateActivity,
  dbGetAllActivities,
  dbGetActivityBySlug,
  dbDeleteActivity,
  dbUpdateActivity,
} from "@/lib/db";
import { validateSession } from "@/lib/middleware";

// GET - semua aktivitas (admin)
export async function GET() {
  try {
    const activities = dbGetAllActivities();
    return NextResponse.json({ success: true, data: activities });
  } catch (error) {
    console.error("Get activities error:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data." }, { status: 500 });
  }
}

// POST - buat aktivitas baru (admin)
export async function POST(request: Request) {
  try {
    const session = validateSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Harus login dulu." }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, description, category, cover_image, video_url } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, message: "Title dan slug wajib diisi." }, { status: 400 });
    }

    // Cek slug unik
    const existing = dbGetActivityBySlug(slug);
    if (existing && existing.id !== session.userId) {
      return NextResponse.json({ success: false, message: "Slug sudah digunakan." }, { status: 409 });
    }

    // Generate id & slug jika kosong
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const activityId = `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const finalSlug = slug || title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const newActivity = dbCreateActivity({
      id: activityId,
      title,
      slug: finalSlug,
      description: description || "",
      category: category || "",
      cover_image: cover_image || null,
      video_url: video_url || null,
    });

    return NextResponse.json({
      success: true,
      message: "Aktivitas berhasil dibuat.",
      data: newActivity,
    });
  } catch (error) {
    console.error("Create activity error:", error);
    return NextResponse.json({ success: false, message: "Gagal membuat aktivitas." }, { status: 500 });
  }
}
