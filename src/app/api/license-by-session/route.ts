import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Falta session_id' }, { status: 400 });
  }

  try {
    // Obtener el payment_intent de la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentId = session.payment_intent as string;

    if (!paymentId) {
      return NextResponse.json({ error: 'Pago no encontrado' }, { status: 404 });
    }

    // Buscar la licencia por payment_id
    const { data: license, error } = await supabase
      .from('licenses')
      .select('license_key, email')
      .eq('stripe_payment_id', paymentId)
      .single();

    if (error || !license) {
      // Puede que el webhook aún no haya procesado
      return NextResponse.json({ pending: true }, { status: 202 });
    }

    return NextResponse.json({
      license_key: license.license_key,
      email: license.email,
    });
  } catch (error: any) {
    console.error('[LicenseBySession] Error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
