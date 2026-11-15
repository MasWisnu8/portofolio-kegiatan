import Link from "next/link";
import { getProfileData, getActivityBySlug } from "@/lib/db-static";

async function ActivityPage({ params }: { params: { slug: string } }) {
  const profile = getProfileData();
  const activity = await getActivityBySlug(params.slug || "");

  return (
    <>
      <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Activity Details</h1>
          <p className="text-xl text-blue-200 mb-8">{activity?.title || "Activity"}</p>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activity ? (
            <div className="max-w-4xl">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{activity.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{activity.description}</p>
                <p className="text-gray-500">Category: {activity.category}</p>
                <p className="text-gray-500">Created: {activity.created_at}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Activity not found.</p>
              <Link href="/activities" className="text-blue-600 hover:text-blue-800 font-medium">
                Back to activities →
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ActivityPage;
