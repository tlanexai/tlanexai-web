import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export async function generateMetadata({ params }: PageProps<"/[lang]/bitacora">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.log.title,
    description: dict.log.intro,
    alternates: { languages: { es: "/es/bitacora", en: "/en/bitacora" } },
  };
}

export default async function LogPage({ params }: PageProps<"/[lang]/bitacora">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, posts] = await Promise.all([getDictionary(lang), getPosts(lang)]);

  return (
    <section className="py-16">
      <h1 className="font-display text-4xl text-text">{dict.log.title}</h1>
      <p className="mt-3 max-w-xl text-text-dim">{dict.log.intro}</p>
      <div className="mt-10 grid gap-4">
        {posts.length === 0 ? (
          <p className="font-mono text-sm text-text-mute">{dict.log.empty}</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.slug} post={post} lang={lang} entryLabel={dict.log.entry} />
          ))
        )}
      </div>
    </section>
  );
}
