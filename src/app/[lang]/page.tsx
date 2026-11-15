import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { Glyph } from "@/components/glyph";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, posts] = await Promise.all([getDictionary(lang), getPosts(lang)]);

  return (
    <>
      <section className="grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-sm text-magenta">{"// "}{dict.home.kicker}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-text sm:text-5xl">
            {dict.home.titleA}
            <br />
            <span className="glow-jade text-jade">{dict.home.titleB}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-dim">{dict.home.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
            <Link
              href={`/${lang}/proyectos`}
              className="bg-jade px-4 py-2 text-obsidian transition-opacity hover:opacity-90"
            >
              {dict.home.ctaProjects} →
            </Link>
            <Link
              href={`/${lang}/bitacora`}
              className="border border-gold px-4 py-2 text-gold transition-colors hover:bg-gold/10"
            >
              {dict.home.ctaLog}
            </Link>
          </div>
        </div>
        <div className="hidden justify-center md:flex">
          <div className="glow-box bg-obsidian-2/60 p-8">
            <Glyph size={200} />
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="py-8">
          <h2 className="mb-5 font-mono text-sm text-text-mute">## {dict.home.latest}</h2>
          <div className="grid gap-4">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} lang={lang} entryLabel={dict.log.entry} />
            ))}
          </div>
        </section>
      )}

      <section className="py-8">
        <h2 className="mb-5 font-mono text-sm text-text-mute">## {dict.home.projects}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} lang={lang} dict={dict} />
          ))}
        </div>
      </section>
    </>
  );
}
