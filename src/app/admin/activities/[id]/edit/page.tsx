"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface Activity {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  cover_image: string;
  video_url: string;
  created_at: string;
}

export default function EditActivityPage() {
  const router = useRouter();
  const params = useParams();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    slug: "",
    description: "",
    category: "",
    cover_image: "",
    video_url: "",
    created_at: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchActivity();
  }, [params.id]);

  const fetchActivity = async () => {
    try {
      const response = await fetch(`/api/admin/activities/${params.id}`, { cache: "no-store" });
      if (!response.ok) {
        router.push("/admin/activities");
        return;
      }
      const data = await response.json();
      setActivity(data);
    } catch (err) {
      setMessage("Failed to load activity");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/activities/${activity.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: activity.title,
          slug: activity.slug,
          description: activity.description,
          category: activity.category,
          cover_image: activity.cover_image,
          video_url: activity.video_url,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Failed to update activity");
      } else {
        setMessage("Activity updated successfully!");
        router.push("/admin/activities");
        router.refresh();
      }
    } catch (err) {
      setMessage("Failed to update activity");
    } finally {
      setSaving(false);
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
              <span className="text-sm text-gray-500">Edit Activity</span>
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
        <div className="max-w-3xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Activity</h1>
            <p className="text-gray-600">{activity.title}</p>
          </div>

          {message && (
            <div className={`mb-4 p-4 rounded ${message.includes("success") ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              <p className={`text-sm ${message.includes("success") ? "text-green-700" : "text-red-700"}`}>
                {message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={activity.title}
                  onChange={(e) => setActivity({ ...activity, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={activity.slug}
                  onChange={(e) => setActivity({ ...activity, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={activity.category}
                  onChange={(e) => setActivity({ ...activity, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={activity.cover_image}
                  onChange={(e) => setActivity({ ...activity, cover_image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  type="text"
                  value={activity.video_url}
                  onChange={(e) => setActivity({ ...activity, video_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={activity.description}
                onChange={(e) => setActivity({ ...activity, description: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.push("/admin/activities")}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Update Activity"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
