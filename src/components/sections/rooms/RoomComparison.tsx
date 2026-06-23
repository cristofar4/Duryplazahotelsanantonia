import Link from "next/link";
import { ROOMS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Media from "@/components/anim/Media";

const ROWS: { label: string; get: (r: (typeof ROOMS)[number]) => string }[] = [
  { label: "Size", get: (r) => r.size },
  { label: "Sleeps", get: (r) => `${r.occupancy} guests` },
  { label: "Bedding", get: (r) => r.bed },
  { label: "View", get: (r) => r.view },
  { label: "From", get: (r) => `${formatCurrency(r.price)} / night` },
];

export default function RoomComparison() {
  return (
    <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
      <table className="w-full min-w-[760px] border-collapse">
        <thead>
          <tr>
            <th className="w-40 align-bottom" />
            {ROOMS.map((room) => (
              <th key={room.slug} className="p-3 text-left align-bottom">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden">
                  <Media id={room.image} alt={room.name} sizes="20vw" className="absolute inset-0" />
                </div>
                <p className="font-sans text-[0.6rem] uppercase tracking-wider2 text-champagne-dark">
                  {room.category}
                </p>
                <p className="mt-1 font-serif text-lg leading-tight text-ink">{room.name}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-t border-stone-200">
              <td className="py-4 font-sans text-[0.62rem] uppercase tracking-wider2 text-stone-400">
                {row.label}
              </td>
              {ROOMS.map((room) => (
                <td key={room.slug} className="px-3 py-4 font-sans text-sm text-ink/80">
                  {row.get(room)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-stone-200">
            <td />
            {ROOMS.map((room) => (
              <td key={room.slug} className="px-3 pt-5">
                <Link
                  href="/booking"
                  className="link-underline font-sans text-[0.68rem] uppercase tracking-wider2 text-ink"
                >
                  Reserve
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
