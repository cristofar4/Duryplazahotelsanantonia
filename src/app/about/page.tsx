import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IMAGES, HOTEL } from "@/lib/data";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import VerticalTimeline from "@/components/sections/about/VerticalTimeline";
import RevealImage from "@/components/anim/RevealImage";
import Reveal from "@/components/anim/Reveal";
import TextReveal from "@/components/anim/TextReveal";
import Counter from "@/components/anim/Counter";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Hotel",
  description:
    "The story of the Drury Plaza Hotel San Antonio Riverwalk — a 1929 Beaux-Arts landmark, the former Alamo National Bank Building, reborn on the River Walk.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="The Hotel"
        description="A 1929 Beaux-Arts landmark on the San Antonio River Walk — history you can stay inside of."
        image={IMAGES.facade}
      />

      {/* Opening statement */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="container-luxe">
          <TextReveal
            text="For nearly a century, this building has watched over the river."
            as="h2"
            className="mx-auto max-w-4xl text-center font-serif text-display leading-[1.06] text-ink"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-2xl text-center font-sans text-lg leading-relaxed text-stone-500">
              When the {HOTEL.building} opened its bronze doors in {HOTEL.established},
              it rose {HOTEL.floors} storeys above San Antonio — the tallest building
              in the city and a symbol of its ambition. Today, those same walls
              welcome travellers from around the world, their heritage lovingly
              preserved and their comfort entirely reimagined.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Heritage feature */}
      <section className="bg-ink-950 py-24 text-ivory md:py-32">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <RevealImage
            id={IMAGES.lobby}
            alt="The restored banking hall"
            className="aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div>
            <SectionHeading
              eyebrow="The Architecture"
              title="Preserved, not frozen"
              description="Our restoration honoured the original plasterwork, the soaring banking hall, the bronze detailing, and the great arched windows — while weaving in the quiet technology and comfort the modern traveller expects."
              light
            />
            <Reveal delay={0.2} className="mt-12 grid grid-cols-3 gap-8 border-t border-ivory/10 pt-10">
              {[
                { v: 1929, s: "", l: "Established" },
                { v: 24, s: "", l: "Storeys" },
                { v: 366, s: "", l: "Rooms" },
              ].map((stat) => (
                <div key={stat.l}>
                  <div className="font-serif text-4xl text-champagne md:text-5xl">
                    <Counter value={stat.v} suffix={stat.s} />
                  </div>
                  <p className="mt-2 font-sans text-xs uppercase tracking-wider2 text-ivory/40">
                    {stat.l}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="A Living Past"
            title="The story, chapter by chapter"
            align="center"
            className="mb-20"
          />
          <VerticalTimeline />
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-ivory-dark py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our Philosophy"
            title="Travel happy, stay grand"
            className="mb-16"
          />
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                t: "Genuine Generosity",
                d: "From the complimentary hot breakfast to the nightly Kickback, we believe the finest luxuries are the ones freely given.",
              },
              {
                t: "Reverence for Place",
                d: "We are custodians of a landmark. Every decision honours the building's history and the city that surrounds it.",
              },
              {
                t: "Effortless Comfort",
                d: "True hospitality anticipates. We tend to the details so your stay unfolds with grace and ease.",
              },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <span className="font-serif text-5xl text-champagne/40">0{i + 1}</span>
                <h3 className="mt-4 font-serif text-2xl text-ink">{p.t}</h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-stone-500">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink-950 py-24 text-center text-ivory md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Stay With Us"
            title="Become part of the story"
            align="center"
            light
            className="mb-10"
          />
          <Button asChild variant="gold" size="xl">
            <Link href="/booking">
              Reserve Your Stay <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
