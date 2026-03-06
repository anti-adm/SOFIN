import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getTranslations } from "next-intl/server";
import { type AppLocale, isLocale } from "@/lib/i18n/locales";

export default async function SiteLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uz") as AppLocale;

  const t = await getTranslations({ locale, namespace: "nav" });
  const nav = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/products`, label: t("products") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/recipes`, label: t("recipes") },
    { href: `/${locale}/contacts`, label: t("contacts") }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} nav={nav} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
