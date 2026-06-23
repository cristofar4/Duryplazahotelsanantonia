"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { GALLERY, type GalleryItem } from "@/lib/data";
import { img, cn } from "@/lib/utils";

const CATEGORIES = ["All", "Architecture", "Rooms", "Dining", "Riverwalk", "Amenities"] as const;

export default function GalleryMasonry() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items: GalleryItem[] =
    filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  const close = useCallback(() => setLightbox(null), []);
  const move = useCallback(
    (dir: number) => {
      setLightbox((i) => {
        if (i === null) return i;
        return (i + dir + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, move]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "border px-5 py-2.5 font-sans text-[0.68rem] uppercase tracking-wider2 transition-all duration-300",
              filter === cat
                ? "border-ink bg-ink text-ivory"
                : "border-stone-300 text-stone-500 hover:border-ink hover:text-ink",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.button
              key={item.src + item.caption}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
              onClick={() => setLightbox(i)}
              className={cn(
                "group relative block w-full break-inside-avoid overflow-hidden bg-stone-200",
                item.span === "tall" && "aspect-[3/4]",
                item.span === "wide" && "aspect-[3/2]",
                (!item.span || item.span === "normal") && "aspect-square",
              )}
            >
              <Image
                src={img(item.src, 1000)}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink-950/0 transition-colors duration-500 group-hover:bg-ink-950/30" />
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/40 text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100">
                <Plus className="h-4 w-4" />
              </span>
              <span className="absolute bottom-4 left-4 font-sans text-xs uppercase tracking-wider2 text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100">
                {item.caption}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-ink-950/95 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                move(-1);
              }}
              aria-label="Previous"
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-ink md:left-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                move(1);
              }}
              aria-label="Next"
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-ink md:right-10"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            <motion.figure
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto flex max-h-[85vh] w-full max-w-5xl flex-col items-center px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[72vh] w-full">
                <Image
                  src={img(items[lightbox].src, 2000)}
                  alt={items[lightbox].caption}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-5 text-center">
                <p className="font-serif text-xl text-ivory">{items[lightbox].caption}</p>
                <p className="mt-1 font-sans text-[0.62rem] uppercase tracking-wider2 text-champagne">
                  {items[lightbox].category} · {lightbox + 1} / {items.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
