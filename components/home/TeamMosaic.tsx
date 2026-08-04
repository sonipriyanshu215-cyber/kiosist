"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

/* Unique accent per card- cycles if team grows */
const ACCENTS = [
  { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.38)" },
  { from: "#8b5cf6", to: "#6366f1", glow: "rgba(139,92,246,0.38)" },
  { from: "#06b6d4", to: "#10b981", glow: "rgba(6,182,212,0.38)" },
  { from: "#f59e0b", to: "#ef4444", glow: "rgba(245,158,11,0.32)" },
  { from: "#ec4899", to: "#8b5cf6", glow: "rgba(236,72,153,0.38)" },
  { from: "#10b981", to: "#3b82f6", glow: "rgba(16,185,129,0.32)" },
  { from: "#6366f1", to: "#ec4899", glow: "rgba(99,102,241,0.38)" },
  { from: "#f59e0b", to: "#06b6d4", glow: "rgba(245,158,11,0.32)" },
];

const TEAM = [
  { name: "Henal Dalal",                              img: "/img/team/ceo.webp",        tag: "FOUNDER", pos: "object-top" },
  { name: "Bhavin Dalal",                              img: "/img/team/t6.webp",        tag: "FOUNDER"  },
  { name: "Vinit Patel",                                   img: "/img/team/t2.webp",    tag: "CEO"  },
  { name: "Parshva Shah",             img: "/img/team/t8.webp",                         tag: "Assistant General Manager"    },
  { name: "Sourabh Patil",                          img: "/img/team/t5.webp",           tag: "Team Leader"  },
  // t3.webp shows a woman- wrong for Smeet (male). No correct photo of him is
  // available yet, so this intentionally-missing path falls back to the
  // initials placeholder below rather than displaying a mismatched photo.
  { name: "Smeet Rawal",                          img: "/img/team/smeet.webp",          tag: "Team Leader"  },
  ];

type TeamMember = typeof TEAM[0];

function AvatarCard({
  member,
  idx,
}: {
  member: TeamMember;
  idx: number;
}) {
  const [imgErr, setImgErr] = useState(false);
  const accent = ACCENTS[idx % ACCENTS.length];
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div variants={staggerChild} className="group relative mx-auto w-full max-w-[280px]">
      <div
        className="relative rounded-3xl p-[1px] transition-all duration-500
                   group-hover:shadow-[0_0_44px_var(--cg)]"
        style={{ "--cg": accent.glow } as React.CSSProperties}
      >
        {/* Gradient border, revealed on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `conic-gradient(from 0deg, ${accent.from}80, ${accent.to}80, transparent, ${accent.from}80)`,
            padding: "1px",
          }}
        />

        {/* Card body */}
        <div
          className="relative aspect-square overflow-hidden rounded-3xl border border-white/[0.07]
                     bg-kio-bg-soft p-5 text-center flex flex-col items-center justify-center"
        >
          {/* Hover tint overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${accent.from}14, ${accent.to}0a)`,
            }}
          />

          {/* Scan beam on hover */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
            <div
              className="absolute inset-y-0 w-[55%] -translate-x-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent.from}18, transparent)`,
                animation: "scan-beam 2.6s ease-in-out infinite",
              }}
            />
          </div>

          {/* ── Avatar ── */}
          <div className="relative mx-auto mb-4 h-28 w-28">
            {/* Glowing halo- static, no pulse */}
            <div
              className="absolute -inset-3 rounded-full"
              style={{
                background: `radial-gradient(circle, ${accent.from}28, transparent 70%)`,
              }}
            />

            {/* Gradient ring- static, no rotation */}
            <div
              className="absolute -inset-[3px] rounded-full"
              style={{
                background: `conic-gradient(from 0deg, ${accent.from}, ${accent.to}, ${accent.from})`,
              }}
            />

            {/* Inner circle- image or initials */}
            <div
              className="relative z-10 h-full w-full overflow-hidden rounded-full"
              style={{
                background: `linear-gradient(135deg, ${accent.from}38, ${accent.to}28)`,
              }}
            >
              {!imgErr ? (
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className={`object-cover ${member.pos ?? ""}`}
                  onError={() => setImgErr(true)}
                  sizes="112px"
                />
              ) : (
                /* Stylised initials placeholder */
                <div className="flex h-full w-full items-center justify-center">
                  <span
                    className="select-none text-xl font-extrabold tracking-tight"
                    style={{
                      background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {initials}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <h3
            className="relative z-10 text-base font-bold"
            style={{
              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {member.name}
          </h3>

          {/* Tag badge */}
          <div className="relative z-10 mt-3 flex justify-center">
            <span
              className="rounded-full px-3 py-[5px] text-[10px] font-semibold uppercase tracking-widest"
              style={{
                background: `${accent.from}1a`,
                border: `1px solid ${accent.from}38`,
                color: accent.from,
              }}
            >
              {member.tag}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TeamMosaic() {
  const rm = useReducedMotion();

  return (
    <section className="section-pad relative overflow-hidden bg-kio-bg">
      {/* Ambient blobs */}
      <motion.div
        className="pointer-events-none absolute -left-48 top-10 h-[520px] w-[520px] rounded-full opacity-[0.055]"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
        animate={rm ? {} : { x: [0, 35, 0], y: [0, 22, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-48 bottom-10 h-[520px] w-[520px] rounded-full opacity-[0.055]"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
        animate={rm ? {} : { x: [0, -35, 0], y: [0, -22, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-kio relative z-10">
        {/* Heading */}
        <RevealOnScroll className="mb-16 text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
            Meet The <span className="text-color-cycle">Experts</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-kio-muted">
            Our leadership team combines Industry Expertise, Strategic Thinking and a Passion for delivering exceptional Hospitality Solutions.
          </p>
        </RevealOnScroll>

        {/* Grid */}
        <motion.div
          variants={staggerParent}
          initial={rm ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TEAM.map((member, i) => (
            <AvatarCard key={i} member={member} idx={i} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
