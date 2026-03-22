import { notFound } from 'next/navigation';
import { isValidLocale, getTranslations, type Locale } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Translation from '@/components/Translation';
import WhyDiktame from '@/components/WhyDiktame';
import Speed from '@/components/Speed';
import ProMode from '@/components/ProMode';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default async function Home({
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

  return (
    <main className="relative">
      <Navbar t={t.nav} locale={locale} />
      <Hero t={t.hero} locale={locale} />
      <HowItWorks t={t.howItWorks} />
      <Translation t={t.translation} />
      <WhyDiktame t={t.whyDiktame} locale={locale} />
      <Speed t={t.speed} />
      <ProMode t={t.proMode} locale={locale} />
      <Features t={t.features} />
      <UseCases t={t.useCases} />
      <Pricing
        t={t.pricing}
        locale={locale}
        alerts={{
          checkoutError: t.success.alertCheckoutError,
          connectionError: t.success.alertConnectionError,
          downloadSoon: t.success.downloadComingSoon,
        }}
      />
      <FAQ t={t.faq} />
      <Footer t={t.footer} />
    </main>
  );
}
