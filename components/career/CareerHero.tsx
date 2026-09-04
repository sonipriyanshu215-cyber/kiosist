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
    <section className="relative flex min-h-[75vh] flex-col justify-start overflow-hidden pb-16 pt-[90px] md:min-h-screen md:justify-center">
      {/* ── Full-bleed background photo (md+ only) ──
          On mobile the photo drops out of the background and moves into a
          contained card below the copy (same treatment as the home hero's
          video), so this full-bleed layer only renders at md:+. */}
      <div className="absolute inset-0 hidden md:block" aria-hidden="true">
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
          style={{ background: "linear-gradient(180deg, rgba(2,3,7,.40) 0%, rgba(5,7,13,.45) 40%, rgba(5,7,13,.92) 100%)" }}
        />
        <div
          className="absolute inset-0"
          // Left stays dark for the headline; the right edge is only lightly
          // shaded now (was .78- too heavy a black wash with no text there).
          style={{ background: "linear-gradient(90deg, rgba(5,7,13,.82) 0%, rgba(5,7,13,.2) 38%, rgba(5,7,13,.15) 68%, rgba(5,7,13,.3) 100%)" }}
        />
      </div>

      {/* Ambient wash for the mobile stacked layout- with no full-bleed photo
          to carry the hero's atmosphere, a soft brand-tinted gradient over the
          flat dark page background does it instead. */}
      <div
        className="absolute inset-x-0 top-0 h-[85vh] md:hidden"
        aria-hidden="true"
        style={{ background: "linear-gradient(180deg, rgba(59,130,246,.14) 0%, rgba(6,182,212,.05) 34%, rgba(13,17,23,0) 70%)" }}
      />

      {/* ── Main content- single column, left-aligned ── */}
      {/* max-w-container + clamp() typography (same system as the home hero)
          so the block and the text scale continuously with the viewport
          instead of freezing at a breakpoint- that freeze is why 1600px,
          1920px and a TV each looked different. */}
      <div className="relative z-10 mx-auto w-full max-w-container px-6 md:px-10 xl:px-14">
        <div className="max-w-[560px] lg:max-w-[clamp(600px,45vw,820px)]">

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-[1.05] tracking-tight text-white text-[clamp(2.15rem,6.5vw,2.75rem)] md:text-[clamp(3rem,5vw,3.9rem)] lg:text-[clamp(3.5rem,4vw,5.25rem)]"
          >
            Grow Your Career
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-[clamp(0.6rem,1vw,1rem)] font-semibold text-white/80 text-[clamp(1rem,3.6vw,1.2rem)] md:text-[clamp(1.15rem,2vw,1.4rem)] lg:text-[clamp(1.35rem,1.5vw,1.95rem)]"
          >
            Your Next Opportunity Starts Here
          </motion.p>

          {/* Career photo- contained card sitting right under the hero copy,
              mirroring the home hero's "text then media" mobile order. On md+
              this same photo is the section's full-bleed background instead
              (see above), so it's md:hidden here. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-[clamp(1.5rem,6vw,2.25rem)] aspect-square overflow-hidden rounded-[clamp(16px,4vw,26px)] shadow-[0_24px_70px_rgba(0,0,0,.5)] ring-1 ring-white/10 md:hidden"
          >
            <Image
              src={heroSrc}
              unoptimized={isRemoteImageSrc(heroSrc)}
              alt="Kiosist team at work"
              fill
              priority
              // hero2.png is a 16:9 desktop-background plate: its subjects sit
              // in a small centre-right region with wide dark negative space
              // (meant for overlay text) on the left and above. object-cover
              // alone can't fill a card with just the team, so pull the crop
              // right + slightly up and zoom past the dead space.
              className="scale-[1.24] object-cover object-[76%_42%]"
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>

          {/* CTA card, below the headline */}
          <div className="mt-[clamp(1.75rem,3vw,2.75rem)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[24px] border border-white/10 p-[clamp(1.25rem,1.8vw,1.9rem)]"
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

              <p className="text-[clamp(1.05rem,1.3vw,1.35rem)] font-bold text-white">Ready to Apply?</p>
              <p className="mt-1.5 text-[clamp(0.75rem,0.95vw,0.95rem)] leading-relaxed text-white/70">{blurb}</p>
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
