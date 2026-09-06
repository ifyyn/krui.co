import type { Metadata } from "next";
import { Suspense } from "react";
import ArtikelClient from "@/components/ArtikelClient";
import { fetchArticles, fetchArticleCategories } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Artikel & Berita Wisata Krui — KRUI.CO",
  description:
    "Baca artikel, tips perjalanan, dan berita wisata terbaru seputar Krui, Pesisir Barat Lampung. Panduan lengkap untuk liburanmu.",
  keywords: [
    "artikel wisata Krui",
    "tips liburan Krui",
    "berita wisata Lampung",
    "panduan wisata Krui",
    "Krui Pesisir Barat",
    "KRUI.CO",
  ],
  alternates: { canonical: `${SITE_URL}/artikel` },
  openGraph: {
    title: "Artikel & Berita Wisata Krui — KRUI.CO",
    description:
      "Tips perjalanan dan berita wisata terbaru seputar Krui, Pesisir Barat Lampung.",
    url: `${SITE_URL}/artikel`,
    siteName: "KRUI.CO",
    type: "website",
    locale: "id_ID",
  },
};

export default async function ArtikelPage() {
  const [articles, categories] = await Promise.all([fetchArticles(), fetchArticleCategories()]);

  return (
    <div className="pt-[72px]">
      <div className="bg-bg-alt border-b border-line">
        <div className="max-w-content mx-auto px-[18px] lg:px-7 py-12 lg:py-16">
          <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-orange font-600">
            Artikel & Berita
          </p>
          <h1 className="mt-3 font-display font-800 text-[28px] lg:text-[40px] leading-tight text-ink">
            Cerita & Tips Wisata Krui
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            Kumpulan artikel, tips perjalanan, dan berita seputar Krui, Pesisir Barat
            Lampung — dari spot selancar hingga kuliner khas.
          </p>
        </div>
      </div>

      <Suspense fallback={<ArtikelSkeleton />}>
        <ArtikelClient articles={articles} categories={categories} />
      </Suspense>
    </div>
  );
}

function ArtikelSkeleton() {
  return (
    <>
      <div className="sticky top-[72px] z-30 bg-bg/90 backdrop-blur-md border-b border-line">
        <div className="py-2 max-w-content mx-auto px-[18px] lg:px-7 flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-line animate-pulse" />
          ))}
        </div>
      </div>
      <div className="max-w-content mx-auto px-[18px] lg:px-7 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-line rounded-card overflow-hidden animate-pulse"
            >
              <div className="aspect-[16/10] bg-bg-alt" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-16 bg-line rounded-full" />
                <div className="h-5 w-3/4 bg-line rounded" />
                <div className="h-4 w-2/3 bg-line rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}