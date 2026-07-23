import type { Metadata } from "next";
import { ResumeForm } from "@/components/career/ResumeForm";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Kiosist",
  description:
    "Get in touch with Kiosist. Book a demo, ask about our virtual front desk service, or visit us in Surat, Gujarat.",
  openGraph: {
    title: "Contact Us | Kiosist",
    images: [{ url: "/og/contact.jpg", width: 1200, height: 630 }],
  },
};

const CONTACT_CARDS = [
  {
    Icon: Mail,
    title: "Email Us",
    value: "hr@kiosist.com",
    href: "mailto:hr@kiosist.com",
  },
  {
    Icon: Phone,
    title: "Contact Us",
    value: "+91 98254 00070",
    href: "tel:+919825400070",
  },
  {
    Icon: MapPin,
    title: "Visit Us",
    value:
      "Shop No. 1, Platinum Plaza, Shaheed Veer Bhagat Singh Flyover Brg, opp. V.T. Choksi College, Ambika Niketan, Athwa, Surat, Gujarat 395007",
    href: "https://maps.app.goo.gl/F5UT1wo9Qf5RhDUaA",
  },
];

export default function Contact() {
  return (
    <>
      <section className="section-pad bg-kio-primary pt-36">
        <div className="container-kio text-center">
          <RevealOnScroll>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Reach Us
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact cards */}
      <section className="section-pad bg-kio-bg-soft">
        <div className="container-kio">
          <div className="grid gap-6 sm:grid-cols-3">
            {CONTACT_CARDS.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center rounded-2xl bg-kio-bg p-8 text-center ring-1 ring-kio-line transition-all hover:ring-kio-accent hover:shadow-lg hover:shadow-kio-accent/10"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-kio-accent/10 text-kio-accent">
                  <c.Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-kio-ink">{c.title}</h3>
                <p className="mt-1 font-semibold text-kio-accent transition-colors group-hover:text-kio-accent2">
                  {c.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Job application form */}
      <ResumeForm />
    </>
  );
}
