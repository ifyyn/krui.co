import { resolveImageUrl } from "./catalog";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://brayendtravel.my.id";

export interface PublicArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  tags: string[];
  featured: boolean;
  category: string | null;
  categoryLabel: string;
  categoryColor: string;
  createdAt: string;
}

export interface PublicArticleCategory {
  id: number;
  slug: string;
  label: string;
  description?: string;
  color?: string;
}

async function getJson<T>(path: string, timeoutMs = 4000): Promise<T | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function normalize(a: PublicArticle): PublicArticle {
  return {
    ...a,
    excerpt: a.excerpt || "",
    content: a.content || "",
    tags: Array.isArray(a.tags) ? a.tags : [],
    categoryLabel: a.categoryLabel || a.category || "",
    categoryColor: a.categoryColor || "orange",
    image: resolveImageUrl(a.image),
  };
}

export async function fetchArticles(): Promise<PublicArticle[]> {
  const data = await getJson<PublicArticle[]>("/api/public/articles");
  if (!data) return [];
  return data.map(normalize);
}

export async function fetchArticle(slug: string): Promise<PublicArticle | null> {
  const data = await getJson<PublicArticle>(`/api/public/articles/${slug}`);
  if (!data) return null;
  return normalize(data);
}

export async function fetchArticleCategories(): Promise<PublicArticleCategory[]> {
  const data = await getJson<PublicArticleCategory[]>("/api/public/article-categories");
  if (!data) return [];
  return data;
}

export function formatArticleDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function articleColorCls(color: string): string {
  switch (color) {
    case "purple":
      return "bg-purple-100 text-purple-700";
    case "red":
      return "bg-red-100 text-red-700";
    case "green":
      return "bg-green-100 text-green-700";
    case "blue":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-orange-soft text-orange";
  }
}