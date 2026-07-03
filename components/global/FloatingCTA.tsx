"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function FloatingCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="fixed bottom-5 right-5 z-50 md:bottom-8 md:right-8">
      {/* Floating wrapper- image and its glow move together */}
      <motion.div
        className="relative w-[100px] sm:w-[130px]"
        animate={reducedMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Pulse glow behind the character */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-[10%] bottom-0 -z-10 aspect-square rounded-full"
          style={{ background: "radial-gradient(circle, #3b82f6, #06b6d4 70%, transparent 100%)", filter: "blur(6px)" }}
          animate={reducedMotion ? {} : { scale: [1, 1.35, 1], opacity: [0.55, 0.15, 0.55] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
          <Link href="/contact" aria-label="Book a Demo">
            <Image
              src="/img/hero/front-desk-agent.PNG"
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
