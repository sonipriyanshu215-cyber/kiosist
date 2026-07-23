"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const STATS = [
  { to: 7,      suffix: "M+", label: "Guests Attended" },
  { to: 150,    suffix: "+", label: "Team"       },
  { to: 45,     suffix: "+", label: "Brands"          },
  { to: 100,    suffix: "+", label: "Hotels Onboard"  },
  { to: 70,     suffix: "+", label: "Locations"       },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }
    let cancelled = false;
    const start = performance.now();
    const duration = 2200;
    const step = (t: number) => {
      if (cancelled) return;
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    return () => { cancelled = true; };
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatCounter({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "pt-16 pb-8 md:pt-20 md:pb-10 lg:pt-24 lg:pb-12" : "section-pad"}>
      <RevealOnScroll className="mb-10 text-center px-6">
        <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-extrabold text-kio-ink">
          Every Number <span className="text-color-cycle">Tells a Story.</span>
        </h2>
      </RevealOnScroll>
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-container grid-cols-2 gap-4 px-6 md:grid-cols-5 md:px-10 lg:px-16"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            variants={staggerChild}
            className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-kio-line bg-kio-bg-soft p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-kio-accent/30 hover:bg-kio-bg${i === STATS.length - 1 && STATS.length % 2 !== 0 ? " col-span-2 md:col-span-1" : ""}`}
          >
            <div
              className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-kio-accent/12 to-transparent"
              style={{ animation: `scan-beam ${3.5 + i * 0.6}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }}
            />
            <div className="relative text-[2.4rem] font-black leading-tight text-gradient">
              <Counter to={s.to} suffix={s.suffix} />
            </div>
            <div className="relative mt-1.5 text-sm text-kio-muted">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
