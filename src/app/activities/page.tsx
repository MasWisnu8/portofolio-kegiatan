import Link from "next/link";
import { getActivities } from "@/lib/db";

export default async function ActivitiesPage() {
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
              <Link href="/" className="font-semibold text-gray-900">
                Wisnu Pandu Hidayat
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/activities" className="text-gray-600 hover:text-gray-900">Activities</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link href="/admin/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Portfolio Activities</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover my professional portfolio of production management projects and achievements.
          </p>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No activities available at the moment.</p>
            <Link href="/admin/activities/new" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add Activity
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity: any) => (
              <Link
                key={activity.id}
                href={`/activities/${activity.slug}`}
                className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                {activity.cover_image ? (
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={activity.cover_image}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:opacity-90 transition"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {activity.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-500 mb-3">{activity.category || "General"}</p>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {activity.description || "No description available."}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-blue-600">
                    View Details
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
