import { motionValue } from "framer-motion";

/* Shared scroll-position motion value, updated directly from Lenis's
   own scroll loop (see SmoothScroll.tsx). Framer Motion's useScroll()
   listens for native window "scroll" events, which can fall out of
   sync with Lenis's animated scroll- reading Lenis's value directly
   keeps consumers (e.g. AmbientGlow) in lockstep with what's on screen. */
export const pageScrollY = motionValue(0);
