'use client';

import { useEffect, useRef } from 'react';
import type { Translations } from '@/lib/i18n';

interface FeaturesProps {
  t: Translations['features'];
}

const featureIcons = [
  <path key="1" strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />,
  <path key="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667C21.583 7.794 23 10.77 23 14c0 3.23-1.417 6.206-3.879 8.206" />,
  <path key="3" strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />,
  <path key="4" strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />,
  <path key="5" strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />,
  <path key="6" strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />,
];

export default function Features({ t }: FeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    { title: t.privacy, description: t.privacyDesc, icon: featureIcons[0] },
    { title: t.noInternet, description: t.noInternetDesc, icon: featureIcons[1] },
    { title: t.appleSilicon, description: t.appleSiliconDesc, icon: featureIcons[2] },
    { title: t.multiLang, description: t.multiLangDesc, icon: featureIcons[3] },
    { title: t.autoPaste, description: t.autoPasteDesc, icon: featureIcons[4] },
    { title: t.whisper, description: t.whisperDesc, icon: featureIcons[5] },
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
    <section id="funcionalidades" ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="text-xs font-mono text-amber-warm tracking-widest uppercase mb-4 block">{t.label}</span>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            {t.title1}{' '}
            <span className="italic text-neutral-500">{t.title2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="reveal group relative p-7 rounded-2xl border border-white/5 bg-surface-800/20 hover:bg-surface-800/50 hover:border-amber-warm/10 transition-all duration-500"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-warm/10 flex items-center justify-center mb-5 group-hover:bg-amber-warm/15 transition-colors duration-300">
                <svg className="w-5 h-5 text-amber-warm" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>

              <h3 className="font-medium text-white text-base mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
