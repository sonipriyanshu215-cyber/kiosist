"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import { slideLeft, slideRight, staggerParent, staggerChild } from "@/lib/motion";

const CHECKS = [
  {
    title: "Cost-efficient operations:",
    body: "Reduce front-desk staffing costs without cutting service quality.",
  },
  {
    title: "Guest-first design:",
    body: "Intuitive, multilingual interface designed for every traveler.",
  },
  {
    title: "Seamless integration:",
    body: "Connects with your existing property management system.",
  },
  {
    title: "Always available:",
    body: "24/7 operation means no guest is ever left waiting.",
  },
];

const INFO_CARDS = [
  {
    icon: "🏨",
    title: "Designed for Hotels",
    body: "Built from the ground up for the hospitality industry, KioClerk understands the nuances of hotel operations — from PMS integration to room key encoding and payment processing.",
  },
  {
    icon: "💡",
    title: "Smart & Adaptive",
    body: "KioClerk learns from usage patterns, adapts its interface, and gives management real-time insights into guest flow, peak hours, and service preferences.",
  },
  {
    icon: "🔒",
    title: "Secure by Design",
    body: "End-to-end encrypted transactions, PCI-compliant payment processing, and secure ID verification built into every interaction.",
  },
];

export function AboutTeaser() {
  const rm = useReducedMotion();

  return (
    <section id="about" className="section-pad relative overflow-hidden">
      {/* Animated blob */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-150px] top-0 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,.15) 0%, transparent 70%)" }}
        animate={rm ? {} : { x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-kio relative z-10 grid items-center gap-20 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="section-label">About Kiosist</span>
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
            Redefining the{" "}
            <span className="text-gradient">Hotel Guest Experience</span>
          </h2>
          <p className="mt-5 text-[.95rem] leading-[1.9] text-kio-muted">
            Kiosist is a Surat-based hospitality technology company dedicated to
            transforming how hotels operate and serve guests. Our flagship product,{" "}
            <strong className="text-kio-ink">KioClerk</strong>, brings the power of
            intelligent self-service kiosks to hotel lobbies worldwide.
          </p>
          <p className="mt-4 text-[.95rem] leading-[1.9] text-kio-muted">
            We believe great hospitality doesn&apos;t have to mean high overhead. KioClerk
            allows your staff to focus on what matters most — personal, memorable guest
            interactions — while the kiosk handles the administrative workload seamlessly.
          </p>

          {/* Checks */}
          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-7 flex flex-col gap-3.5 list-none"
          >
            {CHECKS.map((c) => (
              <motion.li key={c.title} variants={staggerChild} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-kio-accent to-kio-accent2 text-[.65rem] font-bold text-white">
                  ✓
                </span>
                <p className="text-[.9rem] leading-[1.6] text-kio-muted">
                  <strong className="text-kio-ink">{c.title}</strong> {c.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: info cards */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-5"
        >
          {INFO_CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-kio-line bg-kio-bg-soft/50 p-7 transition-all duration-300 hover:border-kio-accent/30 hover:bg-kio-bg-soft hover:translate-x-1"
            >
              <div className="mb-3 text-[2rem]">{card.icon}</div>
              <h3 className="mb-2 text-[1.05rem] font-bold text-kio-ink">{card.title}</h3>
              <p className="text-[.88rem] leading-[1.7] text-kio-muted">{card.body}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
