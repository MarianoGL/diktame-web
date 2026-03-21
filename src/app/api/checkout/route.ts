import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/#precios`,
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
