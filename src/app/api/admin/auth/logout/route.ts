import { NextResponse } from "next/server";
import { logout } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    const sessionId = cookieStore.get("admin_session")?.value;
    if (sessionId) {
      logout(sessionId);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
