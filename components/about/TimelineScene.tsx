"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Lightbulb, Building2, Hotel, TrendingUp, Users, Globe } from "lucide-react";
import { milestones } from "@/content/milestones";

const ICONS  = [Lightbulb, Building2, Hotel, TrendingUp, Users, Globe];
const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

/* ── Shared section header ── */
function Header() {
  return (
    <div className="container-kio pb-10 pt-24 text-center">
      <span className="section-label">Our Journey</span>
      <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
        Five Years. One Front Desk. <span className="text-color-cycle">Everywhere.</span>
      </h2>
      <p className="mt-4 text-kio-muted">
        From one idea in Surat to 100+ hotels across the USA- here&apos;s how we got here.
      </p>
    </div>
  );
}

/* ── Mobile: vertical stacked timeline ── */
function VerticalTimeline() {
  return (
    <div className="container-kio pb-20">
      <div className="relative">
        {/* Vertical spine */}
        <div
          aria-hidden="true"
          className="absolute left-5 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, transparent, var(--kio-line) 10%, var(--kio-line) 90%, transparent)" }}
        />

        <div className="flex flex-col gap-8">
          {milestones.map((m, i) => {
            const Icon  = ICONS[i] ?? Lightbulb;
            const color = COLORS[i % COLORS.length];

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-14"
              >
                {/* Dot on spine */}
                <div
                  className="absolute left-[14px] top-4 h-3 w-3 rounded-full border-2"
                  style={{ borderColor: color, background: "#0d1117", boxShadow: `0 0 12px 2px ${color}80` }}
                />

                {/* Card */}
                <div
                  className="rounded-2xl p-5 backdrop-blur-sm"
                  style={{
                    background: "linear-gradient(135deg, rgba(18,20,30,0.82), rgba(22,25,38,0.72))",
                    boxShadow: `0 0 0 1px ${color}30, 0 0 32px ${color}22`,
                  }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${color}18`, border: `1px solid ${color}45` }}
                    >
                      <Icon className="h-4 w-4" style={{ color }} />
                    </div>
                    <span className="font-mono text-2xl font-bold" style={{ color }}>
                      {m.year}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-kio-ink">{m.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-kio-muted">{m.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Desktop: pinned horizontal scroll ── */
function HorizontalTimeline() {
  const rm       = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [xMax, setXMax] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      setXMax(-(trackRef.current.scrollWidth - window.innerWidth));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, rm ? 0 : xMax]);

  return (
    <>
      {/* Outer scroll container */}
      <div ref={outerRef} style={{ height: "400vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Spine */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
            style={{ background: "linear-gradient(90deg, transparent, var(--kio-line) 5%, var(--kio-line) 95%, transparent)" }}
          />

          {/* Shimmer */}
          {!rm && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 h-px w-40 -translate-y-1/2"
              style={{ background: "linear-gradient(90deg, transparent, var(--kio-accent), transparent)" }}
              animate={{ left: ["-15%", "115%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
          )}

          {/* Progress bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 h-0.5 w-48 rounded-full overflow-hidden bg-kio-line">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-kio-accent to-kio-accent2"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>

          {/* Moving track */}
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
                  {/* Dot */}
                  <div
                    className="absolute left-1/2 top-1/2 z-20"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
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
                    <span
                      className="relative z-10 block h-3 w-3 rounded-full border-2"
                      style={{ borderColor: color, background: "#0d1117", boxShadow: `0 0 14px 3px ${color}90` }}
                    />
                  </div>

                  {/* Connector */}
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

                  {/* Card */}
                  <div
                    className="absolute inset-x-0 rounded-2xl p-6 text-center backdrop-blur-sm"
                    style={{
                      background: "linear-gradient(135deg, rgba(18,20,30,0.82), rgba(22,25,38,0.72))",
                      boxShadow:  `0 0 0 1px ${color}28, 0 0 36px ${color}22`,
                      bottom: above ? "calc(50% + 2.5rem)" : undefined,
                      top:    above ? undefined : "calc(50% + 2.5rem)",
                    }}
                  >
                    <div
                      className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${color}18`, border: `1px solid ${color}45` }}
                    >
                      <Icon className="h-5 w-5" style={{ color }} />
                    </div>
                    <div className="font-mono text-4xl font-bold leading-none" style={{ color }}>
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
    </>
  );
}

/* ── Main export ── */
export function TimelineScene() {
  const rm = useReducedMotion();

  return (
    <section className="relative">
      {/* Ambient glow- scoped to the header only; must not wrap the sticky
          scroll track below, since any ancestor with overflow != visible
          breaks `position: sticky` and makes the pinned timeline jump on scroll */}
      <div className="relative overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-20 h-[560px] w-[560px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,.14) 0%, transparent 70%)" }}
          animate={rm ? {} : { scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-20 h-[480px] w-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,.12) 0%, transparent 70%)" }}
          animate={rm ? {} : { scale: [1, 1.22, 1], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <Header />
      </div>

      <div className="relative z-10">
        {/* Mobile: vertical */}
        <div className="md:hidden">
          <VerticalTimeline />
        </div>

        {/* Desktop: horizontal scroll */}
        <div className="hidden md:block">
          <HorizontalTimeline />
        </div>
      </div>
    </section>
  );
}
