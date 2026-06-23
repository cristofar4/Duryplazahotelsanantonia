import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IMAGES } from "@/lib/data";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import RoomShowcase from "@/components/sections/rooms/RoomShowcase";
import RoomComparison from "@/components/sections/rooms/RoomComparison";
import Reveal from "@/components/anim/Reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Discover refined rooms and suites at the Drury Plaza Hotel San Antonio Riverwalk — from light-filled deluxe kings to the signature 1929 Presidential residence.",
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay"
        title="Rooms & Suites"
        description="Six expressions of comfort within a 1929 landmark — each composed with quiet luxury, natural light, and the warmth of true hospitality."
        image={IMAGES.roomSuite}
      />

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The Collection"
            title="Find the space that suits your stay"
            description="Filter by category to explore our rooms, suites, and signature residence."
            align="center"
            className="mb-14"
          />
          <RoomShowcase />
        </div>
      </section>

      <section className="bg-ivory-dark py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Compare"
            title="A side-by-side view"
            description="Every detail, laid out plainly — so you can choose with confidence."
            className="mb-14"
          />
          <Reveal>
            <RoomComparison />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-950 py-24 text-center text-ivory md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Every Stay Includes"
            title="More than a room"
            align="center"
            light
            className="mb-12"
          />
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-y-8 md:grid-cols-4">
            {["Hot Breakfast", "5:30 Kickback™", "Rooftop Pool", "Free Wi-Fi"].map(
              (item) => (
                <Reveal key={item}>
                  <p className="font-serif text-xl text-champagne">{item}</p>
                  <p className="mt-1 font-sans text-xs text-ivory/40">Complimentary</p>
                </Reveal>
              ),
            )}
          </div>
          <Reveal className="mt-14">
            <Button asChild variant="gold" size="xl">
              <Link href="/booking">
                Check Availability <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
