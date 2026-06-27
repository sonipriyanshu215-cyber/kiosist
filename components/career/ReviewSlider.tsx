"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const REVIEWS = [
  {
    id: "r-1",
    quote:
      "Working at Kiosist changed my life. I used to work odd hours at a local BPO. Now I work nights helping US hotels — and I actually enjoy it.",
    author: "Priya M.",
    role: "Senior Virtual Agent · 2 years",
    rating: 5,
  },
  {
    id: "r-2",
    quote:
      "The training here is unlike anything else. In 3 weeks I learned more about hotel operations than I did in a year at my previous job.",
    author: "Harsh P.",
    role: "Trainer · 1.5 years",
    rating: 5,
  },
  {
    id: "r-3",
    quote:
      "Rahil and the leadership genuinely care. When I had a personal issue, they were flexible without any questions. That's rare.",
    author: "Anjali S.",
    role: "Operations Lead · 3 years",
    rating: 5,
  },
  {
    id: "r-4",
    quote:
      "I came in knowing zero about hotels. The team-lead programme helped me grow faster than I thought possible. I'm now training new joiners.",
    author: "Kiran B.",
    role: "Team Lead · 2.5 years",
    rating: 5,
  },
];

export function ReviewSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length);

  return (
    <section className="section-pad bg-kio-primary">
      <div className="container-kio">
        <RevealOnScroll className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-kio-accent">
            Life at Kiosist
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Straight from the team
          </h2>
        </RevealOnScroll>

        <div className="relative mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {REVIEWS.map(
              (r, i) =>
                i === current && (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-3xl bg-white/5 p-10 text-center backdrop-blur-sm"
                  >
                    <div className="mb-4 flex justify-center gap-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-kio-accent text-kio-accent" />
                      ))}
                    </div>
                    <p className="text-lg italic leading-relaxed text-white/90">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                    <div className="mt-6">
                      <p className="font-semibold text-white">{r.author}</p>
                      <p className="text-sm text-kio-accent">{r.role}</p>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/40 hover:text-white"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-kio-accent" : "w-2 bg-white/30"
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/40 hover:text-white"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
