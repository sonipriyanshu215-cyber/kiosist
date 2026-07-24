"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SERVICE_COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

/* ── What We Do services ── */
const SERVICES = [
  {
    label: "Manage check-in & check-out",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 15l2 2 4-4" />
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
    label: "Making every guest stay memorable",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
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
    label: "Deliver exceptional service",
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
      {/* ── Mobile image banner (hidden on lg) ── */}
      <div className="relative h-56 w-full overflow-hidden lg:hidden">
        <Image
          src="/img/about/agent-workstation-2.jpeg"
          alt="Kiosist front desk agents working at their stations"
          fill
          className="object-cover object-right"
          sizes="(min-width: 1024px) 0px, 100vw"
          priority
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 30%, #0d1117 100%)" }} />
      </div>

      {/* ── Hero- two clean panels: text left, photo right- true full screen ── */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">

        {/* ── Text + photo panels ── */}
        <div className="relative flex-1 lg:flex">

          {/* ── Left panel: content ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex min-h-[70vh] flex-col justify-center bg-black px-6 pb-16 pt-10 lg:min-h-full lg:w-1/2 lg:pt-32 lg:px-14 xl:px-20"
          >
            {/* Headline */}
            <h1 className="text-3xl font-black leading-[1.08] text-white md:text-4xl lg:text-5xl">
              We Are <br />
              <span className="text-gradient-shimmer">Guest&apos;s First Hello.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-[430px] text-[1rem] leading-[1.85] text-white/60">
              We are the leading service provider for remotely operating front desks for hotels based in the USA


              {" "}- right from our office in{" "}
              <span className="font-semibold text-[#60a5fa]">India</span>.
            </p>
          </motion.div>

          {/* ── Right panel: photo (soft, blurred curve seam) ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden min-h-[70vh] lg:absolute lg:inset-y-0 lg:right-0 lg:z-20 lg:block lg:w-[calc(50%+4rem)]"
            style={{
    WebkitMaskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><defs><filter id='b' x='-10%25' y='-10%25' width='120%25' height='120%25'><feGaussianBlur stdDeviation='1.5'/></filter></defs><path d='M 7.5,0 C 7.5,20 0,35 0,50 C 0,65 7.5,80 7.5,100 L 100,100 L 100,0 Z' fill='white' filter='url(%23b)'/></svg>")`,
    maskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><defs><filter id='b' x='-10%25' y='-10%25' width='120%25' height='120%25'><feGaussianBlur stdDeviation='1.5'/></filter></defs><path d='M 7.5,0 C 7.5,20 0,35 0,50 C 0,65 7.5,80 7.5,100 L 100,100 L 100,0 Z' fill='white' filter='url(%23b)'/></svg>")`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  }}
>
  {/* ⚠️ Delete the old <svg><defs><clipPath id="aboutHeroCurve">…</clipPath></defs></svg> block- no longer needed */}

  <Image
    src="/img/about/agent-workstation-2.jpeg"
    alt="Kiosist front desk agents working at their stations"
    fill
    className="object-cover object-right"
    sizes="(max-width: 1023px) 0px, 50vw"
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

      {/* ── What We Do- its own block below the full-screen hero ── */}
      <section className="bg-black px-6 py-16 md:px-10 lg:px-14 lg:py-20 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-7"
        >
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[#60a5fa] md:text-base">
            What We Do
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {SERVICES.map((s, i) => {
              const color = SERVICE_COLORS[i % SERVICE_COLORS.length];
              return (
                <div
                  key={s.label}
                  className="group relative flex flex-col items-center gap-3 rounded-xl p-3 text-center"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `${color}12` }}
                  />
                  <div style={{ color }} className="relative [&>svg]:h-9 [&>svg]:w-9 md:[&>svg]:h-10 md:[&>svg]:w-10">{s.icon}</div>
                  <p className="relative text-balance text-xs leading-[1.5] text-white/60 md:text-sm">{s.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
