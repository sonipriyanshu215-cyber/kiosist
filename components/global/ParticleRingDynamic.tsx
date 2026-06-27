"use client";

import dynamic from "next/dynamic";

/* ssr: false ensures Three.js never runs during server-side rendering.
   Without this, r3f / three access WebGL globals that don't exist on Node. */
const ParticleRingBackground = dynamic(
  () =>
    import("./ParticleRingBackground").then((m) => ({
      default: m.ParticleRingBackground,
    })),
  { ssr: false }
);

export function ParticleRingDynamic() {
  return <ParticleRingBackground />;
}
