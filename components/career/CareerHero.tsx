"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ThumbsUp } from "lucide-react";

export function CareerHero() {
  const rm = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-16 pt-[90px]">
      {/* ── Full-bleed background photo ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/img/career/hero2.png"
          alt=""
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(5,7,13,.55) 0%, rgba(5,7,13,.45) 40%, rgba(5,7,13,.92) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(5,7,13,.82) 0%, rgba(5,7,13,.2) 38%, rgba(5,7,13,.2) 62%, rgba(5,7,13,.78) 100%)" }}
        />
      </div>

      {/* ── Main content- single column, left-aligned ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 xl:px-14">
        <div className="max-w-[560px]">

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-black leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
          >
            <span className="text-color-cycle block">Grow Your Career.</span>
            <span className="block text-white">Your Next Opportunity Starts Here.</span>
          </motion.h1>

          {/* CTA card, below the headline */}
          <div className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[24px] border border-white/10 p-6"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,.28), rgba(6,182,212,.16))" }}
            >
              {/* Thumbs-up badge- floats above the card as the hero's visual accent */}
              <motion.div
                aria-hidden="true"
                className="absolute -right-4 -top-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/15"
                style={{
                  background: "linear-gradient(135deg, rgba(18,20,30,.95), rgba(22,25,38,.9))",
                  boxShadow: "0 0 0 1px rgba(59,130,246,.25), 0 10px 30px rgba(0,0,0,.4)",
                }}
                animate={rm ? {} : { y: [0, -8, 0], rotate: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ThumbsUp className="h-6 w-6 text-kio-accent2" fill="currentColor" fillOpacity={0.15} />
              </motion.div>

              <p className="text-lg font-bold text-white">Ready to Apply?</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                Join the team building the future of remote hospitality.
              </p>
              <Link
                href="#apply"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#05070D] shadow-[0_10px_30px_rgba(255,255,255,.15)] transition-transform hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={rm ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-hidden="true"
      >
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <motion.div
            className="h-1.5 w-1 rounded-full bg-white/70"
            animate={rm ? {} : { y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
