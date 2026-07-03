"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const FEATURES = [
  {
    icon: "🔑",
    title: "Express Check-In & Check-Out",
    body: "Guests complete check-in in under 60 seconds. Scan ID, confirm booking, collect room key — all without any staff involvement.",
  },
  {
    icon: "💳",
    title: "Integrated Payment Processing",
    body: "Accept all major credit cards, contactless payments, and digital wallets. PCI-DSS compliant and fully secure.",
  },
  {
    icon: "🛎️",
    title: "In-Stay Services",
    body: "Guests can request housekeeping, room service, extra amenities, or local recommendations right from the kiosk — any time of day.",
  },
  {
    icon: "📊",
    title: "Real-Time Dashboard",
    body: "Management gets live analytics — occupancy rates, check-in queues, service requests, and revenue reports — all in one view.",
  },
  {
    icon: "🌐",
    title: "Multilingual Support",
    body: "Kiosist speaks your guests' language. Support for 20+ languages means every traveler feels at home from the moment they arrive.",
  },
  {
    icon: "🔗",
    title: "PMS Integration",
    body: "Plug-and-play compatibility with leading property management systems. Sync reservations, room assignments, and guest data in real time.",
  },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

/* All geometry is expressed as % of the square container so the layout
   scales automatically on every viewport. */
const ORBIT_R  = 40;   // orbit radius  — % of container
const NODE_S   = 13;   // feature node  — % of container
const HUB_S    = 22;   // center hub    — % of container

function nodePct(i: number, n: number) {
  const rad = ((i / n) * 360 - 90) * (Math.PI / 180);
  return {
    cx: 50 + ORBIT_R * Math.cos(rad),
    cy: 50 + ORBIT_R * Math.sin(rad),
  };
}

/* SVG circumference of the orbit circle in viewBox units (100 × 100) */
const ORBIT_CIRC = 2 * Math.PI * ORBIT_R; // ≈ 251.3

export function WhyGrid() {
  const [active, setActive] = useState(0);
  const rm = useReducedMotion();

  /* Auto-cycle features */
  useEffect(() => {
    if (rm) return;
    const t = setInterval(() => setActive(p => (p + 1) % FEATURES.length), 10000);
    return () => clearInterval(t);
  }, [rm]);

  const color = COLORS[active];

  return (
    <section id="features" className="section-pad relative overflow-hidden">
      {/* Ambient blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-200px] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,.12) 0%, transparent 70%)" }}
      />

      {/* Heading */}
      <RevealOnScroll className="relative z-10 container-kio mb-16 mx-auto max-w-[640px] text-center">
        <span className="section-label">What We Offer</span>
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
          Everything Hospitality<br />
          <span className="text-gradient-shimmer">Needs in One Kiosk</span>
        </h2>
        <p className="mt-4 text-[.95rem] leading-[1.8] text-kio-muted">
          Kiosist packs the full hospitality experience into a single elegant kiosk —
          no juggling software, no bottlenecks, no compromise.
        </p>
      </RevealOnScroll>

      {/* ── Orbital layout ── */}
      <div className="container-kio relative z-10 flex flex-col items-center gap-12 xl:flex-row xl:items-center xl:justify-center xl:gap-20">

        {/* ── Orbit ring ── */}
        <div className="relative w-full max-w-[320px] shrink-0 aspect-square sm:max-w-[400px] xl:max-w-[480px]">

          {/* SVG layer: orbit rings + connector lines */}
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            {/* Decorative static rings */}
            <circle cx="50" cy="50" r={ORBIT_R + 3}  fill="none" stroke="rgba(99,179,237,0.05)" strokeWidth="0.25" />
            <circle cx="50" cy="50" r={ORBIT_R}       fill="none" stroke="rgba(99,179,237,0.10)" strokeWidth="0.3"  />
            <circle cx="50" cy="50" r={ORBIT_R - 3}   fill="none" stroke="rgba(99,179,237,0.04)" strokeWidth="0.25" />

            {/* Slowly flowing dashed orbit ring */}
            <motion.circle
              cx="50" cy="50"
              r={ORBIT_R}
              fill="none"
              stroke="rgba(99,179,237,0.22)"
              strokeWidth="0.35"
              strokeDasharray="2.8 2.4"
              style={{ transformOrigin: "50px 50px" }}
              animate={rm ? {} : { strokeDashoffset: [0, -ORBIT_CIRC] }}
              transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            />

            {/* Connector lines */}
            {FEATURES.map((_, i) => {
              const { cx: nx, cy: ny } = nodePct(i, FEATURES.length);
              return i === active ? (
                /* Active — animated marching dashes in feature colour */
                <motion.line
                  key={i}
                  x1="50" y1="50" x2={nx} y2={ny}
                  stroke={COLORS[i]}
                  strokeWidth="0.55"
                  strokeDasharray="2.6 2"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: [10, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  opacity={0.85}
                />
              ) : (
                /* Inactive — faint static dashes */
                <line
                  key={i}
                  x1="50" y1="50" x2={nx} y2={ny}
                  stroke="rgba(99,179,237,0.12)"
                  strokeWidth="0.25"
                  strokeDasharray="2 2"
                />
              );
            })}

            {/* Small dot at each node's ring intersection */}
            {FEATURES.map((_, i) => {
              const { cx: nx, cy: ny } = nodePct(i, FEATURES.length);
              return (
                <circle
                  key={i}
                  cx={nx} cy={ny} r="0.7"
                  fill={i === active ? COLORS[i] : "rgba(99,179,237,0.3)"}
                />
              );
            })}
          </svg>

          {/* Center hub */}
          <motion.div
            className="absolute z-20 flex items-center justify-center rounded-full"
            style={{
              width:  `${HUB_S}%`,
              height: `${HUB_S}%`,
              left:   `${50 - HUB_S / 2}%`,
              top:    `${50 - HUB_S / 2}%`,
              background: `linear-gradient(135deg, ${color}, ${color}bb)`,
              boxShadow: `0 0 48px ${color}55, 0 0 12px ${color}40`,
            }}
            animate={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
            transition={{ duration: 0.4 }}
          >
            {/* Expanding pulse rings */}
            {[0, 1, 2].map(j => (
              <motion.div
                key={j}
                className="absolute rounded-full"
                style={{ inset: -(j * 14 + 6), border: `1px solid ${color}`, opacity: 0 }}
                animate={rm ? {} : { scale: [0.9, 1.18, 0.9], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: j * 0.75 }}
              />
            ))}

            {/* Active feature icon */}
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ scale: 0.4, opacity: 0, rotate: -25 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.4, opacity: 0, rotate: 25 }}
                transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                className="relative z-10 select-none text-[clamp(1.4rem,4.5%,1.9rem)]"
              >
                {FEATURES[active].icon}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Feature nodes */}
          {FEATURES.map((f, i) => {
            const { cx: nx, cy: ny } = nodePct(i, FEATURES.length);
            const isAct  = i === active;
            const clr    = COLORS[i];

            return (
              <motion.button
                key={f.title}
                title={f.title}
                className="absolute z-20 flex items-center justify-center rounded-2xl"
                style={{
                  width:       `${NODE_S}%`,
                  height:      `${NODE_S}%`,
                  left:        `${nx - NODE_S / 2}%`,
                  top:         `${ny - NODE_S / 2}%`,
                  background:  isAct ? `${clr}22` : "rgba(10,14,26,0.72)",
                  border:      `1px solid ${isAct ? clr : "rgba(99,179,237,0.15)"}`,
                  boxShadow:   isAct ? `0 0 22px ${clr}55` : "none",
                  backdropFilter: "blur(8px)",
                  transition:  "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                }}
                animate={{ scale: isAct ? 1.22 : 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
                onClick={() => setActive(i)}
              >
                <span className="select-none text-[clamp(0.9rem,3.2%,1.4rem)]">{f.icon}</span>
              </motion.button>
            );
          })}
        </div>

        {/* ── Feature detail panel ── */}
        <div className="w-full max-w-md">

          {/* Navigation dots */}
          <div className="mb-6 flex items-center gap-2">
            {FEATURES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={FEATURES[i].title}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width:      i === active ? 28 : 8,
                  background: i === active ? COLORS[active] : "rgba(99,179,237,0.2)",
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
              className="rounded-2xl border bg-kio-bg p-8"
              style={{ borderColor: `${color}2e` }}
            >
              {/* Counter */}
              <p className="mb-4 font-mono text-xs font-bold tracking-widest" style={{ color }}>
                {String(active + 1).padStart(2, "0")} / {String(FEATURES.length).padStart(2, "0")}
              </p>

              {/* Icon badge */}
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                style={{ background: `${color}18`, border: `1px solid ${color}38` }}
              >
                {FEATURES[active].icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-bold leading-snug text-kio-ink">
                {FEATURES[active].title}
              </h3>

              {/* Body */}
              <p className="text-sm leading-[1.85] text-kio-muted">
                {FEATURES[active].body}
              </p>

              {/* Auto-advance progress bar */}
              {!rm && (
                <div className="mt-6 h-px w-full overflow-hidden rounded-full bg-kio-line">
                  <motion.div
                    key={active}
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 10, ease: "linear" }}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
