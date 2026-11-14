import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Portofolio | Acara & Kegiatan",
  description: "Portofolio kegiatan, acara, dan pernikahan. Lihat berbagai kegiatan yang telah kami laksanakan.",
  keywords: ["portofolio", "acara", "pernikahan", "festival", "kegiatan"],
  authors: [{ name: "Admin Portofolio" }],
  openGraph: {
    title: "Portofolio | Acara & Kegiatan",
    description: "Portofolio kegiatan, acara, dan pernikahan.",
    type: "website",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1f3d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
