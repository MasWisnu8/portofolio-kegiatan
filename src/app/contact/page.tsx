// src/app/contact/page.tsx
"use client";

import Link from "next/link";
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
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/activities">Kegiatan</Link></li>
            <li><Link href="/about">Tentang</Link></li>
            <li><Link href="/contact">Kontak</Link></li>
          </ul>
        </div>
      </div>

      <div className="content">
        <section className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Hubungi Kami
              </h1>
              <p className="text-gray-600 mb-8">
                Jika Anda memiliki pertanyaan atau ingin berkolaborasi, silakan
                isi form di bawah ini. Tim kami akan segera menghubungi Anda.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26m0 0l7.89-5.26M5.11 16L13 8.74" />
                    </svg>
                    <span className="text-gray-700 font-medium">Alamat</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Jl. Contoh No. 123</p>
                    <p className="text-gray-500 text-sm">Jakarta, Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26m0 0l7.89-5.26M5.11 16L13 8.74" />
                    </svg>
                    <span className="text-gray-700 font-medium">Email</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">admin@portofolio.com</p>
                    <p className="text-gray-500 text-sm">kontak@portofolio.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7.05 14.94a2 2 0 112.83 2.83L12 22.99a2 2 0 001.77-2.83A2 2 0 0012 14.94z" />
                    </svg>
                    <span className="text-gray-700 font-medium">Telepon</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">+62 812-3456-7890</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-2 lg:order-2 bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
              {status === "sent" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                  <p className="font-semibold">Pesan berhasil dikirim!</p>
                  <p className="text-sm mt-1">Terima kasih telah menghubungi kami. Kami akan segera merespons.</p>
                </div>
              )}
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  <p className="font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subjek"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Pesan Anda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={8}
                  required
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary w-full disabled:opacity-50"
                >
                  {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
