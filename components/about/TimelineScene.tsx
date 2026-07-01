"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Lightbulb, Building2, Hotel, TrendingUp, Users, Globe } from "lucide-react";
import { milestones } from "@/content/milestones";

const ICONS  = [Lightbulb, Building2, Hotel, TrendingUp, Users, Globe];
const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

const R            = 148;               // orbit radius in px
const ORBIT_SIZE   = 380;               // square container size
const N            = milestones.length; // 6
const STEP         = 360 / N;          // 60° per slot
const ACTIVE_DEG   = 90;               // right side = active (points toward content)
const TAB_DURATION = 4000;             // ms per tab
const CIRC         = 2 * Math.PI * R;
const SEGMENT      = CIRC / N;         // arc length per 60° slice
const BTN          = 56;               // tab button diameter in px

/* Convert polar angle (0°=top, cw) to x,y offset from center */
function polar(deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: Math.sin(rad) * R, y: -Math.cos(rad) * R };
}

/* ── Hub: KIOSIST logo-inspired center ── */
function OrbitalHub({ color, rm }: { color: string; rm: boolean | null }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* Outer ambient glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 140, height: 140,
          left: "50%", top: "50%",
          marginLeft: -70, marginTop: -70,
          background: `radial-gradient(circle, ${color}30, transparent 65%)`,
        }}
        animate={rm ? {} : { scale: [1, 1.35, 1], opacity: [0.55, 0.15, 0.55] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Outer spinning dashed ring */}
      {!rm && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 98, height: 98,
            left: "50%", top: "50%",
            marginLeft: -49, marginTop: -49,
            border: `1.5px dashed ${color}50`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Inner counter-spinning ring */}
      {!rm && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 80, height: 80,
            left: "50%", top: "50%",
            marginLeft: -40, marginTop: -40,
            border: `1px solid ${color}30`,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Main hub circle */}
      <div
        className="relative flex h-[68px] w-[68px] items-center justify-center rounded-full"
        style={{
          background: `linear-gradient(135deg, ${color}dd, ${color}88)`,
          boxShadow: `0 0 0 2px ${color}50, 0 0 0 6px ${color}18, 0 0 32px ${color}55`,
        }}
      >
        {/* K letter */}
        <span className="select-none font-black text-white" style={{ fontSize: 28, lineHeight: 1 }}>K</span>
      </div>

      {/* Small orbital dots */}
      {!rm && [0, 1, 2].map(i => {
        const angle = i * 120;
        const r2 = 42;
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 5, height: 5,
              left: "50%", top: "50%",
              marginLeft: -2.5, marginTop: -2.5,
            }}
            animate={{
              x: Math.sin(rad + (Date.now() / 2000)) * r2,
              y: -Math.cos(rad + (Date.now() / 2000)) * r2,
            }}
            transition={{ duration: 0, repeat: Infinity, repeatType: "loop" }}
          >
            <motion.div
              className="h-full w-full rounded-full"
              style={{ background: color, opacity: 0.55 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6 }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Desktop: orbital revolving tabs ── */
function RevolvingOrbit() {
  const rm = useReducedMotion();
  const [active,   setActive]   = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused,   setPaused]   = useState(false);

  /* Each tab's current angle in the orbit (degrees from top, clockwise) */
  const [angles, setAngles] = useState(() =>
    milestones.map((_, i) => ACTIVE_DEG + i * STEP)
  );

  const pausedRef = useRef(false);
  const startRef  = useRef(0);
  const rafRef    = useRef(0);
  pausedRef.current = paused;

  /* rAF-based auto-advance */
  useEffect(() => {
    if (rm) return;
    startRef.current = performance.now();

    const tick = (now: number) => {
      if (!pausedRef.current) {
        const p = Math.min((now - startRef.current) / TAB_DURATION, 1);
        setProgress(p);
        if (p >= 1) {
          setActive(a => (a + 1) % N);
          setAngles(prev => prev.map(a => a - STEP));
          setProgress(0);
          startRef.current = performance.now();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rm]);

  const handleTabClick = (i: number) => {
    const steps = ((i - active) % N + N) % N;
    if (steps === 0) return;
    setActive(i);
    setAngles(prev => prev.map(a => a - steps * STEP));
    setProgress(0);
    startRef.current = performance.now();
  };

  const m     = milestones[active];
  const Icon  = ICONS[active] ?? Lightbulb;
  const color = COLORS[active % COLORS.length];

  /* Connector line endpoints */
  const activePt = polar(ACTIVE_DEG);

  return (
    <div
      className="container-kio pb-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        startRef.current = performance.now() - progress * TAB_DURATION;
      }}
    >
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">

        {/* ── Left: orbital ring ── */}
        <div className="relative shrink-0" style={{ width: ORBIT_SIZE, height: ORBIT_SIZE }}>

          {/* SVG: orbit track + progress arc + connector */}
          <svg
            className="pointer-events-none absolute inset-0"
            width={ORBIT_SIZE} height={ORBIT_SIZE}
            viewBox={`0 0 ${ORBIT_SIZE} ${ORBIT_SIZE}`}
            overflow="visible"
          >
            {/* Orbit track (dashed circle) */}
            <circle
              cx={ORBIT_SIZE / 2} cy={ORBIT_SIZE / 2} r={R}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth={1.5}
              strokeDasharray="5 9"
            />

            {/* Progress arc — fills clockwise from active position over TAB_DURATION */}
            {!rm && (
              <circle
                cx={ORBIT_SIZE / 2} cy={ORBIT_SIZE / 2} r={R}
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray={`${progress * SEGMENT} ${CIRC}`}
                strokeDashoffset={0}
                style={{
                  filter: `drop-shadow(0 0 5px ${color}cc)`,
                  transition: "stroke 0.4s ease",
                }}
              />
            )}

            {/* Dotted line: hub center → active tab */}
            {!rm && (
              <line
                x1={ORBIT_SIZE / 2}
                y1={ORBIT_SIZE / 2}
                x2={ORBIT_SIZE / 2 + activePt.x}
                y2={ORBIT_SIZE / 2 + activePt.y}
                stroke={color}
                strokeWidth={1}
                strokeDasharray="4 5"
                opacity={0.35}
                style={{ transition: "stroke 0.4s ease" }}
              />
            )}
          </svg>

          {/* Hub center (KIOSIST K logo) */}
          <OrbitalHub color={color} rm={rm} />

          {/* Tab buttons on orbit */}
          {milestones.map((tab, i) => {
            const pos       = polar(angles[i]);
            const isActive  = i === active;
            const tabColor  = COLORS[i % COLORS.length];
            const TabIcon   = ICONS[i] ?? Lightbulb;

            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTabClick(i)}
                className="absolute flex flex-col items-center gap-1.5"
                style={{
                  left:       "50%",
                  top:        "50%",
                  marginLeft: -(BTN / 2),
                  marginTop:  -(BTN / 2) - 9, /* account for label height */
                  cursor:     "pointer",
                }}
                animate={{ x: pos.x, y: pos.y }}
                transition={{ type: "spring", stiffness: 210, damping: 30 }}
              >
                {/* Circle button */}
                <div
                  className="relative flex items-center justify-center rounded-full"
                  style={{
                    width:      BTN,
                    height:     BTN,
                    background: isActive
                      ? `linear-gradient(135deg, ${tabColor}e0, ${tabColor}99)`
                      : "rgba(14,18,32,0.88)",
                    border:     `2px solid ${isActive ? tabColor : tabColor + "45"}`,
                    boxShadow:  isActive
                      ? `0 0 0 5px ${tabColor}22, 0 0 28px ${tabColor}60`
                      : "none",
                    transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
                  }}
                >
                  <TabIcon
                    className="h-5 w-5"
                    style={{ color: isActive ? "#fff" : tabColor + "bb", transition: "color 0.3s" }}
                  />

                  {/* Pulsing halo on active */}
                  {isActive && !rm && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1.5px solid ${tabColor}` }}
                      animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </div>

                {/* Year label below button */}
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1 : 0.85 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-[10px] font-bold leading-none"
                  style={{ color: isActive ? tabColor : "var(--kio-muted)" }}
                >
                  {tab.year}
                </motion.span>
              </motion.button>
            );
          })}
        </div>

        {/* ── Right: content panel ── */}
        <div className="w-full flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 28, scale: 0.97 }}
              animate={{ opacity: 1, x: 0,  scale: 1 }}
              exit={{    opacity: 0, x: -18, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl p-7 md:p-9"
              style={{
                background: "linear-gradient(135deg, rgba(14,18,32,0.94), rgba(18,22,40,0.88))",
                border:     `1px solid ${color}30`,
                boxShadow:  `0 0 0 1px ${color}12, 0 20px 56px rgba(0,0,0,0.45)`,
              }}
            >
              {/* Corner glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25"
                style={{ background: `radial-gradient(circle, ${color}, transparent 65%)` }}
              />

              {/* Top sweep */}
              <motion.div
                key={`sweep-${active}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background:     `linear-gradient(90deg, transparent, ${color}90, transparent)`,
                  transformOrigin: "left",
                }}
              />

              <div className="relative z-10">
                {/* Header row: icon + year + dots */}
                <div className="mb-5 flex items-center gap-4">
                  <motion.div
                    key={`icon-${active}`}
                    initial={{ scale: 0.65, rotate: -14 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                    style={{
                      background: `${color}18`,
                      border:     `1.5px solid ${color}50`,
                      boxShadow:  `0 0 20px ${color}25`,
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color }} />
                  </motion.div>

                  <div>
                    <div
                      className="font-mono text-4xl font-black leading-none"
                      style={{ color, textShadow: `0 0 24px ${color}55` }}
                    >
                      {m.year}
                    </div>
                    {/* Step dots */}
                    <div className="mt-2 flex items-center gap-1.5">
                      {milestones.map((_, si) => (
                        <motion.span
                          key={si}
                          className="inline-block h-1 rounded-full"
                          animate={{
                            width:           si === active ? 18 : 5,
                            backgroundColor: si === active ? color : "rgba(255,255,255,0.12)",
                          }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <motion.h3
                  key={`title-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="text-2xl font-bold text-kio-ink"
                >
                  {m.title}
                </motion.h3>

                <motion.p
                  key={`body-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-3 text-base leading-relaxed text-kio-muted"
                >
                  {m.body}
                </motion.p>

                <motion.div
                  key={`badge-${active}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                  style={{ background: `${color}12`, border: `1px solid ${color}30`, color }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                  Milestone {active + 1} of {N}
                </motion.div>
              </div>

              {/* Bottom progress bar */}
              {!rm && (
                <div className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-2xl bg-white/[0.04]">
                  <div
                    className="h-full rounded-b-2xl transition-none"
                    style={{
                      width:      `${progress * 100}%`,
                      background: `linear-gradient(90deg, ${color}, ${color}66)`,
                    }}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {!rm && paused && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 text-center text-[11px] text-kio-muted/40 lg:text-left"
            >
              Paused — move mouse away to resume
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Mobile: vertical stacked timeline (unchanged) ── */
function VerticalTimeline() {
  return (
    <div className="container-kio pb-20">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-5 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, transparent, var(--kio-line) 10%, var(--kio-line) 90%, transparent)" }}
        />
        <div className="flex flex-col gap-8">
          {milestones.map((m, i) => {
            const Icon  = ICONS[i] ?? Lightbulb;
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-14"
              >
                <div
                  className="absolute left-[14px] top-4 h-3 w-3 rounded-full border-2"
                  style={{ borderColor: color, background: "#0d1117" }}
                />
                <div
                  className="rounded-2xl p-5 backdrop-blur-sm"
                  style={{
                    background: "linear-gradient(135deg, rgba(18,20,30,0.82), rgba(22,25,38,0.72))",
                    boxShadow:  `0 0 0 1px ${color}30`,
                  }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${color}18`, border: `1px solid ${color}45` }}
                    >
                      <Icon className="h-4 w-4" style={{ color }} />
                    </div>
                    <span className="font-mono text-2xl font-bold" style={{ color }}>{m.year}</span>
                  </div>
                  <h3 className="text-sm font-bold text-kio-ink">{m.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-kio-muted">{m.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Shared section header ── */
function Header() {
  return (
    <div className="container-kio pb-10 pt-24 text-center">
      <span className="section-label">Our Journey</span>
      <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
        From idea to 100+ hotels
      </h2>
      <p className="mt-4 text-kio-muted">
        Our story — one milestone at a time.
      </p>
    </div>
  );
}

/* ── Main export ── */
export function TimelineScene() {
  return (
    <section className="relative">
      <Header />
      <div className="md:hidden"><VerticalTimeline /></div>
      <div className="hidden md:block"><RevolvingOrbit /></div>
    </section>
  );
}
