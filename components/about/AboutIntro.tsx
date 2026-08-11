"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const SERVICE_COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

/* ── What We Do services ── */
const SERVICES = [
  {
    title: "Manage Check-ins & Check-outs",
    body: "Ensure every guest receives a smooth, efficient, and welcoming arrival and departure experience.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Handle Reservations & Inquiries",
    body: "Assist guests with bookings, modifications, and questions while providing accurate and timely information.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <circle cx="8" cy="15" r=".6" fill="currentColor" />
        <circle cx="12" cy="15" r=".6" fill="currentColor" />
        <circle cx="16" cy="15" r=".6" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Support Hotel Operations",
    body: "Work closely with hotel teams to ensure smooth day-to-day operations, helping guests while supporting staff behind the scenes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
        <path d="M9 9h1M9 13h1M14 9h1M14 13h1" />
      </svg>
    ),
  },
  {
    title: "Resolve Guest Queries & Concerns",
    body: "Respond promptly to guest requests and resolve concerns with empathy, professionalism, and confidence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="9" cy="10" r=".6" fill="currentColor" />
        <circle cx="12" cy="10" r=".6" fill="currentColor" />
        <circle cx="15" cy="10" r=".6" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Deliver Exceptional Service",
    body: "Go beyond expectations by providing friendly, reliable, and memorable service in every interaction.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
];

export function AboutIntro() {
  return (
    <div>
      {/* Mobile (< md): a real stacked hero- full-width headline block above
          a full-width photo, sized for a phone screen instead of two
          desktop 50/50 panels shrunk to fit. The diagonal masked seam only
          makes sense side-by-side, so mobile gets a separate plain photo
          block; md+ reverts to the original absolute+mask panel. */}
      <section className="relative flex flex-col overflow-hidden lg:min-h-screen">

        {/* ── Text + photo panels ── */}
        <div className="relative flex flex-1 flex-col md:flex-row">

          {/* ── Left panel: content ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex w-full flex-col justify-center bg-black px-6 pb-14 pt-28 md:min-h-[70vh] md:w-1/2 md:px-[clamp(10px,4.5vw,80px)] md:pb-[clamp(14px,5vw,64px)] md:pt-[clamp(10px,7vw,128px)] lg:min-h-full"
          >
            {/* Headline */}
            <h1 className="text-[clamp(2rem,9vw,2.75rem)] font-black leading-[1.1] text-white md:text-[clamp(0.85rem,4vw,3rem)] md:leading-[1.15]">
              We Are <br />
              <span className="text-gradient-shimmer">Guest&apos;s First Hello</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 max-w-[430px] text-[clamp(0.95rem,3.6vw,1.05rem)] leading-[1.7] text-white/60 md:mt-[clamp(6px,1.8vw,20px)] md:text-[clamp(0.55rem,1.8vw,1rem)]">
              We are the leading service provider for remotely operating front desks for hotels based in the US.
            </p>
          </motion.div>

          {/* ── Mobile photo: plain full-width block, no mask ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 h-[78vw] max-h-[420px] w-full md:hidden"
          >
            <Image
              src="/img/about/agent-workstation-2.jpeg"
              alt="Kiosist front desk agents working at their stations"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.22)]" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 20%)" }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 25%)" }}
            />
          </motion.div>

          {/* ── Desktop photo (soft, blurred curve seam) ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 z-20 hidden min-h-[70vh] w-[calc(50%+clamp(8px,4vw,4rem))] md:block"
            style={{
    WebkitMaskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><defs><filter id='b' x='-10%25' y='-10%25' width='120%25' height='120%25'><feGaussianBlur stdDeviation='1.5'/></filter></defs><path d='M 7.5,0 C 7.5,20 0,35 0,50 C 0,65 7.5,80 7.5,100 L 100,100 L 100,0 Z' fill='white' filter='url(%23b)'/></svg>")`,
    maskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><defs><filter id='b' x='-10%25' y='-10%25' width='120%25' height='120%25'><feGaussianBlur stdDeviation='1.5'/></filter></defs><path d='M 7.5,0 C 7.5,20 0,35 0,50 C 0,65 7.5,80 7.5,100 L 100,100 L 100,0 Z' fill='white' filter='url(%23b)'/></svg>")`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  }}
>
  <Image
    src="/img/about/agent-workstation-2.jpeg"
    alt="Kiosist front desk agents working at their stations"
    fill
    className="object-cover object-right"
    sizes="50vw"
    priority
  />

  {/* Light overall tint for mood, keeps all three people visible */}
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.22)]" />

  {/* Softer seam blend- thinner now because the mask already feathers the edge */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        "linear-gradient(to right, #000 0%, rgba(0,0,0,0.6) 6%, rgba(0,0,0,0.25) 14%, transparent 26%)",
    }}
  />

  {/* Top fade- keeps the navbar readable */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 18%)" }}
  />

          {/* Bottom fade for depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 25%)" }}
          />
          </motion.div>
        </div>
      </section>

      {/* ── What We Do- its own block below the full-screen hero, card
          style matches WhyGrid's skills/experience grid (icon badge
          straddling the card's top edge, bold title, muted body). ── */}
      <section className="section-pad relative overflow-hidden bg-black">
        {/* Ambient blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-200px] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%)" }}
        />

        <RevealOnScroll className="relative z-10 container-kio mb-14 md:mb-16 lg:mb-20 text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
            What <span className="text-color-cycle">We Do</span>
          </h2>
        </RevealOnScroll>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="container-kio relative z-10 flex flex-wrap justify-center gap-x-[clamp(8px,3vw,32px)] gap-y-[clamp(20px,5.5vw,40px)]"
        >
          {SERVICES.map((s, i) => {
            const color = SERVICE_COLORS[i % SERVICE_COLORS.length];
            return (
              <motion.div
                key={s.title}
                variants={staggerChild}
                className="group relative w-full rounded-2xl border border-kio-line bg-kio-bg p-[clamp(10px,2.5vw,20px)] pt-[clamp(32px,9vw,64px)] text-center transition-all duration-300 hover:border-kio-accent/30 hover:shadow-lg hover:shadow-kio-accent/10 sm:w-[calc(50%-clamp(8px,3vw,32px)/2)] lg:w-[calc(33.3333%-clamp(8px,3vw,32px)*2/3)]"
              >
                {/* Icon badge- centered above the box, straddling its top
                    edge, same dark circular lockup as WhyGrid's cards */}
                <div
                  className="absolute left-1/2 top-0 z-10 flex h-[clamp(32px,7vw,56px)] w-[clamp(32px,7vw,56px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15"
                  style={{
                    background: "linear-gradient(135deg, rgba(18,20,30,.95), rgba(22,25,38,.9))",
                    boxShadow: `0 0 0 1px ${color}40, 0 10px 30px rgba(0,0,0,.4)`,
                  }}
                >
                  <div style={{ color }} className="[&>svg]:h-[clamp(0.9rem,2.6vw,1.5rem)] [&>svg]:w-[clamp(0.9rem,2.6vw,1.5rem)]">
                    {s.icon}
                  </div>
                </div>
                <h4 className="text-[clamp(0.7rem,1.8vw,1rem)] font-bold text-kio-ink">{s.title}</h4>
                <p className="mt-[clamp(4px,1vw,8px)] text-[clamp(0.55rem,1.4vw,0.85rem)] leading-relaxed text-kio-muted">
                  {s.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
