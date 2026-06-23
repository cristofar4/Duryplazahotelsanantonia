"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  /** If set, animates direct children with this stagger (seconds). */
  stagger?: number;
  start?: string;
}

export default function Reveal({
  children,
  className,
  y = 44,
  delay = 0,
  duration = 1.1,
  stagger,
  start = "top 86%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(el, { opacity: 1 });
      if (stagger) gsap.set(el.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (stagger !== undefined) {
        gsap.set(el, { opacity: 1 });
        gsap.from(el.children, {
          opacity: 0,
          y,
          duration,
          delay,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: el, start },
        });
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, stagger, start]);

  return (
    <div ref={ref} className={cn("gsap-fade", className)}>
      {children}
    </div>
  );
}
