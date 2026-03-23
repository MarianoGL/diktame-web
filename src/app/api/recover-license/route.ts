import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { normalizeLicenseEmail, sendLicenseEmail } from '@/lib/license-email';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENERIC_OK = { ok: true as const };

function maskEmailForLog(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain || !local) return '***';
  const show = local.slice(0, 2);
  return `${show}***@${domain}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const emailRaw = typeof body === 'object' && body !== null && 'email' in body ? (body as { email: unknown }).email : null;
  if (typeof emailRaw !== 'string') {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }

  const normalized = normalizeLicenseEmail(emailRaw);
  if (!normalized || !EMAIL_RE.test(normalized)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count, error: countError } = await supabase
    .from('license_recovery_email_log')
    .select('*', { count: 'exact', head: true })
    .eq('email', normalized)
    .gte('created_at', since);

  if (countError) {
    console.error('[recover-license] Error contando envíos:', countError.message);
    return NextResponse.json(GENERIC_OK);
  }

  if ((count ?? 0) >= 3) {
    console.warn('[recover-license] Rate limit (interno):', maskEmailForLog(normalized));
    return NextResponse.json(GENERIC_OK);
  }

  const { data: rows, error: licError } = await supabase
    .from('licenses')
    .select('license_key, status')
    .eq('email', normalized)
    .eq('status', 'active')
    .limit(1);

  if (licError) {
    console.error('[recover-license] Error buscando licencia:', licError.message);
    return NextResponse.json(GENERIC_OK);
  }

  const license = rows?.[0];
  if (!license) {
    return NextResponse.json(GENERIC_OK);
  }

  const sent = await sendLicenseEmail({
    to: normalized,
    licenseKey: license.license_key,
    buyerEmail: normalized,
    isRecovery: true,
  });

  if (!sent.ok) {
    console.error('[recover-license] Fallo Brevo:', sent.error);
    return NextResponse.json(GENERIC_OK);
  }

  const { error: insertError } = await supabase.from('license_recovery_email_log').insert({
    email: normalized,
  });

  if (insertError) {
    console.error('[recover-license] Error guardando log:', insertError.message);
  }

  return NextResponse.json(GENERIC_OK);
}
