import type { Metadata } from "next";
import { IMAGES } from "@/lib/data";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import GalleryMasonry from "@/components/sections/gallery/GalleryMasonry";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual journey through the Drury Plaza Hotel San Antonio Riverwalk — architecture, rooms, dining, and the River Walk beyond.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Visual Journey"
        title="Gallery"
        description="Step inside the landmark — its architecture, its rooms, its table, and the river that runs beside it."
        image={IMAGES.facade}
      />

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Explore"
            title="Moments, framed"
            align="center"
            className="mb-12"
          />
          <GalleryMasonry />
        </div>
      </section>
    </>
  );
}
