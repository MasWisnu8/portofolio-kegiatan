import { NextResponse } from "next/server";
import { setSetting, getSetting } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { siteName, siteTitle, siteDescription, siteLogo } = body;

    if (siteName) setSetting("site_name", siteName);
    if (siteTitle) setSetting("site_title", siteTitle);
    if (siteDescription) setSetting("site_description", siteDescription);
    if (siteLogo) setSetting("site_logo", siteLogo);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    site_name: getSetting("site_name") || "Wisnu Pandu Hidayat Portfolio",
    site_title: getSetting("site_title") || "Wisnu Pandu Hidayat - Production Professional Portfolio",
    site_description: getSetting("site_description") || "Production professional with 8+ years of experience in the food manufacturing industry.",
    site_logo: getSetting("site_logo") || "/uploads/logo.png",
  });
}
