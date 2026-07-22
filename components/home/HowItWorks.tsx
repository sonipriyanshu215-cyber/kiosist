"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const STEPS = [
  {
    num: 1,
    title: "Consult & Customize",
    body: "Our team analyzes your hotel's workflow and tailors Kiosist to match your branding, PMS, and specific operational needs.",
  },
  {
    num: 2,
    title: "Install & Integrate",
    body: "We handle the full hardware installation and software integration. Your team receives dedicated training before go-live.",
  },
  {
    num: 3,
    title: "Launch & Optimize",
    body: "Go live with full support. We monitor performance, roll out updates, and continuously improve the system based on real data.",
  },
];

export function HowItWorks() {
  const rm = useReducedMotion();

  return (
    <section id="how" className="section-pad relative overflow-hidden">
      {/* Blob */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-100px] right-[-100px] h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,.18) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.15, 1], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Head */}
      <RevealOnScroll className="container-kio relative z-10 mb-16 mx-auto max-w-[560px] text-center">
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
          Up &amp; Running in<br />
          <span className="text-gradient">3 Easy Steps</span>
        </h2>
        <p className="mt-4 text-[.95rem] leading-[1.8] text-kio-muted">
          Getting <span className="text-color-cycle">KIOSIST</span> into your hotel is fast, painless, and fully supported
          by our team from start to finish.
        </p>
      </RevealOnScroll>

      {/* Steps */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="container-kio relative z-10 grid gap-8 md:grid-cols-3"
      >
        {/* Connector line (desktop only) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[calc(16.67%+12px)] right-[calc(16.67%+12px)] top-9 hidden h-px md:block"
          style={{ background: "linear-gradient(90deg, var(--kio-accent), var(--kio-accent2), var(--kio-accent))", opacity: 0.4 }}
        />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            variants={staggerChild}
            className="relative z-10 text-center px-6"
          >
            {/* Pulse ring behind number */}
            <div className="relative mx-auto mb-6 h-[72px] w-[72px]">
              {!rm && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(135deg, var(--kio-accent), var(--kio-accent2))" }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                />
              )}
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-kio-accent to-kio-accent2 text-[1.4rem] font-black text-white shadow-[0_0_30px_var(--kio-glow)]">
                {step.num}
              </div>
            </div>

            <h3 className="mb-2.5 text-[1.05rem] font-bold text-kio-ink">{step.title}</h3>
            <p className="text-[.875rem] leading-[1.75] text-kio-muted">{step.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
