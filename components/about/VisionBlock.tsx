"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const TEXT =
  "To redefine the future of hospitality by combining exceptional people with innovative technology to create unforgettable guest experiences.";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function VisionBlock() {
  const rm = useReducedMotion();

  return (
    <section className="section-pad bg-kio-primary relative overflow-hidden">

      {/* Animated background blobs */}
      <motion.div
        className="pointer-events-none absolute -right-40 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full opacity-[0.12]"
        style={{ background: "radial-gradient(circle, var(--kio-accent), transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.15, 1], x: [0, -24, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full opacity-[0.09]"
        style={{ background: "radial-gradient(circle, var(--kio-accent2), transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-kio relative z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-12">

          {/* Vision icon - left side */}
          <RevealOnScroll className="flex justify-center lg:flex-none lg:justify-start">
            <motion.div
              className="relative h-40 w-40 md:h-52 md:w-52"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full opacity-40 blur-xl"
                style={{ background: "radial-gradient(circle, var(--kio-accent), transparent 70%)" }}
                animate={rm ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <Image
                src="/img/about/vision .png"
                alt="Vision - an eye formed from a lightbulb, brain, and an upward arrow"
                width={2000}
                height={1889}
                className="relative h-full w-full object-contain"
                priority
              />
            </motion.div>
          </RevealOnScroll>

          {/* Text column */}
          <div className="text-center lg:flex-1">
            <span className="text-xs font-bold uppercase tracking-[.15em] text-kio-accent2">
              Vision
            </span>

            {/* Word-by-word reveal- matches MissionBlock's heading treatment */}
            <motion.p
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.02, delayChildren: 0.15 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mx-auto mt-4 max-w-none text-xl font-bold leading-relaxed text-white md:text-2xl"
            >
              {TEXT.split(" ").map((word, i) => (
                <Fragment key={i}>
                  <motion.span variants={rm ? {} : wordVariants} className="inline-block">
                    {word}
                  </motion.span>{" "}
                </Fragment>
              ))}
            </motion.p>

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
        </div>
      </div>
    </section>
  );
}
