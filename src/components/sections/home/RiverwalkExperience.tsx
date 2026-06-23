"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { img } from "@/lib/utils";
import { IMAGES as IMG } from "@/lib/data";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/anim/TextReveal";
import Reveal from "@/components/anim/Reveal";

export default function RiverwalkExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 text-ivory"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img(IMG.riverwalkNight, 2200)})` }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink-950/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="container-luxe relative z-10 py-28">
        <div className="max-w-2xl">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-champagne" />
              <span className="eyebrow text-champagne-light">Paseo del Río</span>
            </div>
          </Reveal>
          <TextReveal
            text="Step outside, onto the water's edge."
            as="h2"
            className="font-serif text-display leading-[1.02]"
          />
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl font-sans text-lg leading-relaxed text-ivory/70">
              The legendary River Walk unfolds at our doorstep — a ribbon of
              cypress-shaded promenades, river barges, and lantern-lit cafés.
              The Alamo, the Shops at Rivercenter, and the pulse of downtown are
              all a gentle stroll away.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
            {[
              "2 min · River Walk promenade",
              "6 min · The Alamo",
              "4 min · Shops at Rivercenter",
            ].map((item) => (
              <span key={item} className="font-sans text-sm text-ivory/60">
                {item}
              </span>
            ))}
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <Button asChild variant="gold" size="lg">
              <Link href="/about">
                Discover the Neighbourhood <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
