"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const REASONS = [
  {
    title: "Continuous Learning",
    body: "At Kiosist, learning never stops. Through ongoing training, coaching, and hands-on experience, you have the opportunity to continuously develop your skills and grow both personally and professionally.",
    image: "/img/culture/training-1.png",
    color: "#3b82f6",
  },
  {
    title: "Modern Workspace",
    body: "Work in a professional and technology-driven environment where modern tools, innovative systems, and collaborative workspaces come together to create a better way of working.",
    image: "/img/culture/team-meeting-1.png",
    color: "#06b6d4",
  },
  {
    title: "Professional Growth",
    body: "Every milestone counts here. Take on new responsibilities, sharpen your strengths, and get recognized for the work you put in as your career moves forward.",
    image: "/img/culture/expo-dfw-2024.jpg",
    color: "#10b981",
  },
  {
    title: "Corporate Friendly",
    body: "Clear processes, defined roles, and real accountability- so you always know what's expected and how your work fits into the bigger picture.",
    image: "/img/culture/office-2.jpg",
    color: "#8b5cf6",
  },
  {
    title: "Global Exposure",
    body: "Be part of a team that connects with the global hospitality industry. Every year, Kiosist participates in AAHOA's annual convention in the US, where hospitality leaders, innovators, and industry professionals come together.",
    image: "/img/culture/office-3.jpg",
    color: "#f59e0b",
  },
  {
    title: "A Team That Supports You",
    body: "Work alongside a team that values collaboration, encourages growth, and believes that people do their best work when they feel supported.",
    image: "/img/culture/team-3.jpg",
    color: "#6366f1",
  },
];

function Photo({ title, image, color, priority }: { title: string; image: string; color: string; priority: boolean }) {
  return (
    <div className="relative h-full min-h-[440px] w-full overflow-hidden rounded-[28px] border" style={{ borderColor: `${color}40` }}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="50vw"
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

function Details({ title, body, color }: { title: string; body: string; color: string }) {
  return (
    <div
      className="flex h-full min-h-[440px] flex-col justify-center rounded-2xl bg-kio-bg p-[clamp(10px,2.5vw,32px)] ring-1 ring-kio-line transition-colors hover:ring-[var(--hover-ring)]"
      style={{ "--hover-ring": `${color}60` } as React.CSSProperties}
    >
      <h3 className="mb-[clamp(4px,1.6vw,12px)] text-[clamp(0.75rem,3vw,1.7rem)] font-bold leading-snug text-kio-ink">
        {title}
      </h3>
      <p className="max-w-md text-[clamp(0.55rem,1.8vw,1rem)] leading-[1.6] text-kio-muted">
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

      {/* Heading- centered, no explanation copy underneath */}
      <RevealOnScroll className="relative z-10 container-kio mb-14 md:mb-16 lg:mb-20 mx-auto max-w-[640px] text-center">
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
          Why Choose <span className="text-gradient-shimmer">Kiosist</span>
        </h2>
      </RevealOnScroll>

      <div className="container-kio relative z-10">
        <div className="relative mx-auto max-w-5xl">
          {/* Partition line- runs behind the whole column of rows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-kio-line md:block"
          />

          <div className="flex flex-col gap-[clamp(24px,6vw,64px)]">
            {REASONS.map((r, i) => {
              const reversed = i % 2 === 1;
              return (
                <RevealOnScroll key={r.title} className="w-full">
                  {/* Photo always precedes Details in DOM order so the
                      mobile single-column stack always reads Photo, Details,
                      Photo, Details...- alternating the visual side on
                      desktop via `order` (md:+ only) instead of swapping DOM
                      order would otherwise pair two Details (or two Photo)
                      boxes back to back whenever a "reversed" row followed
                      a normal one. */}
                  <div className="relative grid grid-cols-1 items-stretch gap-[clamp(10px,3vw,32px)] md:grid-cols-2 md:gap-0">
                    <div
                      className={
                        reversed
                          ? "md:order-2 md:pl-12 md:w-[calc(100%+2.5rem)] lg:w-[calc(100%+5rem)]"
                          : "md:pr-12 md:-ml-10 md:w-[calc(100%+2.5rem)] lg:-ml-20 lg:w-[calc(100%+5rem)]"
                      }
                    >
                      <Photo title={r.title} image={r.image} color={r.color} priority={i === 0} />
                    </div>
                    <div className={reversed ? "md:order-1 md:pr-12" : "md:pl-12"}>
                      <Details title={r.title} body={r.body} color={r.color} />
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}