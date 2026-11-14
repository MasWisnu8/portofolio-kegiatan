// src/app/contact/page.tsx
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      // Simulasi pengiriman email
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("sent");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError("Gagal mengirim pesan. Coba lagi nanti.");
    }
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Kontak</span>
              <h1 className="text-4xl font-bold text-gray-900 mt-3 mb-6">
                Ceritakan Kebutuhan Kegiatan <span style={{ color: "#0f1f3d" }}>Anda</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Siap membantu Anda menghadirkan kegiatan yang berkesan?
                Kirimkan pesan Anda dan kami akan menghubungi Anda segera.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Alamat</h3>
                    <p className="text-gray-500 text-sm">Jl. Kembang 123, Jakarta 10340</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">📞</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Telepon</h3>
                    <p className="text-gray-500 text-sm">+62 812-3456-7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">✉️</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-500 text-sm">kontak@portofolio.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>

              {status === "sent" && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold">✓ Pesan berhasil terkirim!</p>
                  <p className="text-green-600 text-sm mt-1">Terima kasih atas pesan Anda. Kami akan menghubungi Anda segera.</p>
                </div>
              )}

              {status === "error" && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-semibold">✗ {error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-group">
                  <label htmlFor="contact-name">Nama</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                    placeholder="Nama lengkap"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    placeholder="email@contoh.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subjek</label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full"
                    placeholder="Subjek pesan"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Pesan</label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full"
                    placeholder="Tuliskan pesan Anda..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
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
