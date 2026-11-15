'use client';

import Link from "next/link";
import { useState } from "react";
import { getProfile, getActivities } from "@/lib/db";

export default function AdminDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await fetch("/api/admin/activities");
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      console.error("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    window.location.href = "/admin/auth/login";
  };

  const session = {
    user: {
      name: "Admin",
      email: "admin@portofolio.com"
    }
  };

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
              <span className="text-sm text-gray-500">Welcome, {session.user.name}</span>
              <Link href="/admin/profile" className="text-sm text-gray-500 hover:text-gray-700">
                Profile
              </Link>
              <Link href="/admin/activities" className="text-sm text-gray-500 hover:text-gray-700">
                Activities
              </Link>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Dashboard</h2>
              <p className="text-gray-600">
                Welcome to the admin dashboard, {session.user.name}. Here you can manage your portfolio content.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-3xl font-bold text-blue-600">{activities.length}</h3>
                  <p className="text-sm text-gray-500">Activities</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-3xl font-bold text-green-600">1</h3>
                  <p className="text-sm text-gray-500">Profile</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="text-3xl font-bold text-yellow-600">1</h3>
                  <p className="text-sm text-gray-500">Media</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
              <p className="text-sm text-gray-500 mb-4">Manage your portfolio content</p>
              <div className="space-y-3">
                <Link
                  href="/admin/profile"
                  className="block w-full text-center bg-blue-50 text-blue-700 rounded-lg p-4 hover:bg-blue-100 transition"
                >
                  <div className="text-2xl mb-2">👤</div>
                  <div className="font-semibold">Edit Profile</div>
                  <div className="text-xs text-gray-500">Update your info</div>
                </Link>
                <Link
                  href="/admin/activities"
                  className="block w-full text-center bg-green-50 text-green-700 rounded-lg p-4 hover:bg-green-100 transition"
                >
                  <div className="text-2xl mb-2">📁</div>
                  <div className="font-semibold">Activities</div>
                  <div className="text-xs text-gray-500">Manage projects</div>
                </Link>
                <Link
                  href="/admin/media"
                  className="block w-full text-center bg-yellow-50 text-yellow-700 rounded-lg p-4 hover:bg-yellow-100 transition"
                >
                  <div className="text-2xl mb-2">🖼️</div>
                  <div className="font-semibold">Media Library</div>
                  <div className="text-xs text-gray-500">Manage files</div>
                </Link>
                <Link
                  href="/admin/settings"
                  className="block w-full text-center bg-purple-50 text-purple-700 rounded-lg p-4 hover:bg-purple-100 transition"
                >
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="font-semibold">Settings</div>
                  <div className="text-xs text-gray-500">Site configuration</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
