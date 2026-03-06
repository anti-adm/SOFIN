"use client";

import { TransitionLink } from "@/components/nav/TransitionLink";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMemo } from "react";

type Item = {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  href: string;
};

export function ProductShowcase({ locale }: { locale: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.2 });
  const sy = useSpring(my, { stiffness: 120, damping: 22, mass: 0.2 });

  const items: Item[] = useMemo(
    () => [
      {
        id: "yogurt",
        title: "Йогурт",
        subtitle: "Нежный вкус • premium",
        image: "/media/jogurt5.png",
        href: `/${locale}/products?focus=yogurt`
      },
      { id: "milk", title: "Молоко", subtitle: "Свежесть каждый день", image: "/media/jogurt5.png", href: `/${locale}/products` },
      { id: "kefir", title: "Кефир", subtitle: "Лёгкий баланс", image: "/media/jogurt5.png", href: `/${locale}/products` },
      { id: "cheese", title: "Сыр", subtitle: "Текстура • вкус", image: "/media/jogurt5.png", href: `/${locale}/products` }
    ],
    [locale]
  );

  return (
    <section className="container pb-[var(--section-pad)]">
      <div className="text-xs tracking-[0.28em] uppercase text-muted">Продукция</div>
      <h2 className="h2 mt-4">Выбор недели</h2>
      <p className="p mt-4 max-w-xl">
        Небольшой подбор продуктов. Наведи — объект оживает. Нажми — перейдёшь к карточке.
      </p>

      <div
        className="mt-10 grid gap-4 md:grid-cols-2"
        onMouseMove={(e) => {
          const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        {items.map((it, idx) => (
          <TransitionLink key={it.id} href={it.href} className="group">
            <motion.div
              className="glass overflow-hidden p-6 md:p-8 transition hover:shadow-lift"
              style={{
                x: sx,
                y: sy
              }}
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.05 + idx * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs tracking-[0.26em] uppercase text-muted">SOFIN</div>
                  <div className="mt-2 text-xl font-semibold tracking-tight text-accent2">{it.title}</div>
                  <div className="mt-2 text-sm text-muted">{it.subtitle}</div>
                </div>

                <div className="text-xs text-muted group-hover:text-accent2 transition">→</div>
              </div>

              <div className="relative mt-6 h-[160px] md:h-[190px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_25%,rgba(24,92,190,.10),transparent_60%)]" />
                {it.image ? (
                  <motion.img
                    src={it.image}
                    alt={it.title}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-contain"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05 }}
                  />
                ) : null}
              </div>
            </motion.div>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}