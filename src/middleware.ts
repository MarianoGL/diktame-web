import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale } from './lib/i18n';

// Paths that should NOT be processed by the middleware
const PUBLIC_FILE = /\.(.*)$/;
const EXCLUDED_PATHS = ['/api/', '/_next/', '/favicon.ico', '/robots.txt', '/sitemap.xml'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, and Next.js internals
  if (
    PUBLIC_FILE.test(pathname) ||
    EXCLUDED_PATHS.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a valid locale prefix
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // If the first segment is a valid locale, let it through
  if (firstSegment && isValidLocale(firstSegment)) {
    // If it's the default locale in the URL, redirect to clean URL
    // e.g., /es -> /, /es/success -> /success
    if (firstSegment === defaultLocale) {
      const restOfPath = segments.slice(1).join('/');
      const cleanUrl = request.nextUrl.clone();
      cleanUrl.pathname = restOfPath ? `/${restOfPath}` : '/';
      return NextResponse.redirect(cleanUrl, 301);
    }
    return NextResponse.next();
  }

  // No locale prefix = default locale (es)
  // Rewrite internally to /es/... so [locale] route handles it
  // but keep the URL clean (no /es prefix)
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
