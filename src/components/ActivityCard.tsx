"use client";

import Link from "next/link";
import ImageFallback from "./ImageFallback";

interface ActivityCardProps {
  act: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    cover_image?: string;
    created_at?: string;
  };
  index: number;
}

export default function ActivityCard({ act, index }: ActivityCardProps) {
  return (
    <Link href={`/activities/${act.slug}`} key={act.id} className="activity-card">
      <ImageFallback
        src={act.cover_image || "/uploads/activities/default-cover.jpg"}
        alt={act.title}
        fallbackSrc="/uploads/activities/default-cover.jpg"
        width={400}
        height={220}
        className="activity-card-img"
      />
      <div className="activity-card-body">
        <span className="activity-card-category">{act.category}</span>
        <h3>{act.title}</h3>
        <p>{act.description || "Tidak ada deskripsi."}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="6" r="3" stroke="#cbd5e0" strokeWidth="2" />
            <circle cx="8" cy="6" r="1.5" fill="#cbd5e0" />
          </svg>
          {new Date(act.created_at || "").toLocaleDateString("id-ID", { year: "numeric", month: "short" })}
        </div>
      </div>
    </Link>
  );
}
