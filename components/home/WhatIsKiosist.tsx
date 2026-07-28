"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function WhatIsKiosist() {
  const rm = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-10 md:pt-8 lg:pt-14">
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

      {/* ── Two clean panels: text left, team photo right- always side by
          side (same alignment as desktop), sized down via fluid clamp()s
          rather than swapping to a stacked mobile banner. ── */}
      <div className="relative z-10 flex min-h-[clamp(280px,58vw,560px)]">

        {/* Left panel: content */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex w-[38%] flex-col justify-center bg-black px-[clamp(12px,4vw,56px)] py-[clamp(16px,4vw,40px)]"
        >
          <h3 className="text-[clamp(1rem,3.2vw,2.6rem)] font-extrabold leading-snug text-kio-ink">
            Welcome To <span className="text-color-cycle">Kiosist</span>
          </h3>

          <p className="mt-2 text-[clamp(0.6rem,1.8vw,1.25rem)] font-semibold italic text-kio-muted">
            Where Every Hello Becomes a Story.
          </p>

          <div
            aria-hidden="true"
            className="my-[clamp(8px,2.4vw,24px)] h-px w-full max-w-[280px] rounded-full"
            style={{ background: "linear-gradient(90deg, var(--kio-accent), var(--kio-accent2), transparent)" }}
          />

          <p className="text-[clamp(0.6rem,1.8vw,1rem)] leading-[1.7] text-kio-muted">
            Welcome to our world-class team of Front Desk Executives where we serve multiple hotels in the US.
          </p>
          <p className="mt-[clamp(8px,2vw,20px)] text-[clamp(0.6rem,1.8vw,1rem)] leading-[1.7] text-kio-muted">
            The first impression is the lasting impression! As a Front Desk Agent, you will take care of the guests from the moment they arrive through to their departure by ensuring they have a memorable experience with us.
          </p>
          <p className="mt-[clamp(8px,2vw,20px)] text-[clamp(0.6rem,1.8vw,1rem)] leading-[1.7] text-kio-muted">
            We always want more enthusiastic and positive Front Desk &amp; Customer Service agents.
          </p>
        </motion.div>

        {/* Right panel: full-bleed team photo */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[62%]"
        >
          <Image
            src="/img/about/kiosist-team.jpeg"
            alt="The Kiosist team at their office in India"
            fill
            className="object-cover object-[center_35%]"
            sizes="62vw"
          />

          {/* Light overall tint for mood */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.22)]" />

          {/* Seam blend into the text panel- matches the panel's pure black so the two bleed together */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to right, #000 0%, rgba(0,0,0,0.88) 8%, rgba(0,0,0,0.55) 16%, rgba(0,0,0,0.2) 26%, transparent 40%)" }} />

          {/* Bottom fade for depth */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 25%)" }} />
        </motion.div>
      </div>
    </section>
  );
}