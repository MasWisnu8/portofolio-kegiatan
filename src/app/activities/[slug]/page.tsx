import Link from "next/link";
import ImageFallback from "@/components/ImageFallback";
import { getActivityBySlug, getMediaByActivity, getAllActivities, getProfile } from "@/lib/db";

export async function generateStaticParams() {
  const activities = getAllActivities();
  return activities.map((a) => ({ slug: a.slug }));
}

export default async function ActivityDetailPage({ params }: { params: { slug: string } }) {
  const activity = getActivityBySlug(params.slug);
  const allActivities = getAllActivities();
  const mediaList = getMediaByActivity(params.slug);
  const profile = getProfile();

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kegiatan tidak ditemukan</h1>
          <p className="text-gray-500 mb-4">Maaf, halaman ini telah dipindahkan atau dihapus.</p>
          <Link href="/activities" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            &larr; Kembali ke Daftar Kegiatan
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = allActivities.findIndex((a) => a.id === activity.id);
  const prev = currentIndex > 0 ? allActivities[currentIndex - 1] : null;
  const next = currentIndex < allActivities.length - 1 ? allActivities[currentIndex + 1] : null;

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
        <div className="max-w-4xl">
          {activity.cover_image && (
            <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <ImageFallback
                src={activity.cover_image}
                alt={activity.title}
                fallbackSrc="/uploads/activities/default-cover.jpg"
                width={1200}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {activity.category || "General"}
            </span>
            <h1 className="text-3xl font-bold text-gray-900">{activity.title}</h1>
          </div>

          {activity.description && (
            <p className="text-gray-600 leading-relaxed mb-8">{activity.description}</p>
          )}

          {mediaList.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Galeri</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mediaList.map((media: any) => (
                  <div key={media.id} className="relative rounded-lg overflow-hidden shadow-sm bg-gray-100" style={{ height: "250px", overflow: "hidden" }}>
                    <ImageFallback
                      src={media.file_url}
                      alt={`Media ${media.id}`}
                      fallbackSrc="/uploads/activities/default-cover.jpg"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activity.video_url && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Kegiatan</h2>
              <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <iframe
                  src={activity.video_url}
                  title="Video Kegiatan"
                  style={{
                    position: "relative",
                    paddingTop: "56.25%",
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="font-bold text-lg">{profile.name || "Wisnu Pandu Hidayat"}</p>
              <p className="text-gray-400 text-sm">Production Professional | Bandung, Indonesia</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                {profile.contact_email && <a href={`mailto:${profile.contact_email}`} className="hover:text-white">{profile.contact_email}</a>}
                {profile.contact_phone && <span className="mx-2">|</span>}
                {profile.contact_phone && <a href={`tel:${profile.contact_phone}`} className="hover:text-white">{profile.contact_phone}</a>}
              </p>
              <p className="text-gray-400 text-sm">
                <a href={`https://${profile.website}`} target="_blank" className="hover:text-white">{profile.website}</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
