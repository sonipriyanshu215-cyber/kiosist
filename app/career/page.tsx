import type { Metadata } from "next";
import { PerksGrid } from "@/components/career/PerksGrid";
import { ResumeForm } from "@/components/career/ResumeForm";
import { ReviewSlider } from "@/components/career/ReviewSlider";
import { FAQAccordion } from "@/components/career/FAQAccordion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

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
      {/* Hero */}
      <section className="section-pad bg-kio-primary pt-36">
        <div className="container-kio text-center">
          <RevealOnScroll>
            <p className="text-sm font-semibold uppercase tracking-widest text-kio-accent">
              Career
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              Work US hours. Grow without limits.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              No travel required. Join a team of 150+ professionals managing front desks for
              US hotels — from right here in Surat.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <PerksGrid />
      <ReviewSlider />
      <ResumeForm />
      <FAQAccordion />
    </>
  );
}
