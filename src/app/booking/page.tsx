import type { Metadata } from "next";
import { Suspense } from "react";
import { IMAGES } from "@/lib/data";
import { img } from "@/lib/utils";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    "Reserve your stay at the Drury Plaza Hotel San Antonio Riverwalk. Select your dates, choose your room, and confirm in moments.",
};

export default function BookingPage() {
  return (
    <>
      {/* Compact header */}
      <section className="relative flex h-[44vh] min-h-[340px] items-end overflow-hidden bg-ink-950">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img(IMAGES.heroNight, 2000)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/50" />
        <div className="container-luxe relative pb-12">
          <div className="mb-4">
            <span className="eyebrow text-champagne-light">Reservations</span>
          </div>
          <h1 className="font-serif text-hero-sm text-ivory">Book your stay</h1>
        </div>
      </section>

      <div className="bg-ivory">
        <Suspense
          fallback={
            <div className="container-luxe py-32 text-center font-sans text-sm text-stone-400">
              Loading availability…
            </div>
          }
        >
          <BookingFlow />
        </Suspense>
      </div>
    </>
  );
}
