"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  Card,
  EmptyState,
  LinkBtn,
  Badge,
  Spinner,
  fmtPrice,
} from "@/components/admin/ui";
import { apiDeletePackage, apiGetPackages, AdminPackage } from "@/lib/admin-api";
import { resolveImageUrl } from "@/lib/catalog";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<AdminPackage[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const load = useCallback(() => {
    setError("");
    setPackages(null);
    apiGetPackages()
      .then(setPackages)
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat data"));
  }, []);

  useEffect(load, [load]);

  const filtered = (packages || []).filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.category?.label || "").toLowerCase().includes(q) ||
      (p.location || "").toLowerCase().includes(q)
    );
  });

  const onDelete = async (p: AdminPackage) => {
    if (!window.confirm(`Hapus paket "${p.title}"?`)) return;
    try {
      await apiDeletePackage(p.id);
      load();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : "Gagal menghapus");
    }
  };

  return (
    <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-800 text-[22px] lg:text-[26px] text-[#111827] tracking-tight">
            Paket
          </h1>
          <p className="text-[13.5px] text-[#667085] mt-1">
            Kelola paket wisata, penginapan, transport & lainnya
          </p>
        </div>
        <LinkBtn href="/admin/packages/new">+ Tambah paket</LinkBtn>
      </div>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari paket…"
          className="w-full max-w-sm px-4 py-2.5 bg-white border border-[#e5e7eb] rounded-lg text-[14px] outline-none focus:border-orange transition-colors"
        />
      </div>

      <Card>
        {error && (
          <div className="p-6 text-red-600 text-[14px]">{error}</div>
        )}
        {!packages && !error && <Spinner />}
        {packages && packages.length === 0 && (
          <EmptyState
            title="Belum ada paket"
            subtitle="Mulai tambahkan paket baru"
          />
        )}
        {packages && filtered.length === 0 && packages.length > 0 && (
          <EmptyState title="Tidak ada hasil" subtitle="Coba kata kunci lain" />
        )}
        {packages &&
          filtered.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 border-b border-[#f6f6f7] last:border-0"
            >
              <div className="w-14 h-14 shrink-0 rounded-lg bg-[#f2f4f7] overflow-hidden">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resolveImageUrl(p.image)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#98a2b3] text-lg">
                    ▤
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[15px] font-600 text-[#111827]">{p.title}</span>
                  {p.featured && <Badge tone="orange">Unggulan</Badge>}
                </div>
                <div className="text-[12.5px] text-[#98a2b3] mt-0.5">
                  <Badge>{p.category?.label || "Tanpa kategori"}</Badge>{" "}
                  <span className="ml-1">{p.location || "—"}</span>
                </div>
              </div>
              <div className="text-[14px] font-mono text-[#111827] shrink-0">
                {fmtPrice(p.price)}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`/admin/packages/${p.id}`}
                  className="text-[13px] text-orange hover:underline no-underline"
                >
                  Edit
                </a>
                <button
                  onClick={() => onDelete(p)}
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
