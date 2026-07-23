"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

// Exactly 3 default slides for a clean, classic presentation
const DEFAULT_SLIDES = [
  {
    id: 1,
    title: "Annual Team Retreat",
    subtitle: "Connecting beyond the screen",
    image: "/img/slider/DSC08351 (1).JPG.jpeg",
  },
  {
    id: 2,
    title: "Hospitality Expo USA",
    subtitle: "Showcasing our innovations",
    image: "/img/slider/DSC08256.JPG.jpeg",
  },
  {
    id: 3,
    title: "Office Hackathons",
    subtitle: "Building the future of service",
    image: "/img/slider/DSC08314.JPG.jpeg",
  },
];

const AUTOPLAY_MS = 5000;

export function AnimatedCultureSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const rm = useReducedMotion();

  const slides = DEFAULT_SLIDES;

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
    <section className="relative min-h-screen w-full overflow-hidden bg-[#02040a]">
      {/* No `mode="wait"`- the incoming slide fades in while the outgoing
          one fades out, so they overlap and the section's background is
          never revealed mid-transition. */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            fill
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
            Culture Beyond the Workspace
          </h1>
          <h2
            className="text-gradient mt-3 whitespace-nowrap font-bold [text-shadow:0_2px_12px_rgba(0,0,0,0.85)]"
            style={{ fontSize: "clamp(11px, 2.9vw, 24px)" }}
          >
            Built by People. Driven by Purpose. United by Hospitality.
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
              currentIndex === index ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
