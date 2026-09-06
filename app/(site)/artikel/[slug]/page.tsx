import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchArticles, fetchArticle, formatArticleDate, articleColorCls } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

function isHtml(s: string): boolean {
  return /<\/?[a-z][^>]*>/i.test(s);
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) return { title: "Artikel tidak ditemukan — KRUI.CO" };

  const title = `${article.title} — KRUI.CO`;
  const description = article.excerpt
    ? article.excerpt.slice(0, 155).trim() + (article.excerpt.length > 155 ? "…" : "")
    : `Artikel wisata seputar Krui, Pesisir Barat Lampung — ${article.categoryLabel}.`;

  return {
    title,
    description,
    keywords: [
      article.title,
      `artikel ${article.categoryLabel}`,
      "wisata Krui",
      "tips liburan Krui",
      "KRUI.CO",
    ],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/artikel/${slug}`,
      type: "article",
      siteName: "KRUI.CO",
      images: article.image ? [{ url: article.image, width: 1200, height: 630, alt: article.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.image ? [article.image] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/artikel/${slug}`,
    },
  };
}

export default async function ArtikelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([fetchArticle(slug), fetchArticles()]);
  if (!article) notFound();

  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);
  const dateStr = formatArticleDate(article.createdAt);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Artikel", item: `${SITE_URL}/artikel` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/artikel/${slug}` },
    ],
  };
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || undefined,
    image: article.image || undefined,
    author: { "@type": "Person", name: article.author || "KRUI.CO" },
    publisher: { "@type": "Organization", name: "KRUI.CO" },
    datePublished: article.createdAt,
    mainEntityOfPage: `${SITE_URL}/artikel/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <div className="pt-[72px]">
        <div className="max-w-content mx-auto px-[18px] lg:px-7 py-10">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-[13px] font-600 text-blue hover:opacity-80 no-underline"
          >
            ← Kembali ke artikel
          </Link>

          <div className="mt-6 max-w-3xl mx-auto">
            <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-mono ${articleColorCls(article.categoryColor)}`}>
              {article.categoryLabel || "Artikel"}
            </span>
            <h1 className="mt-4 font-display font-800 text-[26px] lg:text-[36px] leading-tight text-ink">
              {article.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-[13px] text-ink-soft">
              <span className="font-600 text-ink">{article.author || "KRUI.CO"}</span>
              <span>•</span>
              <span>{dateStr}</span>
            </div>

            {article.image && (
              <div className="mt-6 rounded-card overflow-hidden border border-line">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={1280}
                  height={720}
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>
            )}

            {article.excerpt && (
              <p className="mt-7 text-[17px] leading-relaxed text-ink font-500">
                {article.excerpt}
              </p>
            )}

            {isHtml(article.content) ? (
              <div
                className="mt-5 prose-article"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <div className="mt-5 text-[15.5px] leading-[1.85] text-ink whitespace-pre-wrap">
                {article.content}
              </div>
            )}

            {article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-bg-alt border border-line text-[12.5px] text-ink-soft"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display font-800 text-[20px] lg:text-[24px] text-ink">
                Artikel lainnya
              </h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((a) => (
                  <Link
                    key={a.id}
                    href={`/artikel/${a.slug}`}
                    className="group block bg-white border border-line rounded-card overflow-hidden hover:-translate-y-1.5 hover:shadow-card hover:border-transparent transition-all duration-300"
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
                      <h3 className="font-display font-700 text-[16px] leading-snug text-ink group-hover:text-blue transition-colors line-clamp-2">
                        {a.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-2 text-[12px] text-ink-soft">
                        <span className="font-600 text-ink">{a.author || "KRUI.CO"}</span>
                        <span>•</span>
                        <span>{formatArticleDate(a.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}