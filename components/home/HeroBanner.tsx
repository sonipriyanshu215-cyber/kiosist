"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
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

const STAT_PILLS = [
  { num: "3s",   lbl: "Avg Check-In" },
  { num: "99%",  lbl: "Uptime"       },
  { num: "24/7", lbl: "Available"    },
];

/* ── Hero image slides ── */
const SLIDES = [
  { src: "/img/hero/lobby.webp",        alt: "Hotel lobby managed by KioClerk", label: "Real Hotel Lobby"    },
  { src: "/img/hero/kiosk.webp",        alt: "KioClerk kiosk in action",         label: "Self-Check-In Kiosk" },
  { src: "/img/hero/agent-bubble.webp", alt: "24/7 virtual agent assisting guests", label: "24/7 Virtual Agent" },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.32, 0.72, 0, 1] as [number,number,number,number] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-35%" : "35%",
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.5, ease: [0.4, 0, 0.6, 1] as [number,number,number,number] },
  }),
};

function HeroSlider({ rm }: { rm: boolean | null }) {
  const [[idx, dir], setSlide] = useState([0, 1]);

  useEffect(() => {
    if (rm) return;
    const id = setInterval(() => {
      setSlide(([prev]) => [(prev + 1) % SLIDES.length, 1]);
    }, 4200);
    return () => clearInterval(id);
  }, [rm]);

  const goTo = (next: number) =>
    setSlide(([prev]) => [next, next > prev ? 1 : -1]);

  return (
    <div className="relative flex flex-col gap-4">
      {/* Savings badge */}
      <motion.div
        className="absolute -top-4 right-5 z-20 rounded-full bg-gradient-to-r from-kio-success to-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-[0_4px_20px_rgba(16,185,129,.4)]"
        animate={rm ? {} : { y: [0, -7, 0] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      >
        💰 Save $1000s/month
      </motion.div>

      {/* Image viewport */}
      <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,.55)]"
           style={{ aspectRatio: "4/3" }}>
        {/* Rotating conic accent ring */}
        {!rm && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[2px] rounded-3xl z-0"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, var(--kio-accent) 6%, var(--kio-accent2) 13%, transparent 20%)",
              opacity: 0.5,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        )}

        <AnimatePresence custom={dir} mode="popLayout" initial={false}>
          <motion.div
            key={idx}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 z-10"
          >
            <Image
              src={SLIDES[idx].src}
              alt={SLIDES[idx].alt}
              fill
              className="object-cover"
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Bottom scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            {/* Caption badge — fades in after image settles */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-white">{SLIDES[idx].label}</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail strip — bottom-right */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Show ${s.label}`}
              className="relative overflow-hidden rounded-lg border-2 transition-all duration-300"
              style={{
                width:  i === idx ? 44 : 32,
                height: i === idx ? 32 : 22,
                borderColor: i === idx ? "rgba(99,179,237,0.9)" : "rgba(255,255,255,0.2)",
                opacity: i === idx ? 1 : 0.55,
              }}
            >
              <Image src={s.src} alt={s.alt} fill className="object-cover" sizes="44px" />
            </button>
          ))}
        </div>

        {/* Progress bar */}
        {!rm && (
          <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
            <motion.div
              key={idx}
              className="h-full bg-kio-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4.2, ease: "linear" }}
            />
          </div>
        )}
      </div>

      {/* Stat pills */}
      <div className="flex gap-3">
        {STAT_PILLS.map(({ num, lbl }, i) => (
          <motion.div
            key={lbl}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 rounded-xl border border-kio-line bg-kio-bg-soft p-3 text-center"
          >
            <div className="text-xl font-extrabold text-gradient">{num}</div>
            <div className="mt-0.5 text-[.68rem] text-kio-muted">{lbl}</div>
          </motion.div>
        ))}
      </div>

      {/* Floating accent dots */}
      {!rm && (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute -right-4 top-1/4 h-3 w-3 rounded-full bg-kio-accent"
            animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -left-3 top-2/3 h-2 w-2 rounded-full bg-kio-accent2"
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute right-1/4 -bottom-3 h-2.5 w-2.5 rounded-full bg-kio-accent"
            animate={{ x: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </>
      )}
    </div>
  );
}

export function HeroBanner() {
  const rm = useReducedMotion();

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

      {/* ── Background blob 1 — upper right ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-100px] top-[-100px] h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--kio-accent) 30%, transparent) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.12, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Background blob 2 — lower left ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[50px] left-[-80px] h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--kio-accent2) 20%, transparent) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-kio-accent2/30 bg-kio-accent2/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-kio-accent2"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-kio-accent2"
              animate={rm ? {} : { scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Hospitality Technology
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.4rem,5vw,3.8rem)] font-black leading-[1.1] text-kio-ink"
          >
            The Future of<br />
            <span className="text-gradient-shimmer">Hotel Check‑In</span><br />
            Is Self‑Service
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[480px] text-[1.05rem] leading-[1.8] text-kio-muted"
          >
            KioClerk by Kiosist transforms your hotel lobby into an intelligent,
            guest-first experience — cutting operational costs while elevating
            every touchpoint.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link href="/contact" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              Book a Demo
            </Link>
            <Link href="/#features" className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
              See Features
            </Link>
          </motion.div>

          {/* Mini stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-8"
          >
            {[
              { v: "100+",  l: "Hotels" },
              { v: "24/7",  l: "Coverage" },
              { v: "3 sec", l: "Avg Check-In" },
              { v: "5★",    l: "Rating" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-xl font-bold text-kio-ink">{s.v}</div>
                <div className="text-[.72rem] text-kio-muted">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: animated image slideshow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <HeroSlider rm={rm} />
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
