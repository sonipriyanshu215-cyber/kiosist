import type { Metadata } from "next";
import { CareerHero } from "@/components/career/CareerHero";
import { GrowthPath } from "@/components/career/GrowthPath";
import { PerksGrid } from "@/components/career/PerksGrid";
import { ResumeForm } from "@/components/career/ResumeForm";
import { ReviewSlider } from "@/components/career/ReviewSlider";
import { FAQAccordion } from "@/components/career/FAQAccordion";

export const metadata: Metadata = {
  title: "Career at Kiosist",
  description:
    "Join the Kiosist team. Build a career in US hospitality operations from Surat, India. Paid training, night shift allowances, and a fast growth track.",
  openGraph: {
    title: "Career at Kiosist",
    images: [{ url: "/og/career.jpg", width: 1200, height: 630 }],
  },
};

export default function Career() {
  return (
    <>
      <CareerHero />
      <GrowthPath />
      <PerksGrid />
      <ReviewSlider />
      <FAQAccordion />
      <ResumeForm />
    </>
  );
}
