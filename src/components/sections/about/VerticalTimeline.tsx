"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { TIMELINE, IMAGES } from "@/lib/data";
import Media from "@/components/anim/Media";

const PANEL_IMAGES = [IMAGES.facade, IMAGES.lobby, IMAGES.riverwalkNight, IMAGES.poolRooftop];

export default function VerticalTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl">
      {/* Center line */}
      <div className="absolute left-6 top-0 h-full w-px bg-stone-200 md:left-1/2 md:-translate-x-1/2">
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="h-full w-full bg-champagne"
        />
      </div>

      <div className="space-y-16 md:space-y-28">
        {TIMELINE.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`relative grid gap-6 pl-16 md:grid-cols-2 md:items-center md:gap-12 md:pl-0 ${
              i % 2 === 1 ? "md:[direction:rtl]" : ""
            }`}
          >
            {/* Dot */}
            <span className="absolute left-6 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-champagne bg-ivory md:left-1/2" />

            <div className="[direction:ltr]">
              <Media
                id={PANEL_IMAGES[i] ?? IMAGES.facade}
                alt={item.title}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="[direction:ltr]">
              <span className="font-serif text-6xl text-champagne md:text-7xl">
                {item.year}
              </span>
              <h3 className="mt-3 font-serif text-3xl text-ink">{item.title}</h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-stone-500">
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
