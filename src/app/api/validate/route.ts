import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isValidLicenseFormat } from '@/lib/license';

export async function POST(req: NextRequest) {
  try {
    const { license_key, mac_hardware_id } = await req.json();

    // Validar input
    if (!license_key || !mac_hardware_id) {
      return NextResponse.json(
        { valid: false, error: 'Faltan campos' },
        { status: 400 }
      );
    }

    // Validar formato
    if (!isValidLicenseFormat(license_key)) {
      return NextResponse.json(
        { valid: false, error: 'Formato inválido' },
        { status: 400 }
      );
    }

    // Buscar licencia
    const { data: license, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('license_key', license_key)
      .single();

    if (error || !license) {
      return NextResponse.json({ valid: false, error: 'Licencia no encontrada' });
    }

    // Verificar estado
    if (license.status !== 'active') {
      return NextResponse.json({ valid: false, error: 'Licencia revocada' });
    }

    // Verificar que el Mac coincide
    if (license.mac_hardware_id !== mac_hardware_id) {
      // Log validación fallida
      await supabase.from('activation_logs').insert({
        license_key,
        mac_hardware_id,
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        action: 'rejected',
      });

      return NextResponse.json({
        valid: false,
        error: 'Licencia activa en otro dispositivo',
      });
    }

    // Log validación exitosa
    await supabase.from('activation_logs').insert({
      license_key,
      mac_hardware_id,
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      action: 'validate',
    });

    return NextResponse.json({
      valid: true,
      license: {
        email: license.email,
        activated_at: license.activated_at,
      },
    });
  } catch (error: any) {
    console.error('[Validate] Error:', error);
    // Si hay error de red, dar el beneficio de la duda
    return NextResponse.json(
      { valid: true, offline: true, error: 'Error de validación, modo offline' },
      { status: 200 }
    );
  }
}
