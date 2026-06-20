import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { siteConfig } = await getContent();
  return [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-06-20"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
