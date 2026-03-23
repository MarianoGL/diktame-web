'use client';

import { useState } from 'react';
import { localizedPath, type Locale } from '@/lib/i18n';
import type { Translations } from '@/lib/i18n';

type RecoverT = Translations['recover'];

export default function RecoverContent({ t, locale }: { t: RecoverT; locale: Locale }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const homeHref = localizedPath('/', locale);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setNetworkError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/recover-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.status === 400) {
        setValidationError(t.invalidEmail);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setNetworkError(t.networkError);
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setNetworkError(t.networkError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {success ? (
          <div>
            <div className="w-16 h-16 rounded-full bg-amber-warm/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-warm" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="font-display text-3xl text-white mb-3">{t.title}</h1>
            <p className="text-neutral-400 text-sm mb-8">{t.successMessage}</p>
            <a
              href={homeHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-amber-warm/10 text-amber-warm border border-amber-warm/20 hover:bg-amber-warm/20 transition-all duration-300"
            >
              {t.backToDiktame}
            </a>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 rounded-full bg-amber-warm/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-warm" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>

            <h1 className="font-display text-3xl text-white mb-3">{t.title}</h1>
            <p className="text-neutral-400 text-sm mb-8">{t.description}</p>

            <form onSubmit={submit} className="text-left space-y-4">
              <div>
                <label htmlFor="recover-email" className="sr-only">
                  Email
                </label>
                <input
                  id="recover-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full rounded-xl border border-white/10 bg-surface-800/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-amber-warm/40 focus:outline-none focus:ring-1 focus:ring-amber-warm/30"
                  disabled={loading}
                  required
                />
              </div>

              {(validationError || networkError) && (
                <p className="text-sm text-red-400/90">{validationError ?? networkError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full px-6 py-3 text-sm font-medium bg-amber-warm/10 text-amber-warm border border-amber-warm/20 hover:bg-amber-warm/20 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? t.submitting : t.submit}
              </button>
            </form>

            <a
              href={homeHref}
              className="inline-block mt-8 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              {t.backToDiktame}
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
