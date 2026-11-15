"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Media {
  id: string;
  activity_id: string;
  file_url: string;
  file_type: string;
  sort_order: number;
}

export default function AdminMediaPage() {
  const router = useRouter();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch("/api/admin/media");
      const data = await response.json();
      setMedia(data);
    } catch (err) {
      setMessage("Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;
    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMessage("Media deleted successfully");
        fetchMedia();
      }
    } catch (err) {
      setMessage("Failed to delete media");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-3">
                <span className="text-white font-bold">W</span>
              </div>
              <span className="font-semibold text-gray-900">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{media.length} media files</span>
              <form action="/api/admin/auth/logout" method="POST">
                <button
                  type="submit"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600">Manage uploaded media files for your portfolio</p>
        </div>

        {message && (
          <div className={`mb-4 p-4 rounded ${message.includes("success") ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            <p className={`text-sm ${message.includes("success") ? "text-green-700" : "text-red-700"}`}>
              {message}
            </p>
          </div>
        )}

        {media.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">No media files yet.</p>
            <p className="text-gray-400 text-sm mt-1">Upload media files for your activities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {media.map((item: Media) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <img
                  src={item.file_url}
                  alt="Media"
                  className="w-full h-32 object-cover rounded"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.file_url}</span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
