import { AdminShell } from "@/components/admin/AdminShell";
import { KruiSectionForm } from "@/components/admin/KruiSectionForm";

export default function AdminKruiSectionNewPage() {
  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="font-display font-800 text-[22px] lg:text-[26px] text-[#111827] tracking-tight">
          Tentang Krui — Tambah Bagian
        </h1>
        <p className="text-[13.5px] text-[#667085] mt-1">
          Buat bagian baru untuk halaman Tentang Krui
        </p>
      </div>
      <KruiSectionForm />
    </AdminShell>
  );
}