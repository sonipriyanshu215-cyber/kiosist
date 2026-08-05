"use client";

import { motion, useReducedMotion } from "framer-motion";

interface PinWithPulseProps {
  delay?: number;
}

export function PinWithPulse({ delay = 0 }: PinWithPulseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      width={36}
      height={36}
      viewBox="-18 -18 36 36"
      style={{ overflow: "visible", display: "block" }}
    >
      {/* Outer pulsing ring- uses scale on <g> instead of animating SVG `r` attr.
          Capped at 2x (not the original 3.2x) because pins in tightly-clustered
          regions (e.g. the Virginia/West Virginia area) sit close enough on
          screen that a ring reaching much further starts overlapping its
          neighbor's, reading as one messy blob instead of two distinct pins. */}
      <motion.g
        animate={
          reducedMotion
            ? {}
            : { scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }
        }
        transition={{ duration: 2, repeat: Infinity, delay, ease: "easeOut" }}
        style={
          {
            transformBox: "fill-box",
            transformOrigin: "center",
          } as React.CSSProperties
        }
        aria-hidden="true"
      >
        <circle r={5} fill="none" stroke="#3b82f6" strokeWidth={1.5} />
      </motion.g>

      {/* Solid pin */}
      <circle r={5} fill="#3b82f6" opacity={0.85} />
    </svg>
  );
}
