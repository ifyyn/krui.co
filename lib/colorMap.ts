import { Category, categories, CategorySlug } from "./categories";

export interface CategoryStyle {
  gradient: string;
  badgeBg: string;
  text: string;
  chip: string;
  hover: string;
}

const styles: Record<string, CategoryStyle> = {
  tour: {
    gradient: "from-[#1E6FD9] to-[#0E8FBF]",
    badgeBg: "bg-blue-soft",
    text: "text-blue",
    chip: "bg-white/20",
    hover: "hover:text-blue",
  },
  stay: {
    gradient: "from-[#2FA84F] to-[#3C9A3F]",
    badgeBg: "bg-green-soft",
    text: "text-green",
    chip: "bg-white/20",
    hover: "hover:text-green",
  },
  transport: {
    gradient: "from-[#F5821F] to-[#E0672F]",
    badgeBg: "bg-orange-soft",
    text: "text-orange",
    chip: "bg-white/20",
    hover: "hover:text-orange",
  },
  surf: {
    gradient: "from-[#0E8FBF] to-[#1E6FD9]",
    badgeBg: "bg-blue-soft",
    text: "text-[#0E8FBF]",
    chip: "bg-white/20",
    hover: "hover:text-[#0E8FBF]",
  },
  rental: {
    gradient: "from-[#3C9A3F] to-[#2FA84F]",
    badgeBg: "bg-green-soft",
    text: "text-[#3C9A3F]",
    chip: "bg-white/20",
    hover: "hover:text-[#3C9A3F]",
  },
  experience: {
    gradient: "from-[#E0672F] to-[#F5821F]",
    badgeBg: "bg-orange-soft",
    text: "text-[#E0672F]",
    chip: "bg-white/20",
    hover: "hover:text-[#E0672F]",
  },
};

export function categoryStyle(slug: CategorySlug): CategoryStyle {
  return styles[slug] ?? styles.tour;
}

export function categoryLabel(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}
