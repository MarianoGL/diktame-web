'use client';

import { useEffect, useRef } from 'react';
import { type Locale, type Translations } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';

interface HeroProps {
  t: Translations['hero'];
  locale: Locale;
}

export default function Hero({ t, locale }: HeroProps) {
  const waveformRef = useRef<HTMLCanvasElement>(null);
  const base = localizedPath('/', locale);

  useEffect(() => {
    const canvas = waveformRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      const bars = 48;
      const barWidth = w / bars;
      const gap = 2;

      for (let i = 0; i < bars; i++) {
        const x = i * barWidth;
        const normalizedPos = i / bars;

        const wave1 = Math.sin(normalizedPos * Math.PI * 2 + time * 1.5) * 0.3;
        const wave2 = Math.sin(normalizedPos * Math.PI * 4 + time * 0.8) * 0.2;
        const wave3 = Math.sin(normalizedPos * Math.PI * 1.5 + time * 2.2) * 0.15;

        const envelope = Math.exp(-Math.pow((normalizedPos - 0.5) * 2.5, 2));

        const amplitude = (0.15 + wave1 + wave2 + wave3) * envelope;
        const barHeight = Math.max(4, amplitude * h * 0.7);

        const y = (h - barHeight) / 2;

        const opacity = 0.3 + envelope * 0.7;
        ctx.fillStyle = `rgba(232, 166, 52, ${opacity})`;
        ctx.beginPath();
        ctx.roundRect(x + gap / 2, y, barWidth - gap, barHeight, 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-warm/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-warm/20 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center pt-24 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-warm/20 bg-amber-warm/5 mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-amber-warm animate-pulse-slow" />
          <span className="text-xs font-medium text-amber-warm tracking-wide uppercase">{t.badge}</span>
        </div>

        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-6 animate-slide-up"
        >
          {t.title1}{' '}
          <span className="italic text-amber-warm amber-glow-text">{t.title2}</span>
        </h1>

        <p
          className="max-w-xl mx-auto text-lg sm:text-xl text-neutral-400 leading-relaxed mb-10 animate-slide-up"
          style={{ animationDelay: '0.15s' }}
        >
          {t.subtitle}
          <br className="hidden sm:block" />
          {t.subtitle2}
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <a
            href={`${base}#precios`}
            className="group relative px-8 py-3.5 rounded-full font-medium text-base bg-amber-warm text-surface-900 hover:bg-amber-light transition-all duration-300 amber-glow"
          >
            {t.cta}
            <span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
          <a
            href={`${base}#como-funciona`}
            className="px-8 py-3.5 rounded-full font-medium text-base text-neutral-300 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-300"
          >
            {t.ctaSecondary}
          </a>
        </div>

        <div
          className="relative max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-surface-800/50 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs text-neutral-500 font-mono">{t.mockTitle}</span>
            </div>

            <canvas
              ref={waveformRef}
              className="w-full h-24 sm:h-32"
              style={{ display: 'block' }}
            />

            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-sm text-neutral-300 font-mono text-left">
                <span className="text-amber-warm">▌</span> {t.mockText}
              </p>
            </div>
          </div>

          <div className="absolute -bottom-8 left-1/4 right-1/4 h-16 bg-amber-warm/10 blur-3xl rounded-full" />
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-8 mt-16 text-xs text-neutral-500 animate-fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            {t.trustNoInternet}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            {t.trustNoData}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
            </svg>
            {t.trustAppleSilicon}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            {t.trustWhisper}
          </div>
        </div>
      </div>
    </section>
  );
}
