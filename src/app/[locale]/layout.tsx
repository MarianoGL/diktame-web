import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  locales,
  isValidLocale,
  getTranslations,
  getHrefLangEntries,
  type Locale,
} from '@/lib/i18n';
import type { Translations } from '@/lib/i18n';

const baseUrl = 'https://diktame.app';

const keywords = [
  'dictado por voz macOS',
  'transcripción voz a texto Mac',
  'speech to text Mac offline',
  'whisper macOS app',
  'voz a texto sin internet',
  'dictado offline Mac',
  'voice to text Apple Silicon',
  'transcripción local privada',
  'alternativa dictado Mac',
  'app dictado español macOS',
  'voice typing Mac',
  'dictar texto Mac sin nube',
  'whisper AI local Mac',
  'traducción voz en vivo',
  'dictado por voz sin suscripción',
  'app transcripción M1 M2 M3 M4',
  'mejor app dictado Mac 2025',
  'dictado profesional macOS',
];

const ogLocaleByLocale: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
  it: 'it_IT',
  pt: 'pt_PT',
  ru: 'ru_RU',
};

function buildJsonLd(t: Translations) {
  const mainEntity = Array.from({ length: 12 }, (_, i) => {
    const q = t.faq[`q${i + 1}` as keyof typeof t.faq] as string;
    const a = t.faq[`a${i + 1}` as keyof typeof t.faq] as string;
    return {
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Diktame',
        operatingSystem: 'macOS',
        applicationCategory: 'UtilitiesApplication',
        description: t.meta.description,
        url: baseUrl,
        offers: [
          {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
            name: 'Diktame Free',
          },
          {
            '@type': 'Offer',
            price: '14.99',
            priceCurrency: 'EUR',
            name: 'Diktame Pro',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity,
      },
    ],
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = getTranslations(locale);
  const hrefLangs = getHrefLangEntries('/');
  const canonicalUrl = locale === 'es' ? baseUrl : `${baseUrl}/${locale}`;

  const languages: Record<string, string> = {};
  for (const entry of hrefLangs) {
    if (entry.hrefLang === 'x-default') {
      languages['x-default'] = entry.href;
    } else {
      languages[entry.locale] = entry.href;
    }
  }

  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords,
    metadataBase: new URL(baseUrl),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: canonicalUrl,
      siteName: 'Diktame',
      locale: ogLocaleByLocale[locale],
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: ['/og-image.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);
  const jsonLd = buildJsonLd(t);

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {getHrefLangEntries('/').map((entry) => (
          <link
            key={entry.locale}
            rel="alternate"
            hrefLang={entry.hrefLang}
            href={entry.href}
          />
        ))}
      </head>
      <body className="noise-bg">{children}</body>
    </html>
  );
}
