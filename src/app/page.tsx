import Link from "next/link";
import ImageFallback from "@/components/ImageFallback";
import {
  getAllActivities,
  getDate,
} from "@/lib/activities-data";

async function HomePage() {
  const activities = getAllActivities();

  // Featured: 3 latest activities
  const featured = activities.slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Portofolio Kegiatan</span>
          <h1>Kegiatan yang<br></br>Dihadiri untuk <span style={{ color: "#f6ad55" }}>Setiap Momen</span></h1>
          <p>
            Lihat berbagai acara, pernikahan, dan festival yang telah kami rakit
            dengan penuh perhatian. Setiap kegiatan adalah kisah warna, musik,
            dan harapan yang bertemu di satu venue.
          </p>
          <div className="hero-cta">
            <Link href="/activities" className="btn btn-primary">
              Lihat Semua Kegiatan
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 4l4 4m0 0l-4 4m4-4H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/activities" className="btn btn-outline">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="5" r="1.5" fill="currentColor" />
                <circle cx="13" cy="9" r="1.5" fill="currentColor" />
              </svg>
              Jelajahi
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED ACTIVITIES ===== */}
      {featured.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>Kegiatan Unggulan</h2>
            <p>Beberapa perayaan terbaik yang telah kami angkat bicara</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((act, idx) => (
              <Link href={`/activities/${act.slug}`} key={act.id} className="activity-card">
                <ImageFallback
                  src={act.cover_image || "/uploads/activities/default-cover.jpg"}
                  alt={act.title}
                  fallbackSrc="/uploads/activities/default-cover.jpg"
                  width={400}
                  height={220}
                  className="activity-card-img"
                />
                <div className="activity-card-body">
                  <span className="activity-card-category">{act.category}</span>
                  <h3>{act.title}</h3>
                  <p>{act.description || "Tidak ada deskripsi."}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="6" r="3" stroke="#cbd5e0" strokeWidth="2" />
                      <circle cx="8" cy="6" r="1.5" fill="#cbd5e0" />
                    </svg>
                    {getDate(act.created_at)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== QUOTE / STATS ===== */}
      {activities.length > 0 && (
        <section className="section bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-4xl font-bold text-gray-300">{activities.length}</span>
              <p className="text-gray-600 mt-2">Kegiatan yang telah kami rencanakan</p>
              <span className="text-4xl font-bold text-gray-300">2024</span>
              <p className="text-gray-600 mt-2">Tahun pengalaman</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {activities.slice(0, 4).map((act, idx) => (
                <div key={act.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <ImageFallback
                    src={act.cover_image || "/uploads/activities/default-cover.jpg"}
                    alt={act.title}
                    fallbackSrc="/uploads/activities/default-cover.jpg"
                    width={500}
                    height={160}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <span className="text-xs font-semibold text-blue-600 uppercase">{act.category}</span>
                    <h4 className="font-semibold text-gray-900 mt-1 line-clamp-2">{act.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CALL TO ACTION ===== */}
      <section className="section bg-black text-white">
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold mb-4">Akar begitu banyaknya kepercayaan</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Setiap kegiatan adalah investasi untuk masa depan. Lihat bagaimana kami
            membangun keajaiban di balik layar.
          </p>
          <Link href="/activities" className="btn btn-primary">
            Lihat Semua Kegiatan
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer">
        <div className="content">
          <p>&copy; {new Date().getFullYear()} Portofolio Kegiatan. Semua hak dilindungi.</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
