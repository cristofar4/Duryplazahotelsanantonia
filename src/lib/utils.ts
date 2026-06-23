import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build a sized Unsplash URL from a base photo id path. */
export function img(id: string, w = 1600, q = 80) {
  return `https://images.unsplash.com/${id}?q=${q}&w=${w}&auto=format&fit=crop`;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
