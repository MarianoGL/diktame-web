# Diktame — Landing Page

Landing page para [diktame.app](https://diktame.app). Dictado por voz para macOS, 100% local.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion + CSS
- **Pagos**: Stripe (pago único)
- **Deploy**: Vercel
- **Dominio**: diktame.app

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores:

```bash
cp .env.example .env.local
```

## Deploy

Conectado a Vercel vía GitHub. Cada push a `main` despliega automáticamente.

## Estructura

```
src/
  app/
    layout.tsx          — Layout raíz, metadata SEO
    page.tsx            — Página principal
    globals.css         — Estilos globales + marca
    api/
      checkout/route.ts — API Stripe checkout
  components/
    Navbar.tsx          — Barra de navegación
    Hero.tsx            — Sección hero con waveform
    HowItWorks.tsx      — Cómo funciona (3 pasos)
    Features.tsx        — Funcionalidades
    Pricing.tsx         — Precios Free vs Pro
    Footer.tsx          — Pie de página
```
