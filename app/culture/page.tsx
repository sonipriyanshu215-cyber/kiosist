import type { Metadata } from "next";
import { MasonryGallery } from "@/components/culture/MasonryGallery";
import { EventsTimeline } from "@/components/culture/EventsTimeline";

import { AnimatedCultureSlider } from "@/components/culture/AnimatedCultureSlider";
import { listExistingAssets } from "@/lib/publicAssets";

export const metadata: Metadata = {
  title: "Culture & Events | Kiosist",
  description:
    "See life inside Kiosist- our office culture, team events, and participation in hospitality exhibitions across the USA.",
  openGraph: {
    title: "Culture & Events | Kiosist",
    images: [{ url: "/og/culture.jpg", width: 1200, height: 630 }],
  },
};

export default function Culture() {
  const existingCultureAssets = listExistingAssets("img/culture");

  return (
    <>
      {/* Unique Animated Expanding Slider */}

      <div className="pt-24">
        <AnimatedCultureSlider />
      </div>

      <MasonryGallery existingAssets={existingCultureAssets} />

      <EventsTimeline existingAssets={existingCultureAssets} />
    </>
  );
}

