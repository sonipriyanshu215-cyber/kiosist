"use client";

import { motion, useReducedMotion } from "framer-motion";
import { perks } from "@/content/perks";
import { staggerParent, staggerChild, hoverLift } from "@/lib/motion";
import { LottiePlayer } from "@/components/primitives/LottiePlayer";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

export function PerksGrid() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-pad bg-kio-cream">
      <div className="container-kio">
        <RevealOnScroll className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-kio-accent">
            Life is Better Here
          </p>
          <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
            Benefits that actually matter
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-kio-muted">
            We take care of our people so they can take care of our clients.
          </p>
        </RevealOnScroll>

        <motion.div
          variants={staggerParent}
          initial={reducedMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {perks.map((p) => (
            <motion.div
              key={p.id}
              variants={staggerChild}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.div
                variants={hoverLift}
                className="flex h-full flex-col items-center rounded-2xl bg-kio-bg p-8 text-center ring-1 ring-kio-line transition-all hover:ring-kio-accent hover:shadow-lg hover:shadow-kio-accent/10"
              >
                <div className="mb-5 h-20 w-20">
                  <LottiePlayer src={p.lottieUrl} className="h-full w-full" />
                </div>
                <h3 className="text-lg font-bold text-kio-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-kio-muted">{p.body}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
