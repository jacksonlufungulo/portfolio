import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content-store";
import { normalizeUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { siteConfig } = await getContent();
  return [
    {
      url: normalizeUrl(siteConfig.url),
      lastModified: new Date("2026-06-20"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
