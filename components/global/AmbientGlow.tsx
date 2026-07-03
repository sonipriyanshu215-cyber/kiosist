"use client";

import { motion, useReducedMotion } from "framer-motion";

type Blob = {
  color: "accent" | "accent2";
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  x: number;
  y: number;
  scaleMin: number;
  scaleMax: number;
  duration: number;
  delay: number;
};

/* Floating glow blobs- pulse between small and large while drifting
   around their corner, shared across every page as the animated backdrop. */
const BLOBS: Blob[] = [
  { color: "accent",  size: 600, top: "-100px",   right: "-100px", x: 40,  y: -30, scaleMin: 0.85, scaleMax: 1.2,  duration: 10, delay: 0   },
  { color: "accent2", size: 400, bottom: "50px",   left: "-80px",  x: -35, y: 40,  scaleMin: 0.8,  scaleMax: 1.25, duration: 13, delay: 2   },
];

export function AmbientGlow() {
  const rm = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  b.size,
            height: b.size,
            top:    b.top,
            bottom: b.bottom,
            left:   b.left,
            right:  b.right,
            background: `radial-gradient(circle, color-mix(in srgb, var(--kio-${b.color}) ${b.color === "accent" ? 30 : 20}%, transparent) 0%, transparent 70%)`,
          }}
          animate={
            rm
              ? {}
              : {
                  scale: [b.scaleMin, b.scaleMax, b.scaleMin],
                  x: [0, b.x, 0],
                  y: [0, b.y, 0],
                }
          }
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        />
      ))}
    </div>
  );
}
