"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const CYCLING_WORDS = [
  "Innovation.",
  "Technology.",
  "Professionalism.",
  "Excellence.",
];
import Link from "next/link";

/* Hard-coded particle positions to avoid hydration mismatch */
const PARTICLES = [
  { x:  8, y: 12, s: 2,   d: 7,   del: 0.2, op: 0.4 },
  { x: 92, y:  8, s: 1.5, d: 9,   del: 0.8, op: 0.3 },
  { x: 45, y:  3, s: 1,   d: 6,   del: 1.5, op: 0.5 },
  { x: 78, y: 35, s: 2.5, d: 8,   del: 0.3, op: 0.35 },
  { x: 22, y: 45, s: 1.5, d: 10,  del: 2.1, op: 0.4 },
  { x: 65, y: 55, s: 1,   d: 7.5, del: 0.9, op: 0.3 },
  { x:  5, y: 68, s: 2,   d: 9.5, del: 1.7, op: 0.45 },
  { x: 88, y: 72, s: 1,   d: 6.5, del: 0.5, op: 0.3 },
  { x: 35, y: 82, s: 2,   d: 8.5, del: 1.2, op: 0.4 },
  { x: 55, y: 90, s: 1.5, d: 7,   del: 2.4, op: 0.35 },
  { x: 72, y: 18, s: 1,   d: 11,  del: 0.1, op: 0.3 },
  { x: 18, y: 28, s: 2.5, d: 8,   del: 1.9, op: 0.4 },
  { x: 95, y: 50, s: 1,   d: 9,   del: 0.6, op: 0.35 },
  { x: 50, y: 40, s: 1.5, d: 7,   del: 2.8, op: 0.3 },
  { x: 30, y: 60, s: 2,   d: 6.5, del: 1.4, op: 0.45 },
  { x: 60, y: 25, s: 1,   d: 10,  del: 0.7, op: 0.3 },
  { x: 14, y: 75, s: 1.5, d: 8,   del: 2.0, op: 0.4 },
  { x: 82, y: 88, s: 2,   d: 7,   del: 0.4, op: 0.35 },
];

const HERO_VIDEO_SRC = "/video/explainer.mp4";

function HeroVideo({ rm }: { rm: boolean | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ambient looping preview, no controls. Respects prefers-reduced-motion
  // by staying paused on its first frame instead of autoplaying.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || rm) return;
    v.play().catch(() => {});
  }, [rm]);

  return (
    <div
      className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,.55)]"
      style={{ aspectRatio: "16/9" }}
    >
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Bottom scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* Caption badge */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-xs font-medium text-white">Live Product Demo</span>
      </div>
    </div>
  );
}

export function HeroBanner() {
  const rm = useReducedMotion();
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    if (rm) return;
    const id = setInterval(() => setWordIdx(i => (i + 1) % CYCLING_WORDS.length), 5000);
    return () => clearInterval(id);
  }, [rm]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-[120px]">

      {/* ── Background: animated grid ── */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-100" aria-hidden="true" />

      {/* ── Background: floating particles ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-kio-accent"
            style={{
              left: `${p.x}%`,
              top:  `${p.y}%`,
              width:  p.s,
              height: p.s,
              opacity: p.op,
            }}
            animate={rm ? {} : {
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 12 : -12), 0],
              opacity: [p.op, p.op * 0.4, p.op],
            }}
            transition={{
              duration: p.d,
              delay: p.del,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Pulsing ring in center ── */}
      {!rm && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-kio-accent/10"
          style={{ width: 700, height: 700 }}
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto grid w-full max-w-container items-center gap-16 lg:grid-cols-2">

        {/* LEFT: copy */}
        <div>
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl font-black leading-[1.3] text-kio-ink sm:text-5xl md:text-5xl lg:text-5xl"
          >
            {/* Line 1 */}
            <span className="block whitespace-nowrap">Kiosist Delivers Hospitality</span>

            {/* Line 2- Powered by [word]. Kept nowrap from sm: up, where
                there's enough width even for the longest cycling word
                ("Professionalism."); left free to wrap below that so a long
                word degrades to a second line instead of overflowing- the
                fixed-width reservation was tuned for ~11-char words and
                doesn't cover 16-char ones, so it's sized to content instead
                of a hard minWidth. */}
            <span className="block mt-1 whitespace-normal sm:whitespace-nowrap">
              <span className="text-kio-muted/60 font-semibold">Powered by </span>
              <span className="inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={CYCLING_WORDS[wordIdx]}
                    initial={{ opacity: 0, y: "30%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{    opacity: 0, y: "-30%" }}
                    transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                    className="text-color-cycle inline-block"
                  >
                    {CYCLING_WORDS[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link href="/culture" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
              Explore Culture
            </Link>
          </motion.div>

        </div>

        {/* RIGHT: looping product demo video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <HeroVideo rm={rm} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={rm ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-hidden="true"
      >
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-kio-line p-1">
          <motion.div
            className="h-1.5 w-1 rounded-full bg-kio-muted"
            animate={rm ? {} : { y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
