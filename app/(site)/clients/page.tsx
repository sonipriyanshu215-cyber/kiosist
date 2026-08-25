import type { Metadata } from "next";
import { USAClientMap } from "@/components/clients/USAClientMap";
import { BrandStrip } from "@/components/home/BrandStrip";
import { StatCounter } from "@/components/home/StatCounter";
import { getClients } from "@/lib/cms/collections";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Clients",
  description:
    "See the US hotels and brands that trust Kiosist for 24/7 virtual front desk coverage. USA map showing all our active properties.",
  openGraph: {
    title: "Our Clients | Kiosist",
    images: [{ url: "/og/clients.jpg", width: 1200, height: 630 }],
  },
};

export default async function Clients() {
  const clients = await getClients();

  return (
    <>
      <USAClientMap clients={clients} />
      <BrandStrip />
      <StatCounter />
    </>
  );
}
