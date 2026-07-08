"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { pageScrollY } from "@/lib/pageScroll";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Notify GSAP ScrollTrigger of scroll position on each Lenis tick
    // This makes pinned GSAP scenes work alongside Lenis smooth scroll
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      pageScrollY.set(scroll);
      // Dynamically access ScrollTrigger only if GSAP has been loaded
      const gsapInstance = (window as Window & { gsap?: { ScrollTrigger?: { update: () => void } } }).gsap;
      gsapInstance?.ScrollTrigger?.update();
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    function onVisibilityChange() {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
