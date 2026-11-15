// Static data for public pages (loaded from JSON files)
// This works with GitHub Pages static export

export interface Activity {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  cover_image: string;
  video_url: string;
  created_at: string;
}

export interface Media {
  id: string;
  activity_id: string;
  file_url: string;
  file_type: string;
  sort_order: number;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  contact_email: string;
  contact_phone: string;
  location: string;
  website: string;
  photo_url: string;
}

// Profile data (from public/data/profile.json)
export async function getProfile(): Promise<Profile> {
  const res = await fetch('/data/profile.json');
  return res.json();
}

// Activities data (from public/data/activities.json)
export async function getActivities(): Promise<Activity[]> {
  const res = await fetch('/data/activities.json');
  return res.json();
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const activities = await getActivities();
  return activities.find(a => a.slug === slug) || null;
}

export async function getAllActivities(): Promise<Activity[]> {
  return getActivities();
}

export async function getMediaByActivity(activityId: string): Promise<Media[]> {
  // Load media data
  try {
    const res = await fetch('/data/media.json');
    const data = await res.json();
    return data.filter(m => m.activity_id === activityId);
  } catch {
    return [];
  }
}
