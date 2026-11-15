import type { Locale } from "@/i18n/config";

// Agrega aquí cada proyecto nuevo. Todo proyecto nace como repo público.
export type Project = {
  slug: string;
  name: string;
  status: "live" | "building" | "idea";
  stack: string[];
  repo?: string;
  url?: string;
  description: Record<Locale, string>;
};

export const projects: Project[] = [
  {
    slug: "tlanexai-web",
    name: "tlanexai-web",
    status: "building",
    stack: ["Next.js", "TypeScript", "Tailwind", "MDX", "Vercel"],
    repo: "https://github.com/tlanexai/tlanexai-web",
    description: {
      es: "Este sitio. Bilingüe, con bitácora en MDX y un sistema visual cyberpunk mexica. Es el primer proyecto de la marca y el lugar donde se registra todo lo demás.",
      en: "This site. Bilingual, with an MDX dev log and a Mexica-cyberpunk visual system. It's the brand's first project and the place where everything else gets logged.",
    },
  },
];
