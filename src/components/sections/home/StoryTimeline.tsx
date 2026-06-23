"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE, IMAGES } from "@/lib/data";
import { img } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PANEL_IMAGES = [
  IMAGES.facade,
  IMAGES.lobby,
  IMAGES.riverwalkNight,
  IMAGES.poolRooftop,
];

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const getScroll = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Parallax each panel image as it crosses
      const imgs = gsap.utils.toArray<HTMLElement>(".story-img");
      imgs.forEach((image) => {
        gsap.fromTo(
          image,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: image.closest(".story-panel"),
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative overflow-hidden bg-ink-950 text-ivory"
    >
      {/* Heading row (visible above the horizontal track on desktop, stacked on mobile) */}
      <div className="container-luxe pt-24 lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:z-20 lg:pt-28">
        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-champagne" />
          <span className="eyebrow text-champagne-light">Our Story · 1929 — Today</span>
        </div>
        <h2 className="mt-5 max-w-2xl font-serif text-display">
          A landmark with a <span className="italic text-gold-gradient">living</span> past
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex flex-col gap-16 px-6 py-20 lg:h-[100svh] lg:flex-row lg:flex-nowrap lg:items-center lg:gap-0 lg:px-0 lg:py-0 lg:pl-[8vw]"
      >
        {TIMELINE.map((item, i) => (
          <article
            key={item.year}
            className="story-panel relative flex shrink-0 flex-col gap-8 lg:h-[100svh] lg:w-[78vw] lg:flex-row lg:items-center lg:gap-16 lg:pr-[8vw]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden lg:h-[62vh] lg:w-[44%]">
              <div
                className="story-img absolute inset-0 scale-125 bg-cover bg-center"
                style={{ backgroundImage: `url(${img(PANEL_IMAGES[i] ?? IMAGES.facade, 1400)})` }}
              />
              <div className="absolute inset-0 bg-ink-950/20" />
              <span className="absolute left-6 top-6 font-serif text-7xl text-ivory/90 md:text-8xl">
                {item.year}
              </span>
            </div>
            <div className="lg:w-[44%]">
              <span className="eyebrow text-champagne">Chapter 0{i + 1}</span>
              <h3 className="mt-4 font-serif text-4xl md:text-5xl">{item.title}</h3>
              <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ivory/60">
                {item.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
