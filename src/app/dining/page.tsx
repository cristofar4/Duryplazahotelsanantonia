import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { VENUES, MENU_HIGHLIGHTS, IMAGES } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import RevealImage from "@/components/anim/RevealImage";
import Reveal from "@/components/anim/Reveal";
import Media from "@/components/anim/Media";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Three distinct dining venues at the Drury Plaza Hotel San Antonio Riverwalk — live-fire Texan cuisine at The Vault, a river-level terrace, and a jewel-box cocktail bar.",
};

const FOOD_GALLERY = [IMAGES.dish1, IMAGES.dish2, IMAGES.dish3, IMAGES.dish4, IMAGES.wine, IMAGES.cocktail];

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Taste"
        title="Dining"
        description="From a vault-set fine-dining room to a sun-washed river terrace, every table tells a Texan story."
        image={IMAGES.dining1}
      />

      {/* Venues */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our Venues"
            title="Three tables, one landmark"
            description="Each venue draws on the bounty of the region and the soul of the building it inhabits."
            className="mb-20"
          />

          <div className="space-y-24 md:space-y-32">
            {VENUES.map((venue, i) => (
              <div
                key={venue.slug}
                className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <RevealImage
                    id={venue.image}
                    alt={venue.name}
                    className="aspect-[5/4]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="font-serif text-6xl text-stone-200">0{i + 1}</span>
                  <Reveal>
                    <p className="eyebrow mt-2 text-champagne-dark">{venue.cuisine}</p>
                    <h3 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
                      {venue.name}
                    </h3>
                    <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-stone-500">
                      {venue.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 font-sans text-sm text-ink/70">
                      <Clock className="h-4 w-4 text-champagne-dark" /> {venue.hours}
                    </div>
                    <Button asChild variant="outline" size="default" className="mt-8 text-ink">
                      <Link href="/contact">
                        Reserve a Table <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu highlights */}
      <section className="bg-ink-950 py-24 text-ivory md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="From The Vault"
            title="Signature plates"
            description="A glimpse of the seasonal menu, fired over Texas mesquite and oak."
            light
            className="mb-16"
          />
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {MENU_HIGHLIGHTS.map((dish, i) => (
              <Reveal
                key={dish.name}
                delay={(i % 2) * 0.08}
                className="group flex items-center gap-6"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-sm">
                  <Media
                    id={dish.image}
                    alt={dish.name}
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    sizes="120px"
                  />
                </div>
                <div className="flex-1 border-b border-ivory/10 pb-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl">{dish.name}</h3>
                    <span className="font-serif text-xl text-champagne">
                      {formatCurrency(dish.price)}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-xs uppercase tracking-wider2 text-ivory/45">
                    {dish.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Food gallery */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The Gallery"
            title="A feast for the eyes"
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {FOOD_GALLERY.map((id, i) => (
              <Reveal key={id} delay={(i % 6) * 0.05}>
                <Media
                  id={id}
                  alt="Culinary detail"
                  className="aspect-[3/4] w-full transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-28 text-center text-ivory md:py-36">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(https://images.unsplash.com/${IMAGES.cocktail}?q=70&w=1800&auto=format&fit=crop)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-ink-950/60" />
        <div className="container-luxe relative">
          <SectionHeading
            eyebrow="Reservations"
            title="Join us at the table"
            align="center"
            light
            className="mb-10"
          />
          <Button asChild variant="gold" size="xl">
            <Link href="/contact">
              Make a Reservation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
