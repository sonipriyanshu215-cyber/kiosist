"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Headset, TrendingUp, Users, GraduationCap, ChevronRight } from "lucide-react";
import { careerPath, type CareerStage } from "@/content/roles";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const ICONS: Record<CareerStage["icon"], typeof Headset> = {
  headset: Headset,
  "trending-up": TrendingUp,
  users: Users,
  "graduation-cap": GraduationCap,
};

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"];

export function GrowthPath() {
  const rm = useReducedMotion();

  return (
    <section id="growth-path" className="section-pad relative overflow-hidden bg-kio-bg scroll-mt-24">
      {/* Ambient blob */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, var(--kio-accent), transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-kio relative z-10">
        <RevealOnScroll className="mb-16 text-center">
          <span className="section-label">Grow Without Limits</span>
          <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
            One seat today. <span className="text-color-cycle">Four paths forward.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-kio-muted">
            We promote from within- most of our team leads started right where you&apos;re
            starting: on the front desk.
          </p>
        </RevealOnScroll>

        {/* Desktop: horizontal path */}
        <motion.div
          variants={staggerParent}
          initial={rm ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="relative hidden lg:grid lg:grid-cols-4 lg:gap-6"
        >
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-11 h-px"
            style={{ background: "linear-gradient(90deg, var(--kio-line) 0%, var(--kio-line) 100%)" }}
          />
          {!rm && (
            <motion.div
              aria-hidden="true"
              className="absolute top-11 h-px w-24 -translate-y-1/2"
              style={{ background: "linear-gradient(90deg, transparent, var(--kio-accent), transparent)" }}
              animate={{ left: ["10%", "88%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
            />
          )}

          {careerPath.map((stage, i) => {
            const Icon = ICONS[stage.icon];
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div key={stage.id} variants={staggerChild} className="relative flex flex-col items-center text-center">
                {/* Step number badge */}
                <div
                  className="relative z-10 flex h-[88px] w-[88px] items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(18,20,30,0.9), rgba(22,25,38,0.8))",
                    boxShadow: `0 0 0 1px ${color}40, 0 0 32px ${color}25`,
                  }}
                >
                  <Icon className="h-9 w-9" style={{ color }} />
                  <span
                    className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: color }}
                  >
                    {i + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-kio-ink">{stage.title}</h3>
                <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-kio-muted">{stage.blurb}</p>

                {i < careerPath.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute -right-3 top-11 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-kio-bg lg:flex"
                  >
                    <ChevronRight className="h-5 w-5 text-kio-muted/40" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile / tablet: vertical path */}
        <div className="relative lg:hidden">
          <div
            aria-hidden="true"
            className="absolute left-6 top-2 bottom-2 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, var(--kio-line) 8%, var(--kio-line) 92%, transparent)" }}
          />
          <motion.div
            variants={staggerParent}
            initial={rm ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="flex flex-col gap-8"
          >
            {careerPath.map((stage, i) => {
              const Icon = ICONS[stage.icon];
              const color = COLORS[i % COLORS.length];
              return (
                <motion.div key={stage.id} variants={staggerChild} className="relative flex gap-5 pl-0">
                  <div
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(18,20,30,0.9), rgba(22,25,38,0.8))",
                      boxShadow: `0 0 0 1px ${color}40, 0 0 20px ${color}25`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <div className="pt-1.5">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide"
                      style={{ background: `${color}18`, border: `1px solid ${color}45`, color }}
                    >
                      STEP {i + 1}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-kio-ink">{stage.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-kio-muted">{stage.blurb}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
