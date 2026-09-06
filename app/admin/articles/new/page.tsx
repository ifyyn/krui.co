"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader, Spinner, Card } from "@/components/admin/ui";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { apiGetArticleCategories, AdminArticleCategory } from "@/lib/admin-api";

export default function NewArticlePage() {
  const [categories, setCategories] = useState<AdminArticleCategory[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGetArticleCategories()
      .then(setCategories)
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat kategori artikel"));
  }, []);

  return (
    <AdminShell>
      <PageHeader title="Tulis Artikel" subtitle="Buat artikel baru untuk disajikan di situs" />
      {error && <Card className="p-6 text-red-600 text-[14px]">{error}</Card>}
      {!categories && !error && <Spinner />}
      {categories && categories.length === 0 && (
        <Card className="p-6 text-[14px] text-[#667085]">
          Belum ada kategori artikel. Tambahkan dulu di menu Kategori Artikel.
        </Card>
      )}
      {categories && categories.length > 0 && <ArticleForm categories={categories} />}
    </AdminShell>
  );
}