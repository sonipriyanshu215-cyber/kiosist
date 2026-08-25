export type GalleryImage = { src: string; alt: string };

// Default/fallback set- also the source data for scripts/seed-gallery.ts,
// which uploads these actual files to Supabase Storage.
export const cultureGallery: GalleryImage[] = [
  { src: "/img/culture/office-1.png", alt: "Office space" },
  { src: "/img/culture/team-meeting-1.png", alt: "Office space" },
  { src: "/img/culture/training-1.png", alt: "Training Session" },
  { src: "/img/culture/celebration-1.png", alt: "Festival Celebration" },
  { src: "/img/culture/office-2.jpg", alt: "Team" },
  { src: "/img/culture/team-meeting-2.jpg", alt: "Office Outings" },
  { src: "/img/culture/training-2.jpg", alt: "Training Session" },
  { src: "/img/culture/celebration-2.jpg", alt: "Fun Friday" },
  { src: "/img/culture/office-3.jpg", alt: "Fun Friday" },
  { src: "/img/culture/team-3.jpg", alt: "Team" },
  { src: "/img/culture/training-3.jpg", alt: "Office Outings" },
  { src: "/img/culture/event-1.jpg", alt: "Festival Celebration" },
  { src: "/img/culture/expo-dfw-2024.jpg", alt: "Team" },
];
