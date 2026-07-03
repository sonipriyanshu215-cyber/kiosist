import type { Variants } from "framer-motion";

// M1- Reveal: viewport-triggered fade-up for headings, paragraphs, cards
export const reveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.64, ease: [0.16, 1, 0.3, 1] },
  },
};

// M2- Stagger reveal: parent container drives staggered children
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: [0.16, 1, 0.3, 1] },
  },
};

// M3- Float: continuous idle loop for hero illustrations and icons
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 5, ease: "easeInOut", repeat: Infinity },
  },
};

export const floatSlow = {
  animate: {
    y: [0, -16, 0],
    rotate: [0, 2, 0],
    transition: { duration: 7, ease: "easeInOut", repeat: Infinity },
  },
};

export const floatWithRotate = (amp = 12, rotateDeg = 6, duration = 5) => ({
  animate: {
    y: [0, -amp, 0],
    rotate: [0, rotateDeg, 0],
    transition: { duration, ease: "easeInOut", repeat: Infinity },
  },
});

// M4- Parallax: scroll-linked- implement per-component with useTransform
// See HeroBanner.tsx for reference implementation

// M5- Hover lift: card/button hover feedback
export const hoverLift: Variants = {
  rest: { y: 0, scale: 1, transition: { duration: 0.24, ease: "easeOut" } },
  hover: { y: -6, scale: 1.02, transition: { duration: 0.24, ease: "easeOut" } },
};

export const hoverLiftSubtle: Variants = {
  rest: { y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  hover: { y: -3, scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } },
};

// M6- Pulse: CTA buttons and live indicators
export const pulse = {
  animate: {
    scale: [1, 1.06, 1],
    opacity: [1, 0.85, 1],
    transition: { duration: 2, ease: "easeInOut", repeat: Infinity },
  },
};

export const pulseRing = {
  animate: {
    scale: [1, 1.4, 1],
    opacity: [0.5, 0, 0.5],
    transition: { duration: 2.2, ease: "easeInOut", repeat: Infinity },
  },
};

// M7- Page transition: route change overlay
export const pageTransitionIn: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
  },
};

// M8- Scrub-pin scene: GSAP ScrollTrigger- see TimelineScene.tsx

// Utility: fade-in only (no Y shift) for image overlays, backgrounds
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.64, ease: "easeOut" } },
};

// Utility: slide in from left
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.64, ease: [0.16, 1, 0.3, 1] },
  },
};

// Utility: slide in from right
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.64, ease: [0.16, 1, 0.3, 1] },
  },
};
