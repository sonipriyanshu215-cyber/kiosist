"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

export function FounderSpotlight() {
  const rm = useReducedMotion();

  return (
    <section className="bg-kio-primary relative overflow-hidden">
      {/* Whole section content (copy + photo) centered as one group- the
          negative margins let the photo overlap the text block's edge
          instead of the two halves sitting apart with dead space between. */}
      <div className="container-kio relative z-10 flex flex-col items-center gap-10 py-16 text-center md:py-20 lg:flex-row lg:justify-center lg:gap-0 lg:py-24 lg:text-left">
        {/* ── Left: copy ── */}
        <div className="relative z-10 lg:-mr-10 lg:-translate-x-46">
          <RevealOnScroll>
            <p className="section-label">Founder</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              HENAL DALAL
            </h2>
            
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <blockquote className="relative mx-auto mt-8 max-w-md lg:mx-0">
              <Quote className="h-7 w-7 -scale-x-100 text-kio-accent/70" fill="currentColor" />
              <p className="mt-3 text-lg leading-relaxed text-white/80 sm:text-xl">
                My dream is to make
                <br />
                <span className="text-color-cycle font-semibold">hospitality accessible </span>
                <br />
                <span className="text-white/80">to all without boundaries</span>,
                <br />
                <span className="text-color-cycle font-semibold">24/7.</span>
              </p>
            </blockquote>
          </RevealOnScroll>
        </div>

        {/* ── Right: photo ── */}
        {/* Static positioning wrapper- framer-motion's own `animate` sets its
            own inline `transform` (x) on its element, which would otherwise
            clobber a Tailwind translate-x placed on the same node. */}
        <div className="relative h-[420px] w-[280px] shrink-0 sm:h-[480px] sm:w-[320px] lg:-ml-12 lg:h-[600px] lg:w-[380px] lg:translate-x-20">
          {/* Glow anchored to this wrapper- moves with the photo instead of
              being pinned to a fixed percentage of the whole section. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full sm:-inset-14"
            style={{
              background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(59,130,246,0.30), transparent 70%)",
            }}
          />
          <motion.div
            initial={rm ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full w-full"
          >
            {/* unoptimized: Next's AVIF re-encode flattens this PNG's
                transparent background to opaque white- serving the source
                file directly keeps the cutout transparent. */}
            <Image
              src="/img/team/ceo.png"
              alt="Henal Dalal, Founder of Kiosist"
              fill
              priority
              unoptimized
              className="object-contain object-center scale-110"
              sizes="(max-width: 1023px) 320px, 380px"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
