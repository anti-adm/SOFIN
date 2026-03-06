"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FACTS = [
  { t: "Свежесть", d: "Короткая цепочка поставок и охлаждение на каждом этапе." },
  { t: "Безопасность", d: "Многоступенчатый контроль и санитарные нормы." },
  { t: "Прослеживаемость", d: "Партии и происхождение — понятны и прозрачны." },
  { t: "Сертификация", d: "Документы и стандарты — как часть процесса." },
  { t: "Логистика", d: "Холодная доставка и аккуратная упаковка." }
];

export function DropletsInteractive() {
  const [active, setActive] = useState(0);

  return (
    <section className="container py-[var(--section-pad)]">
      <div className="glass p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="text-xs tracking-[0.28em] uppercase text-muted">Details</div>
            <h2 className="h2 mt-4">Капли фактов</h2>
            <p className="p mt-4 max-w-xl">Нажимай на точки — короткие факты раскрываются без шума и перегруза.</p>
          </div>

          <div className="rounded-2xl border border-glassBorder bg-white/55 p-5 backdrop-blur-md max-w-md w-full">
            <div className="text-sm font-medium text-accent2">{FACTS[active].t}</div>
            <div className="mt-2 text-sm text-muted">{FACTS[active].d}</div>
          </div>
        </div>

        <div className="mt-10 relative h-36 md:h-44">
          {FACTS.map((_, i) => {
            const left = 10 + i * 18;
            const top = i % 2 === 0 ? 25 : 55;
            const on = i === active;
            return (
              <button
                key={i}
                className="absolute"
                style={{ left: `${left}%`, top: `${top}%` }}
                onClick={() => setActive(i)}
                aria-label={`fact ${i + 1}`}
              >
                <motion.div
                  className="h-5 w-5 rounded-full border border-glassBorder bg-white/70 backdrop-blur-md"
                  animate={on ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                />
                {on && (
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </button>
            );
          })}
          <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[rgba(10,35,90,.14)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
