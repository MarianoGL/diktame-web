'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setError('No se encontró la sesión de pago');
      setLoading(false);
      return;
    }

    // Poll for the license key (webhook might take a moment)
    const fetchLicense = async (attempt = 0) => {
      try {
        const res = await fetch(`/api/license-by-session?session_id=${sessionId}`);
        const data = await res.json();

        if (data.license_key) {
          setLicenseKey(data.license_key);
          setEmail(data.email);
          setLoading(false);
        } else if (attempt < 10) {
          // Retry after 2 seconds (webhook might not have fired yet)
          setTimeout(() => fetchLicense(attempt + 1), 2000);
        } else {
          setError('Tu pago se ha procesado correctamente. Recibirás tu clave de licencia por email en breve.');
          setLoading(false);
        }
      } catch {
        if (attempt < 10) {
          setTimeout(() => fetchLicense(attempt + 1), 2000);
        } else {
          setError('Tu pago se ha procesado correctamente. Recibirás tu clave de licencia por email en breve.');
          setLoading(false);
        }
      }
    };

    fetchLicense();
  }, [sessionId]);

  const copyKey = () => {
    if (licenseKey) {
      navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {loading ? (
          <div>
            <div className="w-12 h-12 rounded-full border-2 border-amber-warm/30 border-t-amber-warm animate-spin mx-auto mb-6" />
            <h1 className="font-display text-3xl text-white mb-3">
              Preparando tu licencia...
            </h1>
            <p className="text-neutral-400 text-sm">
              Esto puede tardar unos segundos.
            </p>
          </div>
        ) : error ? (
          <div>
            <div className="w-16 h-16 rounded-full bg-amber-warm/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-warm" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="font-display text-3xl text-white mb-3">
              ¡Pago completado!
            </h1>
            <p className="text-neutral-400 text-sm mb-6">{error}</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-amber-warm/10 text-amber-warm border border-amber-warm/20 hover:bg-amber-warm/20 transition-all duration-300"
            >
              Volver a Diktame
            </a>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 rounded-full bg-amber-warm/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-warm" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h1 className="font-display text-3xl text-white mb-3">
              ¡Bienvenido a Diktame Pro!
            </h1>
            <p className="text-neutral-400 text-sm mb-8">
              Tu licencia ha sido generada. Cópiala e introdúcela en la app.
            </p>

            {/* License key display */}
            <div className="rounded-2xl border border-amber-warm/20 bg-surface-800/60 p-6 mb-6">
              <p className="text-xs text-neutral-500 mb-3 uppercase tracking-wider font-mono">
                Tu clave de licencia
              </p>
              <div className="flex items-center justify-center gap-3">
                <code className="text-xl font-mono text-amber-warm tracking-wider">
                  {licenseKey}
                </code>
                <button
                  onClick={copyKey}
                  className="p-2 rounded-lg bg-amber-warm/10 hover:bg-amber-warm/20 transition-colors"
                  title="Copiar clave"
                >
                  {copied ? (
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-amber-warm" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                  )}
                </button>
              </div>
              {email && (
                <p className="text-xs text-neutral-500 mt-3">
                  Asociada a {email}
                </p>
              )}
            </div>

            {/* Instructions */}
            <div className="text-left rounded-xl border border-white/5 bg-surface-800/20 p-5 mb-6">
              <p className="text-sm font-medium text-white mb-3">Cómo activar:</p>
              <ol className="space-y-2 text-sm text-neutral-400">
                <li className="flex gap-2">
                  <span className="text-amber-warm font-mono text-xs mt-0.5">1.</span>
                  Abre Diktame en tu Mac
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-warm font-mono text-xs mt-0.5">2.</span>
                  Haz clic en el icono de la barra de menú
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-warm font-mono text-xs mt-0.5">3.</span>
                  Ve a &quot;Activar Pro&quot; y pega tu clave
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-warm font-mono text-xs mt-0.5">4.</span>
                  ¡Listo! Todas las funciones Pro están desbloqueadas
                </li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/"
                className="px-6 py-3 rounded-full text-sm font-medium text-neutral-300 border border-white/10 hover:border-white/25 transition-all duration-300"
              >
                Volver a Diktame
              </a>
            </div>

            <p className="text-xs text-neutral-600 mt-6">
              Guarda esta clave en un sitio seguro. La necesitarás si reinstales la app.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-amber-warm/30 border-t-amber-warm animate-spin" />
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
