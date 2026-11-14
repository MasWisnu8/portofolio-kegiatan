// src/app/api/activities/route.ts
import { NextResponse } from "next/server";
import { dbGetAllActivities } from "@/lib/db";

// GET - semua aktivitas (untuk public)
export async function GET() {
  try {
    const activities = dbGetAllActivities();
    return NextResponse.json({ success: true, data: activities });
  } catch (error) {
    console.error("Get activities error:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data." }, { status: 500 });
  }
}
