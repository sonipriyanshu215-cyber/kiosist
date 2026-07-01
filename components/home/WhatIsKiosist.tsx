"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

export function WhatIsKiosist() {
  const rm = useReducedMotion();

  return (
    <section className="section-pad relative overflow-hidden">
      {/* Ambient glow top-left */}
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

      <div className="relative z-10 w-full">
        {/* Heading */}
        <RevealOnScroll className="container-kio mx-auto mb-12 text-center">
          <span className="section-label">Our Story</span>
        </RevealOnScroll>

        {/* Stacked layout: image centered, text below */}
        <div className="flex flex-col items-center gap-12">

          {/* Image — centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="relative mx-auto"
            style={{ width: "1100px", maxWidth: "100%" }}
          >
            {/* Outer glow ring */}
            <motion.div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,.18), rgba(6,182,212,.12), transparent)" }}
              animate={rm ? {} : { opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Corner accent lines */}
            <div aria-hidden="true" className="absolute -left-1 -top-1 h-12 w-12 rounded-tl-3xl border-l-2 border-t-2 border-kio-accent/50" />
            <div aria-hidden="true" className="absolute -bottom-1 -right-1 h-12 w-12 rounded-br-3xl border-b-2 border-r-2 border-kio-accent2/50" />

            {/* Image */}
            <motion.div
              className="relative overflow-hidden rounded-2xl"
              style={{ width: "1100px", maxWidth: "100%", height: "500px" }}
              whileHover="hovered"
              initial="idle"
            >
              <motion.div
                className="absolute inset-0"
                variants={{
                  idle:    { scale: 1 },
                  hovered: { scale: 1.05 },
                }}
                transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              >
                <Image
                  src="/img/about/kiosist-team.jpeg"
                  alt="The Kiosist team at their office in India"
                  fill
                  className="object-cover object-[center_35%]"
                  sizes="1100px"
                />
              </motion.div>

              {/* Dark overlay — lifts on hover */}
              <motion.div
                className="absolute inset-0"
                variants={{
                  idle:    { background: "linear-gradient(to top, rgba(13,17,23,0.55) 0%, rgba(13,17,23,0.10) 50%, transparent 100%)" },
                  hovered: { background: "linear-gradient(to top, rgba(13,17,23,0.30) 0%, rgba(13,17,23,0.05) 50%, transparent 100%)" },
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Blue tint overlay — brightens on hover */}
              <motion.div
                className="absolute inset-0"
                style={{ mixBlendMode: "screen" }}
                variants={{
                  idle:    { backgroundColor: "rgba(59,130,246,0.06)" },
                  hovered: { backgroundColor: "rgba(59,130,246,0.14)" },
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Border glow on hover */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl"
                variants={{
                  idle:    { boxShadow: "inset 0 0 0 1px rgba(59,130,246,0)" },
                  hovered: { boxShadow: "inset 0 0 0 1.5px rgba(59,130,246,0.5)" },
                }}
                transition={{ duration: 0.35 }}
              />

              {/* Bottom label badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
                  style={{ background: "rgba(13,17,23,0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(59,130,246,0.25)" }}
                >
                  <span className="h-2 w-2 rounded-full bg-kio-accent animate-pulse" />
                  Kiosist HQ — Surat, India
                </div>
              </div>
            </motion.div>

            {/* Scan beam */}
            {!rm && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
                style={{ mixBlendMode: "screen" }}
              >
                <motion.div
                  className="absolute inset-y-0 w-1/3"
                  style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.06), transparent)" }}
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Text — full width below image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.15 }}
            className="mx-auto max-w-[820px] text-center"
          >
            {/* Title */}
            <h3 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-extrabold leading-snug text-kio-ink">
              Welcome to <span className="text-color-cycle">Kiosist</span>
            </h3>

            {/* Sub-title */}
            <p className="mt-2 text-[clamp(1rem,1.8vw,1.25rem)] font-semibold italic text-kio-muted">
              Where Every Hello Becomes a Story.
            </p>

            {/* Divider */}
            <div
              aria-hidden="true"
              className="my-6 h-px w-full rounded-full"
              style={{ background: "linear-gradient(90deg, var(--kio-accent), var(--kio-accent2), transparent)" }}
            />

            <p className="text-[1rem] leading-[1.95] text-kio-muted md:text-[1.05rem]">
              Our Front Desk Executives power guest experiences for hotels across the USA, turning &ldquo;just checking in&rdquo; into &ldquo;I can&apos;t wait to come back.&rdquo;
            </p>
            <p className="mt-5 text-[1rem] leading-[1.95] text-kio-muted md:text-[1.05rem]">
              We&apos;re the first face, the first voice, the first impression a guest gets — and in hospitality, that&apos;s everything.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
