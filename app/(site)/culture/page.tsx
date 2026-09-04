import type { Metadata } from "next";
import { MasonryGallery } from "@/components/culture/MasonryGallery";
import { AnimatedCultureSlider } from "@/components/culture/AnimatedCultureSlider";
import { getCultureGallery, getCultureSlider } from "@/lib/cms/media";
import { cultureGallery as DEFAULT_GALLERY } from "@/content/cultureGallery";
import { cultureSlider as DEFAULT_SLIDER } from "@/content/cultureSlider";

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
  const [gallery, sliderSlides] = await Promise.all([
    getCultureGallery(DEFAULT_GALLERY),
    // Shows these bundled slides until an admin imports/adds their own to the
    // culture-slider collection from /admin/media.
    getCultureSlider(DEFAULT_SLIDER),
  ]);

  return (
    <>
      {/* Unique Animated Expanding Slider */}
      <AnimatedCultureSlider slides={sliderSlides} />

      <MasonryGallery gallery={gallery} />
    </>
  );
}
