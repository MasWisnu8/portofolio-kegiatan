"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminUploadMediaPage({ params }: { params: { activityId: string; activityTitle: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    const fileInput = document.querySelector<HTMLInputElement>("#media-file");
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      setError("Pilih file terlebih dahulu.");
      setLoading(false);
      return;
    }

    formData.append("activityId", params.activityId);
    formData.append("file", fileInput.files[0]);

    try {
      const res = await fetch("/api/admin/activities/[id]/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal upload.");
      }

      setSuccess("Media berhasil diupload!");
      setError("");

      // Reset form
      const form = e.target as HTMLFormElement;
      if (form) {
        form.reset();
      }

      // Redirect ke halaman media
      setTimeout(() => {
        router.push(`/admin/media/${params.activityId}`);
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Gagal upload media.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-content max-w-2xl">
      <div className="admin-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Media</h1>
          <p className="text-gray-500 text-sm mt-1">{params.activityTitle}</p>
        </div>
        <Link href={`/admin/media/${params.activityId}`} className="btn btn-outline btn-sm">
          ← Kembali ke Daftar
        </Link>
      </div>

      {success && <div className="alert alert-success mb-4">{success}</div>}
      {error && <div className="alert alert-error mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="form-group">
          <label htmlFor="media-file">Pilih File (Gambar/Video)</label>
          <input
            id="media-file"
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm"
            required
          />
          <p className="text-xs text-gray-400 mt-2">
            Maksimal 50MB. Format: JPG, PNG, GIF, WebP, MP4.
          </p>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Mengupload..." : "Upload Media"}
        </button>
      </form>
    </div>
  );
}
