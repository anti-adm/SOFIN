"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CategoryPills({
  categories,
  active,
  onChange
}: {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((c) => {
        const on = c === active;

        return (
          <button
            key={`cat-${c}`}
            type="button"
            onClick={() => onChange(c)}
            className={[
              "relative select-none",
              "rounded-full px-3 py-2",
              "text-[11px] md:text-[12px] font-semibold tracking-[0.18em] uppercase",
              "transition duration-200",
              "border backdrop-blur-xl",
              on
                ? "text-white border-white/24 bg-white/16"
                : "text-white/72 border-white/14 bg-white/8 hover:bg-white/12 hover:text-white"
            ].join(" ")}
          >
            {on && (
              <motion.span
                layoutId="pill"
                transition={{ duration: 0.42, ease: EASE }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08))",
                  boxShadow: "0 10px 26px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.22)"
                }}
                aria-hidden="true"
              />
            )}
            <span className="relative">{c}</span>
          </button>
        );
      })}
    </div>
  );
}