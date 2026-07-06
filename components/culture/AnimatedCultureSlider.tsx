"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AnimatedCultureSliderProps {
  existingAssets?: string[];
}

// Default fallback items if existingAssets are missing or empty
const DEFAULT_SLIDES = [
  { id: 1, title: "Annual Team Retreat", subtitle: "Connecting beyond the screen", image: "/img/culture/slide-1.jpg" },
  { id: 2, title: "Hospitality Expo USA", subtitle: "Showcasing our innovations", image: "/img/culture/slide-2.jpg" },
  { id: 3, title: "Office Hackathons", subtitle: "Building the future of service", image: "/img/culture/slide-3.jpg" },
  { id: 4, title: "Community Outreach", subtitle: "Giving back to our neighborhoods", image: "/img/culture/slide-4.jpg" },
  { id: 5, title: "Friday Celebrations", subtitle: "Unwinding and celebrating wins", image: "/img/culture/slide-5.jpg" },
];

export function AnimatedCultureSlider({ existingAssets = [] }: AnimatedCultureSliderProps) {
  const [activeId, setActiveId] = useState<number>(0);

  // Map existing assets to slide structure if available, otherwise use defaults
  const slides = existingAssets.length >= 3
    ? existingAssets.slice(0, 5).map((path, index) => ({
        id: index,
        title: `Culture Moment #${index + 1}`,
        subtitle: "Life inside Kiosist",
        image: path.startsWith("/") ? path : `/img/culture/${path}`,
      }))
    : DEFAULT_SLIDES;

  return (
    /* Updated Section Background: Blends smoothly from upper section with ambient glows */
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-transparent via-[#040917]/60 to-[#02040a]">
      
      {/* Background Decorative Ambient Glows (Matching upper section light effects) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-600/15 blur-[140px]" />
      </div>

      {/* Main Content Container */}
      <div className="container-kio relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
            Moments That Define Us
          </h2>

        </div>

        {/* Slider Container */}
        <div className="flex h-[380px] w-full flex-col gap-3 md:h-[460px] md:flex-row">
          {slides.map((slide, index) => {
            const isActive = activeId === index;

            return (
              <motion.div
                key={slide.id}
                onClick={() => setActiveId(index)}
                onMouseEnter={() => setActiveId(index)}
                layout
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className={`relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-gray-900/40 shadow-xl ${
                  isActive ? "flex-[4]" : "flex-[1]"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-black/30 to-transparent opacity-90 transition-opacity duration-300" />

                {/* Content Details */}
                <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-6 text-white">
                  <motion.p
                    layout="position"
                    className="text-xs font-semibold uppercase tracking-wider text-cyan-400"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.h3
                    layout="position"
                    className="mt-1 text-lg font-bold leading-tight md:text-xl lg:text-2xl"
                  >
                    {slide.title}
                  </motion.h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}