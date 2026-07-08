"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

export function FounderSpotlight() {
  const rm = useReducedMotion();

  return (
    <section className="bg-kio-primary relative overflow-hidden">
      {/* Decorative dotted wave- bottom left */}


      <div className="relative grid gap-10 lg:min-h-[680px] lg:grid-cols-2 lg:items-center lg:gap-0">
        {/* ── Left: copy ── */}
        <div className="container-kio relative z-10 py-16 md:py-20 lg:py-28">
          <RevealOnScroll>
            <p className="section-label">Founder</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Henal Dalal
            </h2>
            <div className="mt-6 h-px max-w-md bg-white/15" />
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <blockquote className="relative mt-8 max-w-md">
              <Quote className="h-7 w-7 -scale-x-100 text-kio-accent/70" fill="currentColor" />
              <p className="mt-3 text-lg leading-relaxed text-white/80 sm:text-xl">
                My dream is to make{" "}
                <span className="text-color-cycle font-semibold">hospitality accessible to all without boundaries</span>, 24/7.
              </p>
            </blockquote>
          </RevealOnScroll>
        </div>

        {/* ── Right: photo, bleeds to the viewport edge on desktop ── */}
        <motion.div
          initial={rm ? false : { opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[440px] w-full sm:h-[520px] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[58%]"
        >
          <Image
            src="/img/team/founder.png"
            alt="Menal Dalal, Founder of Kiosist"
            fill
            priority
            className="object-contain object-right"
            sizes="(max-width: 1023px) 100vw, 58vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
