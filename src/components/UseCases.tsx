'use client';

import { useEffect, useRef } from 'react';
import type { Translations } from '@/lib/i18n';

interface UseCasesProps {
  t: Translations['useCases'];
}

const emojis = ['💼', '👨‍💻', '✍️', '🎓', '🌍', '⚕️'];

export default function UseCases({ t }: UseCasesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const useCases = [
    { emoji: emojis[0], title: t.professionals, description: t.professionalsDesc, keywords: t.professionalsKw },
    { emoji: emojis[1], title: t.developers, description: t.developersDesc, keywords: t.developersKw },
    { emoji: emojis[2], title: t.writers, description: t.writersDesc, keywords: t.writersKw },
    { emoji: emojis[3], title: t.students, description: t.studentsDesc, keywords: t.studentsKw },
    { emoji: emojis[4], title: t.multilingual, description: t.multilingualDesc, keywords: t.multilingualKw },
    { emoji: emojis[5], title: t.health, description: t.healthDesc, keywords: t.healthKw },
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
    <section ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-mono text-amber-warm tracking-widest uppercase mb-4 block">{t.label}</span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
            {t.title1}{' '}
            <span className="italic text-neutral-500">{t.title2}</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((useCase, i) => (
            <div
              key={useCase.title}
              className="reveal group p-7 rounded-2xl border border-white/5 bg-surface-800/20 hover:bg-surface-800/50 hover:border-amber-warm/10 transition-all duration-500"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="text-3xl mb-4 block">{useCase.emoji}</span>
              <h3 className="font-medium text-white text-base mb-2">{useCase.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">{useCase.description}</p>
              <span className="text-xs font-mono text-neutral-600">{useCase.keywords}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
