"use client";

import { useEffect, useRef } from "react";

export function PlexusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: null as number | null, y: null as number | null, radius: 150 };
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = null; mouse.y = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const PARTICLE_COUNT = 80;
    const MAX_DIST = 130;
    let flowOffset = 0;

    // Capture as non-null for use inside the class closure
    const cvs = canvas;
    const c = ctx;

    class Particle {
      x: number; y: number; vx: number; vy: number; r: number;
      constructor() {
        this.x = Math.random() * cvs.width;
        this.y = Math.random() * cvs.height;
        this.vx = (Math.random() - 0.5) * 0.55;
        this.vy = (Math.random() - 0.5) * 0.55;
        this.r = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > cvs.width) this.vx *= -1;
        if (this.y < 0 || this.y > cvs.height) this.vy *= -1;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 0 && d < mouse.radius) {
            const f = (mouse.radius - d) / mouse.radius;
            this.x += (dx / d) * f * 2.5;
            this.y += (dy / d) * f * 2.5;
          }
        }
      }
      draw() {
        const isDark = document.documentElement.getAttribute("data-theme") !== "light";
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.fillStyle = isDark ? "rgba(99,179,237,0.70)" : "rgba(79,70,229,0.55)";
        c.fill();
      }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    const drawWaves = () => {
      c.save();
      c.lineWidth = 1.5;
      for (let w = 0; w < 3; w++) {
        c.beginPath();
        const g = c.createLinearGradient(0, 0, cvs.width, 0);
        g.addColorStop(0, "rgba(59,130,246,0)");
        g.addColorStop(0.5, `rgba(6,182,212,${0.07 - w * 0.02})`);
        g.addColorStop(1, "rgba(59,130,246,0)");
        c.strokeStyle = g;
        for (let x = 0; x < cvs.width; x += 10) {
          const y =
            cvs.height * 0.5 +
            Math.sin(x * 0.003 + flowOffset + w) * 100 * Math.cos(x * 0.001 + flowOffset) +
            Math.sin(x * 0.01 + w * 2) * 15;
          x === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
        }
        c.stroke();
      }
      c.restore();
      flowOffset += 0.002;
    };

    const animate = () => {
      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      c.fillStyle = isDark ? "#060c18" : "#eef2ff";
      c.fillRect(0, 0, cvs.width, cvs.height);

      drawWaves();

      for (const p of particles) {
        p.update();
        p.draw();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const isDark = document.documentElement.getAttribute("data-theme") !== "light";
            const alpha = (1 - dist / MAX_DIST) * (isDark ? 0.22 : 0.18);
            const rgb = isDark ? "59,130,246" : "79,70,229";
            c.beginPath();
            c.moveTo(particles[i].x, particles[i].y);
            c.lineTo(particles[j].x, particles[j].y);
            c.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
            c.lineWidth = 0.8;
            c.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
