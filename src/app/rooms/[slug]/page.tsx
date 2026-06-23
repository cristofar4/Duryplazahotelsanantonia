import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROOMS } from "@/lib/data";
import RoomDetailView from "@/components/sections/rooms/RoomDetailView";

export function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  if (!room) return { title: "Room Not Found" };
  return {
    title: room.name,
    description: room.description,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = ROOMS.findIndex((r) => r.slug === slug);
  if (index === -1) notFound();

  const room = ROOMS[index];
  const prev = ROOMS[(index - 1 + ROOMS.length) % ROOMS.length];
  const next = ROOMS[(index + 1) % ROOMS.length];

  return <RoomDetailView room={room} prev={prev} next={next} />;
}
