"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const HEADING = "To provide hassle-free, cost-effective, and unique front desk assistance, creating memorable stays for every guest who walks through the hotel doors.";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function MissionBlock() {
  const rm = useReducedMotion();

  return (
    <section className="section-pad bg-kio-primary relative overflow-hidden">

      {/* Animated background blobs */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full opacity-[0.12]"
        style={{ background: "radial-gradient(circle, var(--kio-accent), transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.15, 1], x: [0, 24, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-40 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full opacity-[0.09]"
        style={{ background: "radial-gradient(circle, var(--kio-accent2), transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.2, 1], x: [0, -20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Horizontal scan line */}
      {!rm && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-kio-accent/20 to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />
      )}

      <div className="container-kio relative z-10">
        <RevealOnScroll className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-white">
            Our Mission and <span className="text-gradient-shimmer">Vision</span>
          </h2>
          <p className="mt-4 text-[.95rem] leading-[1.8] text-white/70">
            A shared purpose that drives our long-term vision and the actions we take
            every day to achieve it.
          </p>
        </RevealOnScroll>

        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-12">

          {/* Text column */}
          <div className="text-center lg:flex-1">
            <span className="text-xs font-bold uppercase tracking-[.15em] text-kio-accent2">
              Mission
            </span>

            {/* Word-by-word heading reveal */}
            <motion.h2
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.03, delayChildren: 0.15 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-4 text-3xl font-bold text-white md:text-4xl leading-snug lg:text-2xl xl:text-3xl"
            >
              {HEADING.split(" ").map((word, i) => (
                <Fragment key={i}>
                  <motion.span variants={rm ? {} : wordVariants} className="inline-block">
                    {word}
                  </motion.span>{" "}
                </Fragment>
              ))}
            </motion.h2>

            {/* Animated accent divider */}
            <motion.div
              className="mx-auto mt-6 h-px w-24 rounded-full bg-gradient-to-r from-kio-accent to-kio-accent2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "center" }}
            />
          </div>

          {/* Mission miniature - right side */}
          <RevealOnScroll className="flex justify-center lg:flex-none lg:justify-end">
            <motion.div
              className="relative h-40 w-40 md:h-52 md:w-52"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full opacity-40 blur-xl"
                style={{ background: "radial-gradient(circle, var(--kio-accent), transparent 70%)" }}
                animate={rm ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <Image
                src="/img/about/mission-1.png"
                alt="Mission - target hit atop a mountain, flanked by a flag and compass"
                width={2000}
                height={1889}
                className="relative h-full w-full object-contain"
                priority
              />
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
