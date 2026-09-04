"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import { isRemoteImageSrc } from "@/lib/cms/image-props";
import { cultureSlider as DEFAULT_SLIDES, type CultureSlide } from "@/content/cultureSlider";

export type { CultureSlide };

const AUTOPLAY_MS = 5000;

interface AnimatedCultureSliderProps {
  // Ordered slide photos from the `culture-slider` media collection. Empty/
  // omitted -> the bundled DEFAULT_SLIDES are shown. Length is dynamic: the
  // dots and autoplay follow whatever count is passed.
  slides?: CultureSlide[];
}

export function AnimatedCultureSlider({ slides: slidesProp }: AnimatedCultureSliderProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const rm = useReducedMotion();

  const slides = slidesProp && slidesProp.length > 0 ? slidesProp : DEFAULT_SLIDES;
  // Guard against a shrunk list leaving currentIndex out of range mid-session.
  const safeIndex = currentIndex % slides.length;
  const activeSlide = slides[safeIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Always auto-advances, regardless of hover or cursor movement.
  useEffect(() => {
    if (rm) return;
    const id = setInterval(handleNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [rm, slides.length]);

  return (
    <section className="relative min-h-[58vh] w-full overflow-hidden bg-[#02040a] md:min-h-screen">
      {/* No `mode="wait"`- the incoming slide fades in while the outgoing
          one fades out, so they overlap and the section's background is
          never revealed mid-transition. */}
      <AnimatePresence>
        <motion.div
          key={safeIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={activeSlide.src}
            alt={activeSlide.alt}
            fill
            unoptimized={isRemoteImageSrc(activeSlide.src)}
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-black/35 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Tagline- plain div owns the centering transform (-translate-x-1/2);
          RevealOnScroll's own y-transform would otherwise clobber it, since
          framer-motion writes its animated transform inline. */}
      <div className="absolute bottom-24 left-1/2 z-10 w-full -translate-x-1/2 px-6 text-center">
        <RevealOnScroll>
          <h1
            className="font-black text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.9)]"
            style={{ fontSize: "clamp(28px, 6vw, 64px)" }}
          >
            Culture Beyond The Workspace
          </h1>
          <h2
            className="text-white mt-3 font-bold [text-shadow:0_2px_12px_rgba(0,0,0,0.85)]"
            style={{ fontSize: "clamp(11px, 2.9vw, 24px)" }}
          >
            Built By People. Driven By Purpose. United By Hospitality
          </h2>
        </RevealOnScroll>
      </div>

      {/* Navigation Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              safeIndex === index ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            suppressHydrationWarning
          />
        ))}
      </div>
    </section>
  );
}
