import type { MDXComponents } from "mdx/types";

// Los estilos de las entradas viven en .prose-tlanex (globals.css).
// Aquí puedes mapear etiquetas a componentes propios cuando los necesites.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
