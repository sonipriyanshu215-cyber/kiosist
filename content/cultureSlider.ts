// Default Culture-page hero slider photos. Shown as-is until an admin takes
// over the slider from /admin/media ("Culture page slider" section) - the
// "Import these to start editing" button there copies this list into the
// editable `culture-slider` media collection (see
// app/api/admin/media/seed-slider/route.ts).
export type CultureSlide = { src: string; alt: string };

export const cultureSlider: CultureSlide[] = [
  { src: "/img/slider/DSC08351 (1).JPG.jpeg", alt: "Annual team retreat" },
  { src: "/img/slider/DSC08256.JPG.jpeg", alt: "Hospitality expo in the USA" },
  { src: "/img/slider/DSC08314.JPG.jpeg", alt: "Office hackathon" },
];
