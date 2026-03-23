import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, getTranslations, type Locale } from '@/lib/i18n';
import RecoverContent from './RecoverContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) {
    return {};
  }
  const locale = localeParam as Locale;
  const t = getTranslations(locale);
  return {
    title: t.recover.metaTitle,
    description: t.recover.metaDescription,
  };
}

export default async function RecoverPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) {
    notFound();
  }
  const locale = localeParam as Locale;
  const t = getTranslations(locale);
  return <RecoverContent t={t.recover} locale={locale} />;
}
