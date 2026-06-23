"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { NAV_LINKS, HOTEL } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TextReveal from "@/components/anim/TextReveal";
import Reveal from "@/components/anim/Reveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ivory">
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-champagne/10 blur-[120px]" />

      {/* CTA */}
      <div className="container-luxe relative border-b border-ivory/10 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="eyebrow text-champagne">Your stay awaits</span>
            <TextReveal
              text="Begin your River Walk story"
              as="h2"
              className="mt-5 max-w-2xl font-serif text-[2.6rem] leading-[1.02] md:text-6xl"
            />
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <Reveal>
              <p className="mb-6 max-w-md font-sans text-base leading-relaxed text-ivory/60 lg:ml-auto">
                Reserve directly for our finest rates, complimentary breakfast,
                and the nightly 5:30 Kickback™.
              </p>
              <Button asChild variant="gold" size="xl">
                <Link href="/booking">
                  Check Availability <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container-luxe relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-3xl">Drury Plaza</span>
            <span className="eyebrow mt-2 text-champagne">
              San Antonio · Riverwalk
            </span>
          </Link>
          <p className="mt-6 max-w-xs font-sans text-sm leading-relaxed text-ivory/55">
            {HOTEL.building}, est. {HOTEL.established}. A living landmark on the
            water's edge in the heart of downtown San Antonio.
          </p>
        </div>

        <div className="lg:col-span-2 lg:col-start-6">
          <h3 className="eyebrow mb-5 text-ivory/40">Explore</h3>
          <ul className="space-y-3">
            {NAV_LINKS.slice(0, 5).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link-underline font-sans text-sm text-ivory/70 transition-colors hover:text-champagne"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow mb-5 text-ivory/40">Discover</h3>
          <ul className="space-y-3">
            {NAV_LINKS.slice(5).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link-underline font-sans text-sm text-ivory/70 transition-colors hover:text-champagne"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/booking"
                className="link-underline font-sans text-sm text-ivory/70 transition-colors hover:text-champagne"
              >
                Booking
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow mb-5 text-ivory/40">Stay in touch</h3>
          <p className="mb-4 font-sans text-sm text-ivory/55">
            Receive curated offers and seasonal stories.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2"
          >
            <Input
              type="email"
              required
              placeholder="Email address"
              className="border-ivory/25 text-ivory placeholder:text-ivory/40 focus-visible:border-champagne"
            />
            <Button type="submit" variant="gold" size="icon" aria-label="Subscribe">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 space-y-3 text-sm text-ivory/60">
            <a
              href={`https://maps.google.com/?q=${HOTEL.address} ${HOTEL.city} ${HOTEL.state}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 transition-colors hover:text-champagne"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
              <span>
                {HOTEL.address}, {HOTEL.city}, {HOTEL.state} {HOTEL.zip}
              </span>
            </a>
            <a
              href={`tel:${HOTEL.phone.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-3 transition-colors hover:text-champagne"
            >
              <Phone className="h-4 w-4 shrink-0 text-champagne" />
              {HOTEL.phone}
            </a>
            <a
              href={`mailto:${HOTEL.email}`}
              className="flex items-center gap-3 transition-colors hover:text-champagne"
            >
              <Mail className="h-4 w-4 shrink-0 text-champagne" />
              {HOTEL.email}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="container-luxe relative flex flex-col items-center justify-between gap-4 border-t border-ivory/10 py-8 text-xs text-ivory/40 md:flex-row">
        <p>
          © {new Date().getFullYear()} {HOTEL.fullName}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="#" className="transition-colors hover:text-ivory">
            Privacy
          </Link>
          <Link href="#" className="transition-colors hover:text-ivory">
            Accessibility
          </Link>
          <Link href="#" className="transition-colors hover:text-ivory">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
