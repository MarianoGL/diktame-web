'use client';

import { useEffect, useRef, useState } from 'react';

const examples = [
  {
    input: '🇪🇸 "Necesito confirmar la reunión del martes con el equipo de París"',
    output: '🇫🇷 "Je dois confirmer la réunion de mardi avec l\'équipe de Paris"',
    langFrom: 'Español',
    langTo: 'Français',
  },
  {
    input: '🇪🇸 "El informe trimestral estará listo para el viernes"',
    output: '🇬🇧 "The quarterly report will be ready by Friday"',
    langFrom: 'Español',
    langTo: 'English',
  },
  {
    input: '🇪🇸 "Envíame los datos actualizados del proyecto cuando puedas"',
    output: '🇩🇪 "Schick mir die aktualisierten Projektdaten, wenn du kannst"',
    langFrom: 'Español',
    langTo: 'Deutsch',
  },
];

export function Translation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeExample, setActiveExample] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExample((prev) => (prev + 1) % examples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const example = examples[activeExample];

  return (
    <section
      id="traduccion"
      ref={sectionRef}
      className="relative py-28 sm:py-36"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="reveal">
            <span className="text-xs font-mono text-amber-warm tracking-widest uppercase mb-4 block">
              Traducción en vivo
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight mb-6">
              Habla en un idioma,{' '}
              <span className="italic text-amber-warm">escribe en otro.</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              Selecciona el idioma de salida y habla en español. Diktame transcribe
              y traduce automáticamente. Perfecto para emails internacionales,
              mensajes a equipos multilingües o redactar en otro idioma sin saber
              escribirlo.
            </p>
            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <svg className="w-4 h-4 text-amber-warm" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Disponible en Diktame Pro
            </div>
          </div>

          {/* Visual demo */}
          <div className="reveal">
            <div className="rounded-2xl border border-white/5 bg-surface-800/40 backdrop-blur-sm overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs font-mono text-neutral-500">
                  {example.langFrom} → {example.langTo}
                </span>
              </div>

              {/* Input */}
              <div className="px-6 py-5 border-b border-white/5">
                <div className="text-xs font-mono text-neutral-600 mb-2 uppercase tracking-wider">
                  Tú dices
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed transition-all duration-500">
                  {example.input}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center py-3">
                <div className="w-8 h-8 rounded-full bg-amber-warm/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-warm" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </div>
              </div>

              {/* Output */}
              <div className="px-6 py-5">
                <div className="text-xs font-mono text-amber-warm/60 mb-2 uppercase tracking-wider">
                  Se pega
                </div>
                <p className="text-amber-warm text-sm leading-relaxed font-medium transition-all duration-500">
                  {example.output}
                </p>
              </div>

              {/* Dots indicator */}
              <div className="flex items-center justify-center gap-2 pb-4">
                {examples.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveExample(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === activeExample
                        ? 'bg-amber-warm w-4'
                        : 'bg-neutral-600 hover:bg-neutral-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
