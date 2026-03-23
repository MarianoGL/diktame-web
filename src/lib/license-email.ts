import { TransactionalEmailsClient } from '@getbrevo/brevo/transactionalEmails';

export function normalizeLicenseEmail(email: string): string {
  return email.trim().toLowerCase();
}

export type SendLicenseEmailParams = {
  to: string;
  licenseKey: string;
  buyerEmail: string;
  isRecovery: boolean;
};

function buildEmailHtml(licenseKey: string, buyerEmail: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8" /></head>
<body style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.5; color: #171717; max-width: 560px; margin: 0 auto; padding: 24px;">
  <p>Hola,</p>
  <p>Tu clave de licencia de <strong>Diktame Pro</strong>:</p>
  <p style="font-size: 18px; font-family: ui-monospace, monospace; letter-spacing: 0.05em; background: #f5f5f4; padding: 12px 16px; border-radius: 8px; border: 1px solid #e7e5e4;">${escapeHtml(licenseKey)}</p>
  <p style="color: #57534e; font-size: 14px;">Compra asociada a: <strong>${escapeHtml(buyerEmail)}</strong></p>
  <p><strong>Cómo activar</strong></p>
  <ol style="padding-left: 1.25rem; color: #44403c;">
    <li>Abre Diktame en tu Mac.</li>
    <li>Haz clic en el icono de la barra de menú.</li>
    <li>Ve a «Activar Pro» y pega tu clave.</li>
  </ol>
  <p style="font-size: 14px; color: #78716c;">Guarda esta clave en un sitio seguro; la necesitarás si reinstalas la app.</p>
  <p style="margin-top: 24px; font-size: 13px; color: #a8a29e;">— Diktame</p>
</body>
</html>
`.trim();
}

function buildEmailText(licenseKey: string, buyerEmail: string): string {
  return [
    'Tu clave de licencia de Diktame Pro:',
    '',
    licenseKey,
    '',
    `Compra asociada a: ${buyerEmail}`,
    '',
    'Cómo activar:',
    '1. Abre Diktame en tu Mac.',
    '2. Haz clic en el icono de la barra de menú.',
    '3. Ve a «Activar Pro» y pega tu clave.',
    '',
    'Guarda esta clave en un sitio seguro.',
  ].join('\n');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getTransactionalEmailsApi(): TransactionalEmailsClient | null {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new TransactionalEmailsClient({ apiKey });
}

/**
 * Envía la clave por correo vía TransactionalEmailsClient (`sendTransacEmail`).
 * No registrar la clave en logs en caso de error.
 */
export async function sendLicenseEmail(params: SendLicenseEmailParams): Promise<{ ok: true } | { ok: false; error: string }> {
  const fromEmail = process.env.BREVO_FROM_EMAIL?.trim();
  const fromName = process.env.BREVO_FROM_NAME?.trim();
  if (!fromEmail || !fromName) {
    console.error('[license-email] Faltan BREVO_FROM_EMAIL o BREVO_FROM_NAME');
    return { ok: false, error: 'missing_from' };
  }

  const transactionalEmailsApi = getTransactionalEmailsApi();
  if (!transactionalEmailsApi) {
    console.error('[license-email] Falta BREVO_API_KEY');
    return { ok: false, error: 'missing_api_key' };
  }

  const subject = params.isRecovery
    ? 'Recuperación de tu licencia de Diktame'
    : 'Tu licencia de Diktame';

  try {
    await transactionalEmailsApi.sendTransacEmail({
      sender: { email: fromEmail, name: fromName },
      to: [{ email: params.to }],
      subject,
      htmlContent: buildEmailHtml(params.licenseKey, params.buyerEmail),
      textContent: buildEmailText(params.licenseKey, params.buyerEmail),
    });

    return { ok: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown';
    console.error('[license-email] Brevo error:', msg);
    return { ok: false, error: msg };
  }
}
