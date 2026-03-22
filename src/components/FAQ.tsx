'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import type { Translations } from '@/lib/i18n';

interface FAQProps {
  t: Translations['faq'];
}

export default function FAQ({ t }: FAQProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        q: t[`q${i + 1}` as keyof typeof t] as string,
        a: t[`a${i + 1}` as keyof typeof t] as string,
      })),
    [t]
  );

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
    <section id="faq" ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-mono text-amber-warm tracking-widest uppercase mb-4 block">{t.label}</span>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            {t.title1}{' '}
            <span className="italic text-neutral-500">{t.title2}</span>
          </h2>
        </div>

        <div className="space-y-3 reveal">
          {questions.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-surface-800/20 overflow-hidden transition-all duration-300 hover:border-white/10"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-neutral-200 pr-4">{item.q}</span>
                <svg
                  className={`w-4 h-4 text-neutral-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                <div className="px-6">
                  <p className="text-sm text-neutral-400 leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <p className="text-sm text-neutral-500">
            {t.contact}{' '}
            <a href="mailto:mrngl1991@gmail.com" className="text-amber-warm hover:text-amber-light transition-colors">
              {t.contactLink}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
