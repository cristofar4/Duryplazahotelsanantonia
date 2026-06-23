import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-champagne/40 bg-champagne/10 px-3 py-1 font-sans text-[0.62rem] font-medium uppercase tracking-wider2 text-champagne-dark",
        className,
      )}
      {...props}
    />
  );
}
