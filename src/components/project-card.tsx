import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/lib/projects";

const statusColor: Record<Project["status"], string> = {
  live: "text-jade border-jade/50",
  building: "text-gold border-gold/50",
  idea: "text-magenta border-magenta/50",
};

export function ProjectCard({ project, lang, dict }: { project: Project; lang: Locale; dict: Dictionary }) {
  return (
    <article className="flex flex-col gap-3 border border-line bg-obsidian-2/80 p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-mono text-base text-text">{project.name}</h3>
        <span className={`border px-2 py-0.5 font-mono text-[11px] ${statusColor[project.status]}`}>
          {dict.projects.status[project.status]}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-text-dim">{project.description[lang]}</p>
      <ul className="flex flex-wrap gap-2 font-mono text-[11px] text-text-mute">
        {project.stack.map((tech) => (
          <li key={tech} className="bg-obsidian-3 px-2 py-0.5">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex gap-4 pt-1 font-mono text-xs">
        {project.repo && (
          <a href={project.repo} className="text-jade hover:underline">
            {dict.projects.repo} →
          </a>
        )}
        {project.url && (
          <a href={project.url} className="text-gold hover:underline">
            {dict.projects.visit} →
          </a>
        )}
      </div>
    </article>
  );
}
