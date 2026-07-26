"use client";

import { motion } from "framer-motion";
import { MessageCircleMore, HeartHandshake, GraduationCap, Laptop, History, Award } from "lucide-react";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

/* lucide-react has no single "person with heart" glyph, so this composites
   its user-round + heart primitives- keeps the same stroke-icon look as the
   rest of the set instead of pulling in a whole new icon package for one glyph. */
function UserHeart({ className, style, strokeWidth = 2 }: { className?: string; style?: React.CSSProperties; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="9" cy="9" r="4" />
      <path d="M16 21a7 7 0 0 0-14 0" />
      <path
        d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
        transform="translate(12.5,-1) scale(0.42)"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

type IconComponent = (props: { className?: string; style?: React.CSSProperties; strokeWidth?: number }) => React.ReactNode;

const FEATURES: { icon: IconComponent; title: string; body: string }[] = [
  {
    icon: MessageCircleMore,
    title: "Fluency In English",
    body: "Communicate clearly and confidently with guests from around the world.",
  },
  {
    icon: UserHeart,
    title: "Strong Customer Service Skills",
    body: "A passion for helping people and creating positive experiences.",
  },
  {
    icon: GraduationCap,
    title: "Willingness To Learn",
    body: "Stay curious, embrace feedback, and grow with every opportunity.",
  },
  {
    icon: Laptop,
    title: "Tech Friendly",
    body: "Comfortable using technology and eager to learn new tools.",
  },
  {
    icon: History,
    title: "Rotational Shift",
    body: "Flexible to work different shifts, including nights, weekends & holidays.",
  },
  {
    icon: Award,
    title: "Prior Experience",
    body: "Previous experience in hospitality or customer service is an advantage.",
  },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

export function WhyGrid() {
  return (
    <section id="features" className="pt-8 pb-4 md:pt-8 md:pb-5 lg:pt-12 lg:pb-6 relative overflow-hidden">
      {/* Ambient blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-200px] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,.12) 0%, transparent 70%)" }}
      />

      {/* Heading- no explanation copy underneath, per brief */}
      <RevealOnScroll className="relative z-10 container-kio mb-14 md:mb-16 lg:mb-20 text-center">
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
          <span className="text-color-cycle">Skills</span> And <span className="text-color-cycle">Experience</span> Required
        </h2>
      </RevealOnScroll>

      {/* Always the 0.85fr/1.15fr two-column split (same alignment as
          desktop), fluid clamp()s shrinking everything to fit instead of
          restacking below lg. */}
      <div className="container-kio relative z-10 grid grid-cols-[0.85fr_1.15fr] items-stretch gap-[clamp(8px,3vw,40px)]">
        {/* ── Left: What It Takes panel ── */}
        <RevealOnScroll className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-kio-line bg-kio-bg-soft p-[clamp(10px,3vw,40px)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-kio-accent/10 blur-3xl"
          />
          <h3 className="relative z-10 text-[clamp(0.95rem,3.2vw,2.25rem)] font-black leading-tight text-kio-ink">
            What It <span className="text-gradient-shimmer">Takes</span>
          </h3>
          <p className="relative z-10 mt-[clamp(4px,1.5vw,16px)] max-w-sm text-[clamp(0.55rem,1.8vw,.95rem)] leading-[1.7] text-kio-muted">
            We&apos;re looking for people-first individuals ready to deliver exceptional guest experiences.
          </p>
          <div className="relative z-10 mt-[clamp(8px,2.5vw,32px)] flex items-center gap-[clamp(4px,1.2vw,12px)] rounded-2xl bg-kio-primary/5 p-[clamp(6px,1.5vw,16px)] ring-1 ring-kio-accent/20">
            <div className="flex h-[clamp(20px,6vw,40px)] w-[clamp(20px,6vw,40px)] shrink-0 items-center justify-center rounded-full bg-kio-accent/15 text-kio-accent">
              <HeartHandshake className="h-[clamp(0.6rem,2.4vw,1.25rem)] w-[clamp(0.6rem,2.4vw,1.25rem)]" strokeWidth={1.75} />
            </div>
            <p className="text-[clamp(0.5rem,1.6vw,0.875rem)] font-semibold text-kio-ink">
              Great people. Exceptional experiences. That&apos;s what we&apos;re all about.
            </p>
          </div>
        </RevealOnScroll>

        {/* ── Right: Skills & experience card grid- always 3 columns, same as desktop ── */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-3 gap-[clamp(4px,1.5vw,16px)]"
        >
          {FEATURES.map((f, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div
                key={f.title}
                variants={staggerChild}
                className="group relative rounded-2xl border border-kio-line bg-kio-bg p-[clamp(6px,2vw,20px)] transition-all duration-300 hover:border-kio-accent/30 hover:shadow-lg hover:shadow-kio-accent/10"
              >
                <span className="font-mono text-[clamp(0.5rem,1.4vw,0.75rem)] font-bold" style={{ color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="mb-[clamp(4px,1.6vw,16px)] mt-[clamp(3px,1.2vw,12px)] flex h-[clamp(18px,5vw,44px)] w-[clamp(18px,5vw,44px)] items-center justify-center rounded-xl"
                  style={{ background: `${color}18`, border: `1px solid ${color}38` }}
                >
                  <f.icon className="h-[clamp(0.55rem,2.2vw,1.25rem)] w-[clamp(0.55rem,2.2vw,1.25rem)]" style={{ color }} strokeWidth={1.75} />
                </div>
                <h4 className="text-[clamp(0.5rem,1.6vw,0.875rem)] font-bold text-kio-ink">{f.title}</h4>
                <p className="mt-[clamp(2px,0.6vw,6px)] text-[clamp(0.42rem,1.3vw,0.75rem)] leading-relaxed text-kio-muted">{f.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
