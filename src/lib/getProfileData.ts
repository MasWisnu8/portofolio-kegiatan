// Static profile data loaded from JSON file
import { profile as initialProfile } from "./profile-json";

export function getProfileData() {
  return initialProfile;
}

export function getActivitiesData() {
  // Return activity data from JSON file
  return [
    {
      id: "1",
      title: "Pesta Perpisahan Serius",
      slug: "pesta-perpisahan-serius",
      description: "Deskripsi kegiatan pesta perpisahan serius yang diadakan untuk memberikaninfluence dan kesan yang kuat.",
      category: "Perpisahan",
      created_at: "2024-01-15"
    },
    {
      id: "2",
      title: "Resepsi Moderne Elegance",
      slug: "resepsi-moderne-elegance",
      description: "Resepsi moderat dengan desain yang elegan dan modern.",
      category: "Resepsi",
      created_at: "2024-02-20"
    },
    {
      id: "3",
      title: "Festival Kuliner Seni Daerah",
      slug: "festival-kuliner-seni-daerah",
      description: "Festival kuliner yang menampilkan seni kuliner daerah.",
      category: "Festival Kuliner",
      created_at: "2024-03-10"
    }
  ];
}
