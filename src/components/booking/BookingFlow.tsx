"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowLeft, ArrowRight, CalendarDays, BedDouble, Sparkles } from "lucide-react";
import { ROOMS } from "@/lib/data";
import { formatCurrency, img, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STEPS = ["Dates", "Room", "Details", "Confirm"];
const ease = [0.16, 1, 0.3, 1] as const;

function isoOffset(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export default function BookingFlow() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);

  const [checkIn, setCheckIn] = useState(params.get("checkIn") || isoOffset(1));
  const [checkOut, setCheckOut] = useState(params.get("checkOut") || isoOffset(3));
  const [guests, setGuests] = useState(params.get("guests") || "2");
  const [rooms, setRooms] = useState(params.get("rooms") || "1");
  const [roomSlug, setRoomSlug] = useState(ROOMS[0].slug);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");

  const ref = useMemo(
    () => "DP-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    [],
  );

  const nights = useMemo(() => {
    const a = new Date(checkIn).getTime();
    const b = new Date(checkOut).getTime();
    return Math.max(1, Math.round((b - a) / 86400000));
  }, [checkIn, checkOut]);

  const room = ROOMS.find((r) => r.slug === roomSlug) ?? ROOMS[0];
  const roomCount = Number(rooms);
  const subtotal = room.price * nights * roomCount;
  const taxes = Math.round(subtotal * 0.1675);
  const total = subtotal + taxes;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const detailsValid = first && last && /\S+@\S+\.\S+/.test(email);

  return (
    <div className="container-luxe grid gap-12 py-12 lg:grid-cols-12 lg:py-20">
      {/* Main */}
      <div className="lg:col-span-7 xl:col-span-8">
        {/* Stepper */}
        <div className="mb-12 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className="flex items-center gap-3 text-left"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-sans text-xs transition-colors duration-500",
                    i < step
                      ? "border-champagne bg-champagne text-ink-950"
                      : i === step
                        ? "border-ink bg-ink text-ivory"
                        : "border-stone-300 text-stone-400",
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden font-sans text-[0.66rem] uppercase tracking-wider2 sm:block",
                    i <= step ? "text-ink" : "text-stone-400",
                  )}
                >
                  {label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <span className="h-px flex-1 bg-stone-200">
                  <span
                    className={cn(
                      "block h-full bg-champagne transition-all duration-700",
                      i < step ? "w-full" : "w-0",
                    )}
                  />
                </span>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.5, ease }}
          >
            {step === 0 && (
              <Step title="When will you join us?" subtitle="Select your dates and party.">
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field label="Arrival">
                    <Input type="date" min={isoOffset(0)} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                  </Field>
                  <Field label="Departure">
                    <Input type="date" min={checkIn} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                  </Field>
                  <Field label="Guests">
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["1", "2", "3", "4", "5", "6"].map((n) => (
                          <SelectItem key={n} value={n}>{n} {Number(n) === 1 ? "Guest" : "Guests"}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Rooms">
                    <Select value={rooms} onValueChange={setRooms}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["1", "2", "3", "4"].map((n) => (
                          <SelectItem key={n} value={n}>{n} {Number(n) === 1 ? "Room" : "Rooms"}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="mt-8 flex items-center gap-3 rounded-sm bg-ivory-dark p-4 font-sans text-sm text-stone-600">
                  <CalendarDays className="h-5 w-5 text-champagne-dark" />
                  {nights} {nights === 1 ? "night" : "nights"} · {guests} guests · {rooms} {Number(rooms) === 1 ? "room" : "rooms"}
                </div>
              </Step>
            )}

            {step === 1 && (
              <Step title="Choose your room" subtitle="Each rate includes breakfast, the Kickback, and rooftop pool access.">
                <div className="space-y-4">
                  {ROOMS.map((r) => {
                    const active = r.slug === roomSlug;
                    return (
                      <button
                        key={r.slug}
                        onClick={() => setRoomSlug(r.slug)}
                        className={cn(
                          "group flex w-full items-center gap-5 border p-3 text-left transition-all duration-300",
                          active ? "border-champagne bg-champagne/5" : "border-stone-200 hover:border-stone-400",
                        )}
                      >
                        <div
                          className="h-24 w-32 shrink-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${img(r.image, 400)})` }}
                        />
                        <div className="flex-1">
                          <p className="font-sans text-[0.6rem] uppercase tracking-wider2 text-champagne-dark">{r.category}</p>
                          <p className="font-serif text-xl text-ink">{r.name}</p>
                          <p className="font-sans text-xs text-stone-500">{r.size} · {r.bed} · {r.view}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-2xl text-ink">{formatCurrency(r.price)}</p>
                          <p className="font-sans text-[0.6rem] uppercase tracking-wider2 text-stone-400">/ night</p>
                        </div>
                        <span className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full border transition-colors",
                          active ? "border-champagne bg-champagne text-ink-950" : "border-stone-300",
                        )}>
                          {active && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Step>
            )}

            {step === 2 && (
              <Step title="Your details" subtitle="Tell us who's arriving so we can prepare your welcome.">
                <div className="grid gap-7 sm:grid-cols-2">
                  <Field label="First Name"><Input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="Jane" /></Field>
                  <Field label="Last Name"><Input value={last} onChange={(e) => setLast(e.target.value)} placeholder="Doe" /></Field>
                  <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@email.com" /></Field>
                  <Field label="Phone"><Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(210) 000-0000" /></Field>
                  <div className="sm:col-span-2">
                    <Field label="Special Requests">
                      <Textarea value={requests} onChange={(e) => setRequests(e.target.value)} placeholder="Anniversary, early check-in, dietary needs…" />
                    </Field>
                  </div>
                </div>
              </Step>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-champagne text-ink-950"
                >
                  <Sparkles className="h-9 w-9" />
                </motion.span>
                <h2 className="mt-8 font-serif text-4xl text-ink md:text-5xl">
                  Your stay is reserved
                </h2>
                <p className="mt-4 max-w-md font-sans text-base text-stone-500">
                  Thank you, {first || "guest"}. A confirmation has been sent to{" "}
                  <span className="text-ink">{email || "your email"}</span>. We look
                  forward to welcoming you to the River Walk.
                </p>
                <div className="mt-8 border border-stone-200 px-8 py-5">
                  <p className="font-sans text-[0.62rem] uppercase tracking-wider2 text-stone-400">Confirmation</p>
                  <p className="mt-1 font-serif text-3xl tracking-wider text-champagne-dark">{ref}</p>
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Button asChild variant="primary" size="lg"><Link href="/">Return Home</Link></Button>
                  <Button asChild variant="outline" size="lg" className="text-ink"><Link href="/dining">Reserve Dining</Link></Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        {step < 3 && (
          <div className="mt-12 flex items-center justify-between border-t border-stone-200 pt-8">
            <button
              onClick={back}
              disabled={step === 0}
              className="flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-wider2 text-stone-500 transition-colors hover:text-ink disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <Button
              onClick={next}
              variant="primary"
              size="lg"
              disabled={step === 2 && !detailsValid}
            >
              {step === 2 ? "Confirm Reservation" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Summary */}
      <aside className="lg:col-span-5 xl:col-span-4">
        <div className="sticky top-28 overflow-hidden border border-stone-200 bg-card">
          <div className="relative h-44 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img(room.image, 800)})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
            <div className="absolute bottom-4 left-5 text-ivory">
              <p className="font-sans text-[0.6rem] uppercase tracking-wider2 text-champagne-light">{room.category}</p>
              <p className="font-serif text-2xl">{room.name}</p>
            </div>
          </div>
          <div className="p-6">
            <h3 className="eyebrow mb-5 text-stone-400">Your Stay</h3>
            <dl className="space-y-3 font-sans text-sm">
              <Row label="Arrival" value={fmtDate(checkIn)} />
              <Row label="Departure" value={fmtDate(checkOut)} />
              <Row label="Guests" value={`${guests} · ${rooms} ${Number(rooms) === 1 ? "room" : "rooms"}`} />
              <div className="my-4 h-px bg-stone-200" />
              <Row label={`${formatCurrency(room.price)} × ${nights} × ${roomCount}`} value={formatCurrency(subtotal)} />
              <Row label="Taxes & fees" value={formatCurrency(taxes)} muted />
              <div className="my-4 h-px bg-stone-200" />
              <div className="flex items-baseline justify-between">
                <dt className="font-serif text-lg text-ink">Total</dt>
                <dd className="font-serif text-3xl text-ink">{formatCurrency(total)}</dd>
              </div>
            </dl>
            <div className="mt-6 flex items-center gap-2 rounded-sm bg-champagne/10 px-4 py-3 font-sans text-xs text-champagne-dark">
              <BedDouble className="h-4 w-4" /> Breakfast & 5:30 Kickback included
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Step({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-ink md:text-4xl">{title}</h2>
      <p className="mt-2 font-sans text-sm text-stone-500">{subtitle}</p>
      <div className="mt-10">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={muted ? "text-stone-400" : "text-stone-500"}>{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
