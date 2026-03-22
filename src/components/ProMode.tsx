'use client';

import { useEffect, useRef } from 'react';
import { type Translations } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface ProModeProps {
  t: Translations['proMode'];
  locale: Locale;
}

const featureIcons = [
  <path key="v" strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />,
  <path key="f" strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />,
  <path key="m" strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />,
  <path key="a" strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />,
  <path key="h" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
  <path key="l" strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />,
];

export default function ProMode({ t, locale }: ProModeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const base = localizedPath('/', locale);

  const proFeatures = [
    { title: t.vocab, description: t.vocabDesc, example: t.vocabExample, icon: featureIcons[0] },
    { title: t.filler, description: t.fillerDesc, example: t.fillerExample, icon: featureIcons[1] },
    { title: t.models, description: t.modelsDesc, example: t.modelsExample, icon: featureIcons[2] },
    { title: t.autoLang, description: t.autoLangDesc, example: t.autoLangExample, icon: featureIcons[3] },
    { title: t.history, description: t.historyDesc, example: t.historyExample, icon: featureIcons[4] },
    { title: t.liveTranslation, description: t.liveTranslationDesc, example: t.liveTranslationExample, icon: featureIcons[5] },
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
    <section id="pro" ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-warm/20 to-transparent" />

      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-amber-warm/[0.02] via-transparent to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-warm/20 bg-amber-warm/5 mb-6">
            <span className="text-xs font-medium text-amber-warm tracking-wide uppercase">{t.badge}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
            {t.title1}{' '}
            <span className="italic text-amber-warm">{t.title2}</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {proFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className="reveal group relative rounded-2xl border border-amber-warm/10 bg-surface-800/30 hover:bg-surface-800/60 p-7 transition-all duration-500"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-warm/10 flex items-center justify-center mb-5 group-hover:bg-amber-warm/20 transition-colors duration-300">
                <svg className="w-5 h-5 text-amber-warm" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>

              <h3 className="font-medium text-white text-base mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">{feature.description}</p>

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-warm/5 border border-amber-warm/10">
                <span className="text-xs font-mono text-amber-warm/70">{feature.example}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14 reveal">
          <a
            href={`${base}#precios`}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-base bg-amber-warm text-surface-900 hover:bg-amber-light transition-all duration-300 amber-glow"
          >
            {t.cta}
            <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
          <p className="text-xs text-neutral-500 mt-3">{t.ctaSub}</p>
        </div>
      </div>
    </section>
  );
}
