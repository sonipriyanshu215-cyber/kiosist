"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, Puzzle, Users, Lightbulb, Rocket, TrendingUp, Trophy } from "lucide-react";
import {
  milestones as DEFAULT_MILESTONES,
  journeyYears as DEFAULT_JOURNEY_YEARS,
  type Milestone,
} from "@/content/milestones";

type JourneyYear = { year: string; caption: string; body: string };
import { staggerParent, staggerChild } from "@/lib/motion";

const ICONS  = [Puzzle, Users, Lightbulb, Rocket, TrendingUp, Trophy];
const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

/* ── Shared section header ── */
function Header() {
  return (
    <div className="container-kio pb-9 pt-8 text-center sm:pb-6">
      <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
        Every Great <span className="text-white">Journey Begins With A Purpose</span>
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
function JourneyGrid({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="container-kio relative">
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative grid grid-cols-1 items-stretch gap-x-3 gap-y-0 sm:gap-y-10 sm:grid-cols-3 xl:flex xl:gap-x-2"
      >
      {milestones.map((m, i) => {
        const Icon  = ICONS[i] ?? Lightbulb;
        const color = COLORS[i % COLORS.length];

        return (
          <Fragment key={`${m.id}-${i}`}>
            <motion.div
              variants={staggerChild}
              className="group relative flex min-w-0 flex-col justify-start rounded-2xl border border-kio-line bg-kio-bg p-3 pt-8 text-center transition-all duration-300 hover:border-kio-accent/30 hover:shadow-lg hover:shadow-kio-accent/10 sm:min-h-[17rem] sm:p-5 sm:pt-16 xl:flex-1"
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

              <h3 className="text-white text-xl font-bold xl:text-lg">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-kio-muted">
                {m.body}
              </p>
            </motion.div>

            {i < milestones.length - 1 && (
              <>
                {/* Mobile: a downward arrow between each stacked card so
                    the stack reads as a timeline instead of a list of
                    disconnected boxes. Only true while cards are a single
                    column- once they wrap onto a 3-col grid at sm a
                    vertical arrow no longer lines up with the next card.
                    Taller than the old connecting-line version and
                    top-aligned (not centered)- the next card's icon badge
                    absolutely overlaps upward into the bottom ~22px of this
                    gap (see the badge's own -translate-y-1/2 above), so the
                    arrow has to sit above that zone, in the gap's free top
                    portion, or the badge paints over it. z-20 (above the
                    badge's z-10) as a safety margin against any residual
                    overlap. */}
                <div aria-hidden="true" className="z-20 flex h-14 shrink-0 items-start justify-center sm:hidden">
                  <ArrowDown className="h-6 w-6 text-white" />
                </div>

                {/* Desktop: horizontal arrow- only reads sensibly once
                    every card sits in a single row */}
                <div aria-hidden="true" className="z-10 hidden shrink-0 self-center xl:flex xl:items-center xl:justify-center">
                  <ArrowRight className="h-4 w-4 text-kio-muted/50" />
                </div>
              </>
            )}
          </Fragment>
        );
      })}
      </motion.div>
    </div>
  );
}

/* ── Closing tagline strip + condensed year-by-year recap ── */
function JourneyFooter({ journeyYears }: { journeyYears: JourneyYear[] }) {
  return (
    <div className="container-kio pb-10 pt-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-kio-line bg-kio-bg-soft px-6 py-5 text-center text-sm font-semibold text-kio-ink sm:text-base">
        A Journey Built On <span className="text-white">People.</span> Powered By{" "}
        <span className="text-white">Purpose.</span> Driven By{" "}
        <span className="text-white">Hospitality.</span>
      </div>

      <div className="relative mx-auto mt-6 max-w-5xl">
        {/* Spine- runs through the row of year dots, colored to match
            each dot so it reads as a connected timeline instead of the
            near-invisible hairline `bg-kio-line` gave against the dark
            section. Only shown at lg+, the one breakpoint where the grid
            is truly a single row of 5- at sm/md the dots wrap onto two
            rows and a straight gradient line would cut across them. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-[9px] hidden h-[2px] -translate-y-1/2 lg:block"
          style={{
            background: `linear-gradient(to right, ${journeyYears
              .map((_, i) => `${COLORS[i % COLORS.length]} ${((i + 0.5) / journeyYears.length) * 100}%`)
              .join(", ")})`,
            opacity: 0.7,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-[9px] hidden h-[6px] -translate-y-1/2 blur-md lg:block"
          style={{
            background: `linear-gradient(to right, ${journeyYears
              .map((_, i) => `${COLORS[i % COLORS.length]} ${((i + 0.5) / journeyYears.length) * 100}%`)
              .join(", ")})`,
            opacity: 0.4,
          }}
        />

        {/* Mobile (< sm): a single-column stack instead of a 2-up grid-
            5 years wrapped 2/2/1, leaving the last card stranded alone
            on its own row, and each pair only matched height via
            `items-stretch` rather than hugging its own content. A
            connecting line between each dot makes it read as one
            continuous timeline instead of a card list. sm+: unchanged
            multi-column grid with the dot row (and, at lg+, the spine
            above). */}
        <div className="grid grid-cols-1 items-stretch gap-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {journeyYears.map((y, i) => (
            <Fragment key={`${y.year}-${i}`}>
              <div className="relative flex min-w-0 w-full flex-col items-center text-center">
                <span
                  aria-hidden="true"
                  className="relative z-10 h-[18px] w-[18px] shrink-0 rounded-full border-2 sm:mb-2"
                  style={{
                    borderColor: COLORS[i % COLORS.length],
                    background: "linear-gradient(135deg, rgba(1, 1, 1, 0.95), rgba(6, 6, 6, 0.9))",
                  }}
                />
                {/* Stem connecting the dot down into its own card below- the
                    dot already gets a line from the connector above (except
                    the very first dot, which has nothing above it to connect
                    to), but without this it dead-ends into a bare margin on
                    its way down, reading as an incomplete/one-sided
                    connection. sm:hidden to match the connector- untouched
                    at sm+, where this gap is a plain margin as before. */}
                <div aria-hidden="true" className="h-2 w-[2px] shrink-0 sm:hidden" style={{ background: COLORS[i % COLORS.length] }} />
                <div className="flex w-[85%] flex-col rounded-xl border border-kio-line bg-kio-bg px-3 py-3 sm:h-full sm:w-full">
                  <div className="text-white text-lg font-black">{y.year}</div>
                  <p className="mt-1 text-sm font-semibold text-kio-ink">{y.caption}</p>
                  <p className="mt-1 text-sm leading-snug text-kio-muted">{y.body}</p>
                </div>
              </div>

              {i < journeyYears.length - 1 && (
                <div aria-hidden="true" className="relative flex h-6 shrink-0 items-center justify-center sm:hidden">
                  {/* Extends 9px (the dot's own radius) past the connector
                      box's bottom edge, into the next dot's vertical
                      center- otherwise the line just touches the dot's
                      top tangent, which reads as stopping short of it
                      rather than connecting through it. Matches the lg+
                      desktop spine, which is deliberately positioned at
                      `top-[9px]` for the same reason- centered through
                      each dot, not touching its edge. Dot sits at z-10,
                      above this line, so it still reads as a bead on a
                      continuous wire rather than the line overlapping on
                      top of it. */}
                  <div
                    className="absolute left-1/2 top-0 h-[calc(100%+9px)] w-[2px] -translate-x-1/2 rounded-full"
                    style={{ background: `linear-gradient(to bottom, ${COLORS[i % COLORS.length]}, ${COLORS[(i + 1) % COLORS.length]})` }}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main export ── */
interface TimelineSceneProps {
  milestones?: Milestone[];
  journeyYears?: JourneyYear[];
}

export function TimelineScene({
  milestones = DEFAULT_MILESTONES,
  journeyYears = DEFAULT_JOURNEY_YEARS,
}: TimelineSceneProps) {
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
        <JourneyGrid milestones={milestones} />
        <JourneyFooter journeyYears={journeyYears} />
      </div>
    </section>
  );
}
