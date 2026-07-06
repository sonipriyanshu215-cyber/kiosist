import type { Metadata } from "next";
import { AboutIntro } from "@/components/about/AboutIntro";
import { MissionBlock } from "@/components/about/MissionBlock";
import { ValuesGrid } from "@/components/about/ValuesGrid";
import { FounderSpotlight } from "@/components/about/FounderSpotlight";
import { TeamMosaic } from "@/components/home/TeamMosaic";
import { TimelineScene } from "@/components/about/TimelineScene";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "About Kiosist",
  description:
    "Learn how Kiosist was founded to bring 24/7 virtual front desk staffing to US hotels. Meet the team, our values, and our journey from 2020 to 100+ hotels across 70+ locations serving 3M+ guests.",
  openGraph: {
    title: "About Kiosist",
    images: [{ url: "/og/about.jpg", width: 1200, height: 630 }],
  },
};

export default function About() {
  return (
    <>
      <AboutIntro />
      <TimelineScene />
      <MissionBlock />
      <ValuesGrid />
      <FounderSpotlight />
      <TeamMosaic />
      <FinalCTA />
    </>
  );
}
