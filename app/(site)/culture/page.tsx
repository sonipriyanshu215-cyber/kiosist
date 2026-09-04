import type { Metadata } from "next";
import { MasonryGallery } from "@/components/culture/MasonryGallery";
import { AnimatedCultureSlider } from "@/components/culture/AnimatedCultureSlider";
import { getCultureGallery, getImageUrl } from "@/lib/cms/media";
import { cultureGallery as DEFAULT_GALLERY } from "@/content/cultureGallery";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Culture & Events | Kiosist",
  description:
    "See life inside Kiosist- our office culture, team events, and participation in hospitality exhibitions across the USA.",
  openGraph: {
    title: "Culture & Events | Kiosist",
    images: [{ url: "/og/culture.jpg", width: 1200, height: 630 }],
  },
};

export default async function Culture() {
  const [gallery, sliderImages] = await Promise.all([
    getCultureGallery(DEFAULT_GALLERY),
    // Empty fallback- the slider keeps its own bundled photo for any slot
    // that hasn't been replaced from the admin Media page.
    Promise.all([1, 2, 3].map((n) => getImageUrl(`culture.slider.${n}`, ""))),
  ]);

  return (
    <>
      {/* Unique Animated Expanding Slider */}
      <AnimatedCultureSlider images={sliderImages} />

      <MasonryGallery gallery={gallery} />
    </>
  );
}
