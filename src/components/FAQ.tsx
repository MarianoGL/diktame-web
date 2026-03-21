'use client';

import { useEffect, useRef, useState } from 'react';

const faqs = [
  {
    question: '¿Diktame funciona sin internet?',
    answer: 'Sí, al 100%. Diktame ejecuta el modelo Whisper AI directamente en el Neural Engine de tu Mac. Una vez descargado el modelo (~150 MB para el modelo base), no necesitas conexión a internet para nada. Puedes dictar en un avión, en el campo, en cualquier sitio.',
  },
  {
    question: '¿Es compatible con mi Mac?',
    answer: 'Diktame funciona en cualquier Mac con Apple Silicon (M1, M2, M3, M4) y macOS 14 Sonoma o superior. No es compatible con Macs Intel porque necesita el Neural Engine para el procesamiento de IA local.',
  },
  {
    question: '¿Mis datos de voz se envían a algún servidor?',
    answer: 'No. Cero. Nada. El audio se procesa localmente en tu Mac y se descarta inmediatamente después de la transcripción. No hay servidores, no hay APIs externas, no hay cuentas de usuario. Tu voz nunca sale de tu ordenador.',
  },
  {
    question: '¿Necesito crear una cuenta para usar Diktame?',
    answer: 'No. Descargas la app, la abres y funciona. Sin registro, sin email, sin verificación. Para Diktame Pro, el pago se gestiona a través de Stripe y recibes una licencia directamente.',
  },
  {
    question: '¿Cuánto cuesta Diktame?',
    answer: 'Diktame Free es gratis para siempre con 3 minutos de dictado al día. Diktame Pro cuesta 14,99€ en un único pago — sin suscripciones mensuales, sin renovaciones, sin sorpresas. Pagas una vez y es tuyo para siempre, incluyendo todas las actualizaciones futuras.',
  },
  {
    question: '¿En qué idiomas funciona?',
    answer: 'Diktame soporta más de 50 idiomas incluyendo español, inglés, francés, alemán, italiano, portugués, árabe, chino, japonés, coreano, ruso, polaco, holandés y muchos más. Diktame Pro incluye detección automática de idioma y traducción en vivo.',
  },
  {
    question: '¿Qué diferencia hay entre los modelos base, small y large?',
    answer: 'El modelo base (~150 MB) ofrece buena precisión y es muy rápido — ideal para dictado cotidiano. El modelo small (~500 MB) mejora la precisión con nombres propios y vocabulario técnico. El large-v3 turbo (~3 GB) ofrece máxima precisión, ideal para transcripciones críticas. Todos funcionan localmente en tu Mac.',
  },
  {
    question: '¿Funciona en cualquier app?',
    answer: 'Sí. Diktame pega el texto automáticamente donde tengas el cursor: Mail, Pages, Word, Slack, WhatsApp Web, Notion, VS Code, Telegram, cualquier app donde puedas escribir. Funciona a nivel de sistema operativo, no depende de la app destino.',
  },
  {
    question: '¿Cómo funciona la traducción en vivo?',
    answer: 'En Diktame Pro, seleccionas un idioma de salida diferente al que hablas. Por ejemplo, hablas en español y el texto se pega en francés. Es ideal para escribir emails a equipos internacionales o redactar contenido en otro idioma sin saber escribirlo.',
  },
  {
    question: '¿Qué es el vocabulario personalizado?',
    answer: 'En Diktame Pro puedes añadir una lista de palabras que Whisper debe reconocer correctamente: nombres de tu empresa, marcas, términos técnicos, jerga de tu sector, nombres propios, etc. Así evitas errores de transcripción con palabras poco comunes.',
  },
  {
    question: '¿Puedo usar Diktame en varios Macs?',
    answer: 'Sí. La licencia de Diktame Pro es personal y puedes usarla en todos tus Macs con Apple Silicon.',
  },
  {
    question: '¿Hay política de reembolso?',
    answer: 'Sí. Si Diktame Pro no te convence, tienes 30 días para solicitar un reembolso completo sin preguntas. Queremos que estés satisfecho.',
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      id="faq"
      ref={sectionRef}
      className="relative py-28 sm:py-36"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-mono text-amber-warm tracking-widest uppercase mb-4 block">
            Preguntas frecuentes
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            Todo lo que necesitas{' '}
            <span className="italic text-neutral-500">saber.</span>
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-3 reveal">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-surface-800/20 overflow-hidden transition-all duration-300 hover:border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-neutral-200 pr-4">
                  {faq.question}
                </span>
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
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
              >
                <div className="px-6">
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 reveal">
          <p className="text-sm text-neutral-500">
            ¿Tienes otra pregunta?{' '}
            <a
              href="mailto:hola@diktame.app"
              className="text-amber-warm hover:text-amber-light transition-colors"
            >
              Escríbenos
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
