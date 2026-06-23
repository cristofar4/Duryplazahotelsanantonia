import type { Metadata } from "next";
import { VENUES_EVENTS, IMAGES } from "@/lib/data";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import RevealImage from "@/components/anim/RevealImage";
import Reveal from "@/components/anim/Reveal";
import Media from "@/components/anim/Media";
import InquiryForm from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: "Meetings & Events",
  description:
    "Host weddings, galas, and corporate events in the restored Grand Banking Hall and riverside venues of the Drury Plaza Hotel San Antonio Riverwalk.",
};

export default function MeetingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gather"
        title="Meetings & Events"
        description="From boardroom to ballroom, host your most memorable moments inside a restored 1929 landmark."
        image={IMAGES.ballroom}
      />

      {/* Intro / corporate */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Corporate"
              title="Where business meets occasion"
              description="Soaring ceilings, restored marble, and state-of-the-art technology create a backdrop that elevates every gathering — from intimate executive sessions to conferences of four hundred."
            />
            <Reveal delay={0.2} className="mt-10 grid grid-cols-3 gap-6">
              {[
                ["10,000", "Sq ft of space"],
                ["400", "Max capacity"],
                ["6", "Flexible venues"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-serif text-4xl text-ink">{v}</p>
                  <p className="mt-1 font-sans text-xs text-stone-500">{l}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <RevealImage
            id={IMAGES.meeting}
            alt="Corporate meeting space"
            className="aspect-[4/3]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Venue gallery */}
      <section className="bg-ink-950 py-24 text-ivory md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The Venues"
            title="Spaces with stature"
            light
            className="mb-16"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {VENUES_EVENTS.map((venue, i) => (
              <Reveal key={venue.name} delay={i * 0.08} className="group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Media
                    id={venue.image}
                    alt={venue.name}
                    className="absolute inset-0 transition-transform duration-[1400ms] ease-luxe group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <div className="flex items-center gap-3 font-sans text-[0.6rem] uppercase tracking-wider2 text-champagne-light">
                      <span>{venue.capacity}</span>
                      <span className="h-3 w-px bg-champagne/40" />
                      <span>{venue.sqft}</span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl">{venue.name}</h3>
                    <div className="grid grid-rows-[0fr] transition-all duration-700 ease-luxe group-hover:grid-rows-[1fr]">
                      <p className="overflow-hidden font-sans text-sm leading-relaxed text-ivory/70">
                        <span className="mt-3 block">{venue.description}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Weddings */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <RevealImage
            id={IMAGES.wedding}
            alt="A wedding in the Grand Banking Hall"
            className="aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div>
            <SectionHeading
              eyebrow="Weddings"
              title="Say 'I do' beneath bronze chandeliers"
              description="Our Grand Banking Hall is the most storied wedding address in San Antonio — restored ceilings, original marble, and the soft glow of the River Walk just beyond the windows. Our dedicated planners orchestrate every detail."
            />
            <Reveal delay={0.2} className="mt-10 space-y-3">
              {[
                "Dedicated wedding planner",
                "Bespoke culinary menus",
                "Curated floral & lighting partners",
                "Suite for the couple, on us",
              ].map((item) => (
                <p
                  key={item}
                  className="border-b border-stone-200 pb-3 font-sans text-sm text-ink/80"
                >
                  {item}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="bg-ivory-dark py-24 md:py-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Enquire"
              title="Let's plan something memorable"
              description="Share a few details and our events team will craft a proposal tailored to your occasion."
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <InquiryForm variant="event" />
          </div>
        </div>
      </section>
    </>
  );
}
