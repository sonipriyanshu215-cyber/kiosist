import type { Metadata } from "next";
import { HeroBanner } from "@/components/home/HeroBanner";
import { WhatIsKiosist } from "@/components/home/WhatIsKiosist";
import { StatCounter } from "@/components/home/StatCounter";
import { WhyGrid } from "@/components/home/WhyGrid";
import { WhyChooseKiosist } from "@/components/home/WhyChooseKiosist";
import { FinalCTA } from "@/components/home/FinalCTA";

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

export default function Home() {
  return (
    <div className="relative">
      <div
        className="bg-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <HeroBanner />
      <WhatIsKiosist />
      <StatCounter />
      <WhyGrid />
      <WhyChooseKiosist />
      <FinalCTA />
    </div>
  );
}
