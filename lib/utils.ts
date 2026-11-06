/** Class composition for the supplied UI component; no class-merging dependency is needed. */
export function cn(...values: (string | false | null | undefined)[]) {
  return values.filter(Boolean).join(" ");
}
