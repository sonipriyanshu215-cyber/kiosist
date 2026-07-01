"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

export function FinalCTA() {
  const rm = useReducedMotion();

  return (
    <section className="bg-kio-bg-soft py-16 md:py-20 lg:py-24 px-6">
      <div className="mx-auto max-w-container">
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-3xl border border-kio-accent/25 p-8 md:p-[60px_48px] md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,.15) 0%, rgba(6,182,212,.1) 100%)",
            }}
          >
            {/* Animated glow orb — top right */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute right-[-80px] top-[-80px] h-[300px] w-[300px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(6,182,212,.25), transparent 70%)" }}
              animate={rm ? {} : { scale: [1, 1.2, 1], x: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Animated glow orb — bottom left */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[-60px] left-[-60px] h-[220px] w-[220px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,.2), transparent 70%)" }}
              animate={rm ? {} : { scale: [1, 1.3, 1], y: [0, -20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Rotating accent ring */}
            {!rm && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full border border-kio-accent2/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Text */}
            <div className="relative z-10">
              <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold text-kio-ink">
                The smallest smile can become a{" "}
                <span className="text-gradient">guest&apos;s biggest memory.</span>
              </h2>
              <p className="mt-2.5 text-[.95rem] text-kio-muted">
                If you believe that,{" "}
                <span className="text-color-cycle font-semibold">Kiosist</span>{" "}
                is the place for you.
              </p>
            </div>

            {/* Buttons */}
            <div className="relative z-10 mt-8 flex shrink-0 flex-wrap gap-3 md:mt-0">
              <div className="relative">
                {!rm && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(135deg, var(--kio-accent), var(--kio-accent2))" }}
                    animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                )}
                <Link href="/contact" className="btn-primary relative tracking-widest uppercase">
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
