import type { Metadata } from "next";
import { clients } from "@/content/clients";
import { USAClientMap } from "@/components/clients/USAClientMap";
import { BrandStrip } from "@/components/home/BrandStrip";
import { CaseStudyDeck } from "@/components/clients/CaseStudyDeck";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Our Clients",
  description:
    "See the US hotels and brands that trust Kiosist for 24/7 virtual front desk coverage. Interactive USA map showing all our active properties.",
  openGraph: {
    title: "Our Clients | Kiosist",
    images: [{ url: "/og/clients.jpg", width: 1200, height: 630 }],
  },
};

export default function Clients() {
  return (
    <>
      <div className="pt-20">
        <USAClientMap clients={clients} />
      </div>
      <BrandStrip />
      <CaseStudyDeck />
      <FinalCTA />
    </>
  );
}
