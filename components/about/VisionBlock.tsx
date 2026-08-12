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

      <div className="container-kio relative z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:gap-[clamp(8px,3vw,48px)] md:text-left">

          {/* Vision icon - above the text on mobile, right side at md+ */}
          <RevealOnScroll className="order-first flex flex-none justify-center md:order-last">
            <div className="relative h-24 w-24 md:h-[clamp(40px,10vw,140px)] md:w-[clamp(40px,10vw,140px)]">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full opacity-40 blur-xl"
                style={{ background: "radial-gradient(circle, var(--kio-accent), transparent 70%)" }}
                animate={rm ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <Image
                src="/img/about/vision-1.png"
                alt="Vision - blub icon"
                width={1024}
                height={1024}
                className="relative h-full w-full rounded-3xl object-contain"
                priority
              />
            </div>
          </RevealOnScroll>

          {/* Text column */}
          <div className="flex-1">
            <span className="text-[clamp(1rem,2.2vw,1.5rem)] font-bold uppercase tracking-[.15em] ">
              Our <span className="text-color-cycle"> Vision</span>
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
              className="mt-[clamp(4px,1.5vw,16px)] text-sm font-normal leading-relaxed text-white md:text-[clamp(0.7rem,1.5vw,1rem)]"
            >
              {TEXT.split(" ").map((word, i) => (
                <Fragment key={i}>
                  <motion.span variants={rm ? {} : wordVariants} className="inline-block">
                    {word}
                  </motion.span>{" "}
                </Fragment>
              ))}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
