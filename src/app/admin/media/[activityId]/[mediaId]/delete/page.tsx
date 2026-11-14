"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDeleteMediaPage({ params }: { params: { activityId: string; mediaId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!confirm("Hapus media ini? Tindakan ini tidak dapat dibatalkan.")) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/activities/${params.activityId}/media/${params.mediaId}?mediaId=${params.mediaId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal hapus media.");
      }

      router.push(`/admin/media/${params.activityId}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Gagal hapus media.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-content max-w-2xl">
      <div className="admin-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hapus Media</h1>
          <p className="text-gray-500 text-sm mt-1">ID: {params.mediaId}</p>
        </div>
        <Link href={`/admin/media/${params.activityId}`} className="btn btn-outline btn-sm">
          ← Kembali
        </Link>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
        <p className="text-yellow-800">
          ⚠️ <strong>Peringatan:</strong> Media ini akan dihapus beserta file gambar/video
          yang tersimpan di server.
        </p>
      </div>

      {error && <div className="alert alert-error mb-4">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex gap-4">
          <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
            {loading ? "Menghapus..." : "Ya, Hapus Media"}
          </button>
          <button className="btn btn-outline" onClick={() => router.push(`/admin/media/${params.activityId}`)}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
