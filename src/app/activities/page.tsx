import Link from "next/link";
import { getAllActivities } from "@/lib/db-static";

async function ActivitiesPage() {
  const activities = await getAllActivities();

  return (
    <>
      <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Activities</h1>
          <p className="text-xl text-blue-200 mb-8">Explore my professional activities and projects</p>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No activities found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">{activity.category}</p>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <Link href={`/activities/${activity.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    Read more →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ActivitiesPage;
