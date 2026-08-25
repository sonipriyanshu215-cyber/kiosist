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
import { perks as DEFAULT_PERKS, type Perk } from "@/content/perks";
import { staggerParent, staggerChild } from "@/lib/motion";
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

interface PerksGridProps {
  perks?: Perk[];
}

export function PerksGrid({ perks = DEFAULT_PERKS }: PerksGridProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-pad bg-kio-cream">
      <div className="container-kio">
        <RevealOnScroll className="mb-14 md:mb-16 lg:mb-20 text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
            Benefits Of Working{" "}
            <br className="sm:hidden" />
            <span className="text-color-cycle">At Kiosist</span>
          </h2>
        </RevealOnScroll>

        <motion.div
          variants={staggerParent}
          initial={reducedMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {perks.map((p, i) => {
            const Icon = ICONS[p.icon];
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div key={p.id} variants={staggerChild} className="group flex items-center gap-3.5">
                {/* Illuminated icon badge- solid glowing fill, not a faint tint */}
                <motion.div
                  className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}99)`,
                    boxShadow: `0 0 0 1px ${color}55, 0 0 18px ${color}70, 0 0 4px ${color}90`,
                  }}
                  animate={reducedMotion ? {} : { y: [0, -5, 0] }}
                  transition={{ duration: 4 + (i % 4) * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                </motion.div>

                <h3 className="text-[.95rem] font-bold text-kio-ink">{p.title}</h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
