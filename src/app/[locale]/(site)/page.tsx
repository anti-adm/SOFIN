import { Hero } from "@/components/sections/Hero";
import { AboutChapter } from "@/components/sections/AboutChapter";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { buildMetadata } from "@/lib/seo/metadata";
import { type AppLocale, isLocale } from "@/lib/i18n/locales";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;
  const t = await getTranslations({ locale, namespace: "common" });

  return buildMetadata({
    locale,
    pathname: "/",
    title: t("brand"),
    description: t("slogan")
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;

  return (
    <div>
      <Hero locale={locale} />
      <AboutChapter locale={locale} />
      <ProductShowcase locale={locale} />
    </div>
  );
}