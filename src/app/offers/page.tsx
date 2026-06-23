import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, BadgePercent, CalendarHeart, Sparkles } from "lucide-react";
import { OFFERS, IMAGES } from "@/lib/data";
import { formatCurrency, img } from "@/lib/utils";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import OfferCard from "@/components/cards/OfferCard";
import Reveal from "@/components/anim/Reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Special Offers",
  description:
    "Curated packages and exclusive rates at the Drury Plaza Hotel San Antonio Riverwalk — from romantic suite escapes to extended-stay residences.",
};

export default function OffersPage() {
  const [featured, ...rest] = OFFERS;

  return (
    <>
      <PageHero
        eyebrow="Exclusive"
        title="Special Offers"
        description="Thoughtfully curated stays that pair our finest rates with unforgettable experiences."
        image={IMAGES.riverwalkNight}
      />

      {/* Featured */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe">
          <div className="group relative grid overflow-hidden bg-ink-950 text-ivory lg:grid-cols-2">
            <div className="relative min-h-[360px] overflow-hidden lg:min-h-[560px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1600ms] ease-luxe group-hover:scale-105"
                style={{ backgroundImage: `url(${img(featured.image, 1600)})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent lg:bg-gradient-to-r" />
              <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-champagne px-4 py-1.5 font-sans text-[0.6rem] uppercase tracking-wider2 text-ink-950">
                <Sparkles className="h-3 w-3" /> {featured.tag}
              </span>
            </div>

            <div className="flex flex-col justify-center p-10 lg:p-16">
              <span className="eyebrow text-champagne-light">Featured Package · {featured.nights}</span>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
                {featured.name}
              </h2>
              <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ivory/65">
                {featured.description}
              </p>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {featured.inclusions.map((inc) => (
                  <li key={inc} className="flex items-center gap-3 font-sans text-sm text-ivory/80">
                    <Check className="h-4 w-4 shrink-0 text-champagne" /> {inc}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-end gap-8">
                <div>
                  <p className="font-sans text-[0.62rem] uppercase tracking-wider2 text-ivory/40">
                    from
                  </p>
                  <p className="font-serif text-4xl">
                    {formatCurrency(featured.priceFrom)}
                    <span className="ml-1 text-sm text-ivory/50">/ night</span>
                  </p>
                </div>
                <Button asChild variant="gold" size="lg">
                  <Link href="/booking">
                    Book This Offer <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-ivory-dark py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="More Ways to Stay"
            title="Packages for every occasion"
            className="mb-16"
          />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((offer, i) => (
              <OfferCard key={offer.slug} offer={offer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee band */}
      <section className="bg-ink-950 py-24 text-ivory md:py-28">
        <div className="container-luxe grid gap-12 md:grid-cols-3">
          {[
            { icon: BadgePercent, t: "Best Rate, Guaranteed", d: "Book direct and we'll match any lower rate you find elsewhere." },
            { icon: CalendarHeart, t: "Flexible Cancellation", d: "Plans change. Most rates are fully refundable up to 48 hours prior." },
            { icon: Sparkles, t: "Member Privileges", d: "Earn rewards and unlock exclusive perks with every direct stay." },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.08} className="flex flex-col items-start gap-4">
              <b.icon className="h-8 w-8 text-champagne" />
              <h3 className="font-serif text-2xl">{b.t}</h3>
              <p className="font-sans text-sm leading-relaxed text-ivory/55">{b.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
