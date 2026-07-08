"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

interface KiosistIntroProps {
  onComplete?: () => void;
}

export function KiosistIntro({ onComplete }: KiosistIntroProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [finished, setFinished] = useState(false);
  // Browsers block autoplay-with-sound on first visit, so it starts muted
  // (required for autoplay to work at all) with a tap-to-unmute affordance-
  // same pattern VideoStory.tsx already uses elsewhere on the site.
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const flowCanvasRef = useRef<HTMLCanvasElement>(null);
  const beamCanvasRef = useRef<HTMLCanvasElement>(null);
  const kioskVisualRef = useRef<HTMLDivElement>(null);
  const agentSectionRef = useRef<HTMLDivElement>(null);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  // Silky flowing-thread mesh in the theme's cyan/blue- canvas-driven since
  // the organic, converging-and-fading strand look isn't practical with a
  // handful of static CSS/SVG shapes the way the previous blob+particle
  // background was. Each strand gently undulates in place over time- no
  // slide-in/connect choreography here (that caused rendering glitches),
  // just a steady ambient drift.
  useEffect(() => {
    const canvas = flowCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const THREAD_COUNT = 34;
    const threads = Array.from({ length: THREAD_COUNT }, (_, i) => ({
      offset: (i / (THREAD_COUNT - 1) - 0.5) * 2,
      freq1: 1.5 + Math.random() * 0.7,
      freq2: 2.6 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      speed1: 0.22 + Math.random() * 0.16,
      speed2: 0.36 + Math.random() * 0.22,
      amp: 12 + Math.random() * 18,
      cyan: Math.random() > 0.45,
      widthPx: 0.6 + Math.random() * 1,
      baseOpacity: 0.08 + Math.random() * 0.22,
    }));
    // A few brighter "highlight" strands threaded through the mesh, echoing
    // the bright converging lines in the reference image.
    [0.22, 0.42, 0.58, 0.78].forEach((f) => {
      const idx = Math.floor(f * (THREAD_COUNT - 1));
      threads[idx].baseOpacity = 0.75;
      threads[idx].widthPx = 1.6;
    });

    let raf = 0;
    const startTime = performance.now();

    const draw = (now: number) => {
      const t = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      const centerY = height / 2;
      const step = 6;
      ctx.lineCap = "round";

      threads.forEach((th) => {
        const rgb = th.cyan ? "0, 243, 255" : "0, 130, 255";
        // Fades each strand to transparent at both horizontal ends so the
        // whole mesh tapers to points, like the reference image, instead of
        // cutting off abruptly at the canvas edges.
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, `rgba(${rgb}, 0)`);
        grad.addColorStop(0.18, `rgba(${rgb}, ${th.baseOpacity})`);
        grad.addColorStop(0.82, `rgba(${rgb}, ${th.baseOpacity})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = th.widthPx;
        ctx.shadowColor = `rgba(${rgb}, 0.9)`;
        ctx.shadowBlur = th.baseOpacity > 0.6 ? 8 : 2;

        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += step) {
          const edgeFade = Math.sin(Math.min(Math.max(x / width, 0), 1) * Math.PI);
          const y =
            centerY +
            th.offset * height * 0.055 +
            Math.sin(x * 0.006 * th.freq1 + th.phase + t * th.speed1) * th.amp * edgeFade +
            Math.sin(x * 0.011 * th.freq2 + th.phase * 1.4 + t * th.speed2) * (th.amp * 0.4) * edgeFade;
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Light beam from the kiosk's camera to the agent's screen- drawn on a
  // separate, higher-stacked canvas (kiosk/agent visuals sit above the flow
  // mesh but below UI chrome) so it can span the gap between two flex
  // siblings whose relative position/scale changes across breakpoints
  // (side-by-side on desktop, stacked on mobile). The camera/target points
  // are measured from the actual rendered layout rather than hard-coded, so
  // it stays aimed correctly wherever the two panels land. kiosk-visual and
  // agent-section are both used as anchors specifically because neither one
  // carries the entrance-animation transform itself (that's on children),
  // so their rects are stable to read immediately instead of mid-animation.
  useEffect(() => {
    const canvas = beamCanvasRef.current;
    const kiosk = kioskVisualRef.current;
    const agent = agentSectionRef.current;
    if (!canvas || !kiosk || !agent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const render = () => {
      const stageRect = canvas.getBoundingClientRect();
      const width = stageRect.width;
      const height = stageRect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const kioskRect = kiosk.getBoundingClientRect();
      const agentRect = agent.getBoundingClientRect();

      // Beam originates near the top of the kiosk-machine.png artwork (the
      // headset/head area), expressed as a fraction of kiosk-visual's own
      // rendered box- not raw px- since that box gets CSS-scaled down on
      // narrower breakpoints.
      const cam = {
        x: kioskRect.left - stageRect.left + kioskRect.width * 0.5,
        y: kioskRect.top - stageRect.top + kioskRect.height * 0.07,
      };
      const target = {
        x: agentRect.left - stageRect.left + agentRect.width * 0.5,
        y: agentRect.top - stageRect.top + agentRect.height * 0.42,
      };

      const dx = target.x - cam.x;
      const dy = target.y - cam.y;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      const px = -uy;
      const py = ux;
      const spreadAtCam = 5;
      const spreadAtTarget = 50;

      // Mostly travels over dark empty space (not a bright photo like the
      // kiosk screen it used to sit on), so "screen" blend needs richer
      // stops to read clearly rather than washing out against near-black.
      const grad = ctx.createLinearGradient(cam.x, cam.y, target.x, target.y);
      grad.addColorStop(0, "rgba(220, 255, 255, 0.95)");
      grad.addColorStop(0.3, "rgba(0, 230, 255, 0.65)");
      grad.addColorStop(0.7, "rgba(0, 170, 255, 0.4)");
      grad.addColorStop(1, "rgba(0, 130, 255, 0.05)");

      ctx.filter = "blur(3px)";
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(cam.x + px * spreadAtCam, cam.y + py * spreadAtCam);
      ctx.lineTo(target.x + px * spreadAtTarget, target.y + py * spreadAtTarget);
      ctx.lineTo(target.x - px * spreadAtTarget, target.y - py * spreadAtTarget);
      ctx.lineTo(cam.x - px * spreadAtCam, cam.y - py * spreadAtCam);
      ctx.closePath();
      ctx.fill();

      // Soft landing glow where the beam meets the agent's screen.
      const landing = ctx.createRadialGradient(target.x, target.y, 0, target.x, target.y, 60);
      landing.addColorStop(0, "rgba(200, 255, 255, 0.55)");
      landing.addColorStop(1, "rgba(0, 200, 255, 0)");
      ctx.fillStyle = landing;
      ctx.beginPath();
      ctx.arc(target.x, target.y, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.filter = "none";
    };

    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, []);

  // The only way past the intro is clicking "Explore Now"- no auto-dismiss
  // timer and no click-anywhere-to-skip.
  const handleStart = () => {
    setIsExiting(true);
    // Wait for the CSS opacity fade-out transition to finish before unmounting
    setTimeout(() => {
      setFinished(true);
      onComplete?.();
    }, 800);
  };

  if (finished) return null;

  return (
    <>
      <style>{`
        .intro-stage {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(28px, 6vw, 90px);
          padding: 0 5vw;
          background: radial-gradient(circle at 50% 45%, #131d31 0%, #06080d 70%);
          color: #ffffff;
          overflow: hidden;
          z-index: 9999;
          transition: opacity 0.8s ease-out;
        }

        .intro-stage.exiting {
          opacity: 0;
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .intro-stage { flex-direction: column; gap: 32px; padding: 8vh 6vw; }
        }

        /* --- ANIMATED BACKGROUND --- */
        /* Negative z-index (not 0) so this sits behind kiosk-section/agent-
           section even though those are plain, non-positioned flex items-
           a positioned z-index:0 sibling would otherwise paint above them. */
        .bg-flow-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: -3;
          pointer-events: none;
        }

        /* Positioned (unlike the plain flex kiosk-section/agent-section), so
           it paints above their z-index:auto content by default- lands the
           beam visibly on top of the kiosk/agent imagery, still beneath the
           speech bubble/sound button/explore button. */
        .beam-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 12;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0;
          animation: beam-in 1s ease 3.2s forwards, beam-flicker 3.2s ease-in-out 4.2s infinite;
        }

        /* --- KIOSK --- */
        .kiosk-section { flex: 0 0 auto; }

        /* kiosk-visual is 500px tall; scaling from the top edge means all the
           shrunk-away space collects below it, so margin-bottom cancels
           exactly that (500 * (1 - scale)) to avoid a phantom gap. */
        @media (max-width: 900px) {
          .kiosk-section { transform: scale(0.75); transform-origin: top center; margin-bottom: -125px; }
        }
        @media (max-width: 420px) {
          .kiosk-section { transform: scale(0.6); transform-origin: top center; margin-bottom: -200px; }
        }

        /* Kiosk-machine.png is a tall, narrow product shot (~1358x4278,
           aspect ~0.32)- box width follows that ratio at a fixed 500px
           height so the whole unit renders without the heavy crop a wider
           box would force via object-cover. The old screen-scan/avatar-badge
           overlays (tuned to the previous machine.webp's screen region) were
           dropped rather than reused as-is: this artwork already renders its
           own on-screen avatar/chat UI, so a separate floating badge over it
           would just duplicate/misalign. */
        .kiosk-visual {
          position: relative;
          width: 160px;
          height: 500px;
        }

        /* The scale entrance lives on this inner wrapper, not on kiosk-visual
           itself- the beam effect reads kiosk-visual's rect as a stable
           anchor point, and a transform there would report the mid-animation
           position instead of the settled one. */
        .kiosk-inner {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform-origin: center;
          animation: kiosk-in 0.85s cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards;
        }

        .kiosk-frame {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .kiosk-glow {
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
          width: 130px;
          height: 24px;
          background: radial-gradient(ellipse at center, rgba(0, 243, 255, 0.6) 0%, rgba(0, 243, 255, 0) 72%);
          filter: blur(6px);
          z-index: 1;
        }

        /* --- AGENT --- */
        .agent-section { flex: 0 0 auto; }

        @media (max-width: 900px) {
          .agent-section { transform: scale(0.8); }
          /* Kiosk sits above agent in the stacked layout, so the reveal
             travels straight down out of it instead of sideways. */
          .agent-container { animation: step-out-mobile 1s cubic-bezier(0.22, 1, 0.36, 1) 2.25s forwards; }
          @keyframes step-out-mobile {
            0% { opacity: 0; transform: translateY(-70px) scale(0.35); filter: blur(6px); }
            55% { opacity: 1; }
            100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          }
        }
        @media (max-width: 420px) {
          .agent-section { transform: scale(0.65); }
        }

        /* Starts overlapping the screen avatar (small, flat) and travels out
           to its natural position (full size)- the "stepping out" reveal.
           Offset measured via Playwright against the rendered layout. */
        .agent-container {
          position: relative;
          width: 168px;
          aspect-ratio: 9 / 16;
          opacity: 0;
          animation: step-out 1s cubic-bezier(0.22, 1, 0.36, 1) 2.25s forwards;
        }

        .agent-glow {
          position: absolute;
          left: 4%;
          right: 4%;
          bottom: -6px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0, 243, 255, 0.55) 0%, rgba(0, 102, 255, 0.2) 60%, transparent 80%);
          filter: blur(10px);
          z-index: -2;
          animation: pulse-glow 2.4s ease-in-out infinite;
        }

        /* The source clip (Guest Services concierge, 1080x1920) renders on a
           plain light backdrop, so it's framed like a hologram/screen panel
           rather than floated free like the old transparent PNG cutout. */
        .agent-video-frame {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          overflow: hidden;
          border: 2px solid rgba(0, 243, 255, 0.5);
          box-shadow: 0 0 22px rgba(0, 243, 255, 0.35), 0 14px 30px rgba(0, 0, 0, 0.5);
        }

        .agent-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .agent-sound-btn {
          position: absolute;
          right: 8px;
          bottom: 8px;
          z-index: 27;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(8, 20, 30, 0.8);
          border: 1px solid rgba(0, 243, 255, 0.5);
          color: #eafeff;
          cursor: pointer;
          opacity: 0;
          transition: transform 0.15s ease, background 0.15s ease;
          animation: fade-in 0.4s ease 3.1s forwards;
        }

        .agent-sound-btn:hover {
          transform: scale(1.1);
          background: rgba(0, 243, 255, 0.25);
        }

        /* Pops in above the agent once it finishes arriving, as if greeting the guest */
        .agent-speech {
          position: absolute;
          left: 50%;
          top: -14%;
          white-space: nowrap;
          background: rgba(8, 20, 30, 0.9);
          border: 1px solid rgba(0, 243, 255, 0.45);
          color: #eafeff;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 14px;
          box-shadow: 0 0 18px rgba(0, 243, 255, 0.25);
          opacity: 0;
          transform: translateX(-50%) scale(0.5);
          transform-origin: center bottom;
          z-index: 26;
          animation: speech-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 2.85s forwards;
        }

        .agent-speech::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 7px solid rgba(0, 243, 255, 0.45);
        }

        /* --- EXPLORE CTA --- */
        .explore-btn {
          position: absolute;
          left: 50%;
          bottom: 7vh;
          transform: translateX(-50%);
          z-index: 30;
          background: linear-gradient(90deg, #0066ff, #00f3ff);
          color: #000;
          font-weight: 800;
          font-size: 0.85rem;
          padding: 13px 34px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          opacity: 0;
          animation: fade-up 0.7s ease 3.4s forwards;
        }

        .explore-btn:hover {
          transform: translateX(-50%) scale(1.06);
          box-shadow: 0 0 30px rgba(0, 243, 255, 0.9);
        }

        @media (max-width: 900px) {
          .explore-btn { bottom: 4vh; }
        }

        /* --- LOADING INDICATOR (corner) --- */
        .loading-indicator {
          position: absolute;
          right: 28px;
          bottom: 28px;
          z-index: 15;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: fade-in 0.6s ease 0.15s forwards;
        }

        .loading-label {
          font-size: 0.68rem;
          letter-spacing: 3px;
          text-transform: lowercase;
          color: #7ff0ff;
        }

        .loading-pill {
          position: relative;
          width: 160px;
          height: 28px;
          border: 1.5px solid rgba(0, 243, 255, 0.55);
          border-radius: 20px;
          background: rgba(0, 243, 255, 0.05);
          overflow: hidden;
        }

        .loading-pill-track,
        .loading-pill-fill {
          position: absolute;
          inset: 5px 7px;
          background-image: repeating-linear-gradient(
            90deg,
            currentColor 0px,
            currentColor 2px,
            transparent 2px,
            transparent 5px
          );
        }

        .loading-pill-track {
          color: rgba(0, 243, 255, 0.18);
        }

        .loading-pill-fill {
          color: #00f3ff;
          filter: drop-shadow(0 0 3px rgba(0, 243, 255, 0.9));
          clip-path: inset(0 100% 0 0);
          animation: loading-scan 2.4s ease-in-out infinite;
        }

        @media (max-width: 900px) {
          /* The Explore Now button spans wide near the bottom on narrow
             screens, so the indicator moves up to the top-right instead of
             colliding with it there. */
          .loading-indicator { right: 16px; bottom: auto; top: 16px; transform: scale(0.85); transform-origin: top right; }
        }

        /* --- KEYFRAME ANIMATIONS --- */
        @keyframes kiosk-in {
          0% { opacity: 0; transform: scale(0.55); }
          60% { opacity: 1; }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes beam-in {
          0% { opacity: 0; }
          100% { opacity: 0.85; }
        }

        @keyframes beam-flicker {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 0.55; }
        }

        @keyframes step-out {
          0% {
            opacity: 0;
            transform: translate(-372px, -109px) scale(0.3);
            filter: blur(6px);
          }
          55% { opacity: 1; }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes speech-pop {
          0% { opacity: 0; transform: translateX(-50%) scale(0.5); }
          70% { transform: translateX(-50%) scale(1.08); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }

        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.15); opacity: 0.3; }
        }

        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateX(-50%) translateY(16px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        @keyframes loading-scan {
          0%, 100% { clip-path: inset(0 100% 0 0); }
          50% { clip-path: inset(0 0% 0 0); }
        }
      `}</style>

      <div className={`intro-stage ${isExiting ? "exiting" : ""}`}>

        <canvas ref={flowCanvasRef} className="bg-flow-canvas" />
        <canvas ref={beamCanvasRef} className="beam-canvas" />

        <div className="kiosk-section">
          <div className="kiosk-visual" ref={kioskVisualRef}>
            <div className="kiosk-inner">
              <div className="kiosk-frame">
                <Image
                  src="/img/Kiosk-machine.png"
                  alt="Kiosist self-check-in kiosk"
                  fill
                  priority
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <div className="kiosk-glow" />
            </div>
          </div>
        </div>

        <div className="agent-section" ref={agentSectionRef}>
          <div className="agent-container">
            <div className="agent-glow" />
            <div className="agent-video-frame">
              <video
                ref={videoRef}
                className="agent-video"
                src="/video/animated.mp4"
                autoPlay
                loop
                muted={muted}
                playsInline
              />
            </div>
            <button
              type="button"
              className="agent-sound-btn"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <div className="agent-speech">Welcome! 👋</div>
          </div>
        </div>

        <button type="button" className="explore-btn" onClick={handleStart}>
          Explore Now
        </button>

        <div className="loading-indicator">
          <span className="loading-label">loading...</span>
          <div className="loading-pill">
            <div className="loading-pill-track" />
            <div className="loading-pill-fill" />
          </div>
        </div>

      </div>
    </>
  );
}
