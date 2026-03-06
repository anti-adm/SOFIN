"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        // IMPORTANT: no x/y translate here — transforms break position:fixed in descendants
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(12px)" }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative"
      >
        {/* overlay to mask flashes during route transitions */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-[75]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.18, ease: EASE }}
          style={{
            background:
              "radial-gradient(900px 520px at 50% 30%, rgba(255,255,255,.08), transparent 60%), rgba(9,18,33,.28)"
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}