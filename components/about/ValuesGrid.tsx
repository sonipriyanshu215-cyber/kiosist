"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Lightbulb, Handshake, TrendingUp, Heart, RefreshCw } from "lucide-react";
import { values, type Value } from "@/content/values";
import { staggerParent, staggerChild, hoverLift } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const ICONS: Record<Value["icon"], typeof Award> = {
  award: Award,
  lightbulb: Lightbulb,
  handshake: Handshake,
  "trending-up": TrendingUp,
  heart: Heart,
  "refresh-cw": RefreshCw,
};

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#ec4899", "#f59e0b"];

export function ValuesGrid() {
  const rm = useReducedMotion();

  return (
    <section className="section-pad bg-kio-bg relative overflow-hidden">

      {/* Subtle ambient blob */}
      <motion.div
        className="pointer-events-none absolute right-[-180px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, var(--kio-accent), transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.18, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-kio relative z-10">
        <RevealOnScroll className="mb-14 text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
            Our <span className="text-color-cycle">Core Value</span>
          </h2>
          {/* Animated underline */}
          <motion.div
            className="mx-auto mt-3 h-0.5 w-20 rounded-full bg-gradient-to-r from-kio-accent to-kio-accent2"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "center" }}
          />
        </RevealOnScroll>

        <motion.div
          variants={staggerParent}
          initial={rm ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-x-[clamp(4px,1.6vw,24px)] gap-y-[clamp(6px,2.6vw,40px)]"
        >
          {values.map((v, i) => {
            const Icon = ICONS[v.icon];
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div key={v.id} variants={staggerChild} initial="rest" whileHover="hover" animate="rest">
                <motion.div
                  variants={hoverLift}
                  className="group relative flex h-full flex-col items-center rounded-2xl bg-kio-bg-soft px-[clamp(4px,1.6vw,24px)] py-[clamp(8px,2.6vw,40px)] text-center ring-1 ring-kio-line transition-all hover:ring-kio-accent hover:shadow-lg hover:shadow-kio-accent/10"
                >
                  {/* Ambient spotlight behind the icon */}
                  <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/4 rounded-full bg-kio-accent/20 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />

                  {/* Flat 2D icon badge */}
                  <motion.div
                    className="relative z-10 flex h-[clamp(24px,6.4vw,64px)] w-[clamp(24px,6.4vw,64px)] items-center justify-center rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}0d)`,
                      boxShadow: `0 0 0 1px ${color}33`,
                    }}
                    animate={rm ? {} : { y: [0, -6, 0] }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Icon className="h-[clamp(0.7rem,2.8vw,1.75rem)] w-[clamp(0.7rem,2.8vw,1.75rem)]" style={{ color }} strokeWidth={1.75} />
                  </motion.div>

                  <h3 className="relative z-10 mt-[clamp(3px,1.4vw,20px)] text-[clamp(0.55rem,1.8vw,1.125rem)] font-bold text-kio-ink">{v.title}</h3>
                  <p className="relative z-10 mt-[clamp(2px,0.8vw,8px)] text-[clamp(0.42rem,1.4vw,0.875rem)] leading-relaxed text-kio-muted">{v.body}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
