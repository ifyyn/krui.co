import { CategorySlug, getCategory } from "@/lib/categories";
import { categoryStyle } from "@/lib/colorMap";
import { categoryIcon } from "./icons";

export function getCategoryImage(slug: string): string {
  return `https://krui-co.vercel.app/og-image.png`;
}

export default function CategoryImage({
  slug,
  className = "",
  showLabel = true,
  showIcon = true,
  iconSize = "w-12 h-12",
}: {
  slug: string;
  className?: string;
  showLabel?: boolean;
  showIcon?: boolean;
  iconSize?: string;
}) {
  const cat = getCategory(slug);
  const style = categoryStyle(slug as CategorySlug);
  return (
    <div
      className={`relative overflow-hidden bg-orange-soft border-2 border-orange/20 shadow-sm rounded-2xl ${className}`}
      role="img"
      aria-label={cat?.label ?? slug}
    >
      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={style.text}>{categoryIcon(cat?.icon || "compass", iconSize)}</span>
        </div>
      )}
      {showLabel && (
        <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full bg-white/90 text-[#171717] text-[12px] font-mono border border-line">
          {cat?.label}
        </span>
      )}
    </div>
  );
}