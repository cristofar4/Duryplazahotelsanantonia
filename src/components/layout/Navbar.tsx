"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, HOTEL } from "@/lib/data";
import { cn, img } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-700 ease-luxe",
          light ? "glass-light py-3" : "bg-transparent py-5",
        )}
      >
        <nav className="container-luxe flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className={cn(
              "group relative z-[81] flex flex-col leading-none transition-colors duration-500",
              open || !light ? "text-ivory" : "text-ink",
            )}
            aria-label="Drury Plaza Hotel — home"
          >
            <span className="font-serif text-xl tracking-tight md:text-2xl">
              Drury Plaza
            </span>
            <span className="eyebrow mt-1 text-[0.55rem] opacity-70">
              San Antonio · Riverwalk
            </span>
          </Link>

          {/* Desktop links */}
          <div
            className={cn(
              "hidden items-center gap-7 lg:flex",
              light ? "text-ink" : "text-ivory",
            )}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "link-underline font-sans text-[0.72rem] uppercase tracking-wider2 transition-opacity",
                  pathname === link.href ? "opacity-100" : "opacity-70 hover:opacity-100",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="z-[81] flex items-center gap-3">
            <Button
              asChild
              variant={light ? "primary" : "gold"}
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Link href="/booking">Reserve</Link>
            </Button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden",
                open
                  ? "border-ivory/40 text-ivory"
                  : light
                    ? "border-ink/20 text-ink"
                    : "border-ivory/40 text-ivory",
              )}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[79] bg-ink-950 text-ivory"
          >
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `url(${img(
                  "photo-1564501049412-61c2a3083791",
                  1600,
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/40" />
            <div className="container-luxe relative flex h-full flex-col justify-center pt-24">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{
                      delay: 0.25 + i * 0.06,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-baseline gap-4 py-1"
                    >
                      <span className="font-sans text-xs text-champagne/60">
                        0{i + 1}
                      </span>
                      <span className="font-serif text-4xl leading-tight transition-colors duration-300 group-hover:text-champagne sm:text-5xl md:text-6xl">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12 flex flex-col gap-4 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
              >
                <a
                  href={`tel:${HOTEL.phone.replace(/[^0-9]/g, "")}`}
                  className="flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-champagne"
                >
                  <Phone className="h-4 w-4" /> {HOTEL.phone}
                </a>
                <Button asChild variant="gold" size="lg">
                  <Link href="/booking">Reserve Your Stay</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
