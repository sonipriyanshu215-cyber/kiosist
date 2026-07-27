"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarCheck,
  Cake,
  Gift,
  Wallet,
  Clock,
  Smile,
  HeartHandshake,
  TrendingUp,
  PartyPopper,
  Film,
  HeartPulse,
  DoorClosed,
} from "lucide-react";
import { perks, type Perk } from "@/content/perks";
import { staggerParent, staggerChild, hoverLift } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const ICONS: Record<Perk["icon"], typeof CalendarCheck> = {
  "calendar-check": CalendarCheck,
  cake: Cake,
  gift: Gift,
  wallet: Wallet,
  clock: Clock,
  smile: Smile,
  "heart-handshake": HeartHandshake,
  "trending-up": TrendingUp,
  "party-popper": PartyPopper,
  film: Film,
  "heart-pulse": HeartPulse,
  "door-closed": DoorClosed,
};

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

export function PerksGrid() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-pad bg-kio-cream">
      <div className="container-kio">
        <RevealOnScroll className="mb-14 md:mb-16 lg:mb-20 text-center">
          <h2 className="mt-3 font-display text-3xl font-bold text-color-cycle md:text-4xl">
            Benefits Of Working At Kiosist
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-kio-muted">
            We take care of our people so they can take care of our clients.
          </p>
        </RevealOnScroll>

        <motion.div
          variants={staggerParent}
          initial={reducedMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-x-[clamp(3px,1.6vw,24px)] gap-y-[clamp(6px,2vw,32px)]"
        >
          {perks.map((p, i) => {
            const Icon = ICONS[p.icon];
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div key={p.id} variants={staggerChild} initial="rest" whileHover="hover" animate="rest">
                <motion.div
                  variants={hoverLift}
                  className="group relative flex h-full flex-col items-center rounded-2xl bg-kio-bg px-[clamp(3px,1.4vw,20px)] py-[clamp(6px,2.2vw,32px)] text-center ring-1 ring-kio-line transition-all hover:ring-kio-accent hover:shadow-lg hover:shadow-kio-accent/10"
                >
                  {/* Ambient spotlight behind the icon */}
                  <div className="pointer-events-none absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 -translate-y-1/4 rounded-full bg-kio-accent/20 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />

                  {/* Flat 2D icon badge */}
                  <motion.div
                    className="relative z-10 flex h-[clamp(22px,5.6vw,56px)] w-[clamp(22px,5.6vw,56px)] items-center justify-center rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}0d)`,
                      boxShadow: `0 0 0 1px ${color}33`,
                    }}
                    animate={reducedMotion ? {} : { y: [0, -6, 0] }}
                    transition={{ duration: 4 + (i % 4) * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Icon className="h-[clamp(0.6rem,2.4vw,1.5rem)] w-[clamp(0.6rem,2.4vw,1.5rem)]" style={{ color }} strokeWidth={1.75} />
                  </motion.div>

                  <h3 className="relative z-10 mt-[clamp(2px,1.6vw,16px)] text-[clamp(0.48rem,1.6vw,1rem)] font-bold text-kio-ink">{p.title}</h3>
                  <p className="relative z-10 mt-[clamp(1px,0.8vw,8px)] text-[clamp(0.4rem,1.3vw,0.875rem)] leading-relaxed text-kio-muted">{p.body}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
