import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isValidLicenseFormat } from '@/lib/license';

export async function POST(req: NextRequest) {
  try {
    const { license_key, mac_hardware_id } = await req.json();

    if (!license_key || !mac_hardware_id) {
      return NextResponse.json(
        { error: 'Faltan campos' },
        { status: 400 }
      );
    }

    if (!isValidLicenseFormat(license_key)) {
      return NextResponse.json(
        { error: 'Formato inválido' },
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
      return NextResponse.json(
        { error: 'Licencia no encontrada' },
        { status: 404 }
      );
    }

    // Verificar que el Mac que pide desactivar es el que tiene la licencia
    if (license.mac_hardware_id !== mac_hardware_id) {
      return NextResponse.json(
        { error: 'Solo puedes desactivar la licencia desde el Mac donde está activa' },
        { status: 403 }
      );
    }

    // Desactivar: quitar mac_hardware_id
    const { error: updateError } = await supabase
      .from('licenses')
      .update({
        mac_hardware_id: null,
        activated_at: null,
      })
      .eq('id', license.id);

    if (updateError) {
      return NextResponse.json(
        { error: 'Error desactivando' },
        { status: 500 }
      );
    }

    // Log
    await supabase.from('activation_logs').insert({
      license_key,
      mac_hardware_id,
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      action: 'deactivate',
    });

    return NextResponse.json({
      success: true,
      message: 'Licencia desactivada. Puedes activarla en otro Mac.',
    });
  } catch (error: any) {
    console.error('[Deactivate] Error:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
}
