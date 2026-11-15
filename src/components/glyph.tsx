// Glifo de TlanexAI: un "sol" geométrico en retícula de 5x5, como de códice.
// J = jade, M = magenta, G = oro, . = vacío.
const PATTERN = ["J.M.J", ".GGG.", "MGJGM", ".GGG.", "J.M.J"];

const COLORS: Record<string, string> = {
  J: "var(--color-jade)",
  M: "var(--color-magenta)",
  G: "var(--color-gold)",
};

export function Glyph({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      aria-hidden="true"
      className={className}
    >
      {PATTERN.flatMap((row, y) =>
        row.split("").map((cell, x) =>
          cell === "." ? null : (
            <rect
              key={`${x}-${y}`}
              x={x * 10 + 1}
              y={y * 10 + 1}
              width={8}
              height={8}
              fill={COLORS[cell]}
            />
          ),
        ),
      )}
    </svg>
  );
}
