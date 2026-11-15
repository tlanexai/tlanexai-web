"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/config";

// Cambia solo el prefijo de idioma y conserva el resto de la ruta,
// así /es/bitacora/001 lleva a /en/bitacora/001.
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(es|en)(?=\/|$)/, "");

  return (
    <nav aria-label={label} className="flex items-center gap-1 font-mono text-xs">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span className="text-text-mute">/</span>}
          {locale === current ? (
            <span aria-current="true" className="text-jade">
              {localeLabels[locale]}
            </span>
          ) : (
            <Link
              href={`/${locale}${rest}`}
              hrefLang={locale}
              className="text-text-mute transition-colors hover:text-text"
            >
              {localeLabels[locale]}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
