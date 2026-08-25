import type { Metadata } from "next";
import { AboutIntro } from "@/components/about/AboutIntro";
import { MissionBlock } from "@/components/about/MissionBlock";
import { VisionBlock } from "@/components/about/VisionBlock";
import { ValuesGrid } from "@/components/about/ValuesGrid";
import { TeamMosaic } from "@/components/home/TeamMosaic";
import { TimelineScene } from "@/components/about/TimelineScene";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getValues, getMilestones, getJourneyYears, getTeam } from "@/lib/cms/collections";
import { getText } from "@/lib/cms/text";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Kiosist",
  description:
    "Learn how Kiosist was founded to bring 24/7 virtual front desk staffing to US hotels. Meet the team, our values, and our journey from 2020 to 100+ hotels across 70+ locations serving 3M+ guests.",
  openGraph: {
    title: "About Kiosist",
    images: [{ url: "/og/about.jpg", width: 1200, height: 630 }],
  },
};

export default async function About() {
  const [values, milestones, journeyYears, team, subtitle] = await Promise.all([
    getValues(),
    getMilestones(),
    getJourneyYears(),
    getTeam(),
    getText(
      "about.hero.subtitle",
      "We are the leading service provider for remotely operating front desks for hotels based in the US."
    ),
  ]);

  return (
    <>
      <AboutIntro subtitle={subtitle} />
      <TimelineScene milestones={milestones} journeyYears={journeyYears} />
      <MissionBlock />
      <VisionBlock />
      <ValuesGrid values={values} />
      <TeamMosaic team={team} />
      <FinalCTA />
    </>
  );
}
