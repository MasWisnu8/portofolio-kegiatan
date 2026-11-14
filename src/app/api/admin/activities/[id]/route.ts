// src/app/api/admin/activities/[id]/route.ts
import { NextResponse } from "next/server";
import {
  dbGetActivityById,
  dbGetActivityBySlug,
  dbUpdateActivity,
  dbDeleteActivity,
} from "@/lib/db";
import { validateSession } from "@/lib/middleware";

// Helper: ambil parameter dari URL
function getContext() {
  return {
    params: { id: "" },
  } as any;
}

// GET - aktivitas by id
export async function GET(request: Request) {
  try {
    const session = validateSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Harus login dulu." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || session.userId;

    const activity = dbGetActivityById(id);
    if (!activity) {
      return NextResponse.json({ success: false, message: "Aktivitas tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: activity });
  } catch (error) {
    console.error("Get activity error:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data." }, { status: 500 });
  }
}

// PUT - update aktivitas
export async function PUT(request: Request) {
  try {
    const session = validateSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Harus login dulu." }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, slug, description, category, cover_image, video_url } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID wajib diisi." }, { status: 400 });
    }

    // Cek slug unik (kecuali id yang sama)
    if (slug) {
      const existing = dbGetActivityBySlug(slug);
      if (existing && existing.id !== id) {
        return NextResponse.json({ success: false, message: "Slug sudah digunakan." }, { status: 409 });
      }
    }

    const updated = dbUpdateActivity(id, { title, slug, description, category, cover_image, video_url });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Gagal update." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Aktivitas berhasil diperbarui.",
      data: updated,
    });
  } catch (error) {
    console.error("Update activity error:", error);
    return NextResponse.json({ success: false, message: "Gagal update aktivitas." }, { status: 500 });
  }
}

// DELETE - hapus aktivitas
export async function DELETE(request: Request) {
  try {
    const session = validateSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Harus login dulu." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || session.userId;

    const activity = dbGetActivityById(id);
    if (!activity) {
      return NextResponse.json({ success: false, message: "Aktivitas tidak ditemukan." }, { status: 404 });
    }

    dbDeleteActivity(id);

    return NextResponse.json({
      success: true,
      message: "Aktivitas berhasil dihapus.",
    });
  } catch (error) {
    console.error("Delete activity error:", error);
    return NextResponse.json({ success: false, message: "Gagal hapus aktivitas." }, { status: 500 });
  }
}
