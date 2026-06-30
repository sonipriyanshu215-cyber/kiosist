"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Lightbulb, Building2, Hotel, TrendingUp, Users, Globe } from "lucide-react";
import { milestones } from "@/content/milestones";

const ICONS  = [Lightbulb, Building2, Hotel, TrendingUp, Users, Globe];
const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

export function TimelineScene() {
  const rm         = useReducedMotion();
  const outerRef   = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [xMax, setXMax] = useState(0);

  /* Calculate how far to translate the track horizontally */
  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      setXMax(-(trackRef.current.scrollWidth - window.innerWidth));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  /* Map vertical scroll progress of the outer container → horizontal x */
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, rm ? 0 : xMax]);

  return (
    <section className="relative">
      {/* ── Section header (outside the sticky zone) ── */}
      <div className="container-kio pb-10 pt-24 text-center">
        <span className="section-label">Our Journey</span>
        <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
          From idea to 100+ hotels
        </h2>
        <p className="mt-4 text-kio-muted">
          Scroll through our story — one milestone at a time.
        </p>
        {/* Scroll hint */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-kio-muted/60">
          <motion.span
            animate={rm ? {} : { x: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          <span>Scroll down to explore</span>
          <motion.span
            animate={rm ? {} : { x: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            →
          </motion.span>
        </div>
      </div>

      {/* ── Outer scroll container — height controls how long the pin lasts ── */}
      <div ref={outerRef} style={{ height: "400vh" }}>

        {/* ── Sticky viewport ── */}
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Timeline spine */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
            style={{
              background: "linear-gradient(90deg, transparent, var(--kio-line) 5%, var(--kio-line) 95%, transparent)",
            }}
          />

          {/* Shimmer running along spine */}
          {!rm && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 h-px w-40 -translate-y-1/2"
              style={{
                background: "linear-gradient(90deg, transparent, var(--kio-accent), transparent)",
              }}
              animate={{ left: ["-15%", "115%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
          )}

          {/* Progress bar at bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 h-0.5 w-48 rounded-full overflow-hidden bg-kio-line">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-kio-accent to-kio-accent2"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>

          {/* ── Horizontally moving track ── */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full w-max items-center gap-20 pl-[12vw] pr-[25vw]"
          >
            {milestones.map((m, i) => {
              const Icon  = ICONS[i] ?? Lightbulb;
              const color = COLORS[i % COLORS.length];
              const above = i % 2 === 0;

              return (
                <div
                  key={m.id}
                  className="relative flex h-full w-72 shrink-0 items-center justify-center"
                >
                  {/* Spine dot with pulse rings */}
                  <div className="absolute left-1/2 top-1/2 z-20" style={{ transform: "translate(-50%, -50%)" }}>
                    {/* Pulse rings — positioned with calc so Framer Motion's scale doesn't fight the centering */}
                    {!rm && [0, 1].map(j => {
                      const size = 22 + j * 14;
                      return (
                        <motion.span
                          key={j}
                          aria-hidden="true"
                          className="absolute rounded-full border"
                          style={{
                            borderColor: color,
                            width:  size,
                            height: size,
                            left:   `calc(50% - ${size / 2}px)`,
                            top:    `calc(50% - ${size / 2}px)`,
                            opacity: 0,
                          }}
                          animate={{ scale: [0.85, 1.5, 0.85], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: j * 0.9 }}
                        />
                      );
                    })}
                    {/* Core dot */}
                    <span
                      className="relative z-10 block h-3 w-3 rounded-full border-2"
                      style={{ borderColor: color, background: "#0d1117" }}
                    />
                  </div>

                  {/* Connector line */}
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 w-px -translate-x-1/2"
                    style={{
                      background: `linear-gradient(${above ? "to top" : "to bottom"}, ${color}70, transparent)`,
                      top:    above ? undefined : "calc(50% + 10px)",
                      bottom: above ? "calc(50% + 10px)" : undefined,
                      height: "calc(22% - 10px)",
                    }}
                  />

                  {/* Milestone card */}
                  <div
                    className="absolute inset-x-0 rounded-2xl p-6 text-center ring-1 backdrop-blur-sm transition-all duration-300"
                    style={{
                      background:  `linear-gradient(135deg, rgba(18,20,30,0.82), rgba(22,25,38,0.72))`,
                      ringColor:   "transparent",
                      boxShadow:   `0 0 0 1px ${color}28`,
                      bottom: above ? "calc(50% + 2.5rem)" : undefined,
                      top:    above ? undefined : "calc(50% + 2.5rem)",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${color}18`, border: `1px solid ${color}45` }}
                    >
                      <Icon className="h-5 w-5" style={{ color }} />
                    </div>

                    {/* Year */}
                    <div
                      className="font-mono text-4xl font-bold leading-none"
                      style={{ color }}
                    >
                      {m.year}
                    </div>

                    <h3 className="mt-2 text-base font-bold text-kio-ink">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-kio-muted">{m.body}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
