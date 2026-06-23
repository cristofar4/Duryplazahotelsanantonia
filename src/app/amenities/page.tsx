import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AMENITIES, IMAGES } from "@/lib/data";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import AmenityGrid from "@/components/sections/AmenityGrid";
import RevealImage from "@/components/anim/RevealImage";
import Reveal from "@/components/anim/Reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Amenities",
  description:
    "Rooftop pool, 24-hour fitness atelier, the nightly 5:30 Kickback, complimentary hot breakfast, and concierge services at the Drury Plaza Hotel San Antonio Riverwalk.",
};

export default function AmenitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Amenities"
        description="The signature comforts that define a Drury stay — most complimentary, all considered."
        image={IMAGES.pool}
      />

      {/* Pool feature */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <RevealImage
            id={IMAGES.pool}
            alt="The rooftop pool above downtown San Antonio"
            className="aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div>
            <SectionHeading
              eyebrow="Above The City"
              title="A rooftop suspended over San Antonio"
              description="Our glass-edged rooftop pool and warm whirlpool float above downtown — sun-washed by day, glittering above the river lights by night."
            />
            <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-6">
              {[
                ["Heated", "Year-round comfort"],
                ["24th Floor", "Skyline panorama"],
                ["Cabanas", "Reserve your perch"],
                ["Service", "Towels & refreshments"],
              ].map(([t, d]) => (
                <div key={t} className="border-l border-champagne/40 pl-4">
                  <p className="font-serif text-2xl text-ink">{t}</p>
                  <p className="font-sans text-xs text-stone-500">{d}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Full grid */}
      <section className="bg-ivory-dark py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Every Comfort"
            title="Thoughtful from dawn to dusk"
            className="mb-16"
          />
          <AmenityGrid amenities={AMENITIES} />
        </div>
      </section>

      {/* Inclusions band */}
      <section className="bg-ink-950 py-24 text-center text-ivory md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="On The House"
            title="Generosity as standard"
            align="center"
            light
            className="mb-14"
          />
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-10 md:grid-cols-4">
            {[
              ["Hot Breakfast", "Each morning"],
              ["5:30 Kickback™", "Every evening"],
              ["Free Wi-Fi", "Throughout"],
              ["Soda & Popcorn", "All day"],
            ].map(([t, d]) => (
              <Reveal key={t}>
                <p className="font-serif text-2xl text-champagne md:text-3xl">{t}</p>
                <p className="mt-2 font-sans text-xs uppercase tracking-wider2 text-ivory/40">
                  {d}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <Button asChild variant="gold" size="xl">
              <Link href="/booking">
                Plan Your Stay <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
