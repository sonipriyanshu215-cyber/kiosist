"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ThumbsUp } from "lucide-react";
import { isRemoteImageSrc } from "@/lib/cms/image-props";

interface CareerHeroProps {
  heroSrc?: string;
  blurb?: string;
}

export function CareerHero({
  heroSrc = "/img/career/hero2.png",
  blurb = "Join the team building the future of remote hospitality.",
}: CareerHeroProps) {
  const rm = useReducedMotion();

  return (
    <section className="relative flex min-h-[75vh] flex-col justify-center overflow-hidden pb-16 pt-[90px] md:min-h-screen">
      {/* ── Full-bleed background photo ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={heroSrc}
          unoptimized={isRemoteImageSrc(heroSrc)}
          alt=""
          fill
          priority
          // object-cover always crops to fill, and this box swings from wide
          // (desktop) to tall/narrow (mobile)- object-right then showed only
          // the far-right of the photo on phones while desktop showed all of
          // it. Centre keeps the subject in frame as steadily as cover allows.
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(5,7,13,.55) 0%, rgba(5,7,13,.45) 40%, rgba(5,7,13,.92) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(5,7,13,.82) 0%, rgba(5,7,13,.2) 38%, rgba(5,7,13,.2) 62%, rgba(5,7,13,.78) 100%)" }}
        />
      </div>

      {/* ── Main content- single column, left-aligned ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 xl:px-14">
        <div className="max-w-[560px] lg:max-w-[620px]">

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-[4rem]"
          >
            Grow Your Career
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-lg font-semibold text-white/80 md:text-xl lg:mt-4 lg:text-2xl"
          >
            Your Next Opportunity Starts Here
          </motion.p>

          {/* CTA card, below the headline */}
          <div className="mt-8 xl:mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[24px] border border-white/10 p-6 xl:p-7"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,.28), rgba(6,182,212,.16))" }}
            >
              {/* Thumbs-up badge- floats above the card as the hero's visual accent */}
              <motion.div
                aria-hidden="true"
                className="absolute -right-4 -top-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/15"
                style={{
                  background: "linear-gradient(135deg, rgba(18,20,30,.95), rgba(22,25,38,.9))",
                  boxShadow: "0 0 0 1px rgba(59,130,246,.25), 0 10px 30px rgba(0,0,0,.4)",
                }}
                animate={rm ? {} : { y: [0, -8, 0], rotate: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ThumbsUp className="h-6 w-6 text-kio-accent2" fill="currentColor" fillOpacity={0.15} />
              </motion.div>

              <p className="text-lg font-bold text-white xl:text-xl">Ready to Apply?</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/70 xl:text-sm">{blurb}</p>
              <Link
                href="#apply"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#05070D] shadow-[0_10px_30px_rgba(255,255,255,.15)] transition-transform hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={rm ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-hidden="true"
      >
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <motion.div
            className="h-1.5 w-1 rounded-full bg-white/70"
            animate={rm ? {} : { y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
