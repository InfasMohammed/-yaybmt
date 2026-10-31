import type { ProductImage } from "../data/types";

// A partial uploads batch must not erase images imported from an earlier month.
export function mergeProductImages(
  existing: ProductImage[],
  incoming: ProductImage[],
  sourceOrder: string[] = [],
): ProductImage[] {
  const bySource = new Map(existing.map((image) => [image.source, image]));
  for (const image of incoming) bySource.set(image.source, image);
  const order = [
    ...new Set([
      ...sourceOrder,
      ...existing.map((image) => image.source),
      ...incoming.map((image) => image.source),
    ]),
  ];
  const seen = new Set<string>();
  return order.flatMap((source) => {
    const image = bySource.get(source);
    if (!image) return [];
    const identity = image.originalSrc || image.src;
    if (seen.has(identity)) return [];
    seen.add(identity);
    return [image];
  });
}
