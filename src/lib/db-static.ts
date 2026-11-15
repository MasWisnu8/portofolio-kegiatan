// Static data for public pages (loaded directly from public/data/*.json via fs)
// Works in development, production build, and Vercel serverless functions.
import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve(process.cwd(), "public", "data");

function readJson(filename: string): any {
  const file = path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

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
export async function getProfileData(): Promise<Profile> {
  return readJson("profile.json");
}

// Activities data (from public/data/activities.json)
export async function getActivitiesData(): Promise<Activity[]> {
  return readJson("activities.json");
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const activities = await getActivitiesData();
  return activities.find((a) => a.slug === slug) || null;
}

export async function getAllActivities(): Promise<Activity[]> {
  return getActivitiesData();
}

export async function getMediaByActivity(activityId: string): Promise<Media[]> {
  try {
    const data = readJson("media.json");
    return data.filter((m: any) => m.activity_id === activityId);
  } catch {
    return [];
  }
}
