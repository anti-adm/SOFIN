import { getRequestConfig } from "next-intl/server";

const LOCALES = ["uz", "ru", "en"] as const;
type AppLocale = (typeof LOCALES)[number];

function isLocale(v: unknown): v is AppLocale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

export default getRequestConfig(async ({ locale }) => {
  const l: AppLocale = isLocale(locale) ? locale : "uz";

  const messages = (await import(`../messages/${l}.json`)).default;

  return {
    locale: l,
    messages
  };
});