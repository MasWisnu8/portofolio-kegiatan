// src/app/admin/media/[activityId]/page.tsx
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function AdminMediaListPage({ params }: { params: { activityId: string } }) {
  const cookie = cookies();
  const sessionToken = cookie.get("admin_session")?.value;
  const session = sessionToken ? getSession(`admin_session=${sessionToken}`) : null;

  if (!session) {
    redirect("/admin/login");
  }

  // Cek aktivitas
  const activityRes = await fetch(`http://localhost:3000/api/admin/activities?id=${params.activityId}`, {
    headers: { cookie: `admin_session=${sessionToken}` },
  });
  const activityData = await activityRes.json();
  const activity = activityData.success ? activityData.data : null;

  // Dapatkan media
  const mediaRes = await fetch(`http://localhost:3000/api/admin/activities/${params.activityId}/media?activityId=${params.activityId}`, {
    headers: { cookie: `admin_session=${sessionToken}` },
  });
  const mediaData = await mediaRes.json();
  const mediaList = mediaData.success ? mediaData.data : [];

  if (!activity) {
    notFound();
  }

  return (
    <div className="admin-content">
      <div className="admin-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Kegiatan</h1>
          <p className="text-gray-500 text-sm mt-1">{activity.title}</p>
        </div>
        <Link href={`/admin/activities/${params.activityId}/edit`} className="btn btn-outline btn-sm">
          ← Kembali
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Media */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Upload Media Baru</h2>
          <p className="text-sm text-gray-500 mb-4">
            Upload gambar atau video untuk kegiatan ini. Format: JPG, PNG, GIF, WebP, MP4.
          </p>

          <form
            action="/api/admin/activities/[id]/media"
            encType="multipart/form-data"
          >
            <input type="hidden" name="activityId" value={params.activityId} />
            <div className="form-group">
              <label htmlFor="media-file">Pilih File</label>
              <input
                id="media-file"
                type="file"
                name="file"
                accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Upload Media
            </button>
          </form>
        </div>

        {/* Daftar Media */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Daftar Media</h2>
          {mediaList.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500">Belum ada media.</p>
              <p className="text-gray-400 text-sm mt-1">Upload gambar atau video pertama.</p>
            </div>
          ) : (
            <div className="admin-media-grid">
              {mediaList.map((item: any) => (
                <div key={item.id} className="admin-media-item">
                  <img src={item.file_url} alt={item.file_url} />
                  <span className={`file-type ${item.file_type}`}>
                    {item.file_type === "image" ? "Gambar" : "Video"}
                  </span>
                  <div className="actions">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (confirm("Hapus media ini?")) {
                          fetch(`/api/admin/activities/${params.activityId}/media/${item.id}?mediaId=${item.id}`, {
                            method: "DELETE",
                          }).then(() => {
                            window.location.reload();
                          });
                        }
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
