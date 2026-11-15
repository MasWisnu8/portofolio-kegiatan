import { cookies } from "next/headers";
import { getActivities, deleteActivity, getActivityById } from "@/lib/db";
import Link from "next/link";

async function getActivityData(id: string) {
  const response = await fetch(`/api/admin/activities/${id}`, { cache: "no-store" });
  if (!response.ok) return null;
  return response.json();
}

export default async function AdminActivitiesPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("admin_session")?.value;
  let session = null;
  if (sessionId) {
    const { getSession } = await import("@/lib/db");
    const sessionData = getSession(sessionId);
    if (sessionData) {
      const { getUserById } = await import("@/lib/db");
      const user = getUserById(sessionData.userId);
      if (user) {
        session = { user, sessionId };
      }
    }
  }

  const activities = getActivities();

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
              {session ? (
                <>
                  <span className="text-sm text-gray-500">{session.user.name}</span>
                  <form action="/api/admin/auth/logout" method="POST">
                    <button
                      type="submit"
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/admin/auth/login" className="text-sm text-gray-500 hover:text-gray-700">
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {session ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Activities Management</h1>
                <p className="text-gray-600">Manage your portfolio activities</p>
              </div>
              <Link
                href="/admin/activities/new"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                + Add New Activity
              </Link>
            </div>

            {activities.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">No activities yet.</p>
                <p className="text-gray-400 text-sm mt-1">Add your first activity to get started.</p>
                <Link
                  href="/admin/activities/new"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  + Add Activity
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {activities.map((activity: any) => (
                  <div key={activity.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            {activity.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                          <span>Created: {new Date(activity.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/activities/${activity.id}/edit`}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          Edit
                        </Link>
                        <form action={`/api/admin/activities/${activity.id}?_method=DELETE`} method="POST">
                          <button
                            type="submit"
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                            onClick={(e) => {
                              if (!confirm("Are you sure you want to delete this activity?")) {
                                e.preventDefault();
                              }
                            }}
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900">Admin Login Required</h2>
            <p className="text-gray-600 mt-2">Please login to access the admin panel.</p>
            <Link href="/admin/auth/login" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Login
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
