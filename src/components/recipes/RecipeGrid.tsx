import { RecipeCard } from "./RecipeCard";
import { type RecipeFrontmatter } from "@/lib/content/types";

export function RecipeGrid({ items, locale }: { items: RecipeFrontmatter[]; locale: string }) {
  return (
    <div className="grid gap-[var(--grid-gap)] md:grid-cols-3">
      {items.map((r) => (
        <RecipeCard key={r.slug} r={r} locale={locale} />
      ))}
    </div>
  );
}
