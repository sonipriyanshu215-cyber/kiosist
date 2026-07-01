"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { to: 3,   suffix: "M+", label: "Guests Attended" },
  { to: 150, suffix: "+",  label: "Workforce"       },
  { to: 45,  suffix: "+",  label: "Brands"          },
  { to: 100, suffix: "+",  label: "Hotels Onboard"  },
  { to: 70,  suffix: "+",  label: "Locations"       },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const duration = 2200;
    const step = (t: number) => {
      const progress = Math.min((t - start) / duration, 1);
      /* ease-out quart — fast start, smooth finish */
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatCounter() {
  return (
    <section className="py-14">
      <div className="mx-auto grid max-w-container grid-cols-2 gap-6 px-6 md:grid-cols-5 md:px-10 lg:px-16">
        {STATS.map((s, i) => (
          <div key={s.label} className={`group relative overflow-hidden rounded-2xl border border-kio-line bg-kio-bg-soft p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-kio-accent/30 hover:bg-kio-bg${i === STATS.length - 1 && STATS.length % 2 !== 0 ? " col-span-2 md:col-span-1" : ""}`}>
            {/* Scanning beam — staggered per stat */}
            <div
              className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-kio-accent/12 to-transparent"
              style={{ animation: `scan-beam ${3.5 + i * 0.6}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }}
            />
            <div className="relative text-[2.4rem] font-black leading-none text-gradient">
              <Counter to={s.to} suffix={s.suffix} />
            </div>
            <div className="relative mt-1.5 text-sm text-kio-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
