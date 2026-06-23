import { STATS } from "@/lib/data";
import Counter from "@/components/anim/Counter";
import Reveal from "@/components/anim/Reveal";

export default function StatsBand() {
  return (
    <section className="border-y border-stone-200 bg-ivory-dark">
      <div className="container-luxe grid grid-cols-2 gap-y-12 py-16 md:grid-cols-4 md:py-20">
        {STATS.map((stat) => (
          <Reveal key={stat.label} className="text-center">
            <div className="flex items-end justify-center font-serif text-5xl text-ink md:text-6xl">
              <Counter
                value={stat.value}
                decimals={(stat as { decimals?: number }).decimals ?? 0}
                suffix={stat.suffix}
              />
            </div>
            <p className="mt-3 font-sans text-[0.68rem] uppercase tracking-wider2 text-stone-500">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
