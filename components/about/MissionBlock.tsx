"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const HEADING = "To make 24/7 front desk excellence achievable for every US hotel.";

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
        <div className="mx-auto max-w-3xl text-center">

          <RevealOnScroll>
            {/* Animated accent label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-kio-accent">
                {/* Pulsing dot */}
                <motion.span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-kio-accent"
                  animate={rm ? {} : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                Our Mission
              </p>
            </motion.div>
          </RevealOnScroll>

          {/* Word-by-word heading reveal */}
          <motion.h2
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 text-3xl font-bold text-white md:text-4xl leading-snug"
          >
            {HEADING.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={rm ? {} : wordVariants}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
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

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 leading-relaxed text-white/70"
          >
            We believe no guest should arrive at an unstaffed front desk. And no hotel owner
            should have to choose between quality coverage and a sustainable cost structure.
            Kiosist exists to eliminate that trade-off.
          </motion.p>

          {/* Three stat chips */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
          >
            {[
              { n: "24/7", l: "Coverage" },
              { n: "< 30s", l: "Response Time" },
              { n: "100+", l: "Hotels Served" },
            ].map(({ n, l }) => (
              <motion.div
                key={l}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={rm ? {} : { scale: 1.05, y: -2 }}
                className="rounded-full border border-kio-accent/25 bg-kio-accent/10 px-5 py-2 text-center backdrop-blur-sm"
              >
                <span className="block text-xl font-bold text-kio-accent">{n}</span>
                <span className="text-xs text-white/60">{l}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
