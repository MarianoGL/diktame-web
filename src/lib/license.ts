import crypto from 'crypto';

/**
 * Genera una clave de licencia única con formato: DKTM-XXXX-XXXX-XXXX-XXXX
 * Usa crypto seguro para evitar colisiones y predicciones
 */
export function generateLicenseKey(): string {
  const segments = 4;
  const segmentLength = 4;
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sin I/O/0/1 para evitar confusión

  const parts: string[] = [];
  for (let s = 0; s < segments; s++) {
    let segment = '';
    const bytes = crypto.randomBytes(segmentLength);
    for (let i = 0; i < segmentLength; i++) {
      segment += chars[bytes[i] % chars.length];
    }
    parts.push(segment);
  }

  return `DKTM-${parts.join('-')}`;
}

/**
 * Valida el formato de una clave de licencia
 */
export function isValidLicenseFormat(key: string): boolean {
  return /^DKTM-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(key);
}
