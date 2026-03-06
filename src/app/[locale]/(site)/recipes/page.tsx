import { buildMetadata } from "@/lib/seo/metadata";
import { type AppLocale, isLocale } from "@/lib/i18n/locales";
import { getRecipes } from "@/lib/content/recipes";
import { RecipesClient } from "@/components/recipes/RecipesClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;
  return buildMetadata({ locale, pathname: "/recipes", title: "Recipes" });
}

export default async function RecipesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;
  const items = await getRecipes(locale);

  return (
    <section className="container">
      <div className="pt-[var(--section-pad)]">
        <div className="h1">Рецепты</div>
        <p className="p mt-3 max-w-2xl"></p>
      </div>

      <div className="mt-8">
        <RecipesClient items={items} locale={locale} />
      </div>
    </section>
  );
}
