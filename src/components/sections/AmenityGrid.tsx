"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Amenity } from "@/lib/data";
import { cn } from "@/lib/utils";
import Media from "@/components/anim/Media";

function AmenityCard({
  amenity,
  large = false,
  index = 0,
}: {
  amenity: Amenity;
  large?: boolean;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden",
        large ? "min-h-[460px] lg:min-h-[620px]" : "min-h-[340px] lg:min-h-[400px]",
      )}
    >
      <Media
        id={amenity.image}
        alt={amenity.title}
        className="absolute inset-0 transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
        sizes={large ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />

      <div className="relative z-10 p-7 text-ivory lg:p-9">
        <span className="eyebrow text-champagne-light">{amenity.kicker}</span>
        <h3
          className={cn(
            "mt-3 font-serif leading-tight",
            large ? "text-4xl lg:text-5xl" : "text-3xl",
          )}
        >
          {amenity.title}
        </h3>
        <div className="grid grid-rows-[0fr] transition-all duration-700 ease-luxe group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-ivory/75">
              {amenity.description}
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          {amenity.highlights.slice(0, large ? 4 : 2).map((h) => (
            <span
              key={h}
              className="rounded-full border border-ivory/25 px-3 py-1 font-sans text-[0.6rem] uppercase tracking-wider2 text-ivory/70"
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      <span className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100 lg:right-9 lg:top-9">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </motion.article>
  );
}

export default function AmenityGrid({ amenities }: { amenities: Amenity[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {amenities.map((amenity, i) => (
        <div key={amenity.slug} className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}>
          <AmenityCard amenity={amenity} large={i === 0} index={i} />
        </div>
      ))}
    </div>
  );
}
