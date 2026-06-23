"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Maximize, Users, Eye, BedDouble } from "lucide-react";
import type { Room } from "@/lib/data";
import { formatCurrency, img } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/anim/Reveal";
import TextReveal from "@/components/anim/TextReveal";

export default function RoomDetailView({
  room,
  prev,
  next,
}: {
  room: Room;
  prev: Room;
  next: Room;
}) {
  const [active, setActive] = useState(0);

  return (
    <article className="bg-ivory">
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[620px] overflow-hidden bg-ink-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img(room.gallery[active], 2200)})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/40" />

        <div className="container-luxe relative flex h-full flex-col justify-end pb-12">
          <Link
            href="/rooms"
            className="mb-auto mt-28 inline-flex w-fit items-center gap-2 font-sans text-xs uppercase tracking-wider2 text-ivory/70 transition-colors hover:text-champagne"
          >
            <ArrowLeft className="h-4 w-4" /> All Rooms
          </Link>
          <span className="eyebrow text-champagne-light">{room.category} · {room.tagline}</span>
          <TextReveal
            text={room.name}
            as="h1"
            immediate
            className="mt-3 font-serif text-hero-sm text-ivory md:text-display"
          />

          {/* Thumbnails */}
          <div className="mt-8 flex gap-3">
            {room.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative h-16 w-24 overflow-hidden transition-all duration-500 ${
                  i === active ? "ring-2 ring-champagne" : "opacity-60 hover:opacity-100"
                }`}
              >
                <span
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${img(g, 400)})` }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-luxe grid gap-16 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="grid grid-cols-2 gap-y-6 border-y border-stone-200 py-8 sm:grid-cols-4">
              {[
                { icon: Maximize, label: room.size },
                { icon: Users, label: `${room.occupancy} guests` },
                { icon: BedDouble, label: room.bed },
                { icon: Eye, label: room.view },
              ].map((spec, i) => (
                <div key={i} className="flex flex-col items-start gap-2">
                  <spec.icon className="h-5 w-5 text-champagne-dark" />
                  <span className="font-sans text-sm text-ink/80">{spec.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 font-serif text-2xl leading-relaxed text-ink md:text-3xl">
              {room.description}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-12">
            <h3 className="eyebrow mb-6 text-champagne-dark">In This Room</h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {room.features.map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-stone-200 pb-3 font-sans text-sm text-ink/80">
                  <Check className="h-4 w-4 shrink-0 text-champagne-dark" /> {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Sticky booking */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 border border-stone-200 bg-card p-8">
            <p className="font-sans text-[0.62rem] uppercase tracking-wider2 text-stone-400">
              Rate from
            </p>
            <p className="mt-1 font-serif text-5xl text-ink">
              {formatCurrency(room.price)}
              <span className="ml-2 text-sm text-stone-400">/ night</span>
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-stone-500">
              Includes complimentary hot breakfast, the nightly 5:30 Kickback™,
              rooftop pool access, and free Wi-Fi.
            </p>
            <Button asChild variant="gold" size="lg" className="mt-8 w-full">
              <Link href="/booking">Reserve This Room</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="mt-3 w-full text-ink">
              <Link href="/contact">Enquire</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="border-t border-stone-200">
        <div className="grid md:grid-cols-2">
          <Link
            href={`/rooms/${prev.slug}`}
            className="group flex items-center justify-between gap-4 border-b border-stone-200 px-6 py-10 transition-colors hover:bg-ivory-dark md:border-b-0 md:border-r md:px-12"
          >
            <ArrowLeft className="h-5 w-5 text-champagne-dark transition-transform duration-500 group-hover:-translate-x-1" />
            <div className="text-right">
              <p className="font-sans text-[0.6rem] uppercase tracking-wider2 text-stone-400">Previous</p>
              <p className="font-serif text-2xl text-ink">{prev.name}</p>
            </div>
          </Link>
          <Link
            href={`/rooms/${next.slug}`}
            className="group flex items-center justify-between gap-4 px-6 py-10 transition-colors hover:bg-ivory-dark md:px-12"
          >
            <div>
              <p className="font-sans text-[0.6rem] uppercase tracking-wider2 text-stone-400">Next</p>
              <p className="font-serif text-2xl text-ink">{next.name}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-champagne-dark transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </article>
  );
}
