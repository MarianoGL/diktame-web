import { notFound } from 'next/navigation';
import { isValidLocale, getTranslations, type Locale } from '@/lib/i18n';
import SuccessContent from './SuccessContent';

export default async function SuccessPage({
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
  return <SuccessContent t={t.success} locale={locale} />;
}
