"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { value: 1000, suffix: "s", prefix: "$", label: "Saved per hotel per month" },
  { raw: "24/7",                             label: "Always-on guest service" },
  { raw: "3 sec",                            label: "Average check-in time" },
  { raw: "5★",                               label: "Guest satisfaction rating" },
];

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const duration = 1800;
    const step = (t: number) => {
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, to]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export function StatCounter() {
  return (
    <section className="border-y border-kio-line bg-kio-bg-soft">
      <div className="mx-auto grid max-w-container grid-cols-2 gap-10 px-6 py-10 md:grid-cols-4 md:px-10 lg:px-16">
        {STATS.map((s, i) => (
          <div key={s.label} className="group relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300 hover:bg-kio-bg/60">
            {/* Scanning beam — staggered per stat */}
            <div
              className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-kio-accent/12 to-transparent"
              style={{ animation: `scan-beam ${3.5 + i * 0.6}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }}
            />
            <div className="relative text-[2.4rem] font-black leading-none text-gradient">
              {s.raw ? (
                s.raw
              ) : (
                <Counter to={s.value!} suffix={s.suffix} prefix={s.prefix} />
              )}
            </div>
            <div className="relative mt-1.5 text-sm text-kio-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
