'use client';

import { useEffect, useRef } from 'react';
import { type Translations } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface WhyDiktameProps {
  t: Translations['whyDiktame'];
  locale: Locale;
}

const comparisonIcons = [
  (
    <path key="p" strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  ),
  (
    <path key="pr" strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  ),
  (
    <path key="a" strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  ),
  (
    <path key="i" strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  ),
  (
    <path key="tr" strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
  ),
  (
    <path key="pe" strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  ),
];

export default function WhyDiktame({ t, locale }: WhyDiktameProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const base = localizedPath('/', locale);

  const comparisons = [
    { feature: t.privacy, diktame: t.privacyUs, others: t.privacyThem, icon: comparisonIcons[0] },
    { feature: t.price, diktame: t.priceUs, others: t.priceThem, icon: comparisonIcons[1] },
    { feature: t.account, diktame: t.accountUs, others: t.accountThem, icon: comparisonIcons[2] },
    { feature: t.internet, diktame: t.internetUs, others: t.internetThem, icon: comparisonIcons[3] },
    { feature: t.translationFeature, diktame: t.translationUs, others: t.translationThem, icon: comparisonIcons[4] },
    { feature: t.performance, diktame: t.performanceUs, others: t.performanceThem, icon: comparisonIcons[5] },
  ];

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
    <section id="por-que-diktame" ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-mono text-amber-warm tracking-widest uppercase mb-4 block">{t.label}</span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
            {t.title1}{' '}
            <span className="italic text-neutral-500">{t.title2}</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {comparisons.map((item, i) => (
            <div
              key={item.feature}
              className="reveal group rounded-2xl border border-white/5 bg-surface-800/20 hover:bg-surface-800/50 hover:border-amber-warm/10 transition-all duration-500 overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-warm/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-warm" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-amber-warm/60 uppercase tracking-wider">{item.feature}</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 text-amber-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className="text-sm text-neutral-200 leading-relaxed">{item.diktame}</p>
                </div>
              </div>

              <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 text-neutral-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p className="text-xs text-neutral-500 leading-relaxed">{item.others}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14 reveal">
          <a
            href={`${base}#precios`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-amber-warm/10 text-amber-warm border border-amber-warm/20 hover:bg-amber-warm/20 hover:border-amber-warm/40 transition-all duration-300"
          >
            {t.ctaPrice}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
