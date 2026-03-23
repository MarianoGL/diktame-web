-- Ejecutar en Supabase SQL Editor (una vez).
-- Rate limit: máximo 3 envíos de recuperación por email cada 24 h.

create table if not exists public.license_recovery_email_log (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

create index if not exists license_recovery_email_log_email_created_at_idx
  on public.license_recovery_email_log (email, created_at desc);

comment on table public.license_recovery_email_log is
  'Una fila por cada correo de recuperación enviado con éxito (email normalizado en minúsculas).';
