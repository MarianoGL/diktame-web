'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';
import { localeNames } from '@/lib/translations';

interface LanguageSelectorProps {
  locale: Locale;
}

const flags: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
  pt: '🇵🇹',
  ru: '🇷🇺',
};

export default function LanguageSelector({ locale }: LanguageSelectorProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLocale: string) => {
    // Remove current locale prefix from pathname
    let cleanPath = pathname;
    for (const loc of locales) {
      if (pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`) {
        cleanPath = pathname.slice(`/${loc}`.length) || '/';
        break;
      }
    }

    // Build new path
    const newPath =
      newLocale === defaultLocale
        ? cleanPath
        : `/${newLocale}${cleanPath === '/' ? '' : cleanPath}`;

    router.push(newPath);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium
                   text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
        aria-label="Select language"
      >
        <span className="text-base">{flags[locale]}</span>
        <span className="hidden sm:inline">{locale.toUpperCase()}</span>
        <svg
          className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className="absolute right-0 top-full mt-1 w-44 py-1.5 rounded-xl
                   bg-gray-900/95 backdrop-blur-xl border border-white/10
                   shadow-2xl shadow-black/50
                   opacity-0 invisible group-hover:opacity-100 group-hover:visible
                   transition-all duration-200 z-50"
      >
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleChange(loc)}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors
              ${
                loc === locale
                  ? 'text-white bg-white/10 font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
          >
            <span className="text-base">{flags[loc]}</span>
            <span>{localeNames[loc]}</span>
            {loc === locale && (
              <svg className="w-3.5 h-3.5 ml-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
