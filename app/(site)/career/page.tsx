import type { Metadata } from "next";
import { CareerHero } from "@/components/career/CareerHero";
import { HiringProcess } from "@/components/career/HiringProcess";
import { PerksGrid } from "@/components/career/PerksGrid";
import { ResumeForm } from "@/components/career/ResumeForm";
import { ReviewSlider } from "@/components/career/ReviewSlider";
import { FAQAccordion } from "@/components/career/FAQAccordion";
import { getPerks, getFaqs, getRoleOptions } from "@/lib/cms/collections";
import { getImageUrl } from "@/lib/cms/media";
import { getText } from "@/lib/cms/text";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Career at Kiosist",
  description:
    "Join the Kiosist team. Build a career in US hospitality operations from Surat, India. Paid training, night shift allowances, and a fast growth track.",
  openGraph: {
    title: "Career at Kiosist",
    images: [{ url: "/og/career.jpg", width: 1200, height: 630 }],
  },
};

export default async function Career() {
  const [perks, faqs, roleOptions, heroSrc, mascotSrc, blurb] = await Promise.all([
    getPerks(),
    getFaqs(),
    getRoleOptions(),
    getImageUrl("career.hero", "/img/career/hero2.png"),
    getImageUrl("career.mascot", "/img/hero/agent-red.png"),
    getText("career.hero.blurb", "Join the team building the future of remote hospitality."),
  ]);

  return (
    <>
      <CareerHero heroSrc={heroSrc} blurb={blurb} />
      <HiringProcess />
      <PerksGrid perks={perks} />
      <ReviewSlider />
      <FAQAccordion faqs={faqs} />
      <ResumeForm roleOptions={roleOptions} mascotSrc={mascotSrc} />
    </>
  );
}
