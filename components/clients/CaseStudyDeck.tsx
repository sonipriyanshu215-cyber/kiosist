"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const CASES = [
  {
    id: "cs-1",
    brand: "Americas Best Value Inn",
    location: "Atlanta, GA",
    metric: "60%",
    metricLabel: "Cost reduction",
    front: "Eliminated overnight in-person staff while maintaining 100% check-in coverage.",
    back: "After deploying Kiosist, the property reduced labour costs by 60% in the first quarter. Zero missed check-ins across 6 months of operation.",
  },
  {
    id: "cs-2",
    brand: "Holiday Inn Express",
    location: "Dallas, TX",
    metric: "24/7",
    metricLabel: "Coverage achieved",
    front: "Achieved round-the-clock front desk coverage with a team of 2 virtual agents.",
    back: "Guest satisfaction scores increased by 18% after switching to Kiosist. Response times dropped from 4 minutes to under 60 seconds.",
  },
  {
    id: "cs-3",
    brand: "La Quinta by Wyndham",
    location: "Houston, TX",
    metric: "3x",
    metricLabel: "Properties scaled",
    front: "Scaled from 1 to 3 properties using Kiosist without increasing administrative overhead.",
    back: "The owner used cost savings from property 1 to expand to 2 additional properties within 18 months. Kiosist covered all three from day one.",
  },
];

const SCAN_DURATIONS = [3.2, 4, 3.6];

function FlipCard({ c, idx }: { c: (typeof CASES)[0]; idx: number }) {
  const [flipped, setFlipped] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative h-72 cursor-pointer"
      style={{ perspective: 1200 }}
      onMouseEnter={() => !reducedMotion && setFlipped(true)}
      onMouseLeave={() => !reducedMotion && setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      aria-label={`Case study: ${c.brand}. Press Enter or hover to reveal outcome.`}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl bg-kio-bg p-8 ring-1 ring-kio-line transition-shadow group-hover:shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Scanning beam */}
          <div
            className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-kio-accent/8 to-transparent"
            style={{ animation: `scan-beam ${SCAN_DURATIONS[idx % SCAN_DURATIONS.length]}s ease-in-out infinite`, animationDelay: `${idx * 0.8}s` }}
          />
          <div>
            <div className="text-4xl font-bold text-kio-accent">{c.metric}</div>
            <div className="text-sm text-kio-accent">{c.metricLabel}</div>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-kio-muted">{c.front}</p>
            <div className="mt-4">
              <p className="font-semibold text-kio-ink">{c.brand}</p>
              <p className="text-xs text-kio-muted">{c.location}</p>
            </div>
          </div>
          <p className="text-xs text-kio-muted">Hover to see outcome →</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-2xl bg-kio-primary p-8"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-sm leading-relaxed text-white/80">{c.back}</p>
          <div className="mt-6">
            <p className="font-semibold text-kio-accent">{c.brand}</p>
            <p className="text-xs text-white/70">{c.location}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function CaseStudyDeck() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-pad bg-kio-bg-soft">
      <div className="container-kio">
        <RevealOnScroll className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-kio-accent">
            Case Studies
          </p>
          <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
            Results our clients have seen
          </h2>
          <p className="mt-3 text-kio-muted">Hover each card to see the full outcome.</p>
        </RevealOnScroll>

        <motion.div
          variants={staggerParent}
          initial={reducedMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CASES.map((c, i) => (
            <motion.div key={c.id} variants={staggerChild}>
              <FlipCard c={c} idx={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
