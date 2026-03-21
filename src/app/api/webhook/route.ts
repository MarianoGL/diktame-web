import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';
import { generateLicenseKey } from '@/lib/license';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  // Verificar firma del webhook (seguridad: solo Stripe puede llamar aquí)
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error('[Webhook] Firma inválida:', err.message);
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
  }

  // Procesar solo pagos completados
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Solo procesar pagos de Diktame Pro
    if (session.metadata?.product !== 'diktame-pro') {
      return NextResponse.json({ received: true });
    }

    const email = session.customer_details?.email;
    const paymentId = session.payment_intent as string;
    const customerId = session.customer as string;

    if (!email) {
      console.error('[Webhook] No email en la sesión:', session.id);
      return NextResponse.json({ error: 'No email' }, { status: 400 });
    }

    // Generar clave de licencia única
    let licenseKey = generateLicenseKey();

    // Asegurar unicidad (raro pero posible)
    let attempts = 0;
    while (attempts < 5) {
      const { data: existing } = await supabase
        .from('licenses')
        .select('id')
        .eq('license_key', licenseKey)
        .single();

      if (!existing) break;
      licenseKey = generateLicenseKey();
      attempts++;
    }

    // Guardar licencia en Supabase
    const { error: dbError } = await supabase.from('licenses').insert({
      license_key: licenseKey,
      email: email,
      stripe_payment_id: paymentId,
      stripe_customer_id: customerId,
      status: 'active',
    });

    if (dbError) {
      console.error('[Webhook] Error guardando licencia:', dbError);
      return NextResponse.json({ error: 'Error DB' }, { status: 500 });
    }

    console.log(`[Webhook] Licencia generada: ${licenseKey} para ${email}`);

    // Stripe envía automáticamente un receipt al email del comprador
    // La clave de licencia se mostrará en la página de success
  }

  return NextResponse.json({ received: true });
}
