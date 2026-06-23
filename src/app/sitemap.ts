import type { MetadataRoute } from "next";
import { ROOMS } from "@/lib/data";

export const dynamic = "force-static";

const base = "https://drury-plaza-riverwalk.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/rooms",
    "/dining",
    "/amenities",
    "/meetings",
    "/gallery",
    "/offers",
    "/about",
    "/contact",
    "/booking",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const roomRoutes = ROOMS.map((room) => ({
    url: `${base}/rooms/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...roomRoutes];
}
