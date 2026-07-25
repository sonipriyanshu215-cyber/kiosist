"use client";

import { Star } from "lucide-react";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import { staggerParent, staggerChild } from "@/lib/motion";
import { motion } from "framer-motion";

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#6366f1", "#14b8a6"];

const REVIEWS = [
  {
    id: "r-1",
    quote:
      "Working at Kiosist changed my life. I used to work odd hours at a local BPO. Now I work nights helping US hotels- and I actually enjoy it.",
    author: "Priya M.",
    role: "Senior Virtual Agent",
    tenure: "2 years",
    rating: 5,
  },
  {
    id: "r-2",
    quote:
      "The training here is unlike anything else. In 3 weeks I learned more about hotel operations than I did in a year at my previous job.",
    author: "Harsh P.",
    role: "Trainer",
    tenure: "1.5 years",
    rating: 5,
  },
  {
    id: "r-3",
    quote:
      "Henal  and the leadership genuinely care. When I had a personal issue, they were flexible without any questions. That's rare.",
    author: "Anjali S.",
    role: "Operations Lead",
    tenure: "3 years",
    rating: 5,
  },
  {
    id: "r-4",
    quote:
      "I came in knowing zero about hotels. The team-lead programme helped me grow faster than I thought possible. I'm now training new joiners.",
    author: "Kiran B.",
    role: "Team Lead",
    tenure: "2.5 years",
    rating: 5,
  },
  {
    id: "r-5",
    quote:
      "Night shifts sounded rough at first, but the shift allowance and cab pickup made it a non-issue. Now it's just... my normal workday.",
    author: "Devansh K.",
    role: "Front Desk Executive",
    tenure: "1 year",
    rating: 5,
  },
  {
    id: "r-6",
    quote:
      "I handle guest calls for three different hotel brands and no two days feel the same. The variety keeps me sharp and genuinely engaged.",
    author: "Neha T.",
    role: "Front Desk Executive",
    tenure: "1.5 years",
    rating: 5,
  },
  {
    id: "r-7",
    quote:
      "Every agent gets a real onboarding buddy, not just a manual. Mine walked me through my first ten calls- that support made all the difference.",
    author: "Rushabh D.",
    role: "Quality Analyst",
    tenure: "2 years",
    rating: 5,
  },
  {
    id: "r-8",
    quote:
      "I joined as a fresher straight out of college. Two years later I'm running the hiring process for the same seat I once interviewed for.",
    author: "Foram J.",
    role: "HR & Talent Lead",
    tenure: "2 years",
    rating: 5,
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewRow({ r, colorIdx }: { r: (typeof REVIEWS)[number]; colorIdx: number }) {
  const color = COLORS[colorIdx % COLORS.length];
  return (
    <motion.div
      variants={staggerChild}
      className="flex flex-col gap-4 py-7 first:pt-0 sm:flex-row sm:items-start"
    >
      <div className="flex shrink-0 items-center gap-4 sm:w-56">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          style={{ background: `${color}30`, border: `1px solid ${color}60`, color }}
        >
          {initials(r.author)}
        </div>
        <div>
          <p className="font-semibold text-white">{r.author}</p>
          <p className="text-sm font-medium" style={{ color }}>
            {r.role}
          </p>
          <p className="text-xs text-white/50">{r.tenure} at Kiosist</p>
        </div>
      </div>

      <div className="flex-1">
        <div className="mb-2 flex gap-1">
          {Array.from({ length: r.rating }).map((_, j) => (
            <Star key={j} className="h-3.5 w-3.5 fill-kio-accent text-kio-accent" />
          ))}
        </div>
        <p className="text-[.95rem] italic leading-relaxed text-white/80">&ldquo;{r.quote}&rdquo;</p>
      </div>
    </motion.div>
  );
}

export function ReviewSlider() {
  return (
    <section className="section-pad bg-kio-primary">
      <div className="container-kio">
        <RevealOnScroll className="mb-4 text-center">
          <h2 className="mt-3 font-display text-3xl font-bold text-gradient-gold md:text-4xl">
            Straight From The Team
          </h2>
        </RevealOnScroll>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-4xl divide-y divide-white/10"
        >
          {REVIEWS.map((r, i) => (
            <ReviewRow key={r.id} r={r} colorIdx={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
