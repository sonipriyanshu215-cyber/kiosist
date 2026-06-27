"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Lightbulb, Building2, Hotel, TrendingUp, Users, Globe } from "lucide-react";
import { milestones } from "@/content/milestones";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const MILESTONE_ICONS = [Lightbulb, Building2, Hotel, TrendingUp, Users, Globe];

/* Pulse rings that sit behind the spine dot */
function SpineDot({ color }: { color: string }) {
  const rm = useReducedMotion();
  return (
    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      {/* Outer pulse rings */}
      {[0, 1].map((j) => (
        <motion.span
          key={j}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ borderColor: color, width: 32 + j * 18, height: 32 + j * 18 }}
          animate={rm ? {} : { scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: j * 0.75,
          }}
        />
      ))}
      {/* Core dot */}
      <span
        className="relative z-10 block h-4 w-4 rounded-full border-2 border-kio-accent bg-kio-bg"
        style={{ borderColor: color }}
      />
    </div>
  );
}

export function TimelineScene() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rm       = useReducedMotion();

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | null = null;

    async function init() {
      const { default: gsap }  = await import("gsap");
      const { ScrollTrigger }  = await import("gsap/ScrollTrigger");

      if (!mounted || !wrapRef.current || !trackRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      (window as Window & { gsap?: unknown }).gsap = { ScrollTrigger };

      const track     = trackRef.current;
      const wrap      = wrapRef.current;
      const distance  = track.scrollWidth - window.innerWidth;

      if (distance <= 0) return;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start:   "top top",
          end:     `+=${distance}`,
          scrub:   1,
          pin:     true,
          anticipatePin:     1,
          invalidateOnRefresh: true,
        },
      });

      cleanup = () => { tween.scrollTrigger?.kill(); tween.kill(); };
    }

    init();
    return () => { mounted = false; cleanup?.(); };
  }, []);

  const accentColors = [
    "var(--kio-accent)",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ec4899",
  ];

  return (
    <section className="bg-kio-cream">
      {/* Header */}
      <div className="container-kio py-20">
        <RevealOnScroll className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-kio-accent">
            Our Journey
          </p>
          <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
            From idea to 100+ hotels
          </h2>
          {/* Animated underline */}
          <motion.div
            className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-kio-accent to-kio-accent2"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "center" }}
          />
          <p className="mt-4 text-kio-muted">
            Scroll through our story — one milestone at a time.
          </p>
        </RevealOnScroll>
      </div>

      {/* Pinned horizontal scroll */}
      <div ref={wrapRef} className="relative overflow-hidden" style={{ height: "100vh" }}>

        {/* Timeline spine with animated gradient overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--kio-line) 8%, var(--kio-line) 92%, transparent)" }}
        />
        {/* Shimmer running along the spine */}
        {!rm && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 h-px w-32 -translate-y-1/2"
            style={{ background: "linear-gradient(90deg, transparent, var(--kio-accent), transparent)" }}
            animate={{ left: ["-10%", "110%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          />
        )}

        <div
          ref={trackRef}
          className="flex h-full items-center gap-12 pl-[10vw] pr-[20vw]"
          style={{ width: "max-content" }}
        >
          {milestones.map((m, i) => {
            const Icon   = MILESTONE_ICONS[i] ?? Lightbulb;
            const above  = i % 2 === 0;
            const color  = accentColors[i % accentColors.length];

            return (
              <div key={m.id} className="relative h-full w-72 shrink-0">

                <SpineDot color={color} />

                {/* Connector line from dot to card */}
                <motion.div
                  aria-hidden="true"
                  className="absolute left-1/2 w-px -translate-x-1/2"
                  style={{
                    background: `linear-gradient(${above ? "to top" : "to bottom"}, ${color}60, transparent)`,
                    top:    above ? undefined : "calc(50% + 8px)",
                    bottom: above ? "calc(50% + 8px)" : undefined,
                    height: "calc(50% - 3rem)",
                  }}
                  initial={{ scaleY: 0, originY: above ? 1 : 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Milestone card */}
                <motion.div
                  className="absolute inset-x-0 rounded-2xl bg-kio-bg p-6 shadow-lg ring-1 ring-kio-line text-center cursor-default"
                  style={above
                    ? { bottom: "calc(50% + 1.5rem)" }
                    : { top:    "calc(50% + 1.5rem)" }
                  }
                  initial={{ opacity: 0, y: above ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={rm ? {} : {
                    y: above ? -6 : 6,
                    boxShadow: `0 12px 40px ${color}30`,
                    borderColor: color,
                  }}
                >
                  {/* Icon badge */}
                  <motion.div
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-kio-primary transition-colors duration-300"
                    style={{ border: `1px solid ${color}40` }}
                    whileHover={rm ? {} : { scale: 1.1, rotate: [0, -8, 6, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </motion.div>

                  {/* Year — pulsing on hover */}
                  <motion.div
                    className="font-mono text-4xl font-bold"
                    style={{ color }}
                    whileHover={rm ? {} : { scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                  >
                    {m.year}
                  </motion.div>

                  <h3 className="mt-2 text-base font-bold text-kio-ink">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-kio-muted">{m.body}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
