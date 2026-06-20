import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content-store";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { siteConfig } = await getContent();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
