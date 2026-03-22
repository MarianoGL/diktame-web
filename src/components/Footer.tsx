import { type Translations } from '@/lib/i18n';

interface FooterProps {
  t: Translations['footer'];
}

export default function Footer({ t }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="12" width="2.5" height="8" rx="1.25" fill="#E8A634" opacity="0.6" />
              <rect x="9" y="8" width="2.5" height="16" rx="1.25" fill="#E8A634" opacity="0.8" />
              <rect x="14" y="5" width="2.5" height="22" rx="1.25" fill="#E8A634" />
              <rect x="19" y="9" width="2.5" height="14" rx="1.25" fill="#E8A634" opacity="0.8" />
              <rect x="24" y="11" width="2.5" height="10" rx="1.25" fill="#E8A634" opacity="0.6" />
            </svg>
            <span className="font-display text-lg text-white">Diktame</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-neutral-300 transition-colors">
              {t.privacy}
            </a>
            <a href="#" className="hover:text-neutral-300 transition-colors">
              {t.terms}
            </a>
            <a href="mailto:mrngl1991@gmail.com" className="hover:text-neutral-300 transition-colors">
              {t.contact}
            </a>
          </div>

          <p className="text-xs text-neutral-600">
            © {year} Diktame. {t.madeIn}
          </p>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-neutral-700 font-mono">{t.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
