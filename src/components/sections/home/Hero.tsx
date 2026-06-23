"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { img } from "@/lib/utils";
import { HOTEL } from "@/lib/data";
import TextReveal from "@/components/anim/TextReveal";
import BookingWidget from "@/components/booking/BookingWidget";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 22,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(contentRef.current, {
        yPercent: -14,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[680px] flex-col justify-end overflow-hidden bg-ink-950"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <motion.div
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
          className="absolute inset-0"
        >
          <Image
            src={img("photo-1564501049412-61c2a3083791", 2400)}
            alt="Drury Plaza Hotel on the San Antonio River Walk at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/50 to-transparent" />

      {/* Floating brand line top */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute left-0 right-0 top-28 hidden justify-center md:flex"
      >
        <span className="eyebrow text-ivory/50">
          {HOTEL.building} · Est. {HOTEL.established}
        </span>
      </motion.div>

      {/* Content */}
      <div ref={contentRef} className="container-luxe relative z-10 pb-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1, ease }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-12 bg-champagne" />
            <span className="eyebrow text-champagne-light">
              San Antonio River Walk
            </span>
          </motion.div>

          <TextReveal
            text="Where the river"
            as="h1"
            immediate
            delay={1.2}
            stagger={0.08}
            className="font-serif text-hero leading-[0.92] text-ivory"
          />
          <TextReveal
            text="meets history."
            as="h1"
            immediate
            delay={1.5}
            stagger={0.08}
            className="font-serif text-hero italic leading-[0.92] text-gold-gradient"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 1 }}
            className="mt-7 max-w-lg font-sans text-base leading-relaxed text-ivory/75 md:text-lg"
          >
            A restored 1929 landmark rising above the water&apos;s edge — where
            timeless architecture meets the warmth of true Texan hospitality.
          </motion.p>
        </div>

        {/* Booking widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 1, ease }}
          className="mt-10"
        >
          <BookingWidget variant="glass" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="pointer-events-none absolute bottom-6 right-6 z-10 hidden items-center gap-2 text-ivory/50 lg:flex"
      >
        <Link
          href="#story"
          className="pointer-events-auto flex flex-col items-center gap-2"
        >
          <span className="eyebrow rotate-90 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
