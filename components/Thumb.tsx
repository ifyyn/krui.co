import { CategorySlug } from "@/lib/categories";
import { categoryStyle } from "@/lib/colorMap";
import { categoryIcon } from "./icons";

export default function Thumb({
  gradient,
  seed,
  className = "",
  label,
  icon,
}: {
  gradient: string;
  seed: number;
  className?: string;
  label?: string;
  icon?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden wave-pattern ${gradient} ${className}`}
    >
      <div
        className="absolute -bottom-10 -right-6 w-40 h-40 rounded-full bg-white/10"
        style={{ transform: `translateY(${(seed % 3) * 14}px)` }}
      />
      <div
        className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-black/5"
      />
      {icon && (
        <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white">
          {categoryIcon(icon)}
        </div>
      )}
      {label && (
        <div className="absolute bottom-4 left-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[#171717] text-sm font-display font-700">
            {label}
          </span>
        </div>
      )}
      <div className="absolute bottom-3 right-4 font-mono text-white/70 text-sm" style={{ letterSpacing: "0.1em" }}>
        KRUI.CO
      </div>
    </div>
  );
}

export function CategoryThumb({
  slug,
  seed,
  className = "",
  showIcon = true,
  showLabel = true,
}: {
  slug: CategorySlug;
  seed: number;
  className?: string;
  showIcon?: boolean;
  showLabel?: boolean;
}) {
  const style = categoryStyle(slug);
  const icon = getIconFor(slug);
  const label = getLabelFor(slug);
  return (
    <Thumb
      gradient={style.gradient}
      seed={seed}
      className={className}
      icon={showIcon ? icon : undefined}
      label={showLabel ? label : undefined}
    />
  );
}

function getIconFor(slug: CategorySlug): string {
  switch (slug) {
    case "tour":
      return "compass";
    case "stay":
      return "bed";
    case "transport":
      return "car";
    case "surf":
      return "surf";
    case "rental":
      return "bike";
    case "experience":
      return "star";
  }
}

function getLabelFor(slug: CategorySlug): string {
  switch (slug) {
    case "tour":
      return "Tour";
    case "stay":
      return "Stay";
    case "transport":
      return "Transport";
    case "surf":
      return "Surf";
    case "rental":
      return "Rental";
    case "experience":
      return "Experience";
  }
}
