import { NextResponse } from "next/server";
import { getActivityById, updateActivity, deleteActivity } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = requireAdmin();
  try {
    const activity = getActivityById(params.id);
    if (!activity) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 });
    }
    return NextResponse.json(activity);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = requireAdmin();
  try {
    const body = await request.json();
    const { title, description, category, cover_image, video_url, slug } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    updateActivity(body.id, {
      title,
      slug,
      description,
      category,
      cover_image,
      video_url,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = requireAdmin();
  try {
    deleteActivity(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function generateStaticParams() {
  // Return empty array for dynamic route in static export
  return [];
}
