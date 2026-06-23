"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-[0.72rem] font-medium uppercase tracking-wider2 transition-all duration-500 ease-luxe disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-ivory hover:bg-stone-800 [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:translate-x-1",
        gold: "bg-champagne text-ink-950 hover:bg-champagne-light hover:[&_svg]:translate-x-1 [&_svg]:transition-transform [&_svg]:duration-500",
        outline:
          "border border-current bg-transparent hover:bg-ink hover:text-ivory",
        ghost: "bg-transparent hover:text-champagne-dark",
        light:
          "bg-ivory text-ink hover:bg-white",
        glass:
          "glass text-ivory hover:border-champagne/40",
      },
      size: {
        sm: "h-10 px-5",
        default: "h-12 px-7",
        lg: "h-14 px-9",
        xl: "h-16 px-12 text-[0.78rem]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
