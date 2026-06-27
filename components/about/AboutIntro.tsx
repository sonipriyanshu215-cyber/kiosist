"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { SafeImage } from "@/components/primitives/SafeImage";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import { FloatingIcon } from "@/components/primitives/FloatingIcon";
import { staggerParent, staggerChild } from "@/lib/motion";

const STATS = [
  { value: "2020", label: "Founded" },
  { value: "45+",  label: "Team Members" },
  { value: "100+", label: "Hotels Served" },
  { value: "15+",  label: "US States" },
];

/* Counts up from 0 to the numeric part of `value` on first viewport entry */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const rm    = useReducedMotion();
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv    = useMotionValue(0);

  const numMatch = value.match(/\d+/);
  const num    = numMatch ? parseInt(numMatch[0]) : 0;
  const suffix = value.replace(/\d+/, "");
  const display = useTransform(mv, (v) => Math.round(v) + suffix);

  useEffect(() => {
    if (!inView || rm) return;
    const ctrl = animate(mv, num, { duration: 1.8, ease: "easeOut" });
    return ctrl.stop;
  }, [inView, rm, num, mv]);

  return (
    <motion.div ref={ref} variants={staggerChild} className="flex flex-col items-center text-center">
      <div className="text-3xl font-bold text-kio-accent">
        {rm ? value : <motion.span>{display}</motion.span>}
      </div>
      <div className="mt-1 text-xs text-kio-muted">{label}</div>
    </motion.div>
  );
}

export function AboutIntro() {
  const rm = useReducedMotion();

  return (
    <section className="section-pad bg-kio-bg pt-36 relative overflow-hidden">

      {/* Ambient floating blobs */}
      <motion.div
        className="pointer-events-none absolute -left-48 top-10 h-[520px] w-[520px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, var(--kio-accent), transparent 70%)" }}
        animate={rm ? {} : { x: [0, 32, 0], y: [0, 22, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-48 bottom-10 h-[420px] w-[420px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, var(--kio-accent2), transparent 70%)" }}
        animate={rm ? {} : { x: [0, -24, 0], y: [0, 28, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-kio relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* ── Left: copy + stats ── */}
          <div>
            <RevealOnScroll>
              <motion.p
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-sm font-semibold uppercase tracking-widest text-kio-accent"
              >
                About Kiosist
              </motion.p>

              <h1 className="mt-3 text-4xl font-bold text-kio-ink md:text-5xl">
                Bridging the gap between US hotels and round-the-clock staffing.
              </h1>

              {/* Animated gradient underline */}
              <motion.div
                className="mt-3 h-0.5 rounded-full bg-gradient-to-r from-kio-accent via-kio-accent2 to-transparent"
                initial={{ scaleX: 0, originX: "0%" }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
              />

              <p className="mt-6 leading-relaxed text-kio-muted">
                Kiosist Pvt. Ltd. was founded in Surat, India, with a singular mission: make
                professional front desk coverage accessible to every US hotel — not just the
                ones that can afford overnight in-person staff.
              </p>
              <p className="mt-4 leading-relaxed text-kio-muted">
                We pair our trained virtual agents with KioClerk — our proprietary kiosk and
                remote-agent platform — to deliver seamless check-ins, guest query resolution,
                and PMS management from across the globe.
              </p>
            </RevealOnScroll>

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
            >
              {STATS.map((s) => (
                <AnimatedStat key={s.label} value={s.value} label={s.label} />
              ))}
            </motion.div>
          </div>

          {/* ── Right: image ── */}
          <div className="relative hidden h-[520px] lg:block">

            {/* Pulsing glow behind image */}
            <motion.div
              className="pointer-events-none absolute -inset-6 rounded-3xl opacity-0"
              style={{ background: "radial-gradient(ellipse at 55% 45%, var(--kio-accent), transparent 65%)" }}
              animate={rm ? {} : { opacity: [0.14, 0.28, 0.14] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Image container — slides + scales in */}
            <motion.div
              className="relative z-10 h-full w-full overflow-hidden rounded-3xl ring-1 ring-kio-accent/20"
              initial={{ opacity: 0, scale: 0.93, y: 28 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SafeImage
                src="/img/about/team-wide.webp"
                alt="Kiosist team"
                fill
                className="object-cover"
                sizes="45vw"
              />

              {/* Scan line sweeping top → bottom */}
              {!rm && (
                <motion.div
                  className="pointer-events-none absolute inset-x-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-kio-accent/70 to-transparent"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear", repeatDelay: 2.5 }}
                />
              )}

              {/* Corner brackets */}
              {[
                "top-3 left-3 border-t border-l",
                "top-3 right-3 border-t border-r",
                "bottom-3 left-3 border-b border-l",
                "bottom-3 right-3 border-b border-r",
              ].map((cls) => (
                <span
                  key={cls}
                  aria-hidden="true"
                  className={`pointer-events-none absolute z-20 h-5 w-5 border-kio-accent/60 ${cls}`}
                />
              ))}
            </motion.div>

            {/* Floating stat badge */}
            <motion.div
              className="absolute -right-5 top-14 z-20 rounded-xl border border-kio-accent/30 bg-kio-bg-soft/90 px-4 py-3 shadow-xl backdrop-blur-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              animate={rm ? {} : { y: [0, -6, 0] }}
            >
              <p className="text-xs font-semibold text-kio-muted">Guest Satisfaction</p>
              <p className="text-2xl font-bold text-kio-accent">98%</p>
            </motion.div>

            {/* Floating response-time badge */}
            <motion.div
              className="absolute -left-5 bottom-20 z-20 rounded-xl border border-kio-accent2/30 bg-kio-bg-soft/90 px-4 py-3 shadow-xl backdrop-blur-md"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              animate={rm ? {} : { y: [0, 6, 0] }}
            >
              <p className="text-xs font-semibold text-kio-muted">Avg. Response</p>
              <p className="text-2xl font-bold text-kio-accent2">&lt; 30s</p>
            </motion.div>

            <FloatingIcon src="/icons/spark.svg" className="-top-6 -right-6" amp={14} delay={0} width={48} height={48} />
            <FloatingIcon src="/icons/star.svg"  className="-bottom-4 left-8"  amp={10} delay={1} width={36} height={36} />
          </div>
        </div>
      </div>
    </section>
  );
}
