"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ROOMS } from "@/lib/data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoomCard from "@/components/cards/RoomCard";

const FILTERS = ["All", "Room", "Suite", "Signature"] as const;

export default function RoomShowcase() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const rooms =
    filter === "All" ? ROOMS : ROOMS.filter((r) => r.category === filter);

  return (
    <div>
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList className="justify-center">
          {FILTERS.map((f) => (
            <TabsTrigger key={f} value={f}>
              {f === "All" ? "All Stays" : `${f}s`}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <motion.div layout className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {rooms.map((room, i) => (
            <motion.div
              key={room.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <RoomCard room={room} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
