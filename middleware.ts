import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["uz", "ru", "en"] as const;
const DEFAULT = "uz";

function hasLocale(pathname: string) {
  const seg = pathname.split("/").filter(Boolean)[0];
  return LOCALES.includes(seg as any);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/og") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT}`;
    return NextResponse.redirect(url);
  }

  if (!hasLocale(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"]
};
