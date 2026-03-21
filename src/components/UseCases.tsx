'use client';

import { useEffect, useRef } from 'react';

const useCases = [
  {
    emoji: '💼',
    title: 'Profesionales',
    description: 'Dicta emails, informes y presentaciones 3x más rápido que tecleando. Pegado directo en Mail, Slack, Notion, Pages o cualquier app.',
    keywords: 'Emails · Informes · Documentos',
  },
  {
    emoji: '👨‍💻',
    title: 'Desarrolladores',
    description: 'Dicta comentarios de código, documentación técnica, mensajes de commit y descripciones de PR sin quitar las manos del teclado.',
    keywords: 'Documentación · Commits · PRs',
  },
  {
    emoji: '✍️',
    title: 'Escritores y periodistas',
    description: 'Captura ideas al vuelo, transcribe entrevistas, dicta borradores. El vocabulario personalizado reconoce nombres propios de tus textos.',
    keywords: 'Borradores · Entrevistas · Ideas',
  },
  {
    emoji: '🎓',
    title: 'Estudiantes',
    description: 'Toma apuntes dictando, transcribe clases, redacta trabajos hablando. Funciona sin internet — perfecto en bibliotecas sin WiFi.',
    keywords: 'Apuntes · Trabajos · Clases',
  },
  {
    emoji: '🌍',
    title: 'Equipos multilingües',
    description: 'Habla en tu idioma y pega el texto traducido automáticamente. Perfecto para empresas con equipos internacionales.',
    keywords: 'Traducción · Equipos · Internacional',
  },
  {
    emoji: '⚕️',
    title: 'Profesionales sanitarios',
    description: 'Dicta notas clínicas, informes y recetas con vocabulario médico personalizado. 100% offline — cumple con privacidad de datos.',
    keywords: 'Notas clínicas · Informes · RGPD',
  },
];

export function UseCases() {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-mono text-amber-warm tracking-widest uppercase mb-4 block">
            Casos de uso
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
            Para quien vive{' '}
            <span className="italic text-neutral-500">escribiendo.</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Si tu trabajo implica escribir, Diktame te ahorra horas cada semana.
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((useCase, i) => (
            <div
              key={useCase.title}
              className="reveal group p-7 rounded-2xl border border-white/5 bg-surface-800/20 hover:bg-surface-800/50 hover:border-amber-warm/10 transition-all duration-500"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="text-3xl mb-4 block">{useCase.emoji}</span>
              <h3 className="font-medium text-white text-base mb-2">
                {useCase.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                {useCase.description}
              </p>
              <span className="text-xs font-mono text-neutral-600">
                {useCase.keywords}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
