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

const CONTACT_INFO = [
  {
    Icon: MapPin,
    title: "Our Office",
    lines: ["Shop No. 1, Platinum Plaza, opp. V.T. CHOKSI COLLEGE, Athwa, Surat, Gujarat 395007"],
    href: "https://maps.app.goo.gl/F5UT1wo9Qf5RhDUaA",
  },
  {
    Icon: Phone,
    title: "Give Us A Call",
    lines: ["+91 98254 00070"],
    href: "tel:+919825400070",
  },
  {
    Icon: Mail,
    title: "Email Us",
    lines: ["hr@kiosist.com"],
    href: "mailto:hr@kiosist.com",
  },
];

export default function Contact() {
  return (
    <>
      <section className="bg-kio-primary pb-16 pt-28 md:pb-20 md:pt-32 lg:pb-24 lg:pt-36">
        <div className="container-kio">
          <div className="mx-auto grid grid-cols-[0.85fr_1.15fr] max-w-6xl items-start gap-[clamp(8px,3vw,48px)] lg:grid-cols-2">
            {/* ── Left: copy + contact details ── */}
            <RevealOnScroll>

              <h1 className="mt-3 text-[clamp(0.85rem,3.4vw,3rem)] font-bold text-white">
                Let&apos;s Start A <span className="text-color-cycle">Conversation</span>
              </h1>
              <p className="mt-[clamp(4px,1.8vw,20px)] max-w-md text-[clamp(0.55rem,1.8vw,1rem)] text-white/70">
                Whether you have a question, want to explore opportunities, or simply want to
                know more about Kiosist, we&apos;d love to hear from you.
              </p>
              <p className="mt-[clamp(6px,2vw,24px)] max-w-md text-[clamp(0.45rem,1.4vw,0.875rem)] italic text-white/50">
                Every great conversation starts with a simple hello.{" "}
                <span className="font-semibold not-italic text-color-cycle">
                  Let&apos;s start yours.
                </span>
              </p>

              <div className="mt-[clamp(8px,3vw,40px)] grid grid-cols-3 gap-[clamp(3px,1.4vw,16px)]">
                {CONTACT_INFO.map((c) => (
                  <a
                    key={c.title}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex h-full flex-col items-center text-center rounded-2xl border border-white/10 bg-white/[0.04] p-[clamp(3px,1.6vw,20px)] transition-colors hover:border-kio-accent/40"
                  >
                    <div className="mb-[clamp(2px,1.2vw,12px)] flex h-[clamp(18px,4vw,40px)] w-[clamp(18px,4vw,40px)] items-center justify-center rounded-full bg-kio-accent/15 text-kio-accent">
                      <c.Icon className="h-[clamp(0.55rem,2vw,1.25rem)] w-[clamp(0.55rem,2vw,1.25rem)]" />
                    </div>
                    <h3 className="text-[clamp(0.42rem,1.5vw,0.875rem)] font-bold text-white">{c.title}</h3>
                    {c.lines.map((l) => (
                      <p
                        key={l}
                        className="mt-[clamp(1px,0.6vw,6px)] text-[clamp(0.38rem,1.2vw,0.75rem)] leading-relaxed text-white/60"
                      >
                        {l}
                      </p>
                    ))}
                  </a>
                ))}
              </div>
            </RevealOnScroll>

            {/* ── Right: job application form ── */}
            <div id="message" className="scroll-mt-24">
              <RevealOnScroll delay={0.1} className="rounded-3xl border border-white/10 bg-kio-bg p-[clamp(8px,3vw,32px)]">
                <ResumeForm embedded />
                <p className="mt-4 text-center text-[clamp(0.4rem,1.2vw,0.75rem)] text-kio-muted">
                  Your information is safe with us. We respect your privacy.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
