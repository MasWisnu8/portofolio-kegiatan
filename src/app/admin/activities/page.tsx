// src/app/admin/activities/page.tsx
import { cookies } from "next/headers";
import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function AdminActivitiesPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const session = sessionToken ? getSession(`admin_session=${sessionToken}`) : null;

  const res = await fetch("http://localhost:3000/api/admin/activities", {
    headers: { cookie: sessionToken ? `admin_session=${sessionToken}` : "" },
  });
  const data = await res.json();
  const activities = data.success ? data.data : [];

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1>Daftar Kegiatan</h1>
        <Link href="/admin/activities/new" className="btn btn-success">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 4v12M8 4L4 8m4-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Tambah Kegiatan
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table>
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
              {activities.map((act: any, idx: number) => (
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

      {activities.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Belum ada kegiatan.</p>
          <p className="text-gray-400 text-sm mt-1">Tambah kegiatan pertama Anda.</p>
          <Link href="/admin/activities/new" className="btn btn-success mt-4 inline-block">
            Tambah Kegiatan
          </Link>
        </div>
      )}
    </div>
  );
}
