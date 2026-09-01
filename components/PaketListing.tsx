"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories, CategorySlug, getCategory } from "@/lib/categories";
import { getAllPackages, Package } from "@/lib/packages";
import { SearchIcon, ChevronDownIcon } from "@/components/icons";
import { Eyebrow } from "@/components/Button";
import PackageCard from "@/components/PackageCard";

const tabs = [{ slug: "all" as const, label: "Semua" }, ...categories.map((c) => ({ slug: c.slug as CategorySlug, label: c.label }))];

const allowedCats = categories.map((c) => c.slug);

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export default function PaketListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  const [cat, setCat] = useState<CategorySlug | "all">(allowedCats.includes(catParam as CategorySlug) ? (catParam as CategorySlug) : "all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [visible, setVisible] = useState(9);

  useEffect(() => {
    const next = allowedCats.includes(catParam as CategorySlug) ? (catParam as CategorySlug) : "all";
    setCat(next);
    setVisible(9);
  }, [catParam]);

  const all = getAllPackages();

  const filtered = useMemo(() => {
    let list: Package[] = all;
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].reverse();
        break;
      case "featured":
      default:
        list = [...list].sort((a, b) => Number(b.featured || 0) - Number(a.featured || 0));
        break;
    }
    return list;
  }, [cat, search, sort, all]);

  const shown = filtered.slice(0, visible);
  const activeLabel = cat === "all" ? "Semua paket" : getCategory(cat)?.label;

  const selectTab = (slug: CategorySlug | "all") => {
    setCat(slug);
    setVisible(9);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("cat");
    else params.set("cat", slug);
    router.replace(`/paket${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  return (
    <div className="pt-[72px]">
      <div className="bg-bg-alt border-b border-line">
        <div className="max-w-content mx-auto px-[18px] lg:px-7 py-10 lg:py-14">
          <Eyebrow className="text-orange">Jelajahi</Eyebrow>
          <h1 className="mt-2 font-display font-800 text-[32px] lg:text-[44px] text-ink tracking-tight">
            {activeLabel}
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft max-w-lg">
            Paket wisata, penginapan, dan pengalaman terkurasi untuk Krui.
          </p>
        </div>
      </div>

      <div className="sticky top-[72px] z-30 bg-bg/90 backdrop-blur-md border-b border-line">
        <div className="max-w-content mx-auto px-[18px] lg:px-7 py-3 flex flex-col gap-3">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-[18px] lg:mx-0 px-[18px] lg:px-0">
            {tabs.map((t) => (
              <button
                key={t.slug}
                onClick={() => selectTab(t.slug)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13.5px] font-500 transition-colors ${
                  cat === t.slug
                    ? "bg-ink text-white"
                    : "bg-white border border-line text-ink-soft hover:border-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-soft" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setVisible(9); }}
                placeholder="Cari paket atau lokasi…"
                className="w-full pl-11 pr-4 py-2.5 bg-white border-[1.5px] border-line rounded-[10px] text-[14px] text-ink placeholder:text-ink-soft focus:border-blue outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[12px] uppercase tracking-wider text-ink-soft">
                {filtered.length} paket
              </span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none pl-4 pr-9 py-2.5 bg-white border-[1.5px] border-line rounded-[10px] text-[13.5px] text-ink focus:border-blue outline-none cursor-pointer"
                >
                  <option value="featured">Direkomendasikan</option>
                  <option value="rating">Rating tertinggi</option>
                  <option value="price-asc">Harga terendah</option>
                  <option value="price-desc">Harga tertinggi</option>
                  <option value="newest">Terbaru</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-[18px] lg:px-7 py-8 lg:py-12">
        {shown.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {shown.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
            {visible < filtered.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisible((v) => v + 9)}
                  className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink/70 text-ink px-8 py-3 font-display font-600 text-[15px] hover:bg-ink hover:text-white transition-all"
                >
                  Muat lebih banyak
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            search={search}
            onReset={() => {
              setSearch("");
              setCat("all");
              setVisible(9);
            }}
          />
        )}
      </div>
    </div>
  );
}

function EmptyState({ search, onReset }: { search: string; onReset: () => void }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto w-24 h-24 rounded-full bg-bg-alt wave-ink flex items-center justify-center mb-6">
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
          <path d="M8 11h6" />
        </svg>
      </div>
      <h3 className="font-display font-700 text-[22px] text-ink">Tidak ada paket ditemukan</h3>
      {search && (
        <p className="mt-2 text-[14px] text-ink-soft">
          Tidak ada hasil untuk “<span className="font-mono text-ink">{search}</span>”. Coba kata kunci lain.
        </p>
      )}
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange text-white font-display font-600 text-[15px] px-8 py-3 hover:brightness-95 transition-all"
      >
        Tampilkan semua paket
      </button>
    </div>
  );
}
