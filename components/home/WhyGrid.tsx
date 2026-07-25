"use client";

import { motion } from "framer-motion";
import { Languages, Handshake, Sprout, Laptop, Clock, Hotel, type LucideIcon } from "lucide-react";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Languages,
    title: "Fluency In English",
    body: "Communicate clearly and confidently with guests from around the world.",
  },
  {
    icon: Handshake,
    title: "Strong Customer Service Skills",
    body: "A passion for helping people and creating positive experiences.",
  },
  {
    icon: Sprout,
    title: "Willingness To Learn",
    body: "Stay curious, embrace feedback, and grow with every opportunity.",
  },
  {
    icon: Laptop,
    title: "Tech Friendly",
    body: "Comfortable using technology and eager to learn new tools.",
  },
  {
    icon: Clock,
    title: "Rotational Shift",
    body: "Flexible to work different shifts, including nights, weekends & holidays.",
  },
  {
    icon: Hotel,
    title: "Prior Experience",
    body: "Previous experience in hospitality or customer service is an advantage.",
  },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

export function WhyGrid() {
  return (
    <section id="features" className="section-pad relative overflow-hidden">
      {/* Ambient blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-200px] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,.12) 0%, transparent 70%)" }}
      />

      {/* Heading- no explanation copy underneath, per brief */}
      <RevealOnScroll className="relative z-10 container-kio mb-14 text-center">
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
          <span className="text-kio-accent">Skills</span> And <span className="text-kio-accent">Experience</span> Required
        </h2>
      </RevealOnScroll>

      <div className="container-kio relative z-10 grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
        {/* ── Left: What It Takes panel ── */}
        <RevealOnScroll className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-kio-line bg-kio-bg-soft p-8 md:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-kio-accent/10 blur-3xl"
          />
          <span aria-hidden="true" className="relative z-10 mb-4 flex gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-kio-accent" />
            <span className="h-1.5 w-1.5 rounded-full bg-kio-accent/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-kio-accent/30" />
          </span>
          <h3 className="relative z-10 text-3xl font-black leading-tight text-kio-ink md:text-4xl">
            What It <span className="text-gradient-shimmer">Takes</span>
          </h3>
          <p className="relative z-10 mt-4 max-w-sm text-[.95rem] leading-[1.8] text-kio-muted">
            We&apos;re looking for people-first individuals ready to deliver exceptional guest experiences.
          </p>
          <div className="relative z-10 mt-8 flex items-center gap-3 rounded-2xl bg-kio-primary/5 p-4 ring-1 ring-kio-accent/20">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-kio-accent/15 text-kio-accent">
              <Handshake className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <p className="text-sm font-semibold text-kio-ink">
              Great people. Exceptional experiences. That&apos;s what we&apos;re all about.
            </p>
          </div>
        </RevealOnScroll>

        {/* ── Right: Skills & experience card grid ── */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div
                key={f.title}
                variants={staggerChild}
                className="group relative rounded-2xl border border-kio-line bg-kio-bg p-5 transition-all duration-300 hover:border-kio-accent/30 hover:shadow-lg hover:shadow-kio-accent/10"
              >
                <span className="font-mono text-xs font-bold" style={{ color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="mb-4 mt-3 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `${color}18`, border: `1px solid ${color}38` }}
                >
                  <f.icon className="h-5 w-5" style={{ color }} strokeWidth={1.75} />
                </div>
                <h4 className="text-sm font-bold text-kio-ink">{f.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-kio-muted">{f.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
