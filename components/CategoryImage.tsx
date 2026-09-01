import Image from "next/image";
import { CategorySlug, getCategory } from "@/lib/categories";
import { categoryIcon } from "./icons";

const images: Record<CategorySlug, string> = {
  tour: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  stay: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  transport: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
  surf: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=80",
  rental: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
  experience: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
};

export function getCategoryImage(slug: CategorySlug): string {
  return images[slug];
}

export default function CategoryImage({
  slug,
  className = "",
  showLabel = true,
  showIcon = true,
  sizes = "(min-width: 1024px) 33vw, 50vw",
}: {
  slug: CategorySlug;
  className?: string;
  showLabel?: boolean;
  showIcon?: boolean;
  sizes?: string;
}) {
  const cat = getCategory(slug);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={images[slug]}
        alt={cat?.label ?? slug}
        fill
        sizes={sizes}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent pointer-events-none" />
      {showLabel && (
        <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full bg-white/90 text-[#171717] text-[12px] font-mono">
          {cat?.label}
        </span>
      )}
    </div>
  );
}
