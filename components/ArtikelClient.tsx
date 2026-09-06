"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  PublicArticle,
  PublicArticleCategory,
  formatArticleDate,
  articleColorCls,
} from "@/lib/articles";

export default function ArtikelClient({
  articles,
  categories,
}: {
  articles: PublicArticle[];
  categories: PublicArticleCategory[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const allowedSlugs = categories.map((c) => c.slug);

  const [cat, setCat] = useState<string>("all");

  useEffect(() => {
    setCat(allowedSlugs.includes(catParam as string) ? (catParam as string) : "all");
  }, [catParam, JSON.stringify(allowedSlugs)]);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const a of articles) {
      m[a.category || "all"] = (m[a.category || "all"] || 0) + 1;
    }
    return m;
  }, [articles]);

  const filtered = useMemo(
    () => (cat === "all" ? articles : articles.filter((a) => a.category === cat)),
    [cat, articles]
  );

  const featured = cat === "all" ? filtered.find((a) => a.featured) || filtered[0] || null : null;
  const rest = featured ? filtered.filter((a) => a.slug !== featured.slug) : filtered;

  const tabs = [
    { slug: "all", label: "Semua", count: articles.length },
    ...categories.map((c) => ({ slug: c.slug, label: c.label, count: counts[c.slug] || 0 })),
  ];

  const selectTab = (slug: string) => {
    setCat(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("cat");
    else params.set("cat", slug);
    router.replace(`/artikel${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  return (
    <>
      <div className="sticky top-[72px] z-30 bg-bg/90 backdrop-blur-md border-b border-line">
        <div className="py-2">
          <div className="max-w-content mx-auto flex gap-2 overflow-x-auto pb-1 -mx-[18px] lg:mx-0 px-[18px] lg:px-7">
            {tabs.map((t) => (
            <button
              key={t.slug}
              onClick={() => selectTab(t.slug)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-500 transition-colors ${
                cat === t.slug
                  ? "bg-ink text-white"
                  : "bg-white border border-line text-ink-soft hover:border-ink"
              }`}
            >
              {t.label}
              <span
                className={`font-mono text-[11.5px] ${
                  cat === t.slug ? "text-white/60" : "text-ink-soft/60"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
          </div>
          </div>
        </div>

      <div className="max-w-content mx-auto px-[18px] lg:px-7 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-ink-soft">
            <p className="text-[16px] font-600 text-ink">Belum ada artikel di kategori ini</p>
            <p className="mt-1 text-[14px]">Artikel akan segera dihadirkan.</p>
            <button
              onClick={() => selectTab("all")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange text-white font-display font-600 text-[15px] px-8 py-3 hover:brightness-95 transition-all"
            >
              Tampilkan semua artikel
            </button>
          </div>
        ) : (
          <>
            {featured && (
              <div className="grid lg:grid-cols-2 gap-10 items-center border-b border-line pb-10">
                <Link
                  href={`/artikel/${featured.slug}`}
                  className="group block overflow-hidden rounded-card border border-line"
                >
                  <div className="aspect-[16/9] bg-bg-alt overflow-hidden">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        width={1280}
                        height={720}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#98a2b3] text-4xl">
                        ▨
                      </div>
                    )}
                  </div>
                </Link>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[12px] font-mono ${articleColorCls(featured.categoryColor)}`}
                  >
                    {featured.categoryLabel || "Artikel"}
                  </span>
                  <Link href={`/artikel/${featured.slug}`} className="block group">
                    <h2 className="mt-3 font-display font-800 text-[22px] lg:text-[28px] leading-snug text-ink group-hover:text-blue transition-colors">
                      {featured.title}
                    </h2>
                  </Link>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-[12.5px] text-ink-soft">
                    <span className="font-600 text-ink">{featured.author || "KRUI.CO"}</span>
                    <span>•</span>
                    <span>{formatArticleDate(featured.createdAt)}</span>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
                featured ? "mt-10" : ""
              }`}
            >
              {rest.map((a) => (
                <Link
                  key={a.id}
                  href={`/artikel/${a.slug}`}
                  className="group block bg-white border border-line rounded-card overflow-hidden hover:-translate-y-1.5 hover:border-transparent transition-all duration-300"
                >
                  <div className="aspect-[16/10] bg-bg-alt overflow-hidden">
                    {a.image ? (
                      <Image
                        src={a.image}
                        alt={a.title}
                        width={900}
                        height={560}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#98a2b3] text-3xl">
                        ▨
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11.5px] font-mono ${articleColorCls(a.categoryColor)}`}
                    >
                      {a.categoryLabel || "Artikel"}
                    </span>
                    <h3 className="mt-2.5 font-display font-700 text-[16.5px] leading-snug text-ink group-hover:text-blue transition-colors line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-soft line-clamp-2">
                      {a.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[12px] text-ink-soft">
                      <span className="font-600 text-ink">{a.author || "KRUI.CO"}</span>
                      <span>•</span>
                      <span>{formatArticleDate(a.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}