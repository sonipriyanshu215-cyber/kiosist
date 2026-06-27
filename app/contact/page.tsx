import type { Metadata } from "next";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import { staggerParent, staggerChild } from "@/lib/motion";
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
    detail: "We reply within 24 hours",
  },
  {
    Icon: Phone,
    title: "Call Sales",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    detail: "Mon–Sat, 10am–7pm IST",
  },
  {
    Icon: MapPin,
    title: "Visit Us",
    value: "Parle Point, Surat",
    href: "https://maps.google.com/?q=21.1787,72.8021",
    detail: "Gujarat 395007, India",
  },
];

export default function Contact() {
  return (
    <>
      <section className="section-pad bg-kio-primary pt-36">
        <div className="container-kio text-center">
          <RevealOnScroll>
            <p className="text-sm font-semibold uppercase tracking-widest text-kio-accent">
              Contact Us
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              Let&apos;s talk about your hotel.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              Whether you have one property or twenty — we&apos;d love to show you what
              Kiosist can do for your front desk.
            </p>
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
                <p className="mt-1 text-xs text-kio-muted">{c.detail}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="section-pad bg-kio-bg">
        <div className="container-kio">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <RevealOnScroll>
                <h2 className="text-2xl font-bold text-kio-ink">Send us a message</h2>
                <p className="mt-2 text-kio-muted">
                  Fill in the form and a member of our team will respond within 24 hours.
                </p>
              </RevealOnScroll>
              <div className="mt-8">
                <InquiryForm />
              </div>
            </div>

            <div>
              <RevealOnScroll>
                <h2 className="text-2xl font-bold text-kio-ink">Our office</h2>
                <p className="mt-2 text-kio-muted">
                  Parle Point, Surat, Gujarat 395007, India
                </p>
              </RevealOnScroll>
              <div className="mt-8 overflow-hidden rounded-2xl shadow-lg">
                <iframe
                  title="Kiosist Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.5!2d72.8021!3d21.1787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEwJzQzLjMiTiA3MsKwNDgnMDcuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
