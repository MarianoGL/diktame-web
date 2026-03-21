import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Diktame — Dictado por voz para macOS. Local. Privado. Instantáneo.',
  description:
    'Transcribe tu voz a texto en tu Mac sin internet, sin APIs, sin enviar datos. 100% local con Whisper AI. Pulsa, habla, pega. Así de simple.',
  keywords: [
    'dictado por voz',
    'transcripción',
    'macOS',
    'whisper',
    'voz a texto',
    'speech to text',
    'offline',
    'privacidad',
    'Apple Silicon',
  ],
  openGraph: {
    title: 'Diktame — Dictado por voz para macOS',
    description: 'Transcribe tu voz a texto localmente. Sin internet. Sin APIs. Sin datos enviados.',
    url: 'https://diktame.app',
    siteName: 'Diktame',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diktame — Dictado por voz para macOS',
    description: 'Transcribe tu voz a texto localmente. Sin internet. Sin APIs. Sin datos enviados.',
  },
  metadataBase: new URL('https://diktame.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="noise-bg">
        {children}
      </body>
    </html>
  );
}
