"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { perks } from "@/content/perks";
import { staggerParent, staggerChild, hoverLift } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

export function PerksGrid() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-pad bg-kio-cream">
      <div className="container-kio">
        <RevealOnScroll className="mb-14 text-center">
          <p className="section-label">Life is Better Here</p>
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
          className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {perks.map((p, i) => {
            const tilt = i % 2 === 0 ? -3 : 3;
            return (
              <motion.div
                key={p.id}
                variants={staggerChild}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="pt-14"
              >
                <motion.div
                  variants={hoverLift}
                  className="group relative flex h-full flex-col items-center rounded-2xl bg-kio-bg pb-8 pt-32 text-center ring-1 ring-kio-line transition-all hover:ring-kio-accent hover:shadow-lg hover:shadow-kio-accent/10"
                >
                  {/* Ambient spotlight behind the character */}
                  <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kio-accent/25 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />

                  {/* Illustration- bleeds out above the card, floats idly, straightens on hover.
                      Centering lives on this static wrapper: framer-motion's `animate` below sets
                      its own inline `transform` (y/rotate/scale), which would otherwise clobber a
                      Tailwind `-translate-x-1/2` placed on the same element. */}
                  <div className="absolute -top-14 left-1/2 h-40 w-40 -translate-x-1/2 sm:h-44 sm:w-44">
                    <motion.div
                      className="relative h-full w-full"
                      initial={{ rotate: tilt }}
                      animate={
                        reducedMotion
                          ? { rotate: tilt }
                          : { y: [0, -10, 0], rotate: [tilt, -tilt, tilt] }
                      }
                      whileHover={{ rotate: 0, scale: 1.08 }}
                      transition={
                        reducedMotion
                          ? { duration: 0.3 }
                          : { y: { duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
                              rotate: { duration: 7 + i * 0.5, repeat: Infinity, ease: "easeInOut" } }
                      }
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.4)]"
                        sizes="(max-width: 640px) 160px, 176px"
                      />
                    </motion.div>
                  </div>

                  <h3 className="relative mt-2 text-lg font-bold text-kio-ink">{p.title}</h3>
                  <p className="relative mt-2 px-6 text-sm leading-relaxed text-kio-muted">{p.body}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
