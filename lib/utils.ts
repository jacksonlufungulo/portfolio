import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names safely (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Coerce a possibly-malformed site URL (e.g. a bare host with no protocol, as
 * can be entered via /admin) into a valid absolute URL. Prevents `new URL()`
 * from throwing during metadata generation and crashing every page.
 */
export function normalizeUrl(
  raw: string | undefined | null,
  fallback = "https://example.com"
): string {
  const value = (raw ?? "").trim();
  if (!value) return fallback;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(withProtocol).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}
