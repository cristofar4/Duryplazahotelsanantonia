"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = TESTIMONIALS[index];

  const go = (dir: number) =>
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="bg-ink-950 py-28 text-ivory md:py-36">
      <div className="container-luxe">
        <div className="mx-auto max-w-4xl text-center">
          <Quote className="mx-auto mb-10 h-10 w-10 text-champagne" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-serif text-3xl font-light leading-snug text-ivory md:text-[2.6rem] md:leading-[1.18]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-10">
                <p className="font-sans text-sm uppercase tracking-wider2 text-champagne">
                  {item.author}
                </p>
                <p className="mt-1 font-sans text-xs text-ivory/50">{item.detail}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-champagne hover:text-champagne"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-champagne" : "w-1.5 bg-ivory/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-champagne hover:text-champagne"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
