"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Clock, UserCheck, Handshake, type LucideIcon } from "lucide-react";

/* ── Why do people join us? ── */
const JOIN_REASONS: { icon: LucideIcon; body: string; color: string }[] = [
  {
    icon: MessageCircle,
    body: "Developing excellent communication skills by dealing directly with the guests in the U.S.",
    color: "#3b82f6",
  },
  {
    icon: Clock,
    body: "An environment where you love to work; comfortable 8 hours shift.",
    color: "#06b6d4",
  },
  {
    icon: UserCheck,
    body: "Improve customer service skills by consistently providing a world-class customer service experience.",
    color: "#8b5cf6",
  },
  {
    icon: Handshake,
    body: "Friendly and caring team and leadership so that you enjoy working with us.",
    color: "#f59e0b",
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
              We are the leading service provider for remotely operating front desks for hotels based in the US.
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
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-white">
            What We Do
          </h2>
          <p className="mt-3 text-base font-bold md:text-lg">
            Why do people <span className="text-[#60a5fa]">join us?</span>
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {JOIN_REASONS.map((r) => (
              <div
                key={r.body}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-md"
              >
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: `${r.color}18`, border: `1px solid ${r.color}38` }}
                >
                  <r.icon className="h-5 w-5" style={{ color: r.color }} strokeWidth={1.75} />
                </div>
                <p className="text-sm leading-[1.7] text-white/70">{r.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
