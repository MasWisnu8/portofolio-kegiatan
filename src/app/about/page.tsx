"use client";

import { useState } from "react";

export default function AboutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi pengiriman kontak
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      // error
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: "🎨",
      title: "Kreatif",
      description: "Setiap kegiatan dirancang dengan seni dan keindahan yang unik untuk memberikan pengalaman tak terlupakan.",
    },
    {
      icon: "🎯",
      title: "Tepat Sasaran",
      description: "Pemahaman mendalam terhadap audiens dan tujuan, sehingga setiap elemen acara selalu berada tepat di titik.",
    },
    {
      icon: "❤️",
      title: "Senyum",
      description: "Kepercayaan adalah kunci. Kami membangun hubungan panjang dengan tamu yang betah.",
    },
  ];

  return (
    <div>
      <div className="site-header">
        <div className="nav-wrap">
          <a href="/" className="logo">
            <span className="logo-icon">◆</span>
            Portofolio
          </a>
          <ul className="nav-links">
            <li><a href="/">Beranda</a></li>
            <li><a href="/activities">Kegiatan</a></li>
            <li><a href="/about">Tentang</a></li>
            <li><a href="/contact">Kontak</a></li>
          </ul>
        </div>
      </div>

      <div className="content">
        <section className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Tentang Kami</span>
              <h1 className="text-4xl font-bold text-gray-900 mt-3 mb-6">
                Merajut Cerita dengan <span style={{ color: "#0f1f3d" }}>Kegiatan</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Selamat datang di portofolio kegiatan kami. Kami adalah tim yang
                passif dalam merencanakan dan mengelola berbagai acara, dari pesta
                pernikahan yang elegan hingga festival kontemporer yang penuh warna.
                Setiap kegiatan adalah perjalanan kreatif yang membutuhkan ketelitian,
                dedikasi, dan senyum di setiap detiknya.
              </p>
              <p className="text-gray-600 mb-8">
                Kami percaya bahwa sebuah acara yang berkesan bukan hanya soal
                staf, dekorasi, atau ucapan khidmat — tetapi soal atau kesatuan antara
                semua elemen. Inilah yang menjadi jiwa perjalanan kami.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {features.map((f) => (
                  <div key={f.title} className="bg-white rounded-xl shadow-sm p-6 text-center">
                    <div className="text-4xl mb-3">{f.icon}</div>
                    <h3 className="font-bold text-gray-900">{f.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/uploads/activities/act_001_01.jpg"
                alt="Kegiatan kita"
                className="rounded-xl shadow-lg w-full object-cover"
                width={600}
                height={400}
              />
            </div>
          </div>
        </section>

        <section className="section bg-gray-50">
          <div className="section-header">
            <h2>Mengapa Memilih Kami?</h2>
            <p>Kami bukan sekadar penyelenggara. Kami adalah mitra strategis.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                "Perencanaan komprehensif sejak konsep hingga eksekusi",
                "Tim profesional dengan pengalaman ribuan acara",
                "Genius desain yang menghormati nuansa masing-masing tamu",
                "Kualitas eksekusi maksimal dalam setiap detail",
                "Komitmen terhadap kesehatan dan keselamatan semua tamu",
                "Dukungan penuh setelah kegiatan selesai",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visi Kami</h3>
              <p className="text-gray-600 leading-relaxed">
                Menjadi partner paling dipercaya dalam merancang dan
                mengelola kegiatan berkualitas tinggi yang meninggalkan
                kesan abadi bagi setiap tamu.
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Misi Kami</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  Menciptakan pengalaman yang tak terlantar
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  Memahami setiap detail dari kebutuhan tamu
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  Menggabungkan kreativitas dengan profesionalisme
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="content">
          <p>&copy; {new Date().getFullYear()} Portofolio Kegiatan. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
