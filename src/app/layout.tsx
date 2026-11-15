import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wisnu Pandu Hidayat - Production Professional Portfolio",
  description: "Production professional with 8+ years of experience in the food manufacturing industry",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
