"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function WhatIsKiosist() {
  const rm = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-24">
      {/* Ambient glow top-left- scoped so it never wraps a sticky/scroll element */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Ambient glow bottom-right */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,.09) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ── Mobile image banner (hidden on lg) ── */}
      <div className="relative h-64 w-full overflow-hidden lg:hidden">
        <Image
          src="/img/about/kiosist-team.jpeg"
          alt="The Kiosist team at their office in India"
          fill
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 30%, #000 100%)" }} />
      </div>

      {/* ── Two clean panels: text left, team photo right ── */}
      <div className="relative z-10 lg:flex lg:min-h-[720px]">

        {/* Left panel: content */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col justify-center bg-black px-6 py-14 lg:w-[38%] lg:px-14 xl:px-16"
        >
          <span className="section-label self-start">Our Story</span>

          <h3 className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-extrabold leading-snug text-kio-ink">
            Welcome to <span className="text-color-cycle">Kiosist</span>
          </h3>

          <p className="mt-2 text-[clamp(1rem,1.8vw,1.25rem)] font-semibold italic text-kio-muted">
            Where Every Hello Becomes a Story.
          </p>

          <div
            aria-hidden="true"
            className="my-6 h-px w-full max-w-[280px] rounded-full"
            style={{ background: "linear-gradient(90deg, var(--kio-accent), var(--kio-accent2), transparent)" }}
          />

          <p className="text-[1rem] leading-[1.9] text-kio-muted">
            Our Front Desk Executives power guest experiences for hotels across the USA, turning &ldquo;just checking in&rdquo; into &ldquo;I can&apos;t wait to come back.&rdquo;
          </p>
          <p className="mt-5 text-[1rem] leading-[1.9] text-kio-muted">
            We&apos;re the first face, the first voice, the first impression a guest gets- and in hospitality, that&apos;s everything.
          </p>
        </motion.div>

        {/* Right panel: full-bleed team photo */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block lg:w-[62%]"
        >
          <Image
            src="/img/about/kiosist-team.jpeg"
            alt="The Kiosist team at their office in India"
            fill
            className="object-cover object-[center_35%]"
            sizes="(max-width: 1023px) 0px, 62vw"
          />

          {/* Light overall tint for mood */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.22)]" />

          {/* Seam blend into the text panel- matches the panel's pure black so the two bleed together */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to right, #000 0%, rgba(0,0,0,0.88) 8%, rgba(0,0,0,0.55) 16%, rgba(0,0,0,0.2) 26%, transparent 40%)" }} />

          {/* Bottom fade for depth */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 25%)" }} />

          {/* HQ badge */}
          <div className="absolute bottom-6 right-6">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(59,130,246,0.25)" }}
            >
              <span className="h-2 w-2 rounded-full bg-kio-accent animate-pulse" />
              Kiosist HQ- Surat, India
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
