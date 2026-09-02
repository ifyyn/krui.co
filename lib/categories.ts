export type CategorySlug =
  | "tour"
  | "stay"
  | "transport"
  | "surf"
  | "rental"
  | "experience";

export interface Category {
  slug: CategorySlug;
  label: string;
  tagline: string;
  color: "blue" | "green" | "orange" | "surf" | "rental" | "experience";
  description: string;
  icon: "compass" | "bed" | "car" | "surf" | "bike" | "star";
}

export const categories: Category[] = [
  {
    slug: "tour",
    label: "Tour",
    tagline: "Paket wisata terkurasi dengan pemandu lokal",
    color: "blue",
    description:
      "Wisata terarah bersama pemandu lokal yang mengenal Krui luar dalam. Dari pantai, air terjun, hingga budaya warisan.",
    icon: "compass",
  },
  {
    slug: "stay",
    label: "Stay",
    tagline: "Penginapan pilihan dari villa sampai homestay",
    color: "green",
    description:
      "Tidur nyenyak setelah seharian berpetualang. Villa, homestay, dan resort pilihan yang diverifikasi tim KRUI.CO.",
    icon: "bed",
  },
  {
    slug: "transport",
    label: "Transport",
    tagline: "Mobil & driver untuk mobilitasmu",
    color: "orange",
    description:
      "Antar-jemput, sewa harian, atau trip antar destinasi. Driver lokal yang ramah dan jalannya paham betul.",
    icon: "car",
  },
  {
    slug: "surf",
    label: "Surf",
    tagline: "Surfing di gelombang legendaris Krui",
    color: "surf",
    description:
      "Selancar di ombak kelas dunia. Sewa papan, lesson dengan instruktur, dan guide ke spot terbaik.",
    icon: "surf",
  },
  {
    slug: "rental",
    label: "Rental",
    tagline: "Motor, papan, dan perlengkapan sewa",
    color: "rental",
    description:
      "Segala yang perlu kamu sewa untuk menjelajah mandiri — motor, papan selancar, snorkeling, dan lainnya.",
    icon: "bike",
  },
  {
    slug: "experience",
    label: "Experience",
    tagline: "Pengalaman lokal yang otentik",
    color: "experience",
    description:
      "Menyelam ke budaya Krui: kuliner, kerajinan, festival, dan pengalaman tak terlupakan bersama warga lokal.",
    icon: "star",
  },
];

let overrides: Category[] | null = null;

export function setCategoryOverrides(cats: Category[]) {
  overrides = cats.length ? cats : null;
}

export function getCategory(slug: string): Category | undefined {
  if (overrides) {
    const c = overrides.find((x) => x.slug === slug);
    if (c) return c;
  }
  return categories.find((c) => c.slug === slug);
}
