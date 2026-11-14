"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDeleteActivityPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus kegiatan ini? Tindakan ini tidak dapat dibatalkan.")) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/activities?id=${params.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal menghapus kegiatan.");
      }

      router.push("/admin/activities");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Gagal menghapus kegiatan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-content max-w-2xl">
      <div className="admin-header">
        <h1>Hapus Kegiatan</h1>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
        <p className="text-yellow-800">
          ⚠️ <strong>Peringatan:</strong> Tindakan ini akan menghapus kegiatan beserta
          semua media (gambar/video) yang terkait. Tindakan ini tidak dapat dibatalkan.
        </p>
      </div>

      {error && <div className="alert alert-error mb-4">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Konfirmasi Penghapusan</h2>
        <p className="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus kegiatan ini? Setelah dihapus, data akan
          hilang permanen dari sistem.
        </p>
        <div className="flex gap-4">
          <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
            {loading ? "Menghapus..." : "Ya, Hapus Kegiatan"}
          </button>
          <button className="btn btn-outline" onClick={() => router.push("/admin/activities")}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
