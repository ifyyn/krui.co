import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://brayendtravel.my.id";

interface SitemapPackage {
  slug: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/paket`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  let packagePages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/api/public/packages`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data: SitemapPackage[] = await res.json();
      packagePages = data.map((p) => ({
        url: `${SITE_URL}/paket/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }
  } catch {
    // fallback tanpa halaman dinamis
  }

  return [...staticPages, ...packagePages];
}