import type { Metadata } from "next";
import { SITE } from "./site";
import { getAlternates, type AppLocale } from "../i18n/routing";

export function buildMetadata(args: {
  locale: AppLocale;
  pathname: string;
  title?: string;
  description?: string;
  ogImage?: string;
}): Metadata {
  const title = args.title ? `${args.title} — ${SITE.name}` : SITE.name;
  const description = args.description ?? SITE.description;
  const alternates = getAlternates(args.pathname, SITE.url);

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: alternates[args.locale],
      languages: alternates
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url: alternates[args.locale],
      images: [{ url: args.ogImage ?? SITE.ogImage }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [args.ogImage ?? SITE.ogImage]
    }
  };
}
