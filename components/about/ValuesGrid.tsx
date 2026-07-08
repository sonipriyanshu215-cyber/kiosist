"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { values } from "@/content/values";
import { staggerParent, staggerChild, hoverLift } from "@/lib/motion";
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
          className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6"
        >
          {values.map((v, i) => {
            const tilt = i % 2 === 0 ? -3 : 3;
            // Center an incomplete last row under the 3-card-wide grid above
            // by doubling the track count (each card spans 2 of 6 sub-columns,
            // which renders pixel-identical to a plain 3-col grid) and offsetting
            // the first card of a short row so leftover space splits evenly.
            const lgRemainder = values.length % 3;
            const isFirstOfShortLgRow = lgRemainder !== 0 && i === values.length - lgRemainder;
            const lgCenterClass = isFirstOfShortLgRow
              ? lgRemainder === 2 ? "lg:col-start-2" : "lg:col-start-3"
              : "";
            return (
              <motion.div
                key={v.id}
                variants={staggerChild}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className={`pt-14 lg:col-span-2 ${i === values.length - 1 && values.length % 2 !== 0 ? "sm:col-span-2" : ""} ${lgCenterClass}`}
              >
                <motion.div
                  variants={hoverLift}
                  className="group relative flex h-full flex-col items-center rounded-2xl bg-kio-bg-soft pb-8 pt-32 text-center ring-1 ring-kio-line transition-all hover:ring-kio-accent hover:shadow-lg hover:shadow-kio-accent/10"
                >
                  {/* Ambient spotlight behind the character */}
                  <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kio-accent/25 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />

                  {/* Illustration- bleeds out above the card, floats idly, straightens on hover */}
                  <div className="absolute -top-14 left-1/2 h-40 w-40 -translate-x-1/2 sm:h-44 sm:w-44">
                    <motion.div
                      className="relative h-full w-full"
                      initial={{ rotate: tilt }}
                      animate={
                        rm
                          ? { rotate: tilt }
                          : { y: [0, -10, 0], rotate: [tilt, -tilt, tilt] }
                      }
                      whileHover={{ rotate: 0, scale: 1.08 }}
                      transition={
                        rm
                          ? { duration: 0.3 }
                          : { y: { duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
                              rotate: { duration: 7 + i * 0.5, repeat: Infinity, ease: "easeInOut" } }
                      }
                    >
                      <Image
                        src={v.image}
                        alt={v.title}
                        fill
                        className="object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.4)]"
                        sizes="(max-width: 640px) 160px, 176px"
                      />
                    </motion.div>
                  </div>

                  <h3 className="relative mt-2 text-lg font-bold text-kio-ink">{v.title}</h3>
                  <p className="relative mt-2 px-6 text-sm leading-relaxed text-kio-muted">{v.body}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
