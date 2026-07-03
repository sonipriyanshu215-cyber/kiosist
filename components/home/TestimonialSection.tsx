"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

export function TestimonialSection() {
  const rm = useReducedMotion();

  return (
    <section className="section-pad relative overflow-hidden bg-kio-bg-soft">
      {/* Central glow blob */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,.1) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating border ring */}
      {!rm && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-kio-accent/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      )}

      <RevealOnScroll className="container-kio relative z-10 mx-auto max-w-[860px] text-center">
        {/* Stars */}
        <motion.div
          className="mb-6 text-[1.4rem] tracking-[4px]"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ⭐⭐⭐⭐⭐
        </motion.div>

        {/* Opening quote- animated */}
        <motion.span
          aria-hidden="true"
          className="mb-2 block font-serif text-[5rem] leading-[0.5] text-kio-accent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 0.3, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          animate={rm ? {} : { opacity: [0.3, 0.5, 0.3] }}
        >
          &ldquo;
        </motion.span>

        <blockquote className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium italic leading-[1.7] text-kio-ink">
          Kiosist has helped us greatly. It&apos;s saving the hotel thousands of dollars each
          month- and we haven&apos;t compromised the personalized guest experience one bit.
          I&apos;d recommend this solution to every hotel proprietor.
        </blockquote>

        {/* Author */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-kio-accent to-kio-accent2 text-[1.1rem] font-bold text-white">
              RP
            </div>
            {!rm && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(135deg, var(--kio-accent), var(--kio-accent2))" }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            )}
          </div>
          <div className="text-left">
            <div className="font-bold text-kio-ink">Rakesh Patel</div>
            <div className="text-sm text-kio-muted">Owner, Americas Best Value Inn</div>
          </div>
        </motion.div>
      </RevealOnScroll>
    </section>
  );
}
