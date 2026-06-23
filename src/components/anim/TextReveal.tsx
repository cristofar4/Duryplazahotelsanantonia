"use client";

import { ElementType, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  /** Animate immediately on mount rather than on scroll (for hero). */
  immediate?: boolean;
}

export default function TextReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.05,
  start = "top 88%",
  immediate = false,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll<HTMLElement>(".tr-inner");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(el, { opacity: 1 });
    if (reduce) {
      gsap.set(inners, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inners,
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.15,
          ease: "power4.out",
          stagger,
          delay,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start } }),
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, start, immediate]);

  return (
    <Tag
      ref={ref as never}
      className={cn("gsap-fade", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.06em", marginBottom: "-0.06em" }}
        >
          <span className="tr-inner inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
