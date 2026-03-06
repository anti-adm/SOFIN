export const LOCALES = ["uz", "ru", "en"] as const;
export type AppLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = "uz";

export function isLocale(v: string): v is AppLocale {
  return (LOCALES as readonly string[]).includes(v);
}
