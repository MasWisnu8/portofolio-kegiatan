// src/lib/session.ts — session & auth helpers untuk API routes
import { DatabaseSync } from "node:sqlite";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "..", "..", "dev.db");
const db = new DatabaseSync(dbPath);

export interface SessionUser {
  userId: string;
  name: string;
  email: string;
  role: string;
}

// Baca session token dari cookie header string
export function readSessionTokenFromHeader(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const cookieStr = cookieHeader.split("; ").find((c) => c.startsWith("admin_session="));
  return cookieStr ? cookieStr.split("=")[1] : null;
}

// Validasi session - cek admin_users ada atau bukan
// cookieHeader: header cookie dari request (string atau null)
export function getSession(cookieHeader: string | null): SessionUser | null {
  const token = readSessionTokenFromHeader(cookieHeader);
  if (!token) return null;

  try {
    const rows = db.prepare("SELECT id, name, email, role FROM admin_users").all() as any[];
    if (rows.length === 0) return null;

    const admin = rows[0];
    return {
      userId: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };
  } catch (e) {
    console.error("Session error:", e);
    return null;
  }
}

// Cek apakah request berasal dari admin yang login
export function requireAdminFromCookie(cookieHeader: string | null): SessionUser | null {
  return getSession(cookieHeader);
}
