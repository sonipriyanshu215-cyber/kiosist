"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/* ── What We Do services ── */
const SERVICES = [
  {
    label: "Greet & assist guests warmly",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11a9 9 0 0 1 18 0" />
        <rect x="3" y="11" width="4" height="6" rx="1" />
        <rect x="17" y="11" width="4" height="6" rx="1" />
        <path d="M21 17v1a4 4 0 0 1-4 4h-2" />
        <circle cx="12" cy="22" r="1" />
      </svg>
    ),
  },
  {
    label: "Handle reservations & inquiries",
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
    label: "Manage check-ins & check-outs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Resolve guest requests & concerns",
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
    label: "Ensure every guest leaves happy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10v12" />
        <path d="M7 10c0-2.76 2.24-5 5-5h.34a5 5 0 0 1 4.93 4.18l1.37 9.45A2 2 0 0 1 16.66 22H9a2 2 0 0 1-2-2v-4" />
        <path d="M7 10H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h3" />
      </svg>
    ),
  },
];


export function AboutIntro() {
  const rm = useReducedMotion();

  return (
    <div>
      {/* ── Mobile image banner (hidden on lg) ── */}
      <div className="relative h-56 w-full overflow-hidden lg:hidden">
        <Image
          src="/img/about/office.webp"
          alt="Kiosist team at work"
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 0px, 100vw"
          priority
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 30%, #0d1117 100%)" }} />
      </div>

      {/* ── Hero ── */}
      <section className="relative min-h-screen overflow-hidden">

        {/* Full-bleed photo — sits behind everything */}
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/img/about/office.webp"
            alt="Kiosist team at work"
            fill
            className="object-cover object-right"
            sizes="(max-width: 1023px) 0px, 100vw"
            priority
          />
          {/* Left vignette — lighter so more image shows through */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to right, #0d1117 0%, #0d1117cc 22%, #0d111766 42%, #0d111722 58%, transparent 72%)" }} />
          {/* Top fade */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to bottom, #0d1117 0%, #0d111755 12%, transparent 38%)" }} />
          {/* Bottom fade */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, #0d1117 0%, #0d111766 18%, transparent 45%)" }} />
        </div>

        {/* ── Left: content (sits on top of full-bleed image) ── */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex min-h-[70vh] flex-col justify-center px-6 pb-16 pt-10 lg:min-h-screen lg:w-[52%] lg:pt-32 lg:px-14 xl:px-20"
        >
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 self-start rounded-full border border-kio-accent/30 bg-kio-accent/10 px-4 py-1.5">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-kio-accent"
              animate={rm ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-kio-accent">About Kiosist</span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.6rem,4.5vw,4rem)] font-black leading-[1.08] text-kio-ink">
            We are the<br />
            <span className="text-gradient">Guest&apos;s First Hello.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-[430px] text-[1rem] leading-[1.85] text-kio-muted">
            From check-ins to check-outs, we create seamless stays for guests across the USA
            {" "}— right from our office in{" "}
            <span className="font-semibold text-kio-accent">India</span>.
          </p>

          {/* What We Do card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 rounded-2xl border border-kio-line bg-kio-bg-soft/60 p-5 backdrop-blur-md"
          >
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-kio-accent">
              What We Do
            </h3>
            <div className="grid grid-cols-5 gap-1">
              {SERVICES.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-2 rounded-xl p-2 text-center transition-colors hover:bg-kio-accent/5"
                >
                  <div className="text-kio-accent [&>svg]:h-[26px] [&>svg]:w-[26px]">{s.icon}</div>
                  <p className="text-[.62rem] leading-[1.5] text-kio-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
