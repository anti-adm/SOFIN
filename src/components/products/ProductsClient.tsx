"use client";

import { useMemo, useState } from "react";
import { CategoryPills } from "./CategoryPills";
import { ProductGrid } from "./ProductGrid";
import { type Product } from "@/lib/content/types";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductsClient({ locale, items }: { locale: string; items: Product[] }) {
  const categories = useMemo(() => {
    const set = new Set(items.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const [active, setActive] = useState(categories[0] ?? "All");

  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((p) => p.category === active);
  }, [items, active]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="rounded-[22px] border border-white/12 bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150"
        style={{
          boxShadow: "0 18px 55px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.10)"
        }}
      >
        <div className="p-4 md:p-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.30em] uppercase text-white/55">
              {locale === "ru" ? "Категории" : locale === "uz" ? "Kategoriya" : "Categories"}
            </div>
            <div className="mt-1 text-[14px] md:text-[15px] font-semibold text-white/88">
              {locale === "ru" ? "Выберите раздел" : locale === "uz" ? "Bo‘limni tanlang" : "Choose a section"}
            </div>
          </div>

          <div className="md:max-w-[760px] md:justify-end">
            <CategoryPills categories={categories} active={active} onChange={setActive} />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
      >
        <ProductGrid locale={locale} items={filtered} />
      </motion.div>
    </div>
  );
}