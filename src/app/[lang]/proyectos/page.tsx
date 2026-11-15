import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export async function generateMetadata({ params }: PageProps<"/[lang]/proyectos">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.projects.title,
    description: dict.projects.intro,
    alternates: { languages: { es: "/es/proyectos", en: "/en/proyectos" } },
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/proyectos">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="py-16">
      <h1 className="font-display text-4xl text-text">{dict.projects.title}</h1>
      <p className="mt-3 max-w-xl text-text-dim">{dict.projects.intro}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} lang={lang} dict={dict} />
        ))}
      </div>
    </section>
  );
}
