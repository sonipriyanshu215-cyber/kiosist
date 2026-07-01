"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const TEAM = [
  { name: "Rahil",     role: "Founder & CEO",  img: "/img/team/rahil.webp", tag: "Leadership" },
  { name: "Sarah M.",  role: "Operations Lead", img: "/img/team/t2.webp",   tag: "Operations" },
  { name: "James K.",  role: "Senior Agent",    img: "/img/team/t3.webp",   tag: "Front Desk" },
  { name: "Maya R.",   role: "Trainer",         img: "/img/team/t4.webp",   tag: "Training"   },
  { name: "Lena T.",   role: "Agent",           img: "/img/team/t5.webp",   tag: "Front Desk" },
  { name: "Carlos M.", role: "Agent",           img: "/img/team/t6.webp",   tag: "Front Desk" },
  { name: "Priya S.",  role: "Agent",           img: "/img/team/t7.webp",   tag: "Support"    },
  { name: "Omar J.",   role: "Agent",           img: "/img/team/t8.webp",   tag: "Front Desk" },
];

function AvatarCard({ member, idx }: { member: typeof TEAM[0]; idx: number }) {
  const [imgErr, setImgErr] = useState(false);
  const initials = member.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative cursor-default overflow-hidden rounded-2xl border border-kio-line bg-kio-bg-soft p-6 text-center"
      style={{ transition: "border-color 0.3s, box-shadow 0.3s" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.4)";
        (e.currentTarget as HTMLElement).style.boxShadow  = "0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(59,130,246,0.15), 0 0 32px rgba(59,130,246,0.10)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "";
        (e.currentTarget as HTMLElement).style.boxShadow  = "";
      }}
    >
      {/* Top sweep line on hover */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-[#3b82f6]/70 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

      {/* Subtle blue tint on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse 75% 55% at 50% 0%, rgba(59,130,246,0.07), transparent)" }} />

      {/* Avatar */}
      <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border-2 border-kio-line transition-[border-color,box-shadow] duration-300 group-hover:border-[#3b82f6]/50 group-hover:shadow-[0_0_0_4px_rgba(59,130,246,0.10)]">
        {!imgErr ? (
          <Image
            src={member.img}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgErr(true)}
            sizes="96px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-kio-bg">
            <span className="text-2xl font-extrabold text-kio-accent">{initials}</span>
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="relative z-10 text-sm font-bold text-kio-ink transition-colors duration-300 group-hover:text-[#60a5fa]">
        {member.name}
      </h3>

      {/* Role */}
      <p className="relative z-10 mt-1 text-xs text-kio-muted">{member.role}</p>

      {/* Tag badge */}
      <div className="relative z-10 mt-4 flex justify-center">
        <span className="rounded-full border border-kio-line bg-kio-bg px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-kio-muted transition-[border-color,color,background-color] duration-300 group-hover:border-[#3b82f6]/30 group-hover:bg-[#3b82f6]/08 group-hover:text-[#60a5fa]">
          {member.tag}
        </span>
      </div>
    </motion.div>
  );
}

export function TeamMosaic() {
  return (
    <section className="section-pad relative overflow-hidden bg-kio-bg">
      <div className="container-kio relative z-10">

        <RevealOnScroll className="mb-14 text-center">
          <span className="section-label">Our Team</span>
          <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl lg:text-5xl">
            The faces behind{" "}
            <span className="text-gradient">the front desk</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-kio-muted">
            150+ trained virtual agents ready to represent your property, every hour of the day.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <AvatarCard key={i} member={member} idx={i} />
          ))}
        </div>

        <RevealOnScroll className="mt-10 text-center">
          <p className="text-sm text-kio-muted">
            And{" "}
            <span className="font-semibold text-kio-accent">35+ more</span>{" "}
            agents ready to staff your property around the clock.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  );
}
