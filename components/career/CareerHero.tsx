"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Users,
  Clock,
  Building2,
  TrendingUp,
  Sparkles,
  Send,
  MessageSquare,
  Rocket,
  Award,
} from "lucide-react";

/* Pentagon-ring coordinates (percent of container)- hand-tuned so the
   5 cards sit evenly around the hub without a trig helper at runtime. */
const HUB_CARDS = [
  { icon: Users, num: "150+", label: "Team Members", x: 50, y: 9, color: "var(--kio-accent)" },
  { icon: Clock, num: "24/7", label: "Operations", x: 85, y: 34, color: "#8b5cf6" },
  { icon: Building2, num: "100+", label: "US Hotels", x: 72, y: 88, color: "var(--kio-accent2)" },
  { icon: TrendingUp, num: "4", label: "Career Levels", x: 28, y: 88, color: "var(--kio-accent)" },
  { icon: Sparkles, num: "100%", label: "Growth Opportunities", x: 15, y: 34, color: "#8b5cf6" },
];

const HIRING_STEPS = [
  { icon: Send, label: "Apply Online" },
  { icon: MessageSquare, label: "HR Interview" },
  { icon: GraduationCap, label: "Paid Training" },
  { icon: Rocket, label: "Go Live" },
  { icon: Award, label: "Promotion" },
];

/* Hard-coded particle positions to avoid hydration mismatch */
const PARTICLES = [
  { x: 6, y: 16, s: 2, d: 9, del: 0.2, op: 0.4 },
  { x: 94, y: 12, s: 1.5, d: 11, del: 0.9, op: 0.32 },
  { x: 50, y: 5, s: 1, d: 7.5, del: 1.4, op: 0.5 },
  { x: 82, y: 44, s: 2.5, d: 10, del: 0.4, op: 0.3 },
  { x: 16, y: 54, s: 1.5, d: 11.5, del: 2.0, op: 0.4 },
  { x: 62, y: 66, s: 1, d: 8.5, del: 1.0, op: 0.3 },
  { x: 4, y: 76, s: 2, d: 10.5, del: 1.8, op: 0.4 },
  { x: 92, y: 82, s: 1, d: 8, del: 0.6, op: 0.3 },
  { x: 36, y: 90, s: 2, d: 9.5, del: 1.3, op: 0.36 },
];

export function CareerHero() {
  const rm = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-16 pt-[90px]"
      style={{ backgroundColor: "#05070D" }}
    >
      {/* ── Dotted grid texture, fading into darkness ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.16) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 75% 65% at 50% 36%, transparent 0%, #05070D 78%)" }}
      />

      {/* ── Animated gradient blobs ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-0 h-[560px] w-[560px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,.22) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 bottom-0 h-[520px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,.20) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.25, 1], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[28%] h-[420px] w-[420px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,.14) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.15, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* ── Glowing particles ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-kio-accent2"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, opacity: p.op }}
            animate={
              rm ? {} : { y: [0, -40, 0], x: [0, i % 2 === 0 ? 12 : -12, 0], opacity: [p.op, p.op * 0.4, p.op] }
            }
            transition={{ duration: p.d, delay: p.del, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Main 3-column dashboard ── */}
      <div className="relative z-10 mx-auto max-w-[1520px] px-6 md:px-10 xl:px-14">
        <div className="flex flex-col gap-16 xl:grid xl:grid-cols-[1.15fr_1fr_0.7fr] xl:items-center xl:gap-10">
          {/* ═══════════ LEFT- pitch + search (40%) ═══════════ */}
          <div>
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl font-black leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
            >
              <span className="text-color-cycle block">
                Work US hours.
              </span>
              <span className="block text-white">Grow without limits.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-[520px] text-[1.02rem] leading-[1.85] text-kio-muted"
            >
              No travel required. Join a team of 150+ professionals managing front desks for
              US hotels- from right here in{" "}
              <span className="font-semibold text-kio-accent">Surat</span>.
            </motion.p>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-[420px] rounded-[24px] border border-white/10 p-6"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,.28), rgba(6,182,212,.16))" }}
            >
              <p className="text-lg font-bold text-white">Ready to Apply?</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                Join the team building the future of remote hospitality.
              </p>
              <Link
                href="#apply"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#05070D] shadow-[0_10px_30px_rgba(255,255,255,.15)] transition-transform hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* ═══════════ CENTER- Career Growth Dashboard (35%) ═══════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Desktop: orbiting hub */}
            <div className="relative mx-auto hidden h-[500px] w-full max-w-[380px] xl:block">
              {/* connection lines */}
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hubLine" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0%" stopColor="var(--kio-accent2)" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="var(--kio-accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {HUB_CARDS.map((c, i) => (
                  <motion.line
                    key={c.label}
                    x1={50}
                    y1={50}
                    x2={c.x}
                    y2={c.y}
                    stroke="url(#hubLine)"
                    strokeWidth={0.35}
                    strokeDasharray="2.2 2.2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </svg>

              {/* central glowing hub- each animated layer sits inside a
                  static centering wrapper (see stat-card comment above) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(59,130,246,.35) 0%, transparent 70%)" }}
                    animate={rm ? {} : { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                {!rm && (
                  <>
                    <span className="absolute left-1/2 top-1/2 h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2">
                      <motion.span
                        className="absolute inset-0 rounded-full border border-kio-accent2/30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                      />
                    </span>
                    <span className="absolute left-1/2 top-1/2 h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2">
                      <motion.span
                        className="absolute inset-0 rounded-full border border-kio-accent/30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 1.3 }}
                      />
                    </span>
                  </>
                )}
                <div
                  className="relative flex h-[118px] w-[118px] flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 text-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(18,20,30,.95), rgba(22,25,38,.9))",
                    boxShadow: "0 0 0 1px rgba(59,130,246,.2), 0 0 50px rgba(59,130,246,.3)",
                  }}
                >
                  <Sparkles className="h-6 w-6 text-kio-accent2" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-kio-ink">Career</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-kio-ink">Hub</span>
                </div>
              </div>

              {/* floating stat cards- centering transform lives on this static
                  wrapper; framer-motion's own `animate` sets its own inline
                  `transform` (y/scale) on the child, which would otherwise
                  clobber a Tailwind translate-x/y-1/2 placed on the same element */}
              {HUB_CARDS.map((c, i) => (
                <div
                  key={c.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${c.y}%`, left: `${c.x}%` }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      rm
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 1, scale: 1, y: [0, -10, 0] }
                    }
                    transition={{
                      opacity: { duration: 0.5, delay: 0.9 + i * 0.1 },
                      scale: { duration: 0.5, delay: 0.9 + i * 0.1 },
                      y: { duration: 5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                    }}
                    whileHover={{ scale: 1.06, y: -4 }}
                  >
                    <div
                      className="flex w-[106px] flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] px-2.5 py-3 text-center shadow-[0_20px_45px_rgba(0,0,0,.5)] backdrop-blur-md transition-colors hover:border-white/25"
                    >
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full"
                        style={{ background: `${c.color}1f`, color: c.color }}
                      >
                        <c.icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm font-extrabold text-kio-ink">{c.num}</span>
                      <span className="text-[9px] leading-tight text-kio-muted">{c.label}</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Mobile / tablet: compact grid fallback */}
            <div className="xl:hidden">
              <div className="glass rounded-[24px] border border-white/10 p-6">
                <div className="mx-auto mb-6 flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-full border border-white/15" style={{ background: "linear-gradient(135deg, rgba(18,20,30,.95), rgba(22,25,38,.9))", boxShadow: "0 0 0 1px rgba(59,130,246,.2), 0 0 30px rgba(59,130,246,.3)" }}>
                  <Sparkles className="h-5 w-5 text-kio-accent2" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-kio-ink">Career Hub</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {HUB_CARDS.map((c) => (
                    <div key={c.label} className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: `${c.color}1f`, color: c.color }}>
                        <c.icon className="h-4 w-4" />
                      </span>
                      <span className="text-base font-extrabold text-kio-ink">{c.num}</span>
                      <span className="text-[10px] leading-tight text-kio-muted">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══════════ RIGHT- hiring journey + CTA (25%) ═══════════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass rounded-[24px] border border-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,.4)]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-kio-muted">Hiring Journey</h3>
              <div className="mt-6 flex flex-col">
                {HIRING_STEPS.map((step, i) => (
                  <div key={step.label} className="relative flex gap-4 pb-8 last:pb-0">
                    {i < HIRING_STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[19px] top-10 bottom-0 w-px"
                        style={{ background: "linear-gradient(to bottom, rgba(59,130,246,.4), transparent)" }}
                      />
                    )}
                    <motion.div
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-kio-accent/30"
                      style={{ background: "linear-gradient(135deg, rgba(18,20,30,.95), rgba(22,25,38,.9))" }}
                      animate={
                        rm
                          ? {}
                          : {
                              boxShadow: [
                                "0 0 0px rgba(59,130,246,0)",
                                "0 0 18px rgba(59,130,246,.55)",
                                "0 0 0px rgba(59,130,246,0)",
                              ],
                            }
                      }
                      transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
                    >
                      <step.icon className="h-4 w-4 text-kio-accent2" />
                    </motion.div>
                    <div className="pt-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-kio-muted">
                        Step {i + 1}
                      </span>
                      <p className="text-sm font-bold text-kio-ink">{step.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
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
