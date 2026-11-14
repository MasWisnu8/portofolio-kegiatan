// Build-time data loader for static export
// Imports JSON directly at build time (works with output: export)

// Load activities
import activitiesData from "../../public/data/activities.json";

// Load activities with media
import activitiesWithMediaData from "../../public/data/activities-with-media.json";

// Load all media
import mediaData from "../../public/data/media.json";

// Type definitions
interface Activity {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  cover_image: string;
  video_url: string;
  created_at?: string;
  media?: { id: string; file_url: string; file_type: string; sort_order: number }[];
}

// Helper to get display date
export function getDate(dateStr: string | undefined): string {
  if (!dateStr) return "Tidak ada tanggal";
  return new Date(dateStr).toLocaleDateString("id-ID", { year: "numeric", month: "short" });
}

// Helper to get all activities
export function getAllActivities(): Activity[] {
  return activitiesData as Activity[];
}

// Helper to get activities with media
export function getAllActivitiesWithMedia(): any[] {
  return activitiesWithMediaData;
}

// Helper to get all media
export function getAllMedia(): any[] {
  return mediaData as any[];
}

// Helper to get activity by slug
export function getActivityBySlug(slug: string): Activity | undefined {
  return (activitiesData as Activity[]).find((a) => a.slug === slug);
}

// Helper to get media by activity slug
export function getMediaByActivitySlug(slug: string): { id: string; file_url: string; file_type: string; sort_order: number }[] {
  const activity = getActivityBySlug(slug);
  return activity?.media || [];
}
