import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale, hasLocale, type Locale, locales } from "@/app/[lang]/locales";

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") ?? "";

  for (const part of acceptLanguage.split(",")) {
    const tag = part.split(";")[0].trim().split("-")[0].toLowerCase();
    if (hasLocale(tag)) return tag;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip _next internals, the admin panel (not localized), api and any
    // request for a file with an extension (public/ assets, favicon.ico).
    "/((?!api|_next|_vercel|admin|.*\\..*).*)",
  ],
};
