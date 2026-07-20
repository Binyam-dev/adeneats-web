import type { MetadataRoute } from "next";

const routes: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" }> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/cooks", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `https://adeneats.com${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
