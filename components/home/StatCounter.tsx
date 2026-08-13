"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const STATS = [
  { to: 10,     suffix: "M+", label: "Guests Attended" },
  { to: 150,    suffix: "+", label: "Team"       },
  { to: 45,     suffix: "+", label: "Brands"          },
  { to: 100,    suffix: "+", label: "Hotels Onboard"  },
  { to: 70,     suffix: "+", label: "Locations"       },
];

function Counter({ to, suffix = "", start }: { to: number; suffix?: string; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }
    let cancelled = false;
    const startTime = performance.now();
    const duration = 5200;
    const step = (t: number) => {
      if (cancelled) return;
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    return () => { cancelled = true; };
  }, [start, to]);

  return <span>{count}{suffix}</span>;
}

export function StatCounter({ compact = false }: { compact?: boolean }) {
  const gridRef = useRef<HTMLDivElement>(null);
  // Shared trigger so every counter starts and finishes in lockstep, rather
  // than each one animating independently off its own scroll position.
  const isInView = useInView(gridRef, { once: false, margin: "-10%" });

  return (
    <section className={compact ? "pt-32 pb-10 md:pt-24 md:pb-16 lg:pt-12 lg:pb-24" : "pt-10 pb-8 md:pt-12 md:pb-20 lg:pt-14 lg:pb-24"}>
      <RevealOnScroll className="mb-16 md:mb-20 lg:mb-24 text-center px-6">
        <h2 className="text-[clamp(2.1rem,3.8vw,3.2rem)] font-extrabold leading-[1.2] text-kio-ink">
          Our <span className="text-color-cycle">Success Story</span>
        </h2>
      </RevealOnScroll>
      <motion.div
        ref={gridRef}
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto flex max-w-container flex-wrap justify-center gap-3 px-6 md:grid md:grid-cols-5 md:gap-[clamp(4px,1.5vw,16px)] md:px-10 lg:px-16"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            variants={staggerChild}
            className="group relative flex basis-[calc(33.333%-8px)] flex-col items-center justify-center overflow-hidden rounded-2xl border border-kio-line bg-kio-bg-soft p-[clamp(4px,2vw,20px)] text-center backdrop-blur-sm transition-all duration-300 hover:border-kio-accent/30 hover:bg-kio-bg md:basis-auto"
          >
            <div
              className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-kio-accent/12 to-transparent"
              style={{ animation: `scan-beam ${3.5 + i * 0.6}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }}
            />
            <div className="relative text-[clamp(1rem,5.2vw,2.9rem)] font-black leading-tight text-gradient">
              <Counter to={s.to} suffix={s.suffix} start={isInView} />
            </div>
            <div className="relative mt-1.5 text-[clamp(0.6rem,2vw,1.05rem)] text-kio-muted">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}