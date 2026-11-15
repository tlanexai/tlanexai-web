import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { formatDate, type Post } from "@/lib/posts";

export function PostCard({ post, lang, entryLabel }: { post: Post; lang: Locale; entryLabel: string }) {
  return (
    <Link
      href={`/${lang}/bitacora/${post.slug}`}
      className="group block border border-line border-l-[3px] border-l-magenta bg-obsidian-2/80 px-5 py-4 transition-colors hover:border-l-jade hover:bg-obsidian-3"
    >
      <p className="font-mono text-xs text-text-mute">
        {entryLabel} · {String(post.number).padStart(3, "0")} · {formatDate(post.date, lang)}
      </p>
      <h3 className="mt-1 font-display text-lg text-text transition-colors group-hover:text-jade">
        {post.title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-text-dim">{post.summary}</p>
    </Link>
  );
}
