import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('key');

  if (raw === null || raw.trim() === '') {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const key = raw.trim().toUpperCase();

  const { data, error } = await supabase
    .from('licenses')
    .select('id')
    .eq('license_key', key)
    .eq('status', 'active')
    .maybeSingle();

  if (error) {
    console.error('[ValidateLicense]', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }

  if (data) {
    return NextResponse.json({ valid: true });
  }

  return NextResponse.json({ valid: false });
}
