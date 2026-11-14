// src/app/api/admin/activities/[id]/media/[mediaId]/route.ts
import { NextResponse } from "next/server";
import { dbGetMediaById, dbDeleteMedia, dbGetActivityById } from "@/lib/db";
import { getSession } from "@/lib/session";
import { unlinkSync } from "node:fs";
import { join } from "node:path";

// DELETE - hapus media
export async function DELETE(request: Request) {
  try {
    const session = getSession(request.headers.get("cookie") || "");
    if (!session) {
      return NextResponse.json({ success: false, message: "Harus login dulu." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const mediaId = searchParams.get("mediaId");
    if (!mediaId) {
      return NextResponse.json({ success: false, message: "mediaId wajib diisi." }, { status: 400 });
    }

    const media = dbGetMediaById(mediaId);
    if (!media) {
      return NextResponse.json({ success: false, message: "Media tidak ditemukan." }, { status: 404 });
    }

    // Hapus file dari disk
    if (media.file_url && media.file_url.startsWith("/uploads/")) {
      const filePath = join(process.cwd(), "uploads", media.file_url.replace(/^\/uploads\//, ""));
      try {
        unlinkSync(filePath);
      } catch (e) {
        console.error("Gagal hapus file:", e);
      }
    }

    dbDeleteMedia(mediaId);

    return NextResponse.json({
      success: true,
      message: "Media berhasil dihapus.",
    });
  } catch (error) {
    console.error("Delete media error:", error);
    return NextResponse.json({ success: false, message: "Gagal hapus media." }, { status: 500 });
  }
}
