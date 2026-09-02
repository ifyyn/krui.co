"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader, Spinner, Card } from "@/components/admin/ui";
import { PackageForm } from "@/components/admin/PackageForm";
import {
  apiGetPackage,
  apiGetCategories,
  AdminPackage,
  AdminCategory,
} from "@/lib/admin-api";

export default function EditPackagePage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [pkg, setPkg] = useState<AdminPackage | null>(null);
  const [categories, setCategories] = useState<AdminCategory[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiGetPackage(id), apiGetCategories()])
      .then(([p, c]) => {
        setPkg(p);
        setCategories(c);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat data"));
  }, [id]);

  return (
    <AdminShell>
      <PageHeader
        title="Edit Paket"
        subtitle={pkg ? pkg.title : "Perbarui data paket"}
      />
      {error && <Card className="p-6 text-red-600 text-[14px]">{error}</Card>}
      {(!pkg || !categories) && !error && <Spinner />}
      {pkg && categories && <PackageForm categories={categories} initial={pkg} />}
    </AdminShell>
  );
}
