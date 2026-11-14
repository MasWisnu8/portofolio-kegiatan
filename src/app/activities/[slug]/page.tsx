import Link from "next/link";
import ImageFallback from "@/components/ImageFallback";
import {
  getActivityBySlug,
  getMediaByActivitySlug,
  getAllActivities,
  getAllActivitiesWithMedia,
  getDate,
} from "@/lib/activities-data";

export async function generateStaticParams() {
  const activities = getAllActivities();
  return activities.map((a) => ({ slug: a.slug }));
}

export default async function ActivityDetailPage({ params }: { params: { slug: string } }) {
  const activity = getActivityBySlug(params.slug);
  const allActivities = getAllActivities();
  const mediaList = getMediaByActivitySlug(params.slug);

  if (!activity) {
    return (
      <div className="content">
        <div className="content" style={{ maxWidth: 800, margin: "60px auto", textAlign: "center", padding: "40px", background: "#fff", borderRadius: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <h1 style={{ color: "#0f1f3d", marginBottom: 16 }}>Kegiatan tidak ditemukan</h1>
          <p className="text-gray-500">Maaf, halaman ini telah dipindahkan atau dihapus.</p>
          <Link href="/activities" className="btn btn-primary mt-4">
            ← Kembali ke Daftar Kegiatan
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = allActivities.findIndex((a) => a.id === activity.id);
  const prev = currentIndex > 0 ? allActivities[currentIndex - 1] : null;
  const next = currentIndex < allActivities.length - 1 ? allActivities[currentIndex + 1] : null;

  return (
    <>
      <div className="site-header">
        <div className="nav-wrap">
          <Link href="/" className="logo">
            <span className="logo-icon">◆</span>
            Portofolio
          </Link>
          <ul className="nav-links">
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/activities">Kegiatan</Link></li>
            <li><Link href="/about">Tentang</Link></li>
            <li><Link href="/contact">Kontak</Link></li>
          </ul>
        </div>
      </div>

      <div className="content">
        <div className="activity-detail">
          {activity.cover_image && (
            <ImageFallback
              src={activity.cover_image}
              alt={activity.title}
              fallbackSrc="/uploads/activities/default-cover.jpg"
              width={1200}
              height={400}
              className="activity-detail-img"
            />
          )}
          <div className="activity-detail-body">
            <span className="activity-detail-category">{activity.category}</span>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f1f3d", marginTop: 20 }}>{activity.title}</h1>

            {activity.description && (
              <p style={{ fontSize: "1.1rem", lineHeight: 1.9, color: "#4a5568" }}>{activity.description}</p>
            )}

            {/* Gallery */}
            {mediaList.length > 0 && (
              <div className="mt-10">
                <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0f1f3d", marginBottom: 20 }}>Galeri</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {mediaList.map((media) => (
                    <div key={media.id} className="relative rounded overflow-hidden shadow-sm bg-gray-100" style={{ height: "250px", overflow: "hidden" }}>
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

            {/* Video */}
            {activity.video_url && (
              <div className="mt-10">
                <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0f1f3d", marginBottom: 20 }}>Video Kegiatan</h2>
                <div className="video-container" style={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe
                    src={activity.video_url}
                    title="Video Kegiatan"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none"
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        {prev ? (
          <Link href={`/activities/${prev.slug}`} className="btn btn-outline">
            ← {prev.title}
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={`/activities/${next.slug}`} className="btn btn-outline">
            {next.title} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
