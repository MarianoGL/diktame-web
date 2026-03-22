'use client';

import { useEffect, useRef } from 'react';
import type { Translations } from '@/lib/i18n';

interface SpeedProps {
  t: Translations['speed'];
}

export default function Speed({ t }: SpeedProps) {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-warm/3 rounded-full blur-[150px]" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="rounded-2xl border border-white/5 bg-surface-800/40 p-8">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{t.diktame}</span>
                    <span className="text-xs font-mono text-amber-warm">~1-2s</span>
                  </div>
                  <div className="h-3 rounded-full bg-surface-600 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-warm to-amber-light" style={{ width: '15%' }} />
                  </div>
                  <span className="text-xs text-neutral-500 mt-1 block">Local · Neural Engine</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-400">{t.cloud}</span>
                    <span className="text-xs font-mono text-neutral-500">3-8s</span>
                  </div>
                  <div className="h-3 rounded-full bg-surface-600 overflow-hidden">
                    <div className="h-full rounded-full bg-neutral-600" style={{ width: '55%' }} />
                  </div>
                  <span className="text-xs text-neutral-600 mt-1 block">{t.cloudSub}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-400">{t.native}</span>
                    <span className="text-xs font-mono text-neutral-500">2-5s</span>
                  </div>
                  <div className="h-3 rounded-full bg-surface-600 overflow-hidden">
                    <div className="h-full rounded-full bg-neutral-600" style={{ width: '35%' }} />
                  </div>
                  <span className="text-xs text-neutral-600 mt-1 block">{t.nativeSub}</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/5">
                <p className="text-xs text-neutral-500 leading-relaxed">{t.note}</p>
              </div>
            </div>
          </div>

          <div className="reveal order-1 lg:order-2">
            <span className="text-xs font-mono text-amber-warm tracking-widest uppercase mb-4 block">{t.label}</span>
            <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight mb-6">
              {t.title1}{' '}
              <span className="italic text-amber-warm">{t.title2}</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">{t.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-800/40 border border-white/5">
                <div className="font-display text-2xl text-amber-warm mb-1">~1s</div>
                <div className="text-xs text-neutral-500">{t.latency}</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-800/40 border border-white/5">
                <div className="font-display text-2xl text-amber-warm mb-1">0 KB</div>
                <div className="text-xs text-neutral-500">{t.dataSent}</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-800/40 border border-white/5">
                <div className="font-display text-2xl text-amber-warm mb-1">16 kHz</div>
                <div className="text-xs text-neutral-500">{t.audioProcessed}</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-800/40 border border-white/5">
                <div className="font-display text-2xl text-amber-warm mb-1">100%</div>
                <div className="text-xs text-neutral-500">{t.offline}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
