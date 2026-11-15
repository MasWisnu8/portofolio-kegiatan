import { NextResponse } from "next/server";
import { login } from "@/lib/auth";
import { getUsers } from "@/lib/db";

// Create demo user if not exists
const users = getUsers();
if (users.length === 0) {
  require("bcryptjs").hashSync("admin123", 10);
  // This will be handled by db.ts initialization
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = login(email, password);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      sessionId: result.sessionId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const users = getUsers();
  if (users.length > 0) {
    return NextResponse.json({ hasUser: true });
  }

  try {
    require("bcryptjs");
    const { createUser } = await import("@/lib/db");
    createUser("admin@portfolio.com", "admin123", "Wisnu Pandu Hidayat");
    return NextResponse.json({ hasUser: false });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initialize user" },
      { status: 500 }
    );
  }
}
