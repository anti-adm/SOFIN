"use client";

import { useMemo, useState } from "react";
import { TagPills } from "./TagPills";
import { RecipeGrid } from "./RecipeGrid";
import { type RecipeFrontmatter } from "@/lib/content/types";

export function RecipesClient({ items, locale }: { items: RecipeFrontmatter[]; locale: string }) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((r) => r.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [items]);

  const [active, setActive] = useState(tags[0] ?? "All");
  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((r) => r.tags.includes(active));
  }, [items, active]);

  return (
    <div>
      <TagPills tags={tags} active={active} onChange={setActive} />
      <div className="mt-6">
        <RecipeGrid items={filtered} locale={locale} />
      </div>
    </div>
  );
}
