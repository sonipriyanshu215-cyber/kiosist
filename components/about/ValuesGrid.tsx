"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Lightbulb, Users, TrendingUp } from "lucide-react";
import { values, type Value } from "@/content/values";
import { staggerParent, staggerChild, hoverLift } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const ICONS: Record<Value["icon"], typeof Award> = {
  award: Award,
  lightbulb: Lightbulb,
  users: Users,
  "trending-up": TrendingUp,
};

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"];

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
          <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
            What guides every shift, every interaction
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
          className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((v, i) => {
            const Icon = ICONS[v.icon];
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div key={v.id} variants={staggerChild} initial="rest" whileHover="hover" animate="rest">
                <motion.div
                  variants={hoverLift}
                  className="group relative flex h-full flex-col items-center rounded-2xl bg-kio-bg-soft px-6 py-10 text-center ring-1 ring-kio-line transition-all hover:ring-kio-accent hover:shadow-lg hover:shadow-kio-accent/10"
                >
                  {/* Ambient spotlight behind the icon */}
                  <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/4 rounded-full bg-kio-accent/20 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />

                  {/* Flat 2D icon badge */}
                  <motion.div
                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}0d)`,
                      boxShadow: `0 0 0 1px ${color}33`,
                    }}
                    animate={rm ? {} : { y: [0, -6, 0] }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Icon className="h-7 w-7" style={{ color }} strokeWidth={1.75} />
                  </motion.div>

                  <h3 className="relative z-10 mt-5 text-lg font-bold text-kio-ink">{v.title}</h3>
                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-kio-muted">{v.body}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
