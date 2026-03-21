import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isValidLicenseFormat } from '@/lib/license';

export async function POST(req: NextRequest) {
  try {
    const { license_key, mac_hardware_id } = await req.json();

    // Validar input
    if (!license_key || !mac_hardware_id) {
      return NextResponse.json(
        { error: 'Faltan campos: license_key y mac_hardware_id' },
        { status: 400 }
      );
    }

    // Validar formato de clave
    if (!isValidLicenseFormat(license_key)) {
      return NextResponse.json(
        { error: 'Formato de clave inválido' },
        { status: 400 }
      );
    }

    // Buscar licencia
    const { data: license, error: fetchError } = await supabase
      .from('licenses')
      .select('*')
      .eq('license_key', license_key)
      .single();

    if (fetchError || !license) {
      // Log intento fallido
      await supabase.from('activation_logs').insert({
        license_key,
        mac_hardware_id,
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        action: 'rejected',
      });

      return NextResponse.json(
        { error: 'Clave de licencia no encontrada' },
        { status: 404 }
      );
    }

    // Verificar estado
    if (license.status !== 'active') {
      return NextResponse.json(
        { error: 'Esta licencia ha sido revocada' },
        { status: 403 }
      );
    }

    // Verificar si ya está activada en otro Mac
    if (license.mac_hardware_id && license.mac_hardware_id !== mac_hardware_id) {
      // Log intento rechazado
      await supabase.from('activation_logs').insert({
        license_key,
        mac_hardware_id,
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        action: 'rejected',
      });

      return NextResponse.json(
        {
          error: 'Esta licencia ya está activa en otro Mac. Desactívala primero desde el Mac original.',
          activated_on: 'otro dispositivo',
        },
        { status: 409 }
      );
    }

    // Activar: vincular al Mac
    const { error: updateError } = await supabase
      .from('licenses')
      .update({
        mac_hardware_id: mac_hardware_id,
        activated_at: new Date().toISOString(),
      })
      .eq('id', license.id);

    if (updateError) {
      console.error('[Activate] Error actualizando:', updateError);
      return NextResponse.json(
        { error: 'Error activando licencia' },
        { status: 500 }
      );
    }

    // Log activación exitosa
    await supabase.from('activation_logs').insert({
      license_key,
      mac_hardware_id,
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      action: 'activate',
    });

    console.log(`[Activate] Licencia ${license_key} activada en ${mac_hardware_id}`);

    return NextResponse.json({
      success: true,
      message: 'Licencia activada correctamente',
      license: {
        key: license.license_key,
        email: license.email,
        activated_at: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('[Activate] Error:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
}
