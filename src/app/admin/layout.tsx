// src/app/admin/layout.tsx
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const cookie = cookies();
    const sessionToken = cookie.get("admin_session")?.value;
    const session = sessionToken ? getSession(`admin_session=${sessionToken}`) : null;

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Link href="/admin/dashboard" className="logo">
            <span className="logo-icon">◆</span>
            <span>Portofolio</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <Link href="/admin/dashboard" className="active">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 9h12M9 3v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Dashboard
          </Link>
          <Link href="/admin/activities">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="3" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 9h12M9 3v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Kegiatan
          </Link>
          <Link href="/admin/activities/new">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="5" y="4" width="8" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
              <path d="M5 9h8M9 5v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Tambah Kegiatan
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link href="/" target="_blank">
            ← Lihat Website
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="w-full text-left text-sm text-gray-400 hover:text-white transition">
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">{children}</main>
    </div>
  );
}
