'use client';

import { useEffect, useRef } from 'react';
import type { Translations } from '@/lib/i18n';

interface HowItWorksProps {
  t: Translations['howItWorks'];
}

const stepIcons = [
  (
    <svg key="1" viewBox="0 0 48 48" fill="none" className="w-12 h-12">
      <rect x="8" y="8" width="32" height="32" rx="8" stroke="#E8A634" strokeWidth="1.5" fill="#E8A634" fillOpacity="0.05" />
      <text x="24" y="28" textAnchor="middle" fill="#E8A634" fontSize="13" fontFamily="var(--font-mono)" fontWeight="500">
        Fn
      </text>
    </svg>
  ),
  (
    <svg key="2" viewBox="0 0 48 48" fill="none" className="w-12 h-12">
      <path d="M24 6C20.6863 6 18 8.68629 18 12V24C18 27.3137 20.6863 30 24 30C27.3137 30 30 27.3137 30 24V12C30 8.68629 27.3137 6 24 6Z" stroke="#E8A634" strokeWidth="1.5" fill="#E8A634" fillOpacity="0.05" />
      <path d="M14 22V24C14 29.5228 18.4772 34 24 34C29.5228 34 34 29.5228 34 24V22" stroke="#E8A634" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 34V42M20 42H28" stroke="#E8A634" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg key="3" viewBox="0 0 48 48" fill="none" className="w-12 h-12">
      <rect x="10" y="6" width="28" height="36" rx="4" stroke="#E8A634" strokeWidth="1.5" fill="#E8A634" fillOpacity="0.05" />
      <path d="M18 18H30" stroke="#E8A634" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 24H28" stroke="#E8A634" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 30H24" stroke="#E8A634" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 6V4C19 2.89543 19.8954 2 21 2H27C28.1046 2 29 2.89543 29 4V6" stroke="#E8A634" strokeWidth="1.5" />
    </svg>
  ),
];

export default function HowItWorks({ t }: HowItWorksProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    { number: '01', title: t.step1Title, description: t.step1Desc, icon: stepIcons[0] },
    { number: '02', title: t.step2Title, description: t.step2Desc, icon: stepIcons[1] },
    { number: '03', title: t.step3Title, description: t.step3Desc, icon: stepIcons[2] },
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
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="como-funciona" ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="text-xs font-mono text-amber-warm tracking-widest uppercase mb-4 block">{t.label}</span>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            {t.title1}{' '}
            <span className="italic text-neutral-500">{t.title2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="reveal group relative p-8 rounded-2xl border border-white/5 bg-surface-800/30 hover:bg-surface-800/60 hover:border-amber-warm/10 transition-all duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-xs font-mono text-amber-warm/40 mb-6 block">{step.number}</span>
              <div className="mb-6">{step.icon}</div>
              <h3 className="font-display text-2xl text-white mb-3">{step.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{step.description}</p>
              <div className="absolute inset-0 rounded-2xl bg-amber-warm/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        <div className="hidden md:block absolute top-1/2 left-[calc(33.333%+12px)] right-[calc(33.333%+12px)] h-px bg-gradient-to-r from-amber-warm/20 via-amber-warm/10 to-amber-warm/20" />
      </div>
    </section>
  );
}
