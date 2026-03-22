import { MetadataRoute } from 'next';
import { locales, defaultLocale, localizedPath } from '@/lib/i18n';

const baseUrl = 'https://diktame.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/success'];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const path = localizedPath(page, locale);

      const languages: Record<string, string> = {};
      for (const loc of locales) {
        const langKey = loc === defaultLocale ? 'x-default' : loc;
        languages[langKey] = `${baseUrl}${localizedPath(page, loc)}`;
      }

      entries.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '/' ? 1.0 : 0.5,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
