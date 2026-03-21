// TODO: Activar cuando Stripe esté configurado
// 
// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';
// 
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-04-10',
// });
// 
// export async function POST(req: NextRequest) {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       mode: 'payment',
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price: process.env.STRIPE_PRICE_ID!, // Crear en Stripe Dashboard
//           quantity: 1,
//         },
//       ],
//       success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${req.nextUrl.origin}/#precios`,
//       metadata: {
//         product: 'diktame-pro',
//       },
//     });
// 
//     return NextResponse.json({ url: session.url });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function POST() {
  // Placeholder — descomentar el código de arriba cuando Stripe esté listo
  return new Response(
    JSON.stringify({ message: 'Stripe checkout no configurado todavía' }),
    { status: 501, headers: { 'Content-Type': 'application/json' } }
  );
}
