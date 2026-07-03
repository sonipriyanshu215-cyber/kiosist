"use client";

import { useState } from "react";
import { SafeImage } from "@/components/primitives/SafeImage";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { ImageIcon } from "lucide-react";
import { staggerParent, staggerChild, hoverLift } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import "yet-another-react-lightbox/styles.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

const GALLERY = [
  { src: "/img/culture/office-1.png", alt: "Office space" },
  { src: "/img/culture/team-meeting-1.png", alt: "Team meeting" },
  { src: "/img/culture/training-1.png", alt: "Training session" },
  { src: "/img/culture/celebration-1.png", alt: "Team celebration" },
  { src: "/img/culture/office-2.jpg", alt: "Work station" },
  { src: "/img/culture/team-meeting-2.jpg", alt: "Team huddle" },
  { src: "/img/culture/training-2.jpg", alt: "Agent training" },
  { src: "/img/culture/celebration-2.jpg", alt: "Birthday celebration" },
  { src: "/img/culture/office-3.jpg", alt: "Office candid" },
  { src: "/img/culture/team-3.jpg", alt: "The team" },
  { src: "/img/culture/training-3.jpg", alt: "PMS training" },
  { src: "/img/culture/event-1.jpg", alt: "Company event" },
];

export function MasonryGallery({ existingAssets = [] }: { existingAssets?: string[] }) {
  const [index, setIndex] = useState(-1);
  const reducedMotion = useReducedMotion();
  const existing = new Set(existingAssets);

  return (
    <section className="section-pad bg-kio-bg">
      <div className="container-kio">
        <RevealOnScroll className="mb-14 text-center">
          <p className="section-label">Our Culture</p>
          <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
            More Than a Job. A Career That Welcomes the World.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-kio-muted">
            At Kiosist, every conversation creates a lasting impression. Join us and make
            yours count.
          </p>
        </RevealOnScroll>

        <motion.div
          variants={staggerParent}
          initial={reducedMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
          className="columns-2 gap-4 sm:columns-3 lg:columns-4"
        >
          {GALLERY.map((img, i) => {
            const hasPhoto = existing.has(img.src.split("/").pop()!);
            return (
            <motion.div
              key={img.src}
              variants={staggerChild}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="mb-4 break-inside-avoid"
            >
              <motion.div
                variants={hoverLift}
                className={`group relative overflow-hidden rounded-2xl ${hasPhoto ? "cursor-zoom-in" : ""}`}
                onClick={hasPhoto ? () => setIndex(i) : undefined}
              >
                {hasPhoto ? (
                  <SafeImage
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div
                    aria-label={img.alt}
                    role="img"
                    className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-kio-bg-soft to-kio-bg"
                  >
                    <div
                      className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-kio-accent/10 to-transparent animate-scan-beam-slow"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                    <ImageIcon className="relative h-6 w-6 text-kio-muted/30" strokeWidth={1.5} />
                  </div>
                )}
                <div className="absolute inset-0 bg-kio-primary/0 transition-colors duration-300 group-hover:bg-kio-primary/20" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-kio-primary/80 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <p className="text-xs font-medium text-white">{img.alt}</p>
                </div>
              </motion.div>
            </motion.div>
            );
          })}
        </motion.div>

        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={GALLERY.map((img) => ({ src: img.src, alt: img.alt }))}
        />
      </div>
    </section>
  );
}
