"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { pageScrollY } from "@/lib/pageScroll";

type Blob = {
  color: "accent" | "accent2";
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  y: number;
  scaleMin: number;
  scaleMax: number;
  duration: number;
  delay: number;
};

/* Floating glow blobs- pulse between small and large while drifting
   left/right with scroll, shared across every page as the animated backdrop. */
const BLOBS: Blob[] = [
  { color: "accent",  size: 600, top: "-100px",   right: "-100px", y: -30, scaleMin: 0.85, scaleMax: 1.2,  duration: 10, delay: 0   },
  { color: "accent2", size: 400, bottom: "50px",   left: "-80px",  y: 40,  scaleMin: 0.8,  scaleMax: 1.25, duration: 13, delay: 2   },
];

function GlowBlob({ blob, rm, range }: { blob: Blob; rm: boolean | null; range: number }) {
  const scrollX = useTransform(pageScrollY, [0, 2400], [-range, range]);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width:  blob.size,
        height: blob.size,
        top:    blob.top,
        bottom: blob.bottom,
        left:   blob.left,
        right:  blob.right,
        x: rm ? 0 : scrollX,
        background: `radial-gradient(circle, color-mix(in srgb, var(--kio-${blob.color}) ${blob.color === "accent" ? 30 : 20}%, transparent) 0%, transparent 70%)`,
      }}
      animate={
        rm
          ? {}
          : {
              scale: [blob.scaleMin, blob.scaleMax, blob.scaleMin],
              y: [0, blob.y, 0],
            }
      }
      transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut", delay: blob.delay }}
    />
  );
}

export function AmbientGlow() {
  const rm = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {BLOBS.map((b, i) => (
        <GlowBlob key={i} blob={b} rm={rm} range={i === 0 ? 140 : 100} />
      ))}
    </div>
  );
}
