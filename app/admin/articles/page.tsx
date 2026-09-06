"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  Badge,
  Btn,
  Card,
  EmptyState,
  Spinner,
} from "@/components/admin/ui";
import {
  apiGetArticles,
  apiDeleteArticle,
  AdminArticle,
} from "@/lib/admin-api";
import { resolveImageUrl } from "@/lib/catalog";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<AdminArticle[] | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setError("");
    setArticles(null);
    apiGetArticles()
      .then(setArticles)
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat data"));
  }, []);

  useEffect(load, [load]);

  const onDelete = async (a: AdminArticle) => {
    if (!window.confirm(`Hapus artikel "${a.title}"?`)) return;
    try {
      await apiDeleteArticle(a.id);
      load();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Gagal menghapus");
    }
  };

  return (
    <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-800 text-[22px] lg:text-[26px] text-[#111827] tracking-tight">
            Artikel
          </h1>
          <p className="text-[13.5px] text-[#667085] mt-1">
            Kelola artikel & berita wisata Krui
          </p>
        </div>
        <a
          href="/admin/articles/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg text-[14px] font-600 px-4 py-2.5 transition-colors bg-orange text-white hover:brightness-95 no-underline"
        >
          + Tulis Artikel
        </a>
      </div>

      <Card>
        {error && <div className="p-6 text-red-600 text-[14px]">{error}</div>}
        {!articles && !error && <Spinner />}
        {articles && articles.length === 0 && (
          <EmptyState title="Belum ada artikel" subtitle="Tulis artikel pertama kamu" />
        )}
        {articles &&
          articles.map((a) => (
            <div
              key={a.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 border-b border-[#f6f6f7] last:border-0"
            >
              <div className="w-14 h-14 shrink-0 rounded-lg bg-[#f2f4f7] overflow-hidden">
                {a.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resolveImageUrl(a.image)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#98a2b3] text-lg">
                    ▨
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[15px] font-600 text-[#111827]">{a.title}</span>
                  {a.featured && <Badge tone="orange">Unggulan</Badge>}
                  {a.published === false && <Badge>Draft</Badge>}
                </div>
                <div className="text-[12.5px] text-[#98a2b3] mt-1 flex items-center gap-1.5">
                  <Badge>{a.category?.label || "Tanpa kategori"}</Badge>
                  <span>{a.author || "—"}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={`/artikel/${a.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[#667085] hover:text-ink hover:underline"
                >
                  Lihat
                </a>
                <a
                  href={`/admin/articles/${a.id}`}
                  className="text-[13px] text-orange hover:underline"
                >
                  Edit
                </a>
                <button
                  onClick={() => onDelete(a)}
                  className="text-[13px] text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
      </Card>
    </AdminShell>
  );
}