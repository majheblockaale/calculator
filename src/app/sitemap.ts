import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calconline.com";
  const lastModified = new Date();

  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/calculator", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/scientific-calculator", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/graphing-calculator", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/unit-converter", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/currency-converter", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/crypto-converter", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/solver", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/bmi-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/mortgage-calculator", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tip-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/percentage-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/date-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/age-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/gpa-calculator", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
