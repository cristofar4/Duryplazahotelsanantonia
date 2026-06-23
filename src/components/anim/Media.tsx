import Image from "next/image";
import { cn, img } from "@/lib/utils";

interface MediaProps {
  id: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  /** subtle slow zoom while in view */
  kenburns?: boolean;
}

/** A framed, object-cover next/image using the centralised Unsplash id helper. */
export default function Media({
  id,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  width = 1600,
  kenburns = false,
}: MediaProps) {
  return (
    <div className={cn("relative overflow-hidden bg-stone-200", className)}>
      <Image
        src={img(id, width)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover",
          kenburns && "animate-kenburns",
          imgClassName,
        )}
      />
    </div>
  );
}
