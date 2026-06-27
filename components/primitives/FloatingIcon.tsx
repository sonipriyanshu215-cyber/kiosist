"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface FloatingIconProps {
  src: string;
  alt?: string;
  className?: string;
  delay?: number;
  amp?: number;
  rotateDeg?: number;
  duration?: number;
  width?: number;
  height?: number;
}

export function FloatingIcon({
  src,
  alt = "",
  className = "",
  delay = 0,
  amp = 10,
  rotateDeg = 8,
  duration = 4.5,
  width = 60,
  height = 60,
}: FloatingIconProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute ${className} will-float`}
      animate={
        reducedMotion
          ? {}
          : { y: [0, -amp, 0], rotate: [0, rotateDeg, 0] }
      }
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </motion.div>
  );
}
