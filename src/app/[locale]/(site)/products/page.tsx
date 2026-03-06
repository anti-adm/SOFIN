import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { type AppLocale, isLocale } from "@/lib/i18n/locales";
import { getProducts } from "@/lib/content/products";
import { ProductsClient } from "@/components/products/ProductsClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;

  return buildMetadata({
    locale,
    pathname: "/products",
    title: locale === "ru" ? "Продукция" : "Products",
    description: locale === "ru" ? "Каталог SOFIN." : "SOFIN catalog."
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;

  const items = await getProducts(locale);

  return (
    <div className="relative min-h-[100vh]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src="/media/products/hero.png"
          alt="SOFIN products background"
          fill
          priority
          className="object-cover blur-[2px] scale-[1.03] brightness-[0.60] contrast-[1.06] saturate-[1.02]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_30%_15%,rgba(12,46,120,.12),transparent_55%),radial-gradient(1100px_700px_at_72%_25%,rgba(9,18,33,.48),transparent_62%),linear-gradient(to_bottom,rgba(9,18,33,.86),rgba(9,18,33,.55)_50%,rgba(9,18,33,.82))]" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
          style={{ backgroundImage: "url(/media/grain.svg)", backgroundSize: "320px 320px" }}
        />
        <div className="absolute inset-x-0 top-0 h-[36vh] bg-gradient-to-b from-[rgba(9,18,33,0.88)] via-[rgba(9,18,33,0.35)] to-transparent" />
      </div>

      <section className="container pt-[calc(var(--header-h)+28px)] md:pt-[calc(var(--header-h)+44px)] pb-[var(--section-pad)]">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.30em] uppercase text-white/55">
            {locale === "ru" ? "Каталог" : locale === "uz" ? "Katalog" : "Catalog"}
          </div>

          <h1 className="mt-4 text-[40px] md:text-[56px] leading-[0.96] font-semibold tracking-[-0.03em] text-white">
            {locale === "ru" ? "Продукция" : locale === "uz" ? "Mahsulotlar" : "Products"}
          </h1>
        </div>

        <div className="mt-8 md:mt-10">
          <ProductsClient locale={locale} items={items} />
        </div>
      </section>
    </div>
  );
}