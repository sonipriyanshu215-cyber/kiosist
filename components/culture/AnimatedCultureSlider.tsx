"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Or standard SVG arrows

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

export function AnimatedCultureSlider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const slides = DEFAULT_SLIDES;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-transparent via-[#040917]/60 to-[#02040a]">
      {/* Background Decorative Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-600/15 blur-[140px]" />
      </div>

      <div className="container-kio relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
            Moments That Define Us
          </h2>
        </div>

        {/* Classic Slider Viewport */}
        <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-gray-900/50 shadow-2xl md:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />

              {/* Classic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-black/30 to-transparent opacity-80" />

              {/* Slide Caption */}
              <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-8 text-white md:p-12">
                <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                  {slides[currentIndex].subtitle}
                </span>
                <h3 className="mt-2 text-2xl font-bold leading-tight md:text-4xl">
                  {slides[currentIndex].title}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Indicator Dots */}
        <div className="mt-6 flex justify-center gap-3">
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
      </div>
    </section>
  );
}