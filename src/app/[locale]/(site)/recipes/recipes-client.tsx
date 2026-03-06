"use client";

import { useMemo, useState } from "react";
import { TagPills } from "@/components/recipes/TagPills";
import { RecipeGrid } from "@/components/recipes/RecipeGrid";
import { type RecipeFrontmatter } from "@/lib/content/types";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/presets";

export default function RecipesClient({ locale, items }: { locale: string; items: RecipeFrontmatter[] }) {
  const tags = useMemo(() => ["All", ...Array.from(new Set(items.flatMap((x) => x.tags)))], [items]);
  const [tag, setTag] = useState(tags[0] ?? "All");
  const filtered = useMemo(() => (tag === "All" ? items : items.filter((x) => x.tags.includes(tag))), [items, tag]);

  return (
    <section className="container py-[var(--section-pad)]">
      <motion.div {...fadeUp}>
        <div className="text-xs tracking-[0.28em] uppercase text-muted">Articles</div>
        <h1 className="h2 mt-4">Рецепты</h1>
        <p className="p mt-4 max-w-xl">Список как журнал: сетка, теги и аккуратная типографика.</p>
        <div className="mt-8">
          <TagPills tags={tags} active={tag} onChange={setTag} />
        </div>
        <div className="mt-8">
          <RecipeGrid items={filtered} locale={locale} />
        </div>
      </motion.div>
    </section>
  );
}
