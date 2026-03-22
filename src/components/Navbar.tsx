'use client';

import { useState, useEffect } from 'react';
import { type Locale, type Translations } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import LanguageSelector from './LanguageSelector';

interface NavbarProps {
  t: Translations['nav'];
  locale: Locale;
}

export default function Navbar({ t, locale }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const base = localizedPath('/', locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface-900/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-3">
        <a href={base} className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg
              viewBox="0 0 32 32"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="12" width="2.5" height="8" rx="1.25" fill="#E8A634" opacity="0.6" />
              <rect x="9" y="8" width="2.5" height="16" rx="1.25" fill="#E8A634" opacity="0.8" />
              <rect x="14" y="5" width="2.5" height="22" rx="1.25" fill="#E8A634" />
              <rect x="19" y="9" width="2.5" height="14" rx="1.25" fill="#E8A634" opacity="0.8" />
              <rect x="24" y="11" width="2.5" height="10" rx="1.25" fill="#E8A634" opacity="0.6" />
            </svg>
          </div>
          <span className="font-display text-xl text-white tracking-tight">Diktame</span>
        </a>

        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <a
            href={`${base}#como-funciona`}
            className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
          >
            {t.howItWorks}
          </a>
          <a
            href={`${base}#funcionalidades`}
            className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
          >
            {t.features}
          </a>
          <a
            href={`${base}#precios`}
            className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
          >
            {t.pricing}
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageSelector locale={locale} />
          <a
            href={`${base}#precios`}
            className="px-5 py-2 rounded-full text-sm font-medium bg-amber-warm/10 text-amber-warm border border-amber-warm/20 hover:bg-amber-warm/20 hover:border-amber-warm/40 transition-all duration-300"
          >
            {t.download}
          </a>
        </div>
      </div>
    </nav>
  );
}
