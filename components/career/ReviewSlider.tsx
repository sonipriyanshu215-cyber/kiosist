"use client";

import { Star } from "lucide-react";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#6366f1", "#14b8a6"];

const REVIEWS = [
  {
    id: "r-1",
    quote:
      "Working at Kiosist has been an interesting experience—in the best way possible! The work environment is great, with plenty of opportunities to grow (as long as you're willing to put in the effort). The pay scale? Won't disappoint you.",
    author: "Hetvi Mistry",
    meta: "1 review",
    timeAgo: "a year ago",
    rating: 5,
  },
  {
    id: "r-2",
    quote:
      "A front desk operating company plays a crucial role in shaping first impressions and ensuring smooth daily operations. With professionalism, efficiency, and a customer-first approach, it enhances guest experiences.",
    author: "Ayush Maisuriya",
    meta: "6 reviews",
    timeAgo: "a year ago",
    rating: 5,
  },
  {
    id: "r-3",
    quote:
      "Best Experience: From start to finish, my interaction with Kiosist was nothing short of outstanding. The team's professionalism, prompt communication, and attention to detail exceeded my expectations.",
    author: "Raj Ali",
    meta: "2 reviews · 1 photo",
    timeAgo: "2 years ago",
    rating: 5,
  },
  {
    id: "r-4",
    quote:
      "I am having an excellent experience with the Company and it's evident that their commitment to excellence starts from the top. From my initial inquiry to the final delivery, the entire process was seamless.",
    author: "Manzil Dhruv",
    meta: "4 reviews",
    timeAgo: "2 years ago",
    rating: 5,
  },
  {
    id: "r-5",
    quote: "Smiles and laughs are definitely not for sadistic people.",
    author: "Ajit Shukla",
    meta: "1 review",
    timeAgo: "a year ago",
    rating: 5,
  },
  {
    id: "r-6",
    quote: "It's a good place to work.",
    author: "Jahir Manjiyani",
    meta: "Local Guide · 20 reviews",
    timeAgo: "2 months ago",
    rating: 5,
  },
  {
    id: "r-7",
    quote: "Best working experience! International support centre- good exposure.",
    author: "Iamsagarkavaa",
    meta: "Local Guide · 65 reviews",
    timeAgo: "2 months ago",
    rating: 5,
  },
  {
    id: "r-8",
    quote: "Amazing Corporate office.",
    author: "Irbaaz Kapadia",
    meta: "Local Guide · 10 reviews",
    timeAgo: "2 years ago",
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

function ReviewCard({ r, colorIdx }: { r: (typeof REVIEWS)[number]; colorIdx: number }) {
  const color = COLORS[colorIdx % COLORS.length];
  return (
    <div className="flex w-[340px] shrink-0 flex-col rounded-3xl bg-white/5 p-8 backdrop-blur-sm ring-1 ring-white/10 transition-colors hover:ring-white/20">
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold"
          style={{ background: `${color}30`, border: `1px solid ${color}60`, color }}
        >
          {initials(r.author)}
        </div>
        <div>
          <p className="font-semibold text-white">{r.author}</p>
          <p className="text-sm font-medium" style={{ color }}>
            {r.meta}
          </p>
          <p className="text-xs text-white/50">{r.timeAgo} on Google</p>
        </div>
      </div>

      <div className="mt-5 flex gap-1">
        {Array.from({ length: r.rating }).map((_, j) => (
          <Star key={j} className="h-4 w-4 fill-kio-accent text-kio-accent" />
        ))}
      </div>

      <p className="mt-3 flex-1 text-[.95rem] italic leading-relaxed text-white/80">
        &ldquo;{r.quote}&rdquo;
      </p>
    </div>
  );
}

export function ReviewSlider() {
  return (
    <section className="section-pad relative overflow-hidden bg-kio-primary">
      <div className="container-kio">
        <RevealOnScroll className="mb-14 md:mb-16 lg:mb-20 text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
            Our People &<br className="sm:hidden" /> <span className="text-color-cycle">Their Experience With Kiosist</span>
          </h2>
        </RevealOnScroll>
      </div>

      {/* Edge fade masks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32"
        style={{ background: "linear-gradient(to right, var(--kio-primary), transparent)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32"
        style={{ background: "linear-gradient(to left, var(--kio-primary), transparent)" }} />

      {/* Single row- scrolls left */}
      <div className="overflow-hidden py-2">
        <div className="marquee-track flex w-max items-stretch gap-6 px-6">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} r={r} colorIdx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
