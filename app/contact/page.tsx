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
    cta: "View Careers",
  },
  {
    Icon: MessageCircle,
    title: "Have A Question?",
    body: "We're always happy to connect. Send us a message and our team will get back to you.",
    href: "#message",
    cta: "Get In Touch",
  },
  {
    Icon: Users,
    title: "Want To Connect?",
    body: "Have something to share or want to start a conversation? We're just a message away.",
    href: "mailto:hr@kiosist.com",
    cta: "Contact Us",
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
      <section className="section-pad bg-kio-primary pt-36">
        <div className="container-kio">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
            {/* ── Left: copy + quick links ── */}
            <RevealOnScroll>
              <span className="text-xs font-bold uppercase tracking-[.2em] text-kio-accent2">
                Contact Us
              </span>
              <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Let&apos;s Start A <span className="text-gradient-gold">Conversation.</span>
              </h1>
              <p className="mt-5 max-w-md text-white/70">
                Whether you have a question, want to explore opportunities, or simply want to
                know more about Kiosist, we&apos;d love to hear from you.
              </p>
              <p className="mt-6 max-w-md text-sm italic text-white/50">
                Every great conversation starts with a simple hello.{" "}
                <span className="font-semibold not-italic text-kio-accent2">
                  Let&apos;s start yours.
                </span>
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {QUICK_LINKS.map((q) => {
                  const cardClass =
                    "group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-kio-accent/40";
                  const cardBody = (
                    <>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-kio-accent/15 text-kio-accent">
                        <q.Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-bold text-white">{q.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/60">{q.body}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-kio-accent2">
                        {q.cta} <ArrowRight className="h-3 w-3" />
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
              <RevealOnScroll delay={0.1} className="rounded-3xl border border-white/10 bg-kio-bg p-8">
                <h2 className="text-lg font-bold text-kio-ink">Send Us A Message</h2>
                <div className="mt-6">
                  <InquiryForm />
                </div>
                <p className="mt-4 text-center text-xs text-kio-muted">
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
          <div className="grid gap-6 sm:grid-cols-3">
            {CONTACT_INFO.map((c) => (
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
                {c.lines.map((l) => (
                  <p
                    key={l}
                    className="mt-1 font-normal text-kio-muted transition-colors group-hover:text-kio-ink"
                  >
                    {l}
                  </p>
                ))}
              </a>
            ))}
          </div>

          {/* Career CTA banner */}
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-kio-primary px-8 py-7 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-kio-accent2">
                Looking For A Career?
              </p>
              <p className="mt-1 text-white">
                Build your future with a team that values people and purpose.
              </p>
            </div>
            <Link
              href="/career"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-kio-primary transition-transform hover:-translate-y-0.5"
            >
              Explore Careers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Job application form */}
      <ResumeForm />
    </>
  );
}
