import type { Metadata } from "next";
import { HeroBanner } from "@/components/home/HeroBanner";
import { WhatIsKiosist } from "@/components/home/WhatIsKiosist";
import { StatCounter } from "@/components/home/StatCounter";
import { WhyGrid } from "@/components/home/WhyGrid";
import { WhyChooseKiosist } from "@/components/home/WhyChooseKiosist";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getImageUrl } from "@/lib/cms/media";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kiosist- Smart Hotel Self-Service Kiosks",
  description:
    "Kiosist transforms your hotel lobby with intelligent self-service kiosks- cutting operational costs while elevating every guest touchpoint.",
  openGraph: {
    title: "Kiosist- Smart Hotel Self-Service Kiosks",
    description: "Intelligent self-service kiosk solutions for modern hotels.",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630 }],
  },
};

export default async function Home() {
  const [whatIsImage, ...whyChooseImages] = await Promise.all([
    getImageUrl("home.about.image", "/img/about/kiosist-team.jpeg"),
    // Empty fallback- the component keeps its own bundled photo for any
    // slot that hasn't been replaced from the admin.
    ...[1, 2, 3, 4, 5, 6].map((n) => getImageUrl(`home.whychoose.${n}`, "")),
  ]);

  return (
    <div className="relative">
      <HeroBanner />
      <WhatIsKiosist imageSrc={whatIsImage} />
      <StatCounter />
      <WhyGrid />
      <WhyChooseKiosist images={whyChooseImages} />
      <FinalCTA />
    </div>
  );
}
