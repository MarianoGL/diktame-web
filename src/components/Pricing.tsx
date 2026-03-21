'use client';

import { useEffect, useRef } from 'react';

const plans = [
  {
    name: 'Free',
    price: '0€',
    period: 'para siempre',
    description: 'Para probar Diktame sin compromiso.',
    cta: 'Descargar gratis',
    ctaStyle: 'border border-white/10 text-white hover:border-white/25 hover:bg-white/5',
    features: [
      { text: '3 minutos de dictado al día', included: true },
      { text: 'Modelo Whisper base', included: true },
      { text: '1 idioma seleccionado', included: true },
      { text: 'Pegado automático', included: true },
      { text: 'Historial de 5 transcripciones', included: true },
      { text: 'Dictado ilimitado', included: false },
      { text: 'Modelos avanzados', included: false },
      { text: 'Detección automática de idioma', included: false },
      { text: 'Filtro de muletillas', included: false },
      { text: 'Vocabulario personalizado', included: false },
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '14,99€',
    period: 'pago único',
    description: 'Sin límites. Sin suscripción. Para siempre.',
    cta: 'Comprar Diktame Pro',
    ctaStyle: 'bg-amber-warm text-surface-900 hover:bg-amber-light amber-glow',
    features: [
      { text: 'Dictado ilimitado', included: true },
      { text: 'Modelos avanzados (small, medium, large)', included: true },
      { text: 'Multi-idioma con detección automática', included: true },
      { text: 'Pegado automático', included: true },
      { text: 'Historial extendido (100 transcripciones)', included: true },
      { text: 'Filtro inteligente de muletillas', included: true },
      { text: 'Vocabulario personalizado', included: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'Todas las actualizaciones futuras', included: true },
      { text: 'Pago único — sin suscripción', included: true },
    ],
    highlighted: true,
  },
];

export function Pricing() {
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
      id="precios"
      ref={sectionRef}
      className="relative py-28 sm:py-36"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-warm/3 rounded-full blur-[150px]" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 reveal">
          <span className="text-xs font-mono text-amber-warm tracking-widest uppercase mb-4 block">
            Precios
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
            Un precio.{' '}
            <span className="italic text-neutral-500">Para siempre.</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-lg mx-auto">
            Sin suscripciones, sin trucos. Paga una vez, usa para siempre.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`reveal relative rounded-2xl p-8 transition-all duration-500 ${
                plan.highlighted
                  ? 'border border-amber-warm/30 bg-surface-800/60 gradient-border'
                  : 'border border-white/5 bg-surface-800/20'
              }`}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-medium bg-amber-warm text-surface-900">
                    Más popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <h3 className="font-display text-2xl text-white mb-1">
                  Diktame{' '}
                  <span className={plan.highlighted ? 'text-amber-warm' : ''}>
                    {plan.name}
                  </span>
                </h3>
                <p className="text-sm text-neutral-500 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-neutral-500">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-start gap-3 text-sm"
                  >
                    {feature.included ? (
                      <svg
                        className="w-4 h-4 mt-0.5 text-amber-warm flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 mt-0.5 text-neutral-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    <span
                      className={
                        feature.included
                          ? 'text-neutral-300'
                          : 'text-neutral-600'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <button
                className={`w-full py-3.5 rounded-full font-medium text-sm transition-all duration-300 ${plan.ctaStyle}`}
                onClick={() => {
                  if (plan.highlighted) {
                    // TODO: Stripe checkout — reemplazar con el link real
                    // window.location.href = '/api/checkout';
                    alert('Stripe checkout — próximamente');
                  } else {
                    // TODO: Link de descarga del .dmg
                    alert('Descarga del .dmg — próximamente');
                  }
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="text-center mt-12 reveal">
          <div className="inline-flex items-center gap-2 text-sm text-neutral-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            Pago seguro con Stripe · Prueba gratis antes de comprar
          </div>
        </div>
      </div>
    </section>
  );
}
