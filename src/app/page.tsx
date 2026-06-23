import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ROOMS, AMENITIES, OFFERS, VENUES, MENU_HIGHLIGHTS, IMAGES } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

import Hero from "@/components/sections/home/Hero";
import StatsBand from "@/components/sections/home/StatsBand";
import StoryTimeline from "@/components/sections/home/StoryTimeline";
import RiverwalkExperience from "@/components/sections/home/RiverwalkExperience";
import AmenityGrid from "@/components/sections/AmenityGrid";
import Testimonials from "@/components/sections/Testimonials";
import SectionHeading from "@/components/sections/SectionHeading";
import RoomCard from "@/components/cards/RoomCard";
import OfferCard from "@/components/cards/OfferCard";
import RevealImage from "@/components/anim/RevealImage";
import Reveal from "@/components/anim/Reveal";
import TextReveal from "@/components/anim/TextReveal";
import Marquee from "@/components/anim/Marquee";
import Media from "@/components/anim/Media";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Brand intro */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 lg:pr-10">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-12 bg-champagne" />
                <span className="eyebrow text-champagne-dark">A Landmark Welcome</span>
              </div>
            </Reveal>
            <TextReveal
              text="A grand 1929 building, reborn as your home on the river."
              as="h2"
              className="font-serif text-display leading-[1.04] text-ink"
            />
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl font-sans text-lg leading-relaxed text-stone-500">
                Within the storied walls of the Alamo National Bank Building,
                soaring ceilings and restored marble meet contemporary comfort.
                Every stay is enriched by genuine Texan generosity — a warm
                breakfast each morning, the beloved 5:30 Kickback each evening,
                and a rooftop pool suspended above the city lights.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-6">
              <Button asChild variant="primary" size="lg">
                <Link href="/about">
                  Our Story <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Link
                href="/rooms"
                className="link-underline font-sans text-sm uppercase tracking-wider2 text-ink"
              >
                Explore Rooms
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-5">
              <RevealImage
                id={IMAGES.lobby}
                alt="The restored banking hall lobby"
                className="aspect-[3/4]"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <RevealImage
                id={IMAGES.roomKing}
                alt="A refined guest room"
                className="mt-12 aspect-[3/4]"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        <div className="mt-24 border-y border-stone-200 py-8 text-stone-300">
          <Marquee
            items={[
              "Rooftop Pool",
              "The 5:30 Kickback",
              "Hot Breakfast",
              "River Walk Views",
              "Historic 1929 Landmark",
              "Steps to The Alamo",
            ]}
          />
        </div>
      </section>

      <StatsBand />
      <StoryTimeline />
      <RiverwalkExperience />

      {/* Rooms preview */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="container-luxe">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Stay"
              title="Rooms & suites, beautifully composed"
              description="From light-filled deluxe rooms to our signature 24th-floor residence, each space is a quiet study in comfort."
            />
            <Reveal>
              <Button asChild variant="outline" size="lg" className="text-ink">
                <Link href="/rooms">
                  View All Rooms <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ROOMS.slice(0, 3).map((room, i) => (
              <RoomCard key={room.slug} room={room} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-ivory-dark py-24 md:py-36">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Amenities"
            title="Generosity, woven into every stay"
            description="The signature comforts that make a Drury stay unmistakable — most of them complimentary, all of them considered."
            className="mb-16"
          />
          <AmenityGrid amenities={AMENITIES.slice(0, 5)} />
        </div>
      </section>

      {/* Dining preview */}
      <section className="bg-ink-950 py-24 text-ivory md:py-36">
        <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="relative">
              <RevealImage
                id={VENUES[0].image}
                alt={VENUES[0].name}
                className="aspect-[16/11]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute -bottom-8 -right-4 hidden w-64 border border-champagne/30 bg-ink-950 p-6 lg:block">
                <p className="eyebrow text-champagne">Now Serving</p>
                <p className="mt-2 font-serif text-2xl">{VENUES[0].name}</p>
                <p className="mt-1 font-sans text-xs text-ivory/50">{VENUES[0].hours}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Dining"
              title="Live-fire flavour, Texan soul"
              description="Three distinct venues, from a vault-set fine-dining room to a river-level terrace, each celebrating the bounty of the region."
              light
            />
            <div className="mt-10 space-y-4">
              {MENU_HIGHLIGHTS.slice(0, 3).map((dish, i) => (
                <Reveal
                  key={dish.name}
                  delay={i * 0.06}
                  className="flex items-center justify-between gap-6 border-b border-ivory/10 pb-4"
                >
                  <div>
                    <p className="font-serif text-xl">{dish.name}</p>
                    <p className="font-sans text-xs uppercase tracking-wider2 text-ivory/45">
                      {dish.note}
                    </p>
                  </div>
                  <span className="font-serif text-xl text-champagne">
                    {formatCurrency(dish.price)}
                  </span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-10">
              <Button asChild variant="gold" size="lg">
                <Link href="/dining">
                  Explore Dining <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Offers preview */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="container-luxe">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Special Offers"
              title="Curated stays, exceptional value"
            />
            <Reveal>
              <Button asChild variant="outline" size="lg" className="text-ink">
                <Link href="/offers">
                  All Offers <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {OFFERS.slice(0, 2).map((offer, i) => (
              <OfferCard key={offer.slug} offer={offer} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Location teaser */}
      <section className="relative overflow-hidden bg-ivory py-24 md:py-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Find Us"
              title="In the heart of downtown San Antonio"
              description="105 S St Mary's Street — directly on the River Walk, moments from the Alamo, the Convention Center, and the Shops at Rivercenter."
            />
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="primary" size="lg">
                <Link href="/contact">
                  Directions & Contact <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <Reveal>
            <Media
              id={IMAGES.skyline}
              alt="San Antonio skyline"
              className="aspect-[4/3] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
