"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminEditActivityPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    async function loadActivity() {
      try {
        const res = await fetch(`/api/admin/activities?id=${params.id}`);
        const data = await res.json();
        if (data.success && data.data) {
          const act = data.data;
          setTitle(act.title || "");
          setSlug(act.slug || "");
          setDescription(act.description || "");
          setCategory(act.category || "");
          setCoverImage(act.cover_image || "");
          setVideoUrl(act.video_url || "");
        } else {
          setError(data.message || "Gagal memuat kegiatan.");
        }
      } catch (err: any) {
        setError("Gagal memuat data aktivitas.");
      } finally {
        setLoading(false);
      }
    }
    loadActivity();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/activities?id=${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, description, category, cover_image: coverImage, video_url: videoUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal update.");
      }

      setSuccess("Kegiatan berhasil diperbarui!");
      setTimeout(() => {
        router.push("/admin/activities");
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Gagal update kegiatan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-content max-w-2xl">
        <div className="flex items-center justify-center py-16">
          <p className="text-gray-500">Memuat kegiatan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-content max-w-2xl">
      <div className="admin-header">
        <h1>Edit Kegiatan</h1>
      </div>

      {error && <div className="alert alert-error mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edit-title">Judul Kegiatan *</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-slug">Slug (URL)</label>
            <input
              id="edit-slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="contoh: pernikahan-arini-dimas"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edit-category">Kategori</label>
            <select
              id="edit-category"
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
            <label htmlFor="edit-video">Video (opsional)</label>
            <input
              id="edit-video"
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/xxx"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="edit-cover">Gambar Cover (opsional)</label>
          <input
            id="edit-cover"
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="/uploads/activities/cover.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-desc">Deskripsi Kegiatan</label>
          <textarea
            id="edit-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="Deskripsikan kegiatan ini..."
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn btn-primary flex-1" disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => router.push("/admin/activities")}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
