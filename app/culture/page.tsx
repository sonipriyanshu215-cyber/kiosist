import type { Metadata } from "next";
import { MasonryGallery } from "@/components/culture/MasonryGallery";
import { EventsTimeline } from "@/components/culture/EventsTimeline";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import { listExistingAssets } from "@/lib/publicAssets";

export const metadata: Metadata = {
  title: "Culture & Events | Kiosist",
  description:
    "See life inside Kiosist — our office culture, team events, and participation in hospitality exhibitions across the USA.",
  openGraph: {
    title: "Culture & Events | Kiosist",
    images: [{ url: "/og/culture.jpg", width: 1200, height: 630 }],
  },
};

export default function Culture() {
  const existingCultureAssets = listExistingAssets("img/culture");

  return (
    <>
      <section className="section-pad bg-kio-primary pt-36">
        <div className="container-kio text-center">
          <RevealOnScroll>
            <p className="section-label">Culture & Events</p>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              The people behind the service.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              Our culture is built on care — for our team, our clients, and the guests we serve.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <MasonryGallery existingAssets={existingCultureAssets} />
      <EventsTimeline existingAssets={existingCultureAssets} />
    </>
  );
}
