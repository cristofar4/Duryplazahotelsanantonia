import Link from "next/link";
import { img } from "@/lib/utils";
import { IMAGES as IMG } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink-950 text-center text-ivory">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${img(IMG.facade, 1800)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-ink-950/60" />
      <div className="container-luxe relative">
        <span className="eyebrow text-champagne">Lost on the river</span>
        <h1 className="mt-6 font-serif text-[6rem] leading-none md:text-[10rem]">404</h1>
        <p className="mx-auto mt-4 max-w-md font-sans text-base text-ivory/60">
          The page you're looking for has drifted downstream. Let us guide you
          back to the landmark.
        </p>
        <Button asChild variant="gold" size="lg" className="mt-10">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </section>
  );
}
