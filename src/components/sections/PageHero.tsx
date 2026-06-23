"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { img } from "@/lib/utils";
import TextReveal from "@/components/anim/TextReveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
}: PageHeroProps) {
  return (
    <section className="relative flex h-[78vh] min-h-[560px] items-end overflow-hidden bg-ink-950">
      <motion.div
        initial={{ scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={img(image, 2200)}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 to-transparent" />

      <div className="container-luxe relative pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mb-5"
        >
          <span className="eyebrow text-champagne-light">{eyebrow}</span>
        </motion.div>
        <TextReveal
          text={title}
          as="h1"
          immediate
          delay={0.5}
          className="max-w-5xl font-serif text-hero-sm text-ivory md:text-display"
        />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-6 max-w-xl font-sans text-base leading-relaxed text-ivory/70 md:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
