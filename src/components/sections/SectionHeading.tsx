import { cn } from "@/lib/utils";
import TextReveal from "@/components/anim/TextReveal";
import Reveal from "@/components/anim/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  titleClassName?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-champagne" />
            <span
              className={cn(
                "eyebrow",
                light ? "text-champagne-light" : "text-champagne-dark",
              )}
            >
              {eyebrow}
            </span>
          </div>
        </Reveal>
      )}
      <TextReveal
        text={title}
        as="h2"
        className={cn(
          "max-w-4xl font-serif text-display",
          light ? "text-ivory" : "text-ink",
          align === "center" && "mx-auto",
          titleClassName,
        )}
      />
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-6 max-w-xl font-sans text-base leading-relaxed md:text-lg",
              light ? "text-ivory/60" : "text-stone-500",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
