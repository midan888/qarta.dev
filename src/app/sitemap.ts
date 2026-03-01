import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { tenants } from "@/lib/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic restaurant menu pages
  const allTenants = await db.select({ slug: tenants.slug, updatedAt: tenants.updatedAt }).from(tenants);

  const menuPages: MetadataRoute.Sitemap = allTenants.map((t) => ({
    url: `${baseUrl}/r/${t.slug}`,
    lastModified: t.updatedAt || new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...menuPages];
}
