// Data helper for static export - reads JSON data files
// This simulates database access for public pages

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

interface MediaItem {
  id: string;
  activity_id: string;
  file_url: string;
  file_type: string;
  sort_order: number;
}

interface ActivityWithMedia {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  cover_image: string;
  video_url: string;
  created_at?: string;
  media: { id: string; file_url: string; file_type: string; sort_order: number }[];
}

// Load activities from JSON
export async function getActivities(): Promise<Activity[]> {
  const res = await fetch("/data/activities.json");
  return res.json();
}

// Load all activities with media for detail pages
export async function getActivitiesWithMedia(): Promise<ActivityWithMedia[]> {
  const res = await fetch("/data/activities-with-media.json");
  return res.json();
}

// Load media by activity ID
export async function getMediaByActivity(activityId: string): Promise<{ id: string; file_url: string; file_type: string; sort_order: number }[]> {
  const activities = await getActivities();
  const activity = activities.find((a: any) => a.id === activityId);
  return activity?.media || [];
}

// Get single activity by slug
export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const activities = await getActivities();
  return activities.find((a) => a.slug === slug) || null;
}
