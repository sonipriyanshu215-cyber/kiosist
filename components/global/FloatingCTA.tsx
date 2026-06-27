"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { DemoModal } from "@/components/global/DemoModal";

export function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        {/* Pulse ring behind button */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full"
          style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
          animate={reducedMotion ? {} : { scale: [1, 1.45, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating button */}
        <motion.button
          onClick={() => setOpen(true)}
          className="relative flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,.5)] will-float"
          style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
          animate={reducedMotion ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Book a Demo"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-white"
            animate={reducedMotion ? {} : { scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Book a Demo
        </motion.button>
      </div>

      <DemoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
