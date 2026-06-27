"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface LottiePlayerProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

export function LottiePlayer({
  src,
  className = "",
  loop = true,
  autoplay = true,
  style,
}: LottiePlayerProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => null);
  }, [src]);

  if (!animationData) {
    return <div className={`${className} rounded-full bg-kio-accent/20`} style={style} />;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={reducedMotion ? false : loop}
      autoplay={reducedMotion ? false : autoplay}
      className={className}
      style={style}
      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
    />
  );
}
