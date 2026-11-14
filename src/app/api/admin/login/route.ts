// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { validateAdmin, dbGetAdminByEmail, dbGetAdminById } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email dan password wajib diisi." }, { status: 400 });
    }

    // Cek dulu di DB
    const admin = dbGetAdminByEmail(email);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Email atau password salah." }, { status: 401 });
    }

    // Validasi password
    const isValid = validateAdmin(email, password);
    if (!isValid) {
      return NextResponse.json({ success: false, message: "Email atau password salah." }, { status: 401 });
    }

    // Buat session token (berbasis session ID admin + timestamp yang di-hash)
    const sessionToken = `admin_${admin.id}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Set cookie
    const response = NextResponse.json({
      success: true,
      message: "Login berhasil.",
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set({
      name: "admin_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}
