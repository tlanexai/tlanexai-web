import { readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import type { Locale } from "@/i18n/config";

// Cada entrada vive en src/content/bitacora/<idioma>/<slug>.mdx y exporta:
//   export const metadata = { title, date: "AAAA-MM-DD", summary }
// Usa el mismo slug en ambos idiomas para que el cambio de idioma funcione.
export type PostMeta = {
  title: string;
  date: string;
  summary: string;
};

export type Post = PostMeta & { slug: string; number: number };

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "bitacora");

async function loadPost(lang: Locale, slug: string) {
  const mod: { default: ComponentType; metadata: PostMeta } = await import(
    `@/content/bitacora/${lang}/${slug}.mdx`
  );
  return mod;
}

export async function getPosts(lang: Locale): Promise<Post[]> {
  "use cache";
  const files = await readdir(path.join(CONTENT_DIR, lang));
  const slugs = files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await loadPost(lang, slug);
      const number = Number.parseInt(slug, 10);
      return { ...metadata, slug, number: Number.isNaN(number) ? 0 : number };
    }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date) || b.number - a.number);
}

export async function getPost(lang: Locale, slug: string) {
  try {
    const { default: Content, metadata } = await loadPost(lang, slug);
    const number = Number.parseInt(slug, 10);
    return { Content, meta: { ...metadata, slug, number: Number.isNaN(number) ? 0 : number } };
  } catch {
    return null;
  }
}

export function formatDate(date: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
