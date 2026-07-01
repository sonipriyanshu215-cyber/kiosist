"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { to: 300000, suffix: "+", label: "Guests Attended", indian: true },
  { to: 150,    suffix: "+", label: "Workforce"       },
  { to: 45,     suffix: "+", label: "Brands"          },
  { to: 100,    suffix: "+", label: "Hotels Onboard"  },
  { to: 70,     suffix: "+", label: "Locations"       },
];

function toIndian(n: number): string {
  const s = String(n);
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest  = s.slice(0, -3);
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
}

function Counter({ to, suffix = "", indian = false }: { to: number; suffix?: string; indian?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const duration = 2200;
    const step = (t: number) => {
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, to]);

  return <span ref={ref}>{indian ? toIndian(count) : count}{suffix}</span>;
}

export function StatCounter() {
  return (
    <section className="py-12 md:py-16">
      <div className="mb-10 text-center px-6">
        <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-extrabold text-kio-ink">
          Every Number <span className="text-color-cycle">Tells a Story.</span>
        </h2>
      </div>
      <div className="mx-auto grid max-w-container grid-cols-2 gap-4 px-6 md:grid-cols-5 md:px-10 lg:px-16">
        {(STATS as { to: number; suffix: string; label: string; indian?: boolean }[]).map((s, i) => (
          <div key={s.label} className={`group relative overflow-hidden rounded-2xl border border-kio-line bg-kio-bg-soft p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-kio-accent/30 hover:bg-kio-bg${i === STATS.length - 1 && STATS.length % 2 !== 0 ? " col-span-2 md:col-span-1" : ""}`}>
            <div
              className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-kio-accent/12 to-transparent"
              style={{ animation: `scan-beam ${3.5 + i * 0.6}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }}
            />
            <div className={`relative font-black leading-tight text-gradient ${s.indian ? "text-[clamp(1.2rem,2vw,1.7rem)]" : "text-[2.4rem]"}`}>
              <Counter to={s.to} suffix={s.suffix} indian={s.indian} />
            </div>
            <div className="relative mt-1.5 text-sm text-kio-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
