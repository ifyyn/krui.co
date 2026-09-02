"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader, Spinner, Card } from "@/components/admin/ui";
import { PackageForm } from "@/components/admin/PackageForm";
import { apiGetCategories, AdminCategory } from "@/lib/admin-api";

export default function NewPackagePage() {
  const [categories, setCategories] = useState<AdminCategory[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGetCategories()
      .then(setCategories)
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat kategori"));
  }, []);

  return (
    <AdminShell>
      <PageHeader title="Tambah Paket" subtitle="Buat paket baru untuk ditampilkan" />
      {error && (
        <Card className="p-6 text-red-600 text-[14px]">{error}</Card>
      )}
      {!categories && !error && <Spinner />}
      {categories && categories.length === 0 && (
        <Card className="p-6 text-[14px] text-[#667085]">
          Belum ada kategori. Tambahkan kategori dulu di menu Kategori.
        </Card>
      )}
      {categories && categories.length > 0 && (
        <PackageForm categories={categories} />
      )}
    </AdminShell>
  );
}
