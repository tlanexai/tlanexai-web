import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mt-24 border-t border-line/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 font-mono text-xs text-text-mute sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>{dict.footer.built}</p>
        <div className="flex gap-4">
          <a href={site.github} className="hover:text-jade">
            github/tlanexai
          </a>
          <a href={site.repo} className="hover:text-jade">
            {dict.footer.source}
          </a>
        </div>
      </div>
    </footer>
  );
}
