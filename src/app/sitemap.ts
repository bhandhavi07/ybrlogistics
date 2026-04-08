import type { MetadataRoute } from "next";

/** Canonical site origin — sitemap lists homepage only per SEO configuration. */
const siteUrl = "https://www.ybrlogistics.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
