"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Users, BedDouble, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingWidgetProps {
  variant?: "glass" | "solid";
  className?: string;
}

function todayISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

export default function BookingWidget({
  variant = "glass",
  className,
}: BookingWidgetProps) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(todayISO(1));
  const [checkOut, setCheckOut] = useState(todayISO(3));
  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");

  const submit = () => {
    const params = new URLSearchParams({ checkIn, checkOut, guests, rooms });
    router.push(`/booking?${params.toString()}`);
  };

  const glass = variant === "glass";
  const labelCls = cn(
    "eyebrow flex items-center gap-2",
    glass ? "text-ivory/60" : "text-stone-400",
  );
  const fieldCls = cn(
    "bg-transparent font-sans text-sm outline-none",
    glass ? "text-ivory [color-scheme:dark]" : "text-ink",
  );

  return (
    <div
      className={cn(
        "w-full",
        glass ? "glass p-2 text-ivory" : "border border-stone-200 bg-ivory p-2",
        className,
      )}
    >
      <div className="grid grid-cols-2 items-stretch gap-px lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <Field className={glass ? "lg:border-r lg:border-ivory/10" : "lg:border-r lg:border-stone-200"}>
          <label className={labelCls}>
            <CalendarDays className="h-3.5 w-3.5 text-champagne" /> Arrival
          </label>
          <input
            type="date"
            value={checkIn}
            min={todayISO()}
            onChange={(e) => setCheckIn(e.target.value)}
            className={fieldCls}
          />
        </Field>

        <Field className={glass ? "lg:border-r lg:border-ivory/10" : "lg:border-r lg:border-stone-200"}>
          <label className={labelCls}>
            <CalendarDays className="h-3.5 w-3.5 text-champagne" /> Departure
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className={fieldCls}
          />
        </Field>

        <Field className={glass ? "lg:border-r lg:border-ivory/10" : "lg:border-r lg:border-stone-200"}>
          <label className={labelCls}>
            <Users className="h-3.5 w-3.5 text-champagne" /> Guests
          </label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className={cn("h-auto border-0 p-0", fieldCls)}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "4", "5", "6"].map((n) => (
                <SelectItem key={n} value={n}>
                  {n} {Number(n) === 1 ? "Guest" : "Guests"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <label className={labelCls}>
            <BedDouble className="h-3.5 w-3.5 text-champagne" /> Rooms
          </label>
          <Select value={rooms} onValueChange={setRooms}>
            <SelectTrigger className={cn("h-auto border-0 p-0", fieldCls)}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "4"].map((n) => (
                <SelectItem key={n} value={n}>
                  {n} {Number(n) === 1 ? "Room" : "Rooms"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <button
          onClick={submit}
          className="group col-span-2 mt-1 flex items-center justify-center gap-2 bg-champagne px-8 py-4 font-sans text-[0.72rem] font-medium uppercase tracking-wider2 text-ink-950 transition-colors duration-500 hover:bg-champagne-light lg:col-span-1 lg:mt-0"
        >
          Check Rates
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

function Field({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2 px-5 py-4", className)}>
      {children}
    </div>
  );
}
