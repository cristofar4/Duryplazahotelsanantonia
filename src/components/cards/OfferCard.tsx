"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import type { Offer } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Media from "@/components/anim/Media";
import { Button } from "@/components/ui/button";

export default function OfferCard({ offer, index = 0 }: { offer: Offer; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden border border-stone-200 bg-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Media
          id={offer.image}
          alt={offer.name}
          className="absolute inset-0 transition-transform duration-[1400ms] ease-luxe group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
        <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-champagne px-3 py-1 font-sans text-[0.6rem] uppercase tracking-wider2 text-ink-950">
          {offer.tag}
        </span>
        <span className="absolute right-5 top-5 font-sans text-[0.62rem] uppercase tracking-wider2 text-ivory/80">
          {offer.nights}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-serif text-3xl text-ink">{offer.name}</h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-stone-500">
          {offer.description}
        </p>

        <ul className="mt-6 space-y-2.5">
          {offer.inclusions.map((inc) => (
            <li key={inc} className="flex items-center gap-3 font-sans text-sm text-ink/80">
              <Check className="h-4 w-4 shrink-0 text-champagne-dark" />
              {inc}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-end justify-between border-t border-stone-200 pt-6">
          <div>
            <p className="font-sans text-[0.62rem] uppercase tracking-wider2 text-stone-400">
              from
            </p>
            <p className="font-serif text-3xl text-ink">
              {formatCurrency(offer.priceFrom)}
              <span className="ml-1 text-xs text-stone-400">/ night</span>
            </p>
          </div>
          <Button asChild variant="primary" size="sm">
            <Link href="/booking">
              Reserve <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
