"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUp } from "@/lib/motion/presets";

const STATS = [
  { k: "24h", v: "Cold chain", d: "Температурный контроль" },
  { k: "3x", v: "Quality checks", d: "Проверки на этапе производства" },
  { k: "100%", v: "Traceable", d: "Партии и происхождение" }
];

export function StatsRow() {
  return (
    <section className="container pb-[var(--section-pad)]">
      <motion.div className="grid gap-3 md:grid-cols-3" variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.4 }}>
        {STATS.map((s) => (
          <motion.div key={s.v} variants={fadeUp} className="glass p-6">
            <div className="text-4xl font-semibold tracking-tight text-accent2">{s.k}</div>
            <div className="mt-2 text-sm text-accent2">{s.v}</div>
            <div className="mt-2 text-sm text-muted">{s.d}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
