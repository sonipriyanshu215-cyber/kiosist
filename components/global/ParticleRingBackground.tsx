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

  /* Initialise geometry once — positions are updated every frame in useFrame */
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
        const b    = 0.3 * Math.sin(pointNorm * Math.PI);
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
    const time = state.clock.getElapsedTime() * 0.4;
    const arr  = ptsRef.current.geometry.attributes.position.array as Float32Array;
    const mat  = ptsRef.current.material as THREE.PointsMaterial;

    /* Smooth colour lerp toward the current theme target */
    mat.color.lerp(isDarkRef.current ? COLOR_DARK : COLOR_LIGHT, 0.06);

    let i = 0;
    for (let l = 0; l < NUM_LINES; l++) {
      for (let p = 0; p < POINTS_PER_LINE; p++) {
        const lineNorm  = l / NUM_LINES;
        const pointNorm = p / POINTS_PER_LINE;

        const wave1 = Math.sin(pointNorm * 4  + time        + lineNorm  * 2);
        const wave2 = Math.cos(lineNorm  * 6  - time * 1.5  + pointNorm * 3);
        const wave3 = Math.sin(pointNorm * 12 + time * 2)   * 0.2;

        arr[i]     += Math.sin(time * 0.1 + pointNorm) * 0.002; // minor x drift
        arr[i + 2]  = (wave1 * 0.4 + wave2 * 0.3 + wave3) * 1.8; // z wave depth
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
        opacity={0.8}
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
