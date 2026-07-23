"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { ParticleRingDynamic } from "@/components/global/ParticleRingDynamic";

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
  const beamCanvasRef = useRef<HTMLCanvasElement>(null);
  const kioskVisualRef = useRef<HTMLDivElement>(null);
  const agentSectionRef = useRef<HTMLDivElement>(null);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  // Light beam from the kiosk's camera to the agent's screen- drawn on a
  // separate, higher-stacked canvas (kiosk/agent visuals sit above the flow
  // mesh but below UI chrome) so it can span the gap between two flex
  // siblings whose relative size changes across breakpoints (both always
  // side by side in .kiosk-agent-group). The camera/target points are
  // measured from the actual rendered layout rather than hard-coded, so
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
      grad.addColorStop(0, "rgba(224, 247, 255, 0.95)");
      grad.addColorStop(0.3, "rgba(6, 182, 212, 0.65)");
      grad.addColorStop(0.7, "rgba(59, 130, 246, 0.4)");
      grad.addColorStop(1, "rgba(59, 130, 246, 0.05)");

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
      landing.addColorStop(0, "rgba(224, 247, 255, 0.55)");
      landing.addColorStop(1, "rgba(6, 182, 212, 0)");
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
          justify-content: space-between;
          gap: clamp(28px, 6vw, 90px);
          padding: 0 13vw 0 8vw;
          background: #000000;
          color: #ffffff;
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 9999;
          transition: opacity 0.8s ease-out;
        }

        .intro-stage.exiting {
          opacity: 0;
          pointer-events: none;
        }

        @media (max-width: 900px) {
          /* Stacked kiosk/agent/tagline/CTA column can still exceed a short
             viewport's height (e.g. a phone with its browser chrome eating
             vertical space)- flex-start (not center) so any overflow spills
             off the bottom, reachable by scrolling, rather than getting
             center-cropped off BOTH ends by overflow, which used to hide
             the kiosk entirely with no way to scroll back to it. */
          .intro-stage { flex-direction: column; justify-content: flex-start; gap: clamp(14px, 3.5vh, 28px); padding: 5vh 6vw; }
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

        /* Kiosk + agent as one paired unit on the left; tagline/CTA sit
           separately in .content-section on the right. Always a row (even
           on mobile)- keeping them side by side rather than stacked halves
           the vertical space they need on a short phone viewport compared
           to stacking three-plus items in one column. */
        .kiosk-agent-group {
          display: flex;
          align-items: center;
          flex: 0 0 auto;
          gap: clamp(20px, 13vw, 230px);
        }

        /* --- KIOSK --- */
        .kiosk-section { flex: 0 0 auto; }

        /* Kiosk-machine.png is a tall, narrow product shot (~1358x4278,
           aspect ~0.32)- box width follows that ratio via aspect-ratio so
           the whole unit renders without the heavy crop a wider box would
           force via object-cover. The old screen-scan/avatar-badge overlays
           (tuned to the previous machine.webp's screen region) were dropped
           rather than reused as-is: this artwork already renders its own
           on-screen avatar/chat UI, so a separate floating badge over it
           would just duplicate/misalign.
           Height is clamped to viewport height (not just width breakpoints)
           so it shrinks on short viewports- e.g. a phone browser with its
           address-bar chrome visible, where the layout viewport is narrow
           AND short at once. Sized off vh instead of a transform: scale
           hack so it's real box geometry (no phantom flow gaps to cancel
           with margin math) and shrinks continuously instead of jumping at
           fixed breakpoints. */
        .kiosk-visual {
          position: relative;
          height: clamp(220px, 62vh, 500px);
          aspect-ratio: 0.32;
        }

        /* Stacked mobile layout has 3 more elements below the kiosk (agent,
           tagline, CTA) sharing the same viewport height that alone used to
           fit just kiosk+agent, so its own max shrinks too- otherwise a
           tall-but-narrow phone (generous vh, narrow width) would render the
           kiosk at its full desktop size and push everything below it off
           the bottom of the screen. */
        @media (max-width: 900px) {
          .kiosk-visual { height: clamp(200px, 45vh, 350px); }
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
          background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 72%);
          filter: blur(6px);
          z-index: 1;
        }

        /* --- CONTENT (tagline + CTA), right of the kiosk+agent group --- */
        .content-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 0 0 auto;
          gap: clamp(16px, 3.5vh, 28px);
        }

        @media (max-width: 900px) {
          /* The reference layout this matches is a wide desktop hero with
             room for a flush-left column; the mobile intro is a much
             narrower centered stack, so left-aligning here would just left-
             align text against a box that's itself centered mid-screen-
             reverts to centered to keep the compact mobile composition
             coherent. */
          .content-section { align-items: center; gap: clamp(10px, 2.5vh, 18px); }
        }

        /* Matches the homepage hero's h1 styling (same display font, plain
           white, no glow)- this splash screen leads into that hero, so its
           headline should read as the same typographic voice. */
        .intro-tagline {
          max-width: 520px;
          margin: 0;
          text-align: left;
          font-family: var(--font-display), sans-serif;
          font-size: clamp(1.5rem, 3.2vw, 2.5rem);
          font-weight: 900;
          line-height: 1.3;
          color: #ffffff;
          opacity: 0;
          transform: translateY(16px);
          animation: fade-up 0.7s ease 3.3s forwards;
        }

        @media (max-width: 900px) {
          .intro-tagline { max-width: 300px; text-align: center; font-size: clamp(1.15rem, 5vw, 1.6rem); }
        }

        /* Same brand blue-to-cyan gradient the homepage hero uses to
           highlight one word in its headline (e.g. "Care."/"Speed.")- here
           on "smile", the emotional core of the line. */
        .intro-tagline-accent {
          background: linear-gradient(135deg, var(--kio-accent2), var(--kio-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* --- AGENT --- */
        .agent-section { flex: 0 0 auto; }

        /* Starts overlapping the screen avatar (small, flat) and travels out
           to its natural position (full size)- the "stepping out" reveal.
           Offset measured via Playwright against the rendered layout.
           Sized off the same vh-clamp approach as kiosk-visual (height
           clamped, width derived via aspect-ratio) so it shrinks in step
           with the kiosk on short viewports instead of via a separate
           transform: scale hack. */
        .agent-container {
          position: relative;
          height: clamp(150px, 37vh, 299px);
          aspect-ratio: 9 / 16;
          opacity: 0;
          animation: step-out 1s cubic-bezier(0.22, 1, 0.36, 1) 2.25s forwards;
        }

        /* Same reasoning as kiosk-visual's mobile override above- shares the
           stacked column with 3 siblings now, so it needs a smaller ceiling
           on narrow viewports even when vh is generous. */
        @media (max-width: 900px) {
          .agent-container { height: clamp(130px, 27vh, 220px); }
        }

        .agent-glow {
          position: absolute;
          left: 4%;
          right: 4%;
          bottom: -6px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(6, 182, 212, 0.55) 0%, rgba(59, 130, 246, 0.2) 60%, transparent 80%);
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
          border: 2px solid rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 22px rgba(59, 130, 246, 0.35), 0 14px 30px rgba(0, 0, 0, 0.5);
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
          border: 1px solid rgba(59, 130, 246, 0.5);
          color: #eafeff;
          cursor: pointer;
          opacity: 0;
          transition: transform 0.15s ease, background 0.15s ease;
          animation: fade-in 0.4s ease 3.1s forwards;
        }

        .agent-sound-btn:hover {
          transform: scale(1.1);
          background: rgba(59, 130, 246, 0.25);
        }

        /* Pops in above the agent once it finishes arriving, as if greeting the guest */
        .agent-speech {
          position: absolute;
          left: 50%;
          top: -14%;
          white-space: nowrap;
          background: rgba(8, 20, 30, 0.9);
          border: 1px solid rgba(59, 130, 246, 0.45);
          color: #eafeff;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 14px;
          box-shadow: 0 0 18px rgba(59, 130, 246, 0.25);
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
          border-top: 7px solid rgba(59, 130, 246, 0.45);
        }

        /* --- EXPLORE CTA --- */
        /* Matches .btn-primary (globals.css)- the same pill CTA the
           homepage hero's "Join Us" button uses- so the splash screen's
           button reads as the same brand element, not a separate one-off. */
        .explore-btn {
          position: relative;
          z-index: 30;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, var(--kio-accent), var(--kio-accent2));
          color: #fff;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 14px 32px;
          border: none;
          border-radius: 99px;
          cursor: pointer;
          box-shadow: 0 0 30px var(--kio-glow);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          animation: fade-up 0.7s ease 3.6s forwards;
        }

        .explore-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 40px var(--kio-glow);
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
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }

      `}</style>

      <div className={`intro-stage ${isExiting ? "exiting" : ""}`}>

        <ParticleRingDynamic style={{ position: "absolute", zIndex: -3 }} />
        <canvas ref={beamCanvasRef} className="beam-canvas" />

        <div className="kiosk-agent-group">
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
        </div>

        <div className="content-section">
          <p className="intro-tagline">
            If you love to <span className="intro-tagline-accent">smile</span>
            <br />
            and make others <span className="intro-tagline-accent">smile.</span>
          </p>

          <button type="button" className="explore-btn" onClick={handleStart}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            Explore Now
          </button>
        </div>

      </div>
    </>
  );
}
