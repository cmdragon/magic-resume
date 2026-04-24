import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://magic-resume.cmdragon.cn/";

  const routes = [
    { route: "zh", priority: 1.0, changeFrequency: "daily" as const },
    { route: "en", priority: 1.0, changeFrequency: "daily" as const },
    {
      route: "zh/changelog",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      route: "en/changelog",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
  ];

  const sitemap: MetadataRoute.Sitemap = routes.map(
    ({ route, priority, changeFrequency }) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }),
  );

  return sitemap;
}
