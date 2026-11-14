import Link from "next/link";
import ImageFallback from "@/components/ImageFallback";
import { dbGetActivityBySlug, dbGetMediaByActivity, dbGetAllActivities } from "@/lib/db";

export default async function ActivityDetailPage({ params }: { params: { slug: string } }) {
  const activity = dbGetActivityBySlug(params.slug);
  const allActivities = dbGetAllActivities();

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

  // Dapatkan media untuk kegiatan ini
  const mediaList = dbGetMediaByActivity(activity.id);

  // Ambil kegiatan terdekat (sebelum dan sesudah) untuk navigasi
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
        {/* Breadcrumb */}
        <nav style={{ fontSize: "0.9rem", color: "#718096", marginBottom: 24 }}>
          <Link href="/">Beranda</Link>
          <span style={{ color: "#a0aec0" }}>/</span>
          <Link href="/activities">Kegiatan</Link>
          <span style={{ color: "#a0aec0" }}>/</span>
          <span style={{ color: "#4a5568", fontWeight: 600 }}>{activity.title}</span>
        </nav>

        {/* Detail Kegiatan */}
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
            <h1 style={{ fontSize: "2rem", marginBottom: 16 }}>{activity.title}</h1>

            {activity.description && (
              <p style={{ fontSize: "1.1rem", lineHeight: 1.9, color: "#4a5568" }}>{activity.description}</p>
            )}

            {/* Gallery */}
            {mediaList.length > 0 && (
              <div className="mt-10">
                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f1f3d", marginBottom: 20 }}>
                  Galeri
                </h2>
                <div className="gallery-grid">
                  {mediaList.map((item) => (
                    <div key={item.id} className="gallery-item">
                      <img src={item.file_url} alt={item.file_url} />
                      <button className="btn btn-sm" title="Lihat detail">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="#cbd5e0" strokeWidth="2" />
                          <circle cx="8" cy="8" r="2" fill="#cbd5e0" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {activity.video_url && (
              <div className="mt-10">
                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f1f3d", marginBottom: 20 }}>
                  Video Kegiatan
                </h2>
                <div className="video-container">
                  <iframe
                    src={activity.video_url}
                    title={activity.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation prev/next */}
        {prev || next ? (
          <div className="mt-10 flex justify-between">
            {prev ? (
              <Link href={`/activities/${prev.slug}`} className="btn btn-outline btn-sm">
                ← {prev.title}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={`/activities/${next.slug}`} className="btn btn-outline btn-sm">
                {next.title} →
              </Link>
            ) : (
              <div />
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
