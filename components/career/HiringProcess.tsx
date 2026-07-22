"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Send, MessageSquare, GraduationCap, ClipboardCheck, Rocket } from "lucide-react";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

type HiringStep = {
  id: string;
  title: string;
  blurb: string;
  icon: typeof Send;
};

const HIRING_PROCESS: HiringStep[] = [
  {
    id: "step-1",
    title: "Apply Online",
    blurb: "Submit your application in minutes- no cover letter, no resume gatekeeping. Just tell us about you.",
    icon: Send,
  },
  {
    id: "step-2",
    title: "HR Interview",
    blurb: "A short conversation with our HR team to understand your background and answer your questions.",
    icon: MessageSquare,
  },
  {
    id: "step-3",
    title: "Training",
    blurb: "Paid, hands-on training on PMS systems, guest communication, and US hospitality standards.",
    icon: GraduationCap,
  },
  {
    id: "step-4",
    title: "Assessment",
    blurb: "A practical assessment to confirm you're ready to handle real guest interactions with confidence.",
    icon: ClipboardCheck,
  },
  {
    id: "step-5",
    title: "Go Live",
    blurb: "Start your first live shift with a mentor by your side, then grow from there.",
    icon: Rocket,
  },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"];

export function HiringProcess() {
  const rm = useReducedMotion();

  return (
    <section id="hiring-process" className="section-pad relative overflow-hidden bg-kio-bg scroll-mt-24">
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
          <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
            How you <span className="text-color-cycle">get hired.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-kio-muted">
            Five clear steps. Most candidates go live within two weeks of applying.
          </p>
        </RevealOnScroll>

        {/* Vertical timeline- same layout at every breakpoint */}
        <div className="relative mx-auto max-w-xl">
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
            {HIRING_PROCESS.map((step, i) => {
              const Icon = step.icon;
              const color = COLORS[i % COLORS.length];
              return (
                <motion.div key={step.id} variants={staggerChild} className="relative flex gap-5">
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
                    <h3 className="mt-1 text-base font-bold text-kio-ink">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-kio-muted">{step.blurb}</p>
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
