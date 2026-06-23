"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("dp_intro");
    if (seen) {
      setShow(false);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.style.overflow = "hidden";

    const duration = reduce ? 200 : 1900;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("dp_intro", "1");
        setTimeout(() => {
          setShow(false);
          document.body.style.overflow = "";
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 1, ease }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950 text-ivory"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="flex flex-col items-center text-center"
          >
            <span className="eyebrow mb-5 text-champagne">Est. 1929</span>
            <span className="font-serif text-4xl tracking-tight md:text-6xl">
              Drury Plaza
            </span>
            <span className="eyebrow mt-3 text-ivory/50">
              San Antonio · Riverwalk
            </span>
          </motion.div>

          <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 px-10">
            <div className="h-px w-full max-w-md overflow-hidden bg-ivory/15">
              <motion.div
                className="h-full bg-champagne"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                style={{ transformOrigin: "left" }}
                transition={{ ease: "linear" }}
              />
            </div>
            <span className="font-sans text-xs tabular-nums tracking-wider2 text-ivory/50">
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
