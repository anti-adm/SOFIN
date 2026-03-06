import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { type AppLocale, isLocale } from "@/lib/i18n/locales";
import { getRecipe } from "@/lib/content/recipes";
import { ArticleBody } from "@/components/recipes/ArticleBody";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;
  const r = await getRecipe(locale, slug);
  return buildMetadata({
    locale,
    pathname: `/recipes/${slug}`,
    title: r.title,
    description: r.excerpt,
    ogImage: r.coverImage
  });
}

export default async function RecipeDetail({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;
  const r = await getRecipe(locale, slug);

  return (
    <section className="container pt-[var(--section-pad)]">
      <div className="mx-auto max-w-[920px]">
        <div className="text-xs tracking-[0.28em] uppercase text-muted">{new Date(r.publishedAt).toLocaleDateString()}</div>
        <h1 className="h1 mt-4">{r.title}</h1>
        <p className="p mt-4 max-w-[720px]">{r.excerpt}</p>

        <div className="mt-8 relative aspect-[16/9] overflow-hidden rounded-3xl border border-glassBorder bg-white/40 shadow-soft">
          <Image src={r.coverImage} alt={r.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 920px" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-transparent" />
        </div>

        <div className="mt-10">
          <ArticleBody source={r.content} />
        </div>

        <div className="mt-10">
          <div className="glass p-5">
            <div className="text-xs tracking-[0.28em] uppercase text-muted">Tags</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {r.tags.map((t) => (
                <div key={t} className="rounded-full border border-glassBorder bg-white/55 px-3 py-2 text-xs text-muted backdrop-blur-md">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
