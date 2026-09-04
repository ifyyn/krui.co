import Image from "next/image";
import { getCategory } from "@/lib/categories";
import { resolveImageUrl } from "@/lib/catalog";
import { categoryIcon } from "./icons";

const images: Record<string, string> = {
  tour: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlXSIebRi5RcjJxrSYBlPHbsfsRR6Fae1WdzVGYgRBnA&s=10",
  stay: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz0wyCj15dhfSut4VPTaHuIK1W-EhHgBHQVLvxSK9YUE5H9NFGb9YJGRA&s=10",
  transport:
    "https://www.buspariwisata.id/wp-content/uploads/slider/cache/22e01e96955f3ac1bf700aa06734921c/buspriwisata.id-foto-bus-pariwisata-gumara-transport-e.jpg",
  surf: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWMq7aWjoAjpIGLzcxy5Hn5Lg58VF42QOY5x40UE_hg&s=10",
  rental:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGjK82bPQVmWA2m4I_4pbh3sMSjcp2ifSfr7jwBjLHtQ&s=10",
  experience:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9qQV-3LNnwLSGMPCceHRQ8V1qcwK4p8z2u4d6HHx-g5KXjKLhY9MdKMf2&s=10",
};

export function getCategoryImage(slug: string): string {
  const cat = getCategory(slug);
  if (cat?.image?.trim()) return resolveImageUrl(cat.image);
  return images[slug] ?? images.tour;
}

export default function CategoryImage({
  slug,
  className = "",
  showLabel = true,
  showIcon = false,
  iconSize = "w-12 h-12",
}: {
  slug: string;
  className?: string;
  showLabel?: boolean;
  showIcon?: boolean;
  iconSize?: string;
}) {
  const cat = getCategory(slug);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={getCategoryImage(slug)}
        alt={cat?.label ?? slug}
        fill
        sizes="(min-width: 1024px) 20vw, 33vw"
        className="object-cover"
      />
      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white drop-shadow">{categoryIcon(cat?.icon || "compass", iconSize)}</span>
        </div>
      )}
      {showLabel && (
        <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full bg-white/90 text-[#171717] text-[12px] font-mono">
          {cat?.label}
        </span>
      )}
    </div>
  );
}