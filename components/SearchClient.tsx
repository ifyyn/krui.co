"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories, CategorySlug } from "@/lib/categories";
import { getAllPackages } from "@/lib/packages";
import { SearchIcon } from "@/components/icons";
import { Eyebrow } from "@/components/Button";
import PackageCard from "@/components/PackageCard";

const catFilter: (CategorySlug | "all")[] = ["all", ...categories.map((c) => c.slug)];

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategorySlug | "all">("all");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      setSearched(true);
    }
  }, [searchParams]);

  const all = getAllPackages();

  const results = useMemo(() => {
    if (!searched) return [];
    let list = all;
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          categories.find((c) => c.slug === p.category)?.label.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, cat, searched, all]);

  const doSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
  };

  return (
    <>
      <div className="bg-bg-alt border-b border-line">
        <div className="max-w-content mx-auto px-[18px] lg:px-7 py-10 lg:py-14">
          <Eyebrow className="text-orange">Pencarian</Eyebrow>
          <h1 className="mt-2 font-display font-800 text-[32px] lg:text-[40px] text-ink tracking-tight">
            Cari paket atau lokasi
          </h1>
          <form onSubmit={doSearch} className="mt-6 relative max-w-2xl">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Misal: surfing, villa, sunset, Banding Agung…"
              className="w-full pl-12 pr-32 py-4 bg-white border-[1.5px] border-line rounded-[12px] text-[15px] text-ink placeholder:text-ink-soft focus:border-blue outline-none transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-ink text-white font-display font-600 text-[14px] px-5 py-2.5 hover:bg-blue transition-colors"
            >
              Cari
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-content mx-auto px-[18px] lg:px-7 py-8 lg:py-12">
        {!searched ? (
          <div className="text-center py-16 px-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-bg-alt wave-ink flex items-center justify-center mb-5">
              <SearchIcon className="w-8 h-8 text-ink-soft" />
            </div>
            <h3 className="font-display font-700 text-[20px] text-ink">Mulai cari perjalananmu</h3>
            <p className="mt-2 text-[14px] text-ink-soft max-w-md mx-auto">
              Ketik kata kunci di atas untuk menemukan paket wisata, penginapan, transport, dan pengalaman di Krui.
            </p>
          </div>
        ) : results.length === 0 ? (
          <EmptyState query={query} onReset={() => { setQuery(""); setCat("all"); setSearched(false); router.push("/search", { scroll: false }); }} />
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="font-mono text-[13px] text-ink-soft">
                Menampilkan {results.length} hasil untuk “<span className="text-ink">{query || "semua"}</span>”
              </span>
              <div className="flex flex-wrap gap-2">
                {catFilter.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-500 transition-colors ${
                      cat === c ? "bg-ink text-white" : "bg-white border border-line text-ink-soft hover:border-ink"
                    }`}
                  >
                    {c === "all" ? "Semua" : categories.find((x) => x.slug === c)?.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {results.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function EmptyState({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto w-24 h-24 rounded-full bg-bg-alt wave-ink flex items-center justify-center mb-6">
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
          <path d="M8 11h6" />
        </svg>
      </div>
      <h3 className="font-display font-700 text-[22px] text-ink">Tidak ada hasil untuk “{query}”</h3>
      <p className="mt-2 text-[14px] text-ink-soft">Coba kata kunci lain, atau lihat semua paket yang kami tawarkan.</p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange text-white font-display font-600 text-[15px] px-8 py-3 hover:brightness-95 transition-all"
      >
        Tampilkan semua paket
      </button>
    </div>
  );
}
