"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (n: number) =>
      `${prefix}${n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = format(value);
      return;
    }

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 2.2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(obj.val);
        },
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    }, el);
    return () => ctx.revert();
  }, [value, decimals, suffix, prefix]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
