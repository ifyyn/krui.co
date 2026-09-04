import { Package, getAllPackages } from "./packages";
import { Category, categories as staticCategories, setCategoryOverrides } from "./categories";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://brayendtravel.my.id";

export function resolveImageUrl(url: string | undefined | null): string {
  if (!url || !url.trim()) return "";
  if (url.startsWith("http")) return url;
  return `${API_URL}${url}`;
}

const fallbackImages: Record<string, string> = {
  tour: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  stay: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  transport: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
  surf: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=80",
  rental: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
  experience: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
};

interface PublicCategory {
  id: number;
  slug: string;
  label: string;
  tagline?: string;
  description?: string;
  color: string;
  icon: string;
  image?: string;
  packageCount?: number;
}

interface PublicPackage {
  id: number | string;
  slug: string;
  title: string;
  category: string | null;
  location?: string;
  duration?: string;
  price?: number | string;
  rating?: number | string;
  reviews?: number;
  thumbnail?: number;
  image?: string;
  featured?: boolean;
  description?: string;
  includes?: string[];
  excludes?: string[];
  itinerary?: { time: string; title: string; detail: string }[];
  meetingPoint?: string;
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

function toPackage(p: PublicPackage, i: number): Package {
  const cat = p.category || "tour";
  const image = resolveImageUrl(p.image) || fallbackImages[cat] || fallbackImages.tour;
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,
    category: (cat as Package["category"]) || "tour",
    location: p.location || "",
    duration: p.duration || "",
    price: Number(p.price) || 0,
    rating: Number(p.rating) || 0,
    reviews: Math.max(0, Number(p.reviews) || 0),
    thumbnail: Number(p.thumbnail) || i + 1,
    image,
    featured: Boolean(p.featured),
    description: p.description || "",
    includes: Array.isArray(p.includes) ? p.includes : [],
    excludes: Array.isArray(p.excludes) ? p.excludes : [],
    itinerary: Array.isArray(p.itinerary) ? p.itinerary : [],
    meetingPoint: p.meetingPoint || "",
  };
}

function toCategory(c: PublicCategory): Category {
  return {
    slug: c.slug as Category["slug"],
    label: c.label,
    tagline: c.tagline || "",
    color: (c.color || "blue") as Category["color"],
    icon: (c.icon || "compass") as Category["icon"],
    description: c.description || "",
    image: resolveImageUrl(c.image) || undefined,
  };
}

export async function fetchPackages(): Promise<Package[]> {
  const data = await getJson<PublicPackage[]>("/api/public/packages");
  if (!data) return getAllPackages();
  return data.map(toPackage);
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await getJson<PublicCategory[]>("/api/public/categories");
  if (!data || !data.length) return staticCategories;
  const cats = data.map(toCategory);
  setCategoryOverrides(cats);
  return cats;
}

export async function fetchCatalog() {
  const [packages, categories] = await Promise.all([fetchPackages(), fetchCategories()]);
  return { packages, categories };
}