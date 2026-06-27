"use client";

import { motion } from "framer-motion";
import { staggerParent, staggerChild } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const CLIENT_TYPES = [
  { icon: "🏨", label: "Boutique Hotels" },
  { icon: "🏢", label: "Business Hotels" },
  { icon: "🏖️", label: "Resort Properties" },
  { icon: "🏷️", label: "Budget Chains" },
  { icon: "✈️", label: "Airport Hotels" },
  { icon: "🌆", label: "Urban Properties" },
];

export function BrandStrip() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-container">
        <RevealOnScroll className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[.05em] text-kio-muted">
            Trusted by hotels across the country
          </p>
        </RevealOnScroll>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {CLIENT_TYPES.map(({ icon, label }, i) => (
            <motion.div
              key={label}
              variants={staggerChild}
              className="group relative overflow-hidden flex items-center gap-2 rounded-xl border border-kio-line bg-kio-bg-soft px-7 py-4 text-[.9rem] font-semibold text-kio-muted transition-all duration-300 hover:border-kio-accent/30 hover:bg-kio-cream hover:text-kio-ink cursor-default"
            >
              {/* Scan beam on hover */}
              <div
                className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-kio-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ animation: `scan-beam ${2.5 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
              />
              <span className="relative">{icon}</span>
              <span className="relative">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
