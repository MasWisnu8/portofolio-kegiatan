// src/app/api/admin/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logout berhasil." });

  response.cookies.delete("admin_session");
  response.cookies.delete("admin_session_id");

  return response;
}
