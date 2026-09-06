"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader, Spinner, Card } from "@/components/admin/ui";
import { ArticleForm } from "@/components/admin/ArticleForm";
import {
  apiGetArticle,
  apiGetArticleCategories,
  AdminArticle,
  AdminArticleCategory,
} from "@/lib/admin-api";

export default function EditArticlePage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [article, setArticle] = useState<AdminArticle | null>(null);
  const [categories, setCategories] = useState<AdminArticleCategory[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiGetArticle(id), apiGetArticleCategories()])
      .then(([a, c]) => {
        setArticle(a);
        setCategories(c);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat data"));
  }, [id]);

  return (
    <AdminShell>
      <PageHeader
        title="Edit Artikel"
        subtitle={article ? article.title : "Perbarui artikel"}
      />
      {error && <Card className="p-6 text-red-600 text-[14px]">{error}</Card>}
      {(!article || !categories) && !error && <Spinner />}
      {article && categories && <ArticleForm categories={categories} initial={article} />}
    </AdminShell>
  );
}