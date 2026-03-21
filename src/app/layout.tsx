import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Diktame — Dictado por voz para macOS. Local. Privado. Instantáneo.',
  description:
    'Transcribe tu voz a texto en tu Mac sin internet, sin APIs, sin enviar datos. 100% local con Whisper AI. Pulsa, habla, pega. Así de simple. Desde 0€.',
  keywords: [
    'dictado por voz macOS',
    'transcripción voz a texto Mac',
    'speech to text Mac offline',
    'whisper macOS app',
    'voz a texto sin internet',
    'dictado offline Mac',
    'voice to text Apple Silicon',
    'transcripción local privada',
    'alternativa dictado Mac',
    'app dictado español macOS',
    'voice typing Mac',
    'dictar texto Mac sin nube',
    'whisper AI local Mac',
    'traducción voz en vivo',
    'dictado por voz sin suscripción',
    'app transcripción M1 M2 M3 M4',
    'mejor app dictado Mac 2025',
    'dictado profesional macOS',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Diktame — Dictado por voz para macOS',
    description: 'Transcribe tu voz a texto localmente. Sin internet. Sin APIs. Sin datos enviados. Desde 0€.',
    url: 'https://diktame.app',
    siteName: 'Diktame',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Diktame — Tu voz, tu texto. Dictado por voz 100% local para macOS.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diktame — Dictado por voz para macOS',
    description: 'Transcribe tu voz a texto localmente. Sin internet. Sin APIs. Sin datos enviados.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://diktame.app',
  },
  metadataBase: new URL('https://diktame.app'),
};

// JSON-LD structured data for FAQ rich snippets + Software Application
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Diktame',
      operatingSystem: 'macOS',
      applicationCategory: 'UtilitiesApplication',
      description: 'Dictado por voz para macOS. 100% local, sin internet, sin APIs. Transcribe con Whisper AI directamente en tu Mac.',
      url: 'https://diktame.app',
      offers: [
        {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          name: 'Diktame Free',
        },
        {
          '@type': 'Offer',
          price: '14.99',
          priceCurrency: 'EUR',
          name: 'Diktame Pro',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Diktame funciona sin internet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Diktame procesa todo localmente en tu Mac usando el Neural Engine. Una vez descargado el modelo de Whisper (~150 MB), no necesitas conexión a internet para nada.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Es compatible con mi Mac?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Diktame funciona en cualquier Mac con Apple Silicon (M1, M2, M3, M4) y macOS 14 Sonoma o superior.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Mis datos de voz se envían a algún servidor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Cero datos salen de tu Mac. El audio se procesa localmente y se descarta después de la transcripción. No hay servidores, no hay APIs, no hay cuentas de usuario.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta Diktame?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Diktame Free es gratis con 3 minutos al día. Diktame Pro cuesta 14,99€ en un pago único, sin suscripción, para siempre.',
          },
        },
        {
          '@type': 'Question',
          name: '¿En qué idiomas funciona?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Diktame soporta español, inglés, francés, alemán, italiano, portugués, árabe, chino, japonés y coreano. Diktame Pro incluye detección automática de idioma.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise-bg">
        {children}
      </body>
    </html>
  );
}
