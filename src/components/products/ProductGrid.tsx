"use client";

import { type Product } from "@/lib/content/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ locale, items }: { locale: string; items: Product[] }) {
  return (
    <div
      className={[
        "grid gap-3 sm:gap-4 md:gap-5",
        "grid-cols-2",
        "md:grid-cols-3",
        "lg:grid-cols-4",
        "xl:grid-cols-5"
      ].join(" ")}
    >
      {items.map((p) => (
        <ProductCard key={p.slug} locale={locale} p={p} />
      ))}
    </div>
  );
}