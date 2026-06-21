import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content-store";
import { normalizeUrl } from "@/lib/utils";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { siteConfig } = await getContent();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    sitemap: `${normalizeUrl(siteConfig.url)}/sitemap.xml`,
  };
}
