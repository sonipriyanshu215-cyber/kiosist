"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Users, Clock, Building2, Sparkles, ThumbsUp } from "lucide-react";

const STAT_STRIP = [
  { icon: Users, num: "150+", label: "Team Members" },
  { icon: Clock, num: "24/7", label: "Operations" },
  { icon: Building2, num: "100+", label: "US Hotels" },
  { icon: Sparkles, num: "100%", label: "Growth Opportunities" },
];

export function CareerHero() {
  const rm = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-16 pt-[90px]">
      {/* ── Full-bleed background photo ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/img/about/kiosist-team.jpeg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(5,7,13,.55) 0%, rgba(5,7,13,.45) 40%, rgba(5,7,13,.92) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(5,7,13,.85) 0%, rgba(5,7,13,.35) 55%, transparent 90%)" }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 xl:px-14">
        <div className="max-w-[640px]">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-black leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
          >
            <span className="text-color-cycle block">Grow your career.</span>
            <span className="block text-white">Your next opportunity starts here.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[520px] text-[1.02rem] leading-[1.85] text-kio-muted"
          >
            No travel required. Join a team of{" "}
            <span className="font-semibold text-kio-accent">150+ professionals</span>{" "}
            managing front desks for US hotels, with paid training and a clear path to grow.
          </motion.p>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-8 max-w-[420px] rounded-[24px] border border-white/10 p-6"
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

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:max-w-[560px]"
          >
            {STAT_STRIP.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-4 text-center backdrop-blur-md"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kio-accent/15 text-kio-accent2">
                  <s.icon className="h-4 w-4" />
                </span>
                <span className="text-base font-extrabold text-white">{s.num}</span>
                <span className="text-[10px] leading-tight text-white/60">{s.label}</span>
              </div>
            ))}
          </motion.div>
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
