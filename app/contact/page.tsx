import type { Metadata } from "next";
import Link from "next/link";
import { ResumeForm } from "@/components/career/ResumeForm";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import { Mail, Phone, MapPin, Briefcase, MessageCircle, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Kiosist",
  description:
    "Get in touch with Kiosist. Book a demo, ask about our virtual front desk service, or visit us in Surat, Gujarat.",
  openGraph: {
    title: "Contact Us | Kiosist",
    images: [{ url: "/og/contact.jpg", width: 1200, height: 630 }],
  },
};

const QUICK_LINKS = [
  {
    Icon: Briefcase,
    title: "Looking To Join Our Team?",
    body: "Explore opportunities to grow, learn, and build your career with Kiosist.",
    href: "/career",
    cta: <div className="text-color-cycle">"View Careers",</div>
  },
  {
    Icon: MessageCircle,
    title: "Have A Question?",
    body: "We're always happy to connect. Send us a message and our team will get back to you.",
    href: "#message",
    cta: <div className="text-color-cycle">"Get In Touch",</div>
  },
  {
    Icon: Users,
    title: "Want To Connect?",
    body: "Have something to share or want to start a conversation? We're just a message away.",
    href: "mailto:hr@kiosist.com",
    cta: <div className="text-color-cycle">"Contact Us"</div>,
  },
];

const CONTACT_INFO = [
  {
    Icon: MapPin,
    title: "Our Office",
    lines: [
      "Shop No. 1, Platinum Plaza, Shaheed Veer Bhagat Singh Flyover Brg,",
      "opp. V.T. Choksi College, Ambika Niketan, Athwa, Surat, Gujarat 395007",
    ],
    href: "https://maps.app.goo.gl/F5UT1wo9Qf5RhDUaA",
  },
  {
    Icon: Phone,
    title: "Give Us A Call",
    lines: ["+91 98254 00070", "Available 24 hours"],
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
            {/* ── Left: copy + quick links ── */}
            <RevealOnScroll>

              <h1 className="mt-3 text-[clamp(0.85rem,3.4vw,3rem)] font-bold text-white">
                Let&apos;s Start A <span className="text-color-cycle">Conversation.</span>
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
                {QUICK_LINKS.map((q) => {
                  const cardClass =
                    "group rounded-2xl border border-white/10 bg-white/[0.04] p-[clamp(3px,1.6vw,20px)] transition-colors hover:border-kio-accent/40";
                  const cardBody = (
                    <>
                      <div className="mb-[clamp(2px,1.2vw,12px)] flex h-[clamp(18px,4vw,40px)] w-[clamp(18px,4vw,40px)] items-center justify-center rounded-full bg-kio-accent/15 text-kio-accent">
                        <q.Icon className="h-[clamp(0.55rem,2vw,1.25rem)] w-[clamp(0.55rem,2vw,1.25rem)]" />
                      </div>
                      <h3 className="text-[clamp(0.42rem,1.5vw,0.875rem)] font-bold text-white">{q.title}</h3>
                      <p className="mt-[clamp(1px,0.6vw,6px)] text-[clamp(0.38rem,1.2vw,0.75rem)] leading-relaxed text-white/60">{q.body}</p>
                      <span className="mt-[clamp(2px,1.2vw,12px)] inline-flex items-center gap-1 text-[clamp(0.38rem,1.2vw,0.75rem)] font-semibold text-kio-accent2">
                        {q.cta} <ArrowRight className="h-3 w-3 shrink-0" />
                      </span>
                    </>
                  );

                  // Internal routes/anchors navigate client-side via Link so the
                  // root layout (and its one-time intro splash) doesn't remount
                  // on a full page reload. External/mailto links stay as <a>.
                  return q.href.startsWith("/") || q.href.startsWith("#") ? (
                    <Link key={q.title} href={q.href} className={cardClass}>
                      {cardBody}
                    </Link>
                  ) : (
                    <a key={q.title} href={q.href} className={cardClass}>
                      {cardBody}
                    </a>
                  );
                })}
              </div>
            </RevealOnScroll>

            {/* ── Right: send message form ── */}
            <div id="message" className="scroll-mt-24">
              <RevealOnScroll delay={0.1} className="rounded-3xl border border-white/10 bg-kio-bg p-[clamp(8px,3vw,32px)]">
                <h2 className="text-[clamp(0.6rem,2vw,1.125rem)] font-bold text-color-cycle">Send Us A Message</h2>
                <div className="mt-[clamp(4px,2vw,24px)]">
                  <InquiryForm />
                </div>
                <p className="mt-4 text-center text-[clamp(0.4rem,1.2vw,0.75rem)] text-kio-muted">
                  Your information is safe with us. We respect your privacy.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Contact info strip */}
      <section className="section-pad bg-kio-bg-soft">
        <div className="container-kio">
          <div className="grid grid-cols-3 gap-[clamp(3px,1.6vw,24px)]">
            {CONTACT_INFO.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center rounded-2xl bg-kio-bg p-[clamp(4px,2vw,32px)] text-center ring-1 ring-kio-line transition-all hover:ring-kio-accent hover:shadow-lg hover:shadow-kio-accent/10"
              >
                <div className="mb-[clamp(2px,1.6vw,16px)] flex h-[clamp(20px,5.6vw,56px)] w-[clamp(20px,5.6vw,56px)] items-center justify-center rounded-full bg-kio-accent/10 text-kio-accent">
                  <c.Icon className="h-[clamp(0.6rem,2.4vw,1.5rem)] w-[clamp(0.6rem,2.4vw,1.5rem)]" />
                </div>
                <h3 className="text-[clamp(0.42rem,1.6vw,1rem)] font-bold text-kio-ink">{c.title}</h3>
                {c.lines.map((l) => (
                  <p
                    key={l}
                    className="mt-1 text-[clamp(0.38rem,1.3vw,1rem)] font-normal text-kio-muted transition-colors group-hover:text-kio-ink"
                  >
                    {l}
                  </p>
                ))}
              </a>
            ))}
          </div>

          {/* Career CTA banner */}
          <div className="mt-10 flex flex-row items-center justify-between gap-[clamp(4px,2vw,20px)] rounded-2xl bg-kio-primary px-[clamp(6px,3vw,32px)] py-[clamp(6px,2.6vw,28px)] text-left">
            <div>
              <p className="text-[clamp(0.4rem,1.3vw,0.75rem)] font-bold uppercase tracking-widest text-color-cycle">
                Looking For A Career?
              </p>
              <p className="mt-1 text-[clamp(0.5rem,1.6vw,1rem)] text-white">
                Build your future with a team that values people and purpose.
              </p>
            </div>
            <Link
              href="/career"
              className="inline-flex shrink-0 items-center gap-[clamp(3px,1vw,8px)] rounded-full bg-white px-[clamp(6px,2.4vw,24px)] py-[clamp(4px,1.6vw,12px)] text-[clamp(0.42rem,1.5vw,0.875rem)] font-bold text-kio-primary transition-transform hover:-translate-y-0.5"
            >
              Explore Careers
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Job application form */}
      <ResumeForm />
    </>
  );
}
