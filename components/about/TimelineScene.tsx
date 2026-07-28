"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Puzzle, Users, Lightbulb, Rocket, TrendingUp, Trophy } from "lucide-react";
import { milestones, journeyYears } from "@/content/milestones";
import { staggerParent, staggerChild } from "@/lib/motion";

const ICONS  = [Puzzle, Users, Lightbulb, Rocket, TrendingUp, Trophy];
const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

/* ── Shared section header ── */
function Header() {
  return (
    <div className="container-kio pb-6 pt-8 text-center">
      <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
        Every Great <span className="text-color-cycle">Journey Begins With A Purpose.</span>
      </h2>
      <p className="mt-4 text-kio-muted">
        Here&apos;s how Kiosist came to life.
      </p>
    </div>
  );
}

/* ── Six-step story, laid out as a single static row (wraps on
    narrower screens)- no pinned/scroll-jacked animation, everything
    reveals in place with a viewport-triggered stagger like the rest
    of the page. ── */
function JourneyGrid() {
  return (
    <div className="container-kio relative">
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative grid grid-cols-2 items-start gap-x-3 gap-y-10 sm:grid-cols-3 xl:flex xl:gap-x-2"
      >
      {milestones.map((m, i) => {
        const Icon  = ICONS[i] ?? Lightbulb;
        const color = COLORS[i % COLORS.length];

        return (
          <Fragment key={m.id}>
            <motion.div
              variants={staggerChild}
              className="group relative flex min-w-0 min-h-[17rem] flex-col justify-start rounded-2xl border border-kio-line bg-kio-bg p-5 pt-16 text-center transition-all duration-300 hover:border-kio-accent/30 hover:shadow-lg hover:shadow-kio-accent/10 xl:flex-1"
            >
              {/* Icon badge- centered above the card, half outside/half
                  inside, same lockup as the skills-grid cards elsewhere
                  on the site */}
              <div
                className="absolute left-1/2 top-0 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15"
                style={{
                  background: "linear-gradient(135deg, rgba(18,20,30,.95), rgba(22,25,38,.9))",
                  boxShadow: `0 0 0 1px ${color}40, 0 10px 30px rgba(0,0,0,.4)`,
                }}
              >
                <Icon className="h-[1.15rem] w-[1.15rem]" style={{ color }} strokeWidth={1.75} />
              </div>

              <h3 className="text-color-cycle text-xl font-bold xl:text-lg">{m.title}</h3>
              <p className="mt-2.5 text-base leading-relaxed text-kio-muted xl:text-[15px]">
                {m.body}
              </p>
            </motion.div>

            {/* Connector- only reads sensibly once every card sits in a
                single row, so it's hidden below the breakpoint where
                cards wrap onto their own lines */}
            {i < milestones.length - 1 && (
              <div aria-hidden="true" className="z-10 hidden shrink-0 self-center xl:flex xl:items-center xl:justify-center">
                <ArrowRight className="h-4 w-4 text-kio-muted/50" />
              </div>
            )}
          </Fragment>
        );
      })}
      </motion.div>
    </div>
  );
}

/* ── Closing tagline strip + condensed year-by-year recap ── */
function JourneyFooter() {
  return (
    <div className="container-kio pb-10 pt-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-kio-line bg-kio-bg-soft px-6 py-5 text-center text-sm font-semibold text-kio-ink sm:text-base">
        A Journey Built On <span className="text-color-cycle">People.</span> Powered By{" "}
        <span className="text-color-cycle">Purpose.</span> Driven By{" "}
        <span className="text-color-cycle">Hospitality.</span>
      </div>

      <div className="relative mx-auto mt-6 max-w-5xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {journeyYears.map((y, i) => (
            <div key={y.year} className="relative flex flex-col items-center text-center">
              <span
                aria-hidden="true"
                className="relative z-10 mb-3 hidden h-[18px] w-[18px] rounded-full border-2 sm:block"
                style={{ borderColor: COLORS[i % COLORS.length], background: "var(--kio-bg)" }}
              />
              <div className="w-full rounded-xl border border-kio-line bg-kio-bg px-3 py-4">
                <div className="text-color-cycle text-lg font-black">{y.year}</div>
                <p className="mt-1 text-xs font-semibold text-kio-ink">{y.caption}</p>
                <p className="mt-1 text-[11px] leading-snug text-kio-muted">{y.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-5 max-w-lg text-center text-sm italic text-kio-muted">
        Different hotels. Different guests. One promise: We&apos;re Always Here.
      </p>
    </div>
  );
}

/* ── Main export ── */
export function TimelineScene() {
  const rm = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[560px] w-[560px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,.14) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[480px] w-[480px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,.12) 0%, transparent 70%)" }}
        animate={rm ? {} : { scale: [1, 1.22, 1], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10">
        <Header />
        <JourneyGrid />
        <JourneyFooter />
      </div>
    </section>
  );
}
