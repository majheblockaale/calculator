import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calconline.com";
  const lastModified = new Date();

  const staticPages = [
    "",
    "/calculator",
    "/scientific-calculator",
    "/unit-converter",
    "/currency-converter",
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
