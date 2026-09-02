import Image from "next/image";
import { Package } from "@/lib/packages";
import { getCategory } from "@/lib/categories";
import { categoryStyle } from "@/lib/colorMap";
import { categoryIcon } from "./icons";

export default function PackageCover({
  pkg,
  className = "",
}: {
  pkg: Package;
  className?: string;
}) {
  const cat = getCategory(pkg.category);
  const style = categoryStyle(pkg.category);
  const isRental = pkg.category === "rental";
  const noImage = !pkg.image || !pkg.image.trim();
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isRental || noImage ? (
        <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} />
      ) : (
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      )}
      {(isRental || noImage) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/90">{categoryIcon(cat?.icon || "bike")}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent pointer-events-none" />
      <span
        className={`absolute top-3 left-3 inline-block px-3 py-1 rounded-full text-[12px] font-mono ${style.badgeBg} ${style.text}`}
      >
        {cat?.label}
      </span>
      {pkg.featured && (
        <span className="absolute top-3 right-3 inline-block px-2.5 py-1 rounded-full bg-ink/80 backdrop-blur-sm text-white text-[11px] font-mono uppercase tracking-wider">
          Dipilih tim
        </span>
      )}
    </div>
  );
}
