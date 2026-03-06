"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Mode = "full" | "mini";

export function IntroLoader({
  onDone,
  mode = "full"
}: {
  onDone: () => void;
  mode?: Mode;
}) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const timings = useMemo(() => {
    if (reduced) return { wave: 120, out: 260, done: 340 };
    if (mode === "mini") return { wave: 180, out: 420, done: 520 };
    return { wave: 520, out: 1200, done: 1450 };
  }, [mode, reduced]);

  const [phase, setPhase] = useState<"in" | "wave" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("wave"), timings.wave);
    const t2 = setTimeout(() => setPhase("out"), timings.out);
    const t3 = setTimeout(() => onDone(), timings.done);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone, timings]);

  const waveEase = [0.16, 1, 0.3, 1] as const;
  const logoEase = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence>
      {phase !== "out" && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0.12 : 0.28 } }}
        >
          {/* вместо белого — navy glass */}
          <div className="absolute inset-0 bg-[rgba(9,18,33,.55)] backdrop-blur-2xl" />

          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
            style={{ backgroundImage: "url(/media/grain.svg)", backgroundSize: "320px 320px" }}
          />

          {/* milk wave (не слепит) */}
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "circle(0% at 50% 55%)" }}
            animate={phase === "wave" ? { clipPath: "circle(140% at 50% 55%)" } : { clipPath: "circle(0% at 50% 55%)" }}
            transition={{ duration: reduced ? 0.25 : mode === "mini" ? 0.55 : 0.95, ease: waveEase }}
            style={{
              background:
                "radial-gradient(900px 520px at 50% 55%, rgba(255,255,255,.32), rgba(246,249,255,.16), rgba(12,46,120,.10) 68%, rgba(9,18,33,0) 78%)"
            }}
          />

          <motion.div
            className="relative flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 10, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: reduced ? 0.2 : mode === "mini" ? 0.35 : 0.6, ease: logoEase }}
          >
            <div className="glass bg-white/12 border-white/18 backdrop-blur-2xl h-20 w-20 rounded-3xl grid place-items-center">
              <img src="/media/logotip.png" alt="SOFIN" className="h-12 w-12 object-contain" />
            </div>
            <div className="text-sm tracking-[0.25em] text-white/75">SOFIN</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}