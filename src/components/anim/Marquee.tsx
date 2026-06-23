import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  separator?: string;
}

export default function Marquee({
  items,
  className,
  separator = "✦",
}: MarqueeProps) {
  const content = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div className="flex shrink-0 animate-marquee items-center whitespace-nowrap">
        {content.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-serif text-2xl md:text-4xl">{item}</span>
            <span className="text-champagne/70">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
