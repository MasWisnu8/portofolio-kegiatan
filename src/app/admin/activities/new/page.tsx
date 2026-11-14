"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminCreateActivityPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, description, category, cover_image: coverImage, video_url: videoUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal membuat kegiatan.");
      }

      setSuccess("Kegiatan berhasil dibuat!");
      setTitle("");
      setSlug("");
      setDescription("");
      setCategory("");
      setCoverImage("");
      setVideoUrl("");

      // Reset form juga di halaman selanjutnya
      setTimeout(() => {
        router.push("/admin/activities");
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Gagal membuat kegiatan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-content max-w-2xl">
      <div className="admin-header">
        <h1>Tambah Kegiatan</h1>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Judul Kegiatan *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Pernikahan Arini & Dimas"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="slug">Slug (URL) *</label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="contoh: pernikahan-arini-dimas"
            />
            <p className="text-xs text-gray-400 mt-1">Contoh: pernikahan-arini-dimas</p>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Kategori</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Pilih kategori...</option>
              <option value="Pernikahan">Pernikahan</option>
              <option value="Festival">Festival</option>
              <option value="Acara">Acara</option>
              <option value="Konser">Konser</option>
              <option value="Kegiatan">Kegiatan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="videoUrl">Video (opsional)</label>
            <input
              id="videoUrl"
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/xxx or /uploads/activities/xxx.mp4"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Gambar Cover (opsional)</label>
          <input
            id="coverImage"
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="/uploads/activities/cover.jpg"
          />
          <p className="text-xs text-gray-400 mt-1">Upload gambar di halaman Media nanti.</p>
        </div>

        <div className="form-group">
          <label htmlFor="description">Deskripsi Kegiatan</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsikan kegiatan ini..."
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn btn-primary flex-1" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Kegiatan"}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => router.push("/admin/activities")}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
