import Link from "next/link";
import ActivityCard from "@/components/ActivityCard";
import { getAllActivities } from "@/lib/activities-data";

export default async function ActivitiesPage() {
  const activities = getAllActivities();

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
        <section className="section">
          <div className="section-header">
            <h2>Semua Kegiatan</h2>
            <p>Kumpulan kegiatan, acara, dan event yang telah kami laksanakan</p>
          </div>

          {activities.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <p className="text-gray-500 text-lg">Belum ada kegiatan yang tercatat.</p>
              <p className="text-gray-400 text-sm mt-2">Kegiatan masih kosong.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((act, idx) => (
                <ActivityCard act={act} index={idx} key={act.id} />
              ))}
            </div>
          )}

          {/* Pagination placeholder */}
          {activities.length > 6 && (
            <div className="flex justify-center mt-10">
              <nav className="pagination">
                <a href="#">←</a>
                <a className="active" href="#">1</a>
                <a href="#">2</a>
                <a href="#">→</a>
              </nav>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
