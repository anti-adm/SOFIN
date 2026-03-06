"use client";

import { motion } from "framer-motion";

export function TagPills({ tags, active, onChange }: { tags: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => {
        const on = t === active;
        return (
          <button key={t} onClick={() => onChange(t)} className="relative rounded-full border border-glassBorder bg-white/55 px-4 py-2 text-xs tracking-widest uppercase backdrop-blur-md">
            {on && <motion.span layoutId="tag" className="absolute inset-0 rounded-full bg-accent/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <span className={on ? "relative text-accent2" : "relative text-muted"}>{t}</span>
          </button>
        );
      })}
    </div>
  );
}
