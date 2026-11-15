// Authentication utilities for admin panel
import { getSession, createSession, deleteSession, getUserByEmailWithPassword } from "./db";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

export function getAdminSession() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionId) return null;
  
  const sessionData = getSession(sessionId);
  if (!sessionData) return null;
  
  const user = getUserByEmailWithPassword(sessionData.userId);
  if (!user) return null;
  
  // Check expiration
  const expiresAt = new Date(sessionData.expiresAt);
  if (Date.now() > expiresAt.getTime()) {
    deleteSession(sessionId);
    return null;
  }
  
  return { user, sessionId };
}

export function login(email: string, password: string) {
  const user = getUserByEmailWithPassword(email);
  if (!user) return { success: false, error: "Invalid email or password" };
  
  const passwordMatch = require("bcryptjs").compareSync(password, user.password_hash);
  if (!passwordMatch) return { success: false, error: "Invalid email or password" };
  
  const sessionId = require("crypto").randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY);
  createSession(sessionId, user.id, expiresAt);
  
  return { success: true, sessionId };
}

export function logout(sessionId: string) {
  if (sessionId) {
    deleteSession(sessionId);
  }
  // Clear cookie
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", { expires: new Date(0), path: "/" });
  
  return { success: true };
}

export function requireAdmin() {
  const session = getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
