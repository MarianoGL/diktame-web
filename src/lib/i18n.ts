import { locales, defaultLocale, translations, localeNames, type Locale } from './translations';

export { locales, defaultLocale, translations, localeNames, type Locale };

/**
 * Get translations for a given locale.
 * Falls back to default locale (es) if locale is invalid.
 */
export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

/**
 * Type for the translation dictionary (inferred from es base)
 */
export type Translations = ReturnType<typeof getTranslations>;

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Get locale from pathname
 * "/" -> "es" (default)
 * "/en" -> "en"
 * "/en/success" -> "en"
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return defaultLocale;
}

/**
 * Build a localized path.
 * For default locale (es), returns path without prefix.
 * For other locales, prefixes with /locale.
 */
export function localizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (locale === defaultLocale) {
    return cleanPath;
  }

  return `/${locale}${cleanPath}`;
}

/**
 * Generate hreflang entries for SEO
 */
export function getHrefLangEntries(path: string, baseUrl: string = 'https://diktame.app') {
  return locales.map((locale) => ({
    locale,
    href: `${baseUrl}${localizedPath(path, locale)}`,
    hrefLang: locale === defaultLocale ? 'x-default' : locale,
  }));
}
