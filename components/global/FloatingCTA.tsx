"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function FloatingCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
      {/* Floating wrapper- image and its glow move together */}
      <motion.div
        className="relative w-[100px] sm:w-[120px] lg:w-[140px]"
        animate={reducedMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glow behind the character */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-[15%] -z-10 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.65), rgba(37,99,235,0.35) 40%, transparent 75%)",
            filter: "blur(18px)",
          }}
          animate={reducedMotion ? {} : { opacity: [0.75, 0.5, 0.75] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
          <Link href="/contact" aria-label="Book a Demo">
            <Image
              src="/img/hero/agent-red-1.png"
              alt="Book a Demo"
              width={1024}
              height={1024}
              className="h-auto w-full drop-shadow-[0_18px_20px_rgba(0,0,0,0.45)]"
              priority
            />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
