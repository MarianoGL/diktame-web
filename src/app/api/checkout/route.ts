import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const SUPPORTED_LOCALES = [
  'es',
  'en',
  'fr',
  'de',
  'it',
  'pt',
  'ru',
] as const satisfies ReadonlyArray<Stripe.Checkout.SessionCreateParams.Locale>;

function resolveCheckoutLocale(
  raw: string | null
): Stripe.Checkout.SessionCreateParams.Locale {
  if (raw && (SUPPORTED_LOCALES as readonly string[]).includes(raw)) {
    return raw as Stripe.Checkout.SessionCreateParams.Locale;
  }
  return 'es';
}

export async function POST(req: NextRequest) {
  try {
    const locale = resolveCheckoutLocale(req.nextUrl.searchParams.get('locale'));
    const successPath = locale === 'es' ? '/success' : `/${locale}/success`;
    const cancelPath = locale === 'es' ? '/#precios' : `/${locale}#precios`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale,
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}${cancelPath}`,
      customer_creation: 'always',
      metadata: {
        product: 'diktame-pro',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('[Checkout] Error:', error.message);
    return NextResponse.json(
      { error: 'Error creando sesión de pago' },
      { status: 500 }
    );
  }
}
