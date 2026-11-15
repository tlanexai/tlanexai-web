import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Glyph } from "./glyph";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${lang}/proyectos`, label: dict.nav.projects },
    { href: `/${lang}/bitacora`, label: dict.nav.log },
    { href: `/${lang}/sobre-mi`, label: dict.nav.about },
  ];

  return (
    <header className="border-b border-line/70 bg-obsidian/80 backdrop-blur">
      <div className="greca" />
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-mono text-sm">
          <Glyph size={20} />
          <span className="text-jade">tlanex</span>
          <span className="-ml-2 text-text">ai</span>
        </Link>
        <div className="flex items-center gap-5">
          <nav className="flex gap-4 font-mono text-xs sm:text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-mute transition-colors hover:text-jade"
              >
                /{link.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher current={lang} label={dict.nav.switchLanguage} />
        </div>
      </div>
    </header>
  );
}
