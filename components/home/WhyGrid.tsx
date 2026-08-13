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
    <section id="features" className="pt-4 pb-4 md:pt-8 md:pb-5 lg:pt-12 lg:pb-6 relative overflow-hidden">
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

      {/* Mobile (< md): "What It Takes" full-width on top, skills as a
          2-column grid below- both sized for a phone row in their own
          right instead of squeezing the desktop 0.85fr/1.15fr split and
          3-column grid down to fit. md+: reverts to the original split. */}
      <div className="container-kio relative z-10 grid grid-cols-1 gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-stretch md:gap-[clamp(8px,3vw,40px)]">
        {/* ── "What It Takes" panel ── */}
        <RevealOnScroll className="relative order-2 flex flex-col justify-center overflow-hidden rounded-3xl border border-kio-line bg-kio-bg-soft p-6 md:order-1 md:p-[clamp(10px,3vw,40px)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-kio-accent/10 blur-3xl"
          />
          <h3 className="relative z-10 text-[clamp(1.5rem,7vw,2rem)] font-black leading-tight text-kio-ink md:text-[clamp(0.95rem,3.2vw,2.25rem)]">
            What It <br />
            <span className="text-color-cycle">Takes</span>
          </h3>
          <p className="relative z-10 mt-2 max-w-sm text-[clamp(0.9rem,3.6vw,1rem)] leading-[1.7] text-kio-muted md:mt-[clamp(4px,1.5vw,16px)] md:text-[clamp(0.55rem,1.8vw,.95rem)]">
            We&apos;re looking for people-first individuals ready to deliver exceptional guest experiences.
          </p>
          <div className="relative z-10 mt-4 flex items-center gap-3 rounded-2xl bg-kio-primary/5 p-3 ring-1 ring-kio-accent/20 md:mt-[clamp(8px,2.5vw,32px)] md:gap-[clamp(4px,1.2vw,12px)] md:p-[clamp(6px,1.5vw,16px)]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-kio-accent/15 text-kio-accent md:h-[clamp(20px,6vw,40px)] md:w-[clamp(20px,6vw,40px)]">
              <HeartHandshake className="h-5 w-5 md:h-[clamp(0.6rem,2.4vw,1.25rem)] md:w-[clamp(0.6rem,2.4vw,1.25rem)]" strokeWidth={1.75} />
            </div>
            <p className="text-[clamp(0.85rem,3.4vw,0.95rem)] font-semibold text-kio-ink md:text-[clamp(0.5rem,1.6vw,0.875rem)]">
              Great people. Exceptional experiences.
              <br />
              <span className="font-normal text-[0.9em] text-kio-muted">
                That&apos;s what we&apos;re all about.
              </span>
            </p>
          </div>
        </RevealOnScroll>

        {/* ── Skills & experience card grid ── */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="order-1 grid grid-cols-2 gap-x-3 gap-y-8 md:order-2 md:grid-cols-3 md:gap-x-[clamp(4px,1.5vw,16px)] md:gap-y-[clamp(20px,5.5vw,40px)]"
        >
          {FEATURES.map((f, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div
                key={f.title}
                variants={staggerChild}
                className="group relative rounded-2xl border border-kio-line bg-kio-bg p-3 pt-9 transition-all duration-300 hover:border-kio-accent/30 hover:shadow-lg hover:shadow-kio-accent/10 md:p-[clamp(6px,2vw,20px)] md:pt-[clamp(32px,9vw,64px)]"
              >
                {/* Icon badge- centered above the box, straddling its top
                    edge (half outside/half inside), same dark circular
                    lockup as CareerHero's "Ready to Apply?" badge */}
                <div
                  className="absolute left-1/2 top-0 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 md:h-[clamp(28px,7.5vw,64px)] md:w-[clamp(28px,7.5vw,64px)]"
                  style={{
                    background: "linear-gradient(135deg, rgba(18,20,30,.95), rgba(22,25,38,.9))",
                    boxShadow: `0 0 0 1px ${color}40, 0 10px 30px rgba(0,0,0,.4)`,
                  }}
                >
                  <f.icon
                    className="h-5 w-5 md:h-[clamp(0.8rem,3vw,1.75rem)] md:w-[clamp(0.8rem,3vw,1.75rem)]"
                    style={{ color }}
                    strokeWidth={1.75}
                  />
                </div>
                <h4 className="text-[clamp(0.95rem,3.8vw,1.1rem)] font-bold text-kio-ink md:text-[clamp(0.65rem,2vw,1.05rem)]">{f.title}</h4>
                <p className="mt-1 text-[clamp(0.68rem,2.6vw,0.78rem)] leading-relaxed text-kio-muted md:mt-[clamp(2px,0.6vw,6px)] md:text-[clamp(0.42rem,1.3vw,0.75rem)]">{f.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
