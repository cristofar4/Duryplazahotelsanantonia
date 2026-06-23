"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<{ lenis?: { raf: (t: number) => void; on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void } } | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Ensure triggers measure correctly after fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", onScroll);
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef as never}
      options={{
        autoRaf: false,
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      {children}
    </ReactLenis>
  );
}
