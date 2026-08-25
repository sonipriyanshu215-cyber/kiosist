"use client";

import { useState } from "react";
import { SafeImage } from "@/components/primitives/SafeImage";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { staggerParent, staggerChild, hoverLift } from "@/lib/motion";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";
import { cultureGallery as DEFAULT_GALLERY, type GalleryImage } from "@/content/cultureGallery";
import { GALLERY_CATEGORIES } from "@/lib/cms/gallery-categories";
import "yet-another-react-lightbox/styles.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

const TABS = ["All", ...GALLERY_CATEGORIES] as const;

interface MasonryGalleryProps {
  gallery?: GalleryImage[];
}

export function MasonryGallery({ gallery = DEFAULT_GALLERY }: MasonryGalleryProps) {
  const [index, setIndex] = useState(-1);
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const reducedMotion = useReducedMotion();
  const filtered = tab === "All" ? gallery : gallery.filter((img) => img.alt === tab);

  return (
    <section className="section-pad bg-kio-bg">
      <div className="container-kio">
        <RevealOnScroll className="mb-10 text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.2] text-kio-ink">
            Kiosist <span className="text-color-cycle">Gallery</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-kio-muted">
            At Kiosist, every conversation creates a lasting impression. Join us and make
            yours count.
          </p>
        </RevealOnScroll>

        {/* Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                tab === t
                  ? "border-kio-accent bg-kio-accent/15 text-kio-accent"
                  : "border-kio-line text-kio-muted hover:border-kio-accent/40 hover:text-kio-ink"
              }`}
              suppressHydrationWarning
            >
              {t}
            </button>
          ))}
        </div>

        <motion.div
          key={tab}
          variants={staggerParent}
          initial={reducedMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
          className="columns-2 gap-[clamp(4px,1.6vw,16px)] sm:columns-3 lg:columns-4"
        >
          {filtered.map((img, i) => (
            <motion.div
              key={img.src}
              variants={staggerChild}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="mb-[clamp(4px,1.6vw,16px)] break-inside-avoid"
            >
              <motion.div
                variants={hoverLift}
                className="group relative cursor-zoom-in overflow-hidden rounded-2xl"
                onClick={() => setIndex(i)}
              >
                <SafeImage
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-kio-primary/0 transition-colors duration-300 group-hover:bg-kio-primary/20" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-kio-primary/80 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <p className="text-xs font-medium text-white">{img.alt}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={filtered.map((img) => ({ src: img.src, alt: img.alt }))}
        />
      </div>
    </section>
  );
}
