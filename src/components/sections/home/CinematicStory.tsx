"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { img } from "@/lib/utils";
import { IMAGES } from "@/lib/data";
import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Optional live footage. Drop an MP4 at /public/videos/story-tour.mp4 (a
 * smooth exterior→interior dolly shot) and it plays over the final stage.
 * Until then, the GSAP image fly-through carries the cinematic journey and
 * the interior still frame is shown.
 */
const STORY_VIDEO = "/videos/story-tour.mp4";

const STAGES = [
  {
    n: "01",
    place: "The Exterior",
    left: "A 1929",
    right: "Landmark",
    sub: "Twenty-four storeys of Beaux-Arts stone rising from the river's edge.",
    image: IMAGES.facade,
  },
  {
    n: "02",
    place: "The Threshold",
    left: "Step",
    right: "Inside",
    sub: "Bronze doors open onto a restored banking hall of marble and light.",
    image: IMAGES.lobby,
  },
  {
    n: "03",
    place: "The Interior",
    left: "Feel",
    right: "At Home",
    sub: "Above the city, a sanctuary of quiet luxury awaits your arrival.",
    image: IMAGES.suiteLiving,
  },
];

export default function CinematicStory() {
  const pinRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    const layers = layerRefs.current;
    const texts = textRefs.current;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Show a single, clean interior panel — no pinning or overlap.
      gsap.set(layers[2], { autoAlpha: 1, clipPath: "inset(0%)", scale: 1 });
      gsap.set([layers[0], layers[1]], { autoAlpha: 0 });
      gsap.set([texts[0], texts[1]], { autoAlpha: 0 });
      const last = texts[2];
      if (last) {
        gsap.set(last, { autoAlpha: 1 });
        gsap.set(Array.from(last.children), { xPercent: 0 });
      }
      gsap.set(pin.querySelector(".cinematic-cta"), { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(layers[0], { autoAlpha: 1, scale: 1 });
      gsap.set([layers[1], layers[2]], { autoAlpha: 0 });
      gsap.set(layers[1], { scale: 1.25 });
      gsap.set(layers[2], { clipPath: "inset(45% 45% 45% 45%)", scale: 1.3 });
      texts.forEach((t, i) => {
        if (!t) return;
        const [l, r] = Array.from(t.children) as HTMLElement[];
        gsap.set(t, { autoAlpha: 0 });
        gsap.set(l, { xPercent: -130 });
        gsap.set(r, { xPercent: 130 });
        if (i !== 0) gsap.set(t, { autoAlpha: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "+=320%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
        defaults: { ease: "power2.inOut" },
      });

      const collide = (i: number) => {
        const t = texts[i];
        if (!t) return;
        const [l, r] = Array.from(t.children) as HTMLElement[];
        tl.to(t, { autoAlpha: 1, duration: 0.3 }, "<")
          .to(l, { xPercent: 6, duration: 0.9 }, "<")
          .to(r, { xPercent: -6, duration: 0.9 }, "<");
      };
      const release = (i: number) => {
        const t = texts[i];
        if (!t) return;
        const [l, r] = Array.from(t.children) as HTMLElement[];
        tl.to(l, { xPercent: -40, duration: 0.7 })
          .to(r, { xPercent: 40, duration: 0.7 }, "<")
          .to(t, { autoAlpha: 0, duration: 0.4 }, "<");
      };

      // Stage 1 — exterior
      collide(0);
      tl.to(layers[0], { scale: 1.18, duration: 1.6 }, "<");
      release(0);

      // Stage 1 -> 2 : cross dissolve into the lobby with a push-in
      tl.to(layers[0], { autoAlpha: 0, duration: 0.9 })
        .to(layers[1], { autoAlpha: 1, scale: 1, duration: 1.2 }, "<");
      collide(1);
      tl.to(layers[1], { scale: 1.12, duration: 1.6 }, "<");
      release(1);

      // Stage 2 -> 3 : "walk through the door" clip-path reveal of the interior
      tl.to(layers[2], { clipPath: "inset(0% 0% 0% 0%)", scale: 1, autoAlpha: 1, duration: 1.4 })
        .to(layers[1], { autoAlpha: 0, duration: 0.8 }, "<0.3");
      collide(2);
      tl.to(layers[2], { scale: 1.08, duration: 1.6 }, "<");

      // Final CTA
      tl.to(".cinematic-cta", { autoAlpha: 1, y: 0, duration: 0.8 }, ">-0.2");
    }, pin);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" className="relative bg-ink-950 text-ivory">
      <div ref={pinRef} className="relative h-[100svh] w-full overflow-hidden">
        {/* Image / video layers */}
        {STAGES.map((stage, i) => (
          <div
            key={stage.n}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="absolute inset-0 will-change-transform"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img(stage.image, 2200)})` }}
            />
            {/* Live footage over the final (interior) stage */}
            {i === 2 && !videoFailed && (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={img(stage.image, 2000)}
                onError={() => setVideoFailed(true)}
              >
                <source src={STORY_VIDEO} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-ink-950/35" />
          </div>
        ))}

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_40%,transparent_45%,rgba(11,10,8,0.7)_100%)]" />

        {/* Section label */}
        <div className="absolute left-6 top-8 z-20 flex items-center gap-3 md:left-12 md:top-12">
          <span className="eyebrow text-champagne-light">The Journey Inside</span>
        </div>

        {/* Colliding text stages */}
        {STAGES.map((stage, i) => (
          <div
            key={stage.n}
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          >
            <span className="block font-serif text-[15vw] font-light uppercase leading-[0.85] tracking-tight text-ivory mix-blend-difference will-change-transform md:text-[12vw]">
              {stage.left}
            </span>
            <span className="-mt-[1.5vw] block font-serif text-[15vw] font-light uppercase italic leading-[0.85] tracking-tight text-champagne will-change-transform md:text-[12vw]">
              {stage.right}
            </span>
            <p className="mt-7 max-w-md font-sans text-sm leading-relaxed text-ivory/70">
              <span className="mr-2 font-mono text-[0.62rem] tracking-wider2 text-champagne/70">
                {stage.n}
              </span>
              {stage.sub}
            </p>
          </div>
        ))}

        {/* Final CTA */}
        <div className="cinematic-cta absolute inset-x-0 bottom-24 z-30 flex translate-y-6 flex-col items-center px-6 opacity-0">
          <Button asChild variant="gold" size="lg">
            <Link href="/rooms">
              Explore the Rooms <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Progress + stage markers */}
        <div className="absolute inset-x-6 bottom-10 z-20 flex items-center gap-4 md:inset-x-12">
          <span className="font-sans text-[0.6rem] uppercase tracking-wider2 text-ivory/40">
            Exterior
          </span>
          <span className="relative h-px flex-1 overflow-hidden bg-ivory/15">
            <span
              ref={progressRef}
              className="absolute inset-0 origin-left scale-x-0 bg-champagne"
            />
          </span>
          <span className="font-sans text-[0.6rem] uppercase tracking-wider2 text-ivory/40">
            Interior
          </span>
        </div>
      </div>
    </section>
  );
}
