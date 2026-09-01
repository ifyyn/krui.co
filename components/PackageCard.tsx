import Link from "next/link";
import { Package, formatPrice } from "@/lib/packages";
import { PinIcon, ClockIcon, StarIcon } from "./icons";
import PackageCover from "./PackageCover";

export default function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link
      href={`/paket/${pkg.slug}`}
      className="group block bg-white border border-line rounded-card overflow-hidden hover:-translate-y-1.5 hover:shadow-card hover:border-transparent transition-all duration-300 flex flex-col"
    >
      <PackageCover pkg={pkg} className="aspect-[4/3] w-full" />
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-700 text-[17px] leading-snug text-ink group-hover:text-blue transition-colors">
          {pkg.title}
        </h3>

        <div className="mt-2 flex items-center gap-4 text-[13px] text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <PinIcon className="w-4 h-4" />
            {pkg.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4" />
            {pkg.duration}
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-line flex items-end justify-between">
          <div>
            <div className="text-[11px] font-mono text-ink-soft uppercase tracking-wider">Mulai dari</div>
            <div className="font-mono text-[18px] font-500 text-ink">{formatPrice(pkg.price)}</div>
          </div>
          <div className="inline-flex items-center gap-1.5 font-mono text-[13px] text-ink">
            <StarIcon className="w-4 h-4 text-orange" />
            <span className="font-500">{pkg.rating.toFixed(1)}</span>
            <span className="text-ink-soft">({pkg.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
