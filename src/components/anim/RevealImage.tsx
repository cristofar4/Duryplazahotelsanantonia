"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { img } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealImageProps {
  id: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  /** disable the parallax drift inside the frame */
  noParallax?: boolean;
  rounded?: boolean;
}

export default function RevealImage({
  id,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  width = 1800,
  noParallax = false,
  rounded = false,
}: RevealImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = imgRef.current;
    if (!frame || !inner) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: frame, start: "top 85%" },
        },
      );
      gsap.fromTo(
        inner,
        { scale: 1.35 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: { trigger: frame, start: "top 85%" },
        },
      );
      if (!noParallax) {
        gsap.to(inner, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, frame);
    return () => ctx.revert();
  }, [noParallax]);

  return (
    <div
      ref={frameRef}
      className={cn(
        "relative overflow-hidden bg-stone-200",
        rounded && "rounded-sm",
        className,
      )}
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
    >
      <div ref={imgRef} className="absolute inset-0 h-full w-full will-change-transform">
        <Image
          src={img(id, width)}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
