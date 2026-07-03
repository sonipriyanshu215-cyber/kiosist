"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

const NUM_LINES       = 35;
const POINTS_PER_LINE = 120;
const TOTAL           = NUM_LINES * POINTS_PER_LINE;

/* Dark: warm off-white cream  |  Light: soft indigo */
const COLOR_DARK  = new THREE.Color(1,    1,    1);
const COLOR_LIGHT = new THREE.Color(0.31, 0.27, 0.90);

function WaveLines({ isDark }: { isDark: boolean }) {
  const ptsRef   = useRef<THREE.Points>(null!);
  const isDarkRef = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  /* Initialise geometry once- positions are updated every frame in useFrame */
  const [positions, colors] = useMemo(() => {
    const pos  = new Float32Array(TOTAL * 3);
    const cols = new Float32Array(TOTAL * 3);
    let i = 0;
    for (let l = 0; l < NUM_LINES; l++) {
      const lineNorm = l / (NUM_LINES - 1);
      for (let p = 0; p < POINTS_PER_LINE; p++) {
        const pointNorm = p / (POINTS_PER_LINE - 1);
        pos[i]     = (pointNorm - 0.5) * 10;
        pos[i + 1] = (lineNorm - 0.5) * 6 + pointNorm * 0.8;
        pos[i + 2] = 0;

        /* Fade brightness toward line ends */
        const b    = 0.14 * Math.sin(pointNorm * Math.PI);
        cols[i]     = b * 0.95;
        cols[i + 1] = b * 0.97;
        cols[i + 2] = b;
        i += 3;
      }
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (!ptsRef.current) return;
    const t   = state.clock.getElapsedTime();
    const arr = ptsRef.current.geometry.attributes.position.array as Float32Array;
    const mat = ptsRef.current.material as THREE.PointsMaterial;

    mat.color.lerp(isDarkRef.current ? COLOR_DARK : COLOR_LIGHT, 0.06);

    let i = 0;
    for (let l = 0; l < NUM_LINES; l++) {
      for (let p = 0; p < POINTS_PER_LINE; p++) {
        const lx = l / NUM_LINES;
        const px = p / POINTS_PER_LINE;

        /*
         * Standing waves: sin(spatial) × cos(time)
         * The spatial pattern is fixed in place; only the amplitude
         * oscillates over time- exactly like a water surface.
         * Multiple overlapping frequencies create realistic interference.
         */
        const w1 = Math.sin(px * 5.0 + lx * 2.0) * Math.cos(t * 0.55);
        const w2 = Math.cos(lx * 7.0 + px * 3.5) * Math.sin(t * 0.40);
        const w3 = Math.sin(px * 9.0 - lx * 4.0) * Math.cos(t * 0.70);
        const w4 = Math.cos(px * 3.0 + lx * 6.0) * Math.sin(t * 0.30);
        const w5 = Math.sin(px * 14  + lx * 1.5) * Math.cos(t * 0.90) * 0.3;

        arr[i + 2] = (w1 * 0.38 + w2 * 0.30 + w3 * 0.18 + w4 * 0.22 + w5) * 1.6;
        i += 3;
      }
    }
    ptsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ptsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleRingBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme !== "light";

  return (
    <div
      aria-hidden="true"
      style={{
        position:        "fixed",
        top:             0,
        left:            0,
        width:           "100vw",
        height:          "100vh",
        backgroundColor: isDark ? "#050608" : "#eef2ff",
        transition:      "background-color 0.45s ease",
        zIndex:          0,
        pointerEvents:   "none",
      }}
    >
      <Canvas
        camera={{ position: [2, 1, 5], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <ambientLight intensity={0.5} />
        <WaveLines isDark={isDark} />
      </Canvas>
    </div>
  );
}
