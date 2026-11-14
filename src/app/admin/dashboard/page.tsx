// src/app/admin/dashboard/page.tsx
import { cookies } from "next/headers";
import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function AdminDashboardPage() {
  const cookie = cookies();
  const sessionToken = cookie.get("admin_session")?.value;
  const session = sessionToken ? getSession(`admin_session=${sessionToken}`) : null;

  // Hitung statistik
  const stats = await fetch("http://localhost:3000/api/admin/activities", {
    headers: { cookie: sessionToken ? `admin_session=${sessionToken}` : "" },
  })
    .then((res) => res.json())
    .then((data) => data.data || [])
    .catch(() => []);

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1>Dashboard</h1>
        <Link href="/admin/activities/new" className="btn btn-success">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 4v12M8 4L4 8m4-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Tambah Kegiatan
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Kegiatan</p>
              <p className="text-3xl font-bold text-gray-900">{stats.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Kategori</p>
              <p className="text-3xl font-bold text-gray-900">
                {new Set(stats.map((a: any) => a.category)).size}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" fill="#10b981" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Media</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#8b5cf6" strokeWidth="2" />
                <circle cx="8" cy="8" r="2" fill="#8b5cf6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Aktivitas Aktif</p>
              <p className="text-3xl font-bold text-gray-900">{stats.filter((a: any) => a.active).length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 6 19.2l2.4-7.2L2 12l7.6-2.4z" fill="#f97316" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Daftar Kegiatan</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table-responsive">
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((act: any, idx: number) => (
                <tr key={act.id}>
                  <td className="font-mono text-sm text-gray-500">{idx + 1}</td>
                  <td className="font-semibold text-gray-900">{act.title}</td>
                  <td>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {act.category}
                    </span>
                  </td>
                  <td className="text-sm text-gray-500">
                    {new Date(act.created_at || "").toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" })}
                  </td>
                  <td className="text-sm">
                    <div className="flex gap-3">
                      <Link href={`/admin/activities/${act.id}/edit`} className="text-blue-600 hover:underline">
                        Edit
                      </Link>
                      <Link href={`/admin/activities/${act.id}/delete`} className="text-red-600 hover:underline">
                        Hapus
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {stats.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Belum ada kegiatan.</p>
          <Link href="/admin/activities/new" className="btn btn-success mt-4">
            Tambah Kegiatan Pertama
          </Link>
        </div>
      )}
    </div>
  );
}
