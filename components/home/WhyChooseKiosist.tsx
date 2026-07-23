"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const REASONS = [
  {
    title: "Continuous Learning",
    body: "We invest in your growth with ongoing training on PMS systems, hospitality soft skills, English fluency, and leadership development.",
    image: "/img/culture/training-1.png",
    color: "#3b82f6",
  },
  {
    title: "Modern Workspace",
    body: "Work from a sleek, tech-enabled office equipped with multi-monitor setups and the latest tools to help you perform at your best.",
    image: "/img/culture/team-meeting-1.png",
    color: "#06b6d4",
  },
  {
    title: "Corporate Friendly",
    body: "A professional yet approachable culture- structured processes and clear career paths, without the stiff, impersonal feel.",
    image: "/img/culture/office-2.jpg",
    color: "#8b5cf6",
  },
  {
    title: "Global Exposure",
    body: "Represent Kiosist at industry events like the AAHOA Convention, connecting with hotel owners and industry leaders across the USA.",
    image: "/img/culture/expo-dfw-2024.jpg",
    color: "#f59e0b",
  },
];

function Photo({ title, image, color, priority }: { title: string; image: string; color: string; priority: boolean }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border" style={{ borderColor: `${color}40` }}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 767px) 100vw, 50vw"
        priority={priority}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 45%)" }}
      />
    </div>
  );
}

function Details({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="mb-3 text-2xl font-bold leading-snug text-kio-ink md:text-[1.7rem]">
        {title}
      </h3>
      <p className="max-w-md text-[1rem] leading-[1.85] text-kio-muted">
        {body}
      </p>
    </div>
  );
}

export function WhyChooseKiosist() {
  return (
    <section className="section-pad relative overflow-hidden">
      {/* Ambient blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-200px] top-1/3 h-[560px] w-[560px] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,.1) 0%, transparent 70%)" }}
      />

      {/* Heading */}
      <RevealOnScroll className="relative z-10 container-kio mb-16 mx-auto max-w-[640px] text-center">
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
          Why Choose <span className="text-gradient-shimmer">Kiosist</span>
        </h2>
        <p className="mt-4 text-[.95rem] leading-[1.8] text-kio-muted">
          Beyond the job- a workplace that invests in your growth, every step of the way.
        </p>
      </RevealOnScroll>

      <div className="container-kio relative z-10 flex flex-col gap-16 md:gap-20">
        {REASONS.map((r, i) => {
          const reversed = i % 2 === 1;
          return (
            <RevealOnScroll key={r.title} className="w-full">
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                {reversed ? (
                  <>
                    <Details title={r.title} body={r.body} />
                    <Photo title={r.title} image={r.image} color={r.color} priority={i === 0} />
                  </>
                ) : (
                  <>
                    <Photo title={r.title} image={r.image} color={r.color} priority={i === 0} />
                    <Details title={r.title} body={r.body} />
                  </>
                )}
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
