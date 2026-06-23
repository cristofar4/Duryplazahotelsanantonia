"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InquiryFormProps {
  variant?: "event" | "contact";
  dark?: boolean;
}

export default function InquiryForm({
  variant = "contact",
  dark = false,
}: InquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [type, setType] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1300);
  };

  const labelCls = dark ? "text-ivory/50" : undefined;
  const inputCls = dark
    ? "border-ivory/25 text-ivory placeholder:text-ivory/30 focus-visible:border-champagne"
    : "";

  return (
    <AnimatePresence mode="wait">
      {status === "done" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start gap-4 py-10"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-champagne text-ink-950">
            <Check className="h-6 w-6" />
          </span>
          <h3 className={`font-serif text-3xl ${dark ? "text-ivory" : "text-ink"}`}>
            Thank you — we&apos;ll be in touch.
          </h3>
          <p className={`max-w-md font-sans text-sm ${dark ? "text-ivory/60" : "text-stone-500"}`}>
            A member of our team will respond to your enquiry within one business
            day to begin planning every detail.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={submit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-7 sm:grid-cols-2"
        >
          <div className="flex flex-col gap-2">
            <Label className={labelCls}>First Name</Label>
            <Input required placeholder="Jane" className={inputCls} />
          </div>
          <div className="flex flex-col gap-2">
            <Label className={labelCls}>Last Name</Label>
            <Input required placeholder="Doe" className={inputCls} />
          </div>
          <div className="flex flex-col gap-2">
            <Label className={labelCls}>Email</Label>
            <Input required type="email" placeholder="jane@email.com" className={inputCls} />
          </div>
          <div className="flex flex-col gap-2">
            <Label className={labelCls}>Phone</Label>
            <Input type="tel" placeholder="(210) 000-0000" className={inputCls} />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label className={labelCls}>
              {variant === "event" ? "Type of Event" : "How can we help?"}
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className={inputCls}>
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                {(variant === "event"
                  ? ["Wedding", "Corporate Meeting", "Gala / Reception", "Social Celebration"]
                  : ["General Enquiry", "Reservations", "Dining", "Press & Media"]
                ).map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {variant === "event" && (
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label className={labelCls}>Estimated Guests</Label>
              <Input type="number" min={1} placeholder="120" className={inputCls} />
            </div>
          )}

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label className={labelCls}>Message</Label>
            <Textarea
              placeholder="Tell us about your plans…"
              className={inputCls}
            />
          </div>

          <div className="sm:col-span-2">
            <Button
              type="submit"
              variant={dark ? "gold" : "primary"}
              size="lg"
              disabled={status === "loading"}
              className="w-full sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending
                </>
              ) : variant === "event" ? (
                "Submit Enquiry"
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
