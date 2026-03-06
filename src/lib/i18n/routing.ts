import { DEFAULT_LOCALE, LOCALES, type AppLocale } from "./locales";

export function localePrefix(locale: AppLocale) {
  return `/${locale}`;
}

export function stripLocale(pathname: string) {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (LOCALES.includes(seg as any)) return "/" + pathname.split("/").filter(Boolean).slice(1).join("/");
  return pathname;
}

export function withLocale(locale: AppLocale, pathname: string) {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${localePrefix(locale)}${p === "/" ? "" : p}`;
}

export function getCanonical(locale: AppLocale, pathname: string, siteUrl: string) {
  const url = new URL(siteUrl);
  url.pathname = withLocale(locale, stripLocale(pathname));
  return url.toString().replace(/\/$/, "/");
}

export function getAlternates(pathname: string, siteUrl: string) {
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[l] = getCanonical(l, pathname, siteUrl);
  return out;
}

export { DEFAULT_LOCALE, LOCALES, type AppLocale };
