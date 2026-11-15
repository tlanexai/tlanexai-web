import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { Glyph } from "@/components/glyph";

export async function generateMetadata({ params }: PageProps<"/[lang]/sobre-mi">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.about.title,
    alternates: { languages: { es: "/es/sobre-mi", en: "/en/sobre-mi" } },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/sobre-mi">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="mx-auto max-w-2xl py-16">
      <h1 className="font-display text-4xl text-text">{dict.about.title}</h1>

      <div className="mt-10 border border-line bg-obsidian-2/80 p-6">
        <div className="flex items-center gap-3">
          <Glyph size={28} />
          <h2 className="font-display text-xl text-jade">{dict.about.nameTitle}</h2>
        </div>
        <p className="mt-4 leading-relaxed text-text-dim">{dict.about.name}</p>
      </div>

      <h2 className="mt-12 font-display text-xl text-text">{dict.about.whoTitle}</h2>
      <p className="mt-3 leading-relaxed text-text-dim">{dict.about.who}</p>

      <h2 className="mt-12 font-display text-xl text-text">{dict.about.contactTitle}</h2>
      <ul className="mt-3 font-mono text-sm">
        <li>
          <a href={site.github} className="text-jade hover:underline">
            github.com/tlanexai
          </a>
        </li>
      </ul>
    </section>
  );
}
