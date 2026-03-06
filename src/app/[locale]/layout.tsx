import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { isLocale } from "@/lib/i18n/locales";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { IntroGate } from "@/components/intro/IntroGate";
import { LangSetter } from "@/components/providers/LangSetter";

export function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "ru" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LangSetter locale={locale} />
      <LenisProvider>
        <IntroGate>{children}</IntroGate>
      </LenisProvider>
    </NextIntlClientProvider>
  );
}