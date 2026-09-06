import { resolveImageUrl } from "./catalog";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://brayendtravel.my.id";

export interface PublicKruiSection {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  active: boolean;
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

function normalize(s: PublicKruiSection): PublicKruiSection {
  return {
    ...s,
    summary: s.summary || "",
    content: s.content || "",
    image: resolveImageUrl(s.image),
  };
}

export async function fetchKruiSections(): Promise<PublicKruiSection[]> {
  const data = await getJson<PublicKruiSection[]>("/api/public/tentang-krui");
  if (!data) return [];
  return data.map(normalize);
}

export function isHtml(s: string): boolean {
  return /<\/?[a-z][^>]*>/i.test(s);
}

export function stripHtml(s: string): string {
  return s
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}