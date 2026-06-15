import type { Media } from "@/payload-types";

export type ResolvedImage = { src: string; alt: string };

// Payload upload fields resolve to a number (unpopulated id), the Media object,
// or null. This normalizes them into next/image-ready props, or null when no
// usable image is set — so callers can fall back to the placeholder design.
export function resolveImage(
  value: number | Media | null | undefined,
): ResolvedImage | null {
  if (!value || typeof value === "number" || !value.url) return null;
  return { src: value.url, alt: value.alt ?? "" };
}
