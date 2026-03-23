'use client';

import { useEffect, useRef } from 'react';
import { type Locale, type Translations } from '@/lib/i18n';
import { DIKTAME_DMG_DOWNLOAD_URL } from '@/lib/diktameDownload';

interface PricingProps {
  t: Translations['pricing'];
  locale: Locale;
  alerts: {
    checkoutError: string;
    connectionError: string;
  };
}

export default function Pricing({ t, locale, alerts }: PricingProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const freeFeatures: { text: string; included: boolean }[] = [
    { text: t.feat3min, included: true },
    { text: t.featBaseModel, included: true },
    { text: t.feat1Lang, included: true },
    { text: t.featAutoPaste, included: true },
    { text: t.featHistory5, included: true },
    { text: t.featUnlimitedNo, included: false },
    { text: t.featAdvModelsNo, included: false },
    { text: t.featAutoLangNo, included: false },
    { text: t.featFillerNo, included: false },
    { text: t.featVocabNo, included: false },
  ];

  const proFeatures: { text: string; included: boolean }[] = [
    { text: t.featUnlimited, included: true },
    { text: t.featAdvModels, included: true },
    { text: t.featMultiLang, included: true },
    { text: t.featAutoPaste, included: true },
    { text: t.featHistory100, included: true },
    { text: t.featFiller, included: true },
    { text: t.featVocab, included: true },
    { text: t.featTranslation, included: true },
    { text: t.featUpdates, included: true },
    { text: t.featOneTime, included: true },
  ];

  const plans = [
    {
      name: t.free,
      price: '0€',
      period: t.perForever,
      description: t.freeDesc,
      cta: t.freeCta,
      ctaStyle: 'border border-white/10 text-white hover:border-white/25 hover:bg-white/5',
      features: freeFeatures,
      highlighted: false,
    },
    {
      name: t.pro,
      price: '14,99€',
      period: t.oneTime,
      description: t.proDesc,
      cta: t.proCta,
      ctaStyle: 'bg-amber-warm text-surface-900 hover:bg-amber-light amber-glow',
      features: proFeatures,
      highlighted: true,
    },
  ];

  const handleCheckout = async () => {
    try {
      const res = await fetch(`/api/checkout?locale=${encodeURIComponent(locale)}`, { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(alerts.checkoutError);
      }
    } catch {
      alert(alerts.connectionError);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="precios" ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-warm/3 rounded-full blur-[150px]" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="text-xs font-mono text-amber-warm tracking-widest uppercase mb-4 block">{t.label}</span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
            {t.title1}{' '}
            <span className="italic text-neutral-500">{t.title2}</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`reveal relative rounded-2xl p-8 transition-all duration-500 ${
                plan.highlighted
                  ? 'border border-amber-warm/30 bg-surface-800/60 gradient-border'
                  : 'border border-white/5 bg-surface-800/20'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-medium bg-amber-warm text-surface-900">{t.popular}</span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-display text-2xl text-white mb-1">
                  Diktame <span className={plan.highlighted ? 'text-amber-warm' : ''}>{plan.name}</span>
                </h3>
                <p className="text-sm text-neutral-500 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl text-white">{plan.price}</span>
                  <span className="text-sm text-neutral-500">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3 text-sm">
                    {feature.included ? (
                      <svg
                        className="w-4 h-4 mt-0.5 text-amber-warm flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 mt-0.5 text-neutral-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={feature.included ? 'text-neutral-300' : 'text-neutral-600'}>{feature.text}</span>
                  </li>
                ))}
              </ul>

              {plan.highlighted ? (
                <button
                  type="button"
                  className={`relative z-10 w-full py-3.5 rounded-full font-medium text-sm transition-all duration-300 ${plan.ctaStyle}`}
                  onClick={() => {
                    void handleCheckout();
                  }}
                >
                  {plan.cta}
                </button>
              ) : (
                <a
                  href={DIKTAME_DMG_DOWNLOAD_URL}
                  rel="noopener noreferrer"
                  className={`relative z-10 flex w-full items-center justify-center py-3.5 rounded-full font-medium text-sm transition-all duration-300 ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <div className="inline-flex items-center gap-2 text-sm text-neutral-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            {t.guarantee}
          </div>
        </div>
      </div>
    </section>
  );
}
