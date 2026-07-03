"use client";

import { motion, useReducedMotion } from "framer-motion";
import { values } from "@/content/values";
import { staggerParent, staggerChild } from "@/lib/motion";
import { LottiePlayer } from "@/components/primitives/LottiePlayer";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

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
          <p className="section-label">Core Values</p>
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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((v, i) => (
            <motion.div
              key={v.id}
              variants={staggerChild}
              className={i === values.length - 1 && values.length % 2 !== 0 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <motion.div
                initial="rest"
                whileHover={rm ? "rest" : "hover"}
                animate="rest"
                variants={{
                  rest:  { y: 0,  scale: 1,    boxShadow: "0 0 0px rgba(59,130,246,0)" },
                  hover: { y: -6, scale: 1.02, boxShadow: "0 8px 40px rgba(59,130,246,0.18)" },
                }}
                transition={{ duration: 0.26, ease: "easeOut" }}
                className="group flex h-full flex-col rounded-2xl bg-kio-bg-soft p-8 ring-1 ring-kio-line transition-colors duration-300 hover:ring-kio-accent/50"
              >
                {/* Icon — bounces on card hover */}
                <motion.div
                  className="mb-5 h-16 w-16"
                  variants={{
                    rest:  { rotate: 0,  scale: 1 },
                    hover: { rotate: rm ? 0 : [0, -8, 6, 0], scale: 1.1 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <LottiePlayer src={v.lottieUrl} className="h-full w-full" />
                </motion.div>

                {/* Animated accent bar that grows from left on hover */}
                <div className="mb-3 h-px w-full overflow-hidden rounded-full bg-kio-line">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-kio-accent to-kio-accent2"
                    variants={{
                      rest:  { scaleX: 0, originX: "0%" },
                      hover: { scaleX: 1, originX: "0%" },
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>

                <h3 className="text-lg font-bold text-kio-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-kio-muted">{v.body}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
