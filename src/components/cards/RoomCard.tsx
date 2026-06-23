"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Maximize, Eye, Users } from "lucide-react";
import type { Room } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Media from "@/components/anim/Media";

export default function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      <Link href={`/rooms/${room.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
          <Media
            id={room.image}
            alt={room.name}
            className="absolute inset-0 transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-80" />
          <div className="absolute left-5 top-5">
            <span className="inline-flex items-center rounded-full border border-ivory/30 bg-ink-950/30 px-3 py-1 font-sans text-[0.6rem] uppercase tracking-wider2 text-ivory backdrop-blur">
              {room.category}
            </span>
          </div>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-ivory">
            <div>
              <p className="font-sans text-[0.62rem] uppercase tracking-wider2 text-ivory/70">
                from
              </p>
              <p className="font-serif text-2xl">
                {formatCurrency(room.price)}
                <span className="ml-1 text-xs text-ivory/60">/ night</span>
              </p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/40 transition-all duration-500 group-hover:border-champagne group-hover:bg-champagne group-hover:text-ink-950">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-5">
        <p className="eyebrow text-champagne-dark">{room.tagline}</p>
        <h3 className="mt-2 font-serif text-2xl text-ink">{room.name}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 font-sans text-xs text-stone-500">
          <span className="flex items-center gap-1.5">
            <Maximize className="h-3.5 w-3.5 text-champagne-dark" /> {room.size}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-champagne-dark" /> {room.occupancy} guests
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5 text-champagne-dark" /> {room.view}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
