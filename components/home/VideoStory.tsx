"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, RefreshCw } from "lucide-react";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

const VIDEO_SRC = "/video/explainer.mp4";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function VideoBackground({ rm, isDark }: { rm: boolean; isDark: boolean }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  /* Ref so the draw loop reads the latest theme without restarting */
  const isDarkRef  = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    if (rm) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const sync = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(canvas);

    /* Particles that rise upward */
    type Dot = { x: number; y: number; vx: number; vy: number; r: number; a: number; life: number };
    const spawn = (d: Dot) => {
      d.x    = Math.random() * canvas.offsetWidth;
      d.y    = canvas.offsetHeight + 6;
      d.vx   = (Math.random() - 0.5) * 0.45;
      d.vy   = -(Math.random() * 0.55 + 0.25);
      d.r    = Math.random() * 1.8 + 0.5;
      d.a    = Math.random() * 0.55 + 0.15;
      d.life = 1;
    };
    const dots: Dot[] = Array.from({ length: 55 }, () => {
      const d = {} as Dot;
      spawn(d);
      d.y = Math.random() * canvas.offsetHeight;
      return d;
    });

    const pulses: { r: number; a: number; spd: number }[] = [];
    let pulseTimer = 0;
    let t = 0;

    const draw = () => {
      const w    = canvas.offsetWidth;
      const h    = canvas.offsetHeight;
      /* Read theme each frame via ref- no animation restart on toggle */
      const dark = isDarkRef.current;
      /* Dark:  cool blue-steel   Light: soft indigo */
      const [pr, pg, pb] = dark ? [99,  179, 237] : [99,  102, 241];
      const [sr, sg_, sb] = dark ? [6,   182, 212] : [139, 92,  246];

      ctx.clearRect(0, 0, w, h);
      t += 0.007;

      /* ── Dot grid ── */
      const GAP = 42;
      for (let gx = GAP / 2; gx < w; gx += GAP) {
        for (let gy = GAP / 2; gy < h; gy += GAP) {
          const dist = Math.hypot(gx - w / 2, gy - h / 2);
          const wave = Math.sin(dist * 0.017 - t * 1.6) * 0.5 + 0.5;
          const r    = 1.1 + wave * 1.5;
          const a    = (0.06 + wave * 0.11).toFixed(3);
          ctx.beginPath();
          ctx.arc(gx, gy, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pr},${pg},${pb},${a})`;
          ctx.fill();
        }
      }

      /* ── Radial pulses ── */
      if (++pulseTimer > 95) {
        pulses.push({ r: 0, a: 0.45, spd: 1.4 + Math.random() * 1.1 });
        pulseTimer = 0;
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.r += p.spd;
        p.a *= 0.974;
        if (p.a < 0.004) { pulses.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${pr},${pg},${pb},${p.a.toFixed(3)})`;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
      }

      /* ── Rising particles ── */
      for (const d of dots) {
        d.x    += d.vx;
        d.y    += d.vy;
        d.life -= 0.0022;
        if (d.y < -8 || d.life <= 0) spawn(d);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pr},${pg},${pb},${(d.a * d.life).toFixed(3)})`;
        ctx.fill();
      }

      /* ── Diagonal light beams ── */
      for (let b = 0; b < 3; b++) {
        const bx = w * (0.15 + b * 0.35) + Math.sin(t * 0.22 + b * 2.1) * 28;
        const bw = 55 + b * 22;
        const a1 = (0.04  + Math.sin(t * 0.85 + b      ) * 0.018).toFixed(3);
        const a2 = (0.028 + Math.sin(t * 1.05 + b + 1.2) * 0.013).toFixed(3);
        const g  = ctx.createLinearGradient(bx, 0, bx + bw * 0.35, h);
        g.addColorStop(0,    `rgba(${pr},${pg},${pb},0)`);
        g.addColorStop(0.22, `rgba(${pr},${pg},${pb},${a1})`);
        g.addColorStop(0.58, `rgba(${sr},${sg_},${sb},${a2})`);
        g.addColorStop(1,    `rgba(${sr},${sg_},${sb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(bx - bw / 2, 0, bw, h);
      }

      /* ── Scanning line ── */
      const scanY   = (h * 0.5) + Math.sin(t * 0.4) * (h * 0.35);
      const scanAlp = ((Math.sin(t * 0.4) * 0.5 + 0.5) * 0.07).toFixed(3);
      const sg2     = ctx.createLinearGradient(0, scanY, w, scanY);
      sg2.addColorStop(0,   `rgba(${sr},${sg_},${sb},0)`);
      sg2.addColorStop(0.4, `rgba(${sr},${sg_},${sb},${scanAlp})`);
      sg2.addColorStop(0.6, `rgba(${sr},${sg_},${sb},${scanAlp})`);
      sg2.addColorStop(1,   `rgba(${sr},${sg_},${sb},0)`);
      ctx.fillStyle = sg2;
      ctx.fillRect(0, scanY - 1, w, 2);

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, [rm]); // effect restarts only if rm changes; isDark is read via ref

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export function VideoStory() {
  const videoRef      = useRef<HTMLVideoElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();

  const [playing,      setPlaying]      = useState(false);
  const [muted,        setMuted]        = useState(true);
  const [progress,     setProgress]     = useState(0);
  const [duration,     setDuration]     = useState(0);
  const [currentTime,  setCurrentTime]  = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [started,      setStarted]      = useState(false);
  const [ended,        setEnded]        = useState(false);
  const [videoExists,  setVideoExists]  = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Auto-play muted when scrolled into view */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || rm) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          video.muted = true;
          video.play().then(() => { setPlaying(true); setStarted(true); setMuted(true); }).catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause(); setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, [started, rm]);

  /* Pause on tab-hide */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const fn = () => { if (document.hidden) { video.pause(); setPlaying(false); } };
    document.addEventListener("visibilitychange", fn);
    return () => document.removeEventListener("visibilitychange", fn);
  }, []);

  /* Auto-hide controls after 3s of inactivity while playing */
  const resetTimer = useCallback(() => {
    setShowControls(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { if (playing) setShowControls(false); }, 3000);
  }, [playing]);

  useEffect(() => { if (!playing) setShowControls(true); }, [playing]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (ended) { v.currentTime = 0; setEnded(false); }
    v.paused ? (v.play(), setPlaying(true)) : (v.pause(), setPlaying(false));
    resetTimer();
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    resetTimer();
  }

  function handleTimeUpdate() {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    v.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * v.duration;
    resetTimer();
  }

  function handleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen();
    resetTimer();
  }

  function fmt(s: number) {
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
  }

  /* Placeholder when video file is absent */
  if (!videoExists) {
    return (
      <section className="section-pad">
        <div className="container-kio">
          <RevealOnScroll className="mb-10 text-center">
            <span className="section-label">See It In Action</span>
            <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
              KIOSIST- the 60-second demo
            </h2>
          </RevealOnScroll>
          <div className="mx-auto flex aspect-video max-w-4xl items-center justify-center rounded-3xl border border-kio-accent/20 bg-kio-bg-soft">
            <p className="text-center text-kio-muted text-sm">
              Drop <code className="text-kio-accent">explainer.mp4</code> into{" "}
              <code className="text-kio-accent">/public/video/</code> to activate
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-kio relative z-10">
        {/* Heading */}
        <RevealOnScroll className="mb-12 text-center">
          <span className="section-label">See It In Action</span>
          <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl lg:text-5xl">
            2 AM. No Front Desk. <span className="text-color-cycle">No Problem.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-kio-muted">
            A virtual agent checks in a real guest, from thousands of miles away- in under 60 seconds.
          </p>
        </RevealOnScroll>

        {/* Player wrapper with animated glow border */}
        <RevealOnScroll>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[30px]">
            {/* Pulsing glow ring behind player */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-[28px] opacity-50"
              style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4, #3b82f6)", padding: "1px" }}
              animate={rm ? {} : { opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Rotating conic border- narrow arc (~18% of circle) so it reads as a sweep, not a filled card */}
            <motion.div
              className="pointer-events-none absolute -inset-1 rounded-[32px]"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, #3b82f6 6%, #06b6d4 12%, transparent 18%)",
                opacity: 0.75,
              }}
              animate={rm ? {} : { rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Player */}
            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-3xl bg-[#060c18] shadow-[0_0_60px_rgba(59,130,246,0.20)]"
              onMouseMove={resetTimer}
              onMouseLeave={() => playing && setShowControls(false)}
              style={{ aspectRatio: "16/9" }}
            >
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                className="h-full w-full object-cover"
                muted={muted}
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
                onEnded={() => { setPlaying(false); setEnded(true); setShowControls(true); }}
                onClick={togglePlay}
                onError={() => setVideoExists(false)}
                style={{ cursor: "pointer" }}
              />

              {/* Big play / replay overlay */}
              <AnimatePresence>
                {(!playing || ended) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                    style={{ background: "rgba(6,12,24,0.55)", backdropFilter: "blur(2px)", cursor: "pointer" }}
                    onClick={togglePlay}
                  >
                    {/* Pulsing halo behind button */}
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        className="absolute h-28 w-28 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)" }}
                        animate={rm ? {} : { scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.button
                        onClick={togglePlay}
                        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-kio-accent/30"
                        style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(6,182,212,0.3))", backdropFilter: "blur(8px)" }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.94 }}
                        aria-label={ended ? "Replay" : "Play"}
                      >
                        {ended ? (
                          <RefreshCw className="h-8 w-8 text-white" />
                        ) : (
                          <Play className="h-8 w-8 translate-x-0.5 fill-white text-white" />
                        )}
                      </motion.button>
                    </div>
                    {!ended && (
                      <p className="text-sm font-medium text-white/60">Click to play</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Muted nudge badge */}
              <AnimatePresence>
                {playing && muted && (
                  <motion.button
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={toggleMute}
                    className="absolute left-1/2 top-5 -translate-x-1/2 flex items-center gap-2 rounded-full border border-kio-accent/30 bg-[rgba(6,12,24,0.80)] px-4 py-2 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    <VolumeX className="h-4 w-4 text-kio-accent" />
                    Tap to unmute
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Controls bar */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-10"
                    style={{ background: "linear-gradient(to top, rgba(6,12,24,0.92), transparent)" }}
                  >
                    {/* Progress bar */}
                    <div
                      ref={progressRef}
                      className="group mb-3 h-1 w-full cursor-pointer rounded-full bg-white/15"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full rounded-full transition-all group-hover:h-1.5"
                        style={{
                          width: `${progress}%`,
                          background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                          boxShadow: "0 0 8px rgba(59,130,246,0.7)",
                        }}
                      />
                    </div>

                    {/* Controls row */}
                    <div className="flex items-center gap-3">
                      <button onClick={togglePlay} className="text-white/70 transition-colors hover:text-white" aria-label={playing ? "Pause" : "Play"}>
                        {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
                      </button>

                      <button onClick={toggleMute} className="text-white/70 transition-colors hover:text-white" aria-label={muted ? "Unmute" : "Mute"}>
                        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>

                      <span className="text-xs tabular-nums text-white/45">
                        {fmt(currentTime)} / {fmt(duration)}
                      </span>

                      <div className="flex-1" />

                      <button onClick={handleFullscreen} className="text-white/70 transition-colors hover:text-white" aria-label="Fullscreen">
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
