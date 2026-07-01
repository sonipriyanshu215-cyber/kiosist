"use client";

import { motion, useReducedMotion } from "framer-motion";
import { reveal, staggerParent } from "@/lib/motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: RevealOnScrollProps) {
  const reducedMotion = useReducedMotion();

  const variants = stagger ? staggerParent : reveal;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={reducedMotion ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
