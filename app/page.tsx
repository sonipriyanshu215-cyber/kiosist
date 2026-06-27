import type { Metadata } from "next";
import { HeroBanner }          from "@/components/home/HeroBanner";
import { StatCounter }         from "@/components/home/StatCounter";
import { AboutTeaser }         from "@/components/home/AboutTeaser";
import { WhyGrid }             from "@/components/home/WhyGrid";
import { HowItWorks }          from "@/components/home/HowItWorks";
import { VideoStory }          from "@/components/home/VideoStory";
import { TestimonialSection }  from "@/components/home/TestimonialSection";
import { BrandStrip }          from "@/components/home/BrandStrip";
import { FinalCTA }            from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Kiosist — Smart Hotel Self-Service Kiosks",
  description:
    "KioClerk by Kiosist transforms your hotel lobby with intelligent self-service kiosks — cutting operational costs while elevating every guest touchpoint.",
  openGraph: {
    title: "Kiosist — Smart Hotel Self-Service Kiosks",
    description: "Intelligent self-service kiosk solutions for modern hotels.",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <>
      <HeroBanner />
      <StatCounter />
      <AboutTeaser />
      <WhyGrid />
      <HowItWorks />
      <VideoStory />
      <TestimonialSection />
      <BrandStrip />
      <FinalCTA />
    </>
  );
}
