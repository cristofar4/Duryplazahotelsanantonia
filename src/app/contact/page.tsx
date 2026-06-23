import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { HOTEL, IMAGES, FAQS } from "@/lib/data";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import InquiryForm from "@/components/forms/InquiryForm";
import Reveal from "@/components/anim/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Drury Plaza Hotel San Antonio Riverwalk. Find us at 105 S St Mary's St, directly on the River Walk in downtown San Antonio.",
};

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${HOTEL.address}, ${HOTEL.city}, ${HOTEL.state} ${HOTEL.zip}`,
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export default function ContactPage() {
  const cards = [
    {
      icon: MapPin,
      label: "Address",
      value: `${HOTEL.address}, ${HOTEL.city}, ${HOTEL.state} ${HOTEL.zip}`,
      href: `https://maps.google.com/?q=${HOTEL.address} ${HOTEL.city}`,
    },
    { icon: Phone, label: "Reservations", value: HOTEL.phone, href: `tel:${HOTEL.phone.replace(/[^0-9]/g, "")}` },
    { icon: Mail, label: "Email", value: HOTEL.email, href: `mailto:${HOTEL.email}` },
    { icon: Clock, label: "Front Desk", value: "Open 24 hours", href: undefined },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact"
        description="However you wish to reach us, we are delighted to help plan your stay."
        image={IMAGES.lobby}
      />

      {/* Info + form */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Reach Us"
              title="We're here, around the clock"
            />
            <div className="mt-10 space-y-6">
              {cards.map((c) => {
                const inner = (
                  <div className="flex items-start gap-4 border-b border-stone-200 pb-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-champagne">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-sans text-[0.62rem] uppercase tracking-wider2 text-stone-400">
                        {c.label}
                      </p>
                      <p className="mt-1 font-serif text-xl text-ink">{c.value}</p>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={c.label}>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noreferrer" className="block transition-opacity hover:opacity-70">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-stone-200 bg-card p-8 md:p-10">
              <h3 className="mb-8 font-serif text-3xl text-ink">Send us a message</h3>
              <InquiryForm variant="contact" />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-ivory-dark">
        <Reveal className="relative h-[420px] w-full md:h-[520px]">
          <iframe
            title="Map to Drury Plaza Hotel San Antonio Riverwalk"
            src={mapSrc}
            className="h-full w-full grayscale-[0.2]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Good to Know"
              title="Frequently asked"
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion type="single" collapsible defaultValue="item-0">
              {FAQS.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
