// src/app/api/activities/[slug]/route.ts
import { NextResponse } from "next/server";
import { dbGetActivityBySlug } from "@/lib/db";

// GET - aktivitas berdasarkan slug
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ success: false, message: "Slug wajib diisi." }, { status: 400 });
    }

    const activity = dbGetActivityBySlug(slug);
    if (!activity) {
      return NextResponse.json({ success: false, message: "Aktivitas tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: activity });
  } catch (error) {
    console.error("Get activity by slug error:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data." }, { status: 500 });
  }
}
