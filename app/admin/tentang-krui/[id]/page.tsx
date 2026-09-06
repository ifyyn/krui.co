"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, Spinner } from "@/components/admin/ui";
import { KruiSectionForm } from "@/components/admin/KruiSectionForm";
import { apiGetKruiSection, KruiSection } from "@/lib/admin-api";

export default function AdminKruiSectionEditPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [section, setSection] = useState<KruiSection | null | undefined>(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    apiGetKruiSection(id)
      .then(setSection)
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat bagian"));
  }, [id]);

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="font-display font-800 text-[22px] lg:text-[26px] text-[#111827] tracking-tight">
          Tentang Krui — Edit Bagian
        </h1>
        <p className="text-[13.5px] text-[#667085] mt-1">
          Perbarui isi dan pengaturan bagian
        </p>
      </div>
      {section === undefined && !error && (
        <Card className="p-10">
          <Spinner />
        </Card>
      )}
      {error && <Card className="p-10 text-red-600 text-[14px]">{error}</Card>}
      {section === null && !error && (
        <Card className="p-10 text-[#667085] text-[14px]">Bagian tidak ditemukan.</Card>
      )}
      {section && <KruiSectionForm initial={section} />}
    </AdminShell>
  );
}