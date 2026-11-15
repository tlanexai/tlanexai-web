import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate, getPost, getPosts } from "@/lib/posts";

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!hasLocale(params.lang)) return [];
  const posts = await getPosts(params.lang);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/bitacora/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = await getPost(lang, slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.summary,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/bitacora/${slug}`])),
    },
    openGraph: { type: "article", title: post.meta.title, description: post.meta.summary },
  };
}

// El slug se lee dentro de <Suspense> para que la navegación muestre
// el armazón de la página al instante mientras carga la entrada.
export default function PostPage({ params }: PageProps<"/[lang]/bitacora/[slug]">) {
  return (
    <Suspense fallback={<div className="mx-auto min-h-[60vh] max-w-2xl py-16" />}>
      <Post params={params} />
    </Suspense>
  );
}

async function Post({ params }: Pick<PageProps<"/[lang]/bitacora/[slug]">, "params">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, post] = await Promise.all([getDictionary(lang), getPost(lang, slug)]);
  if (!post) notFound();
  const { Content, meta } = post;

  return (
    <article className="mx-auto max-w-2xl py-16">
      <Link href={`/${lang}/bitacora`} className="font-mono text-xs text-text-mute hover:text-jade">
        ← {dict.log.back}
      </Link>
      <p className="mt-8 font-mono text-xs text-magenta">
        {dict.log.entry} · {String(meta.number).padStart(3, "0")} · {formatDate(meta.date, lang)}
      </p>
      <h1 className="mt-3 font-display text-3xl leading-tight text-text sm:text-4xl">{meta.title}</h1>
      <p className="mt-4 text-lg text-text-dim">{meta.summary}</p>
      <div className="greca mt-8 mb-10" />
      <div className="prose-tlanex">
        <Content />
      </div>
    </article>
  );
}
