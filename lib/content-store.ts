import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { list, put } from "@vercel/blob";
import { defaultContent, type SiteContent } from "@/lib/data";

/**
 * Storage strategy:
 * - On Vercel (BLOB_READ_WRITE_TOKEN present) the filesystem is read-only, so
 *   content is persisted to Vercel Blob.
 * - Locally (no token) content is read/written to content/site-content.json.
 *
 * Read order in Blob mode: saved blob → committed seed file → defaults, so a
 * fresh deploy shows the content committed to the repo until the first admin
 * save in production.
 */
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
const BLOB_KEY = "site-content.json";
const CONTENT_DIR = path.join(process.cwd(), "content");
const CONTENT_FILE = path.join(CONTENT_DIR, "site-content.json");

/**
 * Shallow-merge persisted content over the defaults, deep-merging siteConfig so
 * newly added keys still resolve even if the saved data predates them.
 */
function withDefaults(saved: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...saved,
    siteConfig: { ...defaultContent.siteConfig, ...(saved.siteConfig ?? {}) },
  };
}

async function readSeedFile(): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    return withDefaults(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return null;
  }
}

/** Read the current site content (falls back to seed file, then defaults). */
export async function getContent(): Promise<SiteContent> {
  try {
    if (useBlob) {
      const { blobs } = await list({ prefix: BLOB_KEY });
      const found = blobs.find((b) => b.pathname === BLOB_KEY);
      if (found) {
        const res = await fetch(found.url, { cache: "no-store" });
        if (res.ok) {
          return withDefaults((await res.json()) as Partial<SiteContent>);
        }
      }
      // No saved blob yet → use the committed seed file, else defaults.
      return (await readSeedFile()) ?? defaultContent;
    }

    return (await readSeedFile()) ?? defaultContent;
  } catch {
    return defaultContent;
  }
}

/** Persist site content (Blob in production, filesystem locally). */
export async function saveContent(content: SiteContent): Promise<void> {
  if (useBlob) {
    await put(BLOB_KEY, JSON.stringify(content, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }

  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
}
