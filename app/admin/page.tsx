"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  Card,
  EmptyState,
  PageHeader,
  Spinner,
  Badge,
  fmtPrice,
} from "@/components/admin/ui";
import {
  apiGetPackages,
  apiGetCategories,
  AdminPackage,
  AdminCategory,
} from "@/lib/admin-api";

export default function AdminDashboardPage() {
  const [packages, setPackages] = useState<AdminPackage[] | null>(null);
  const [categories, setCategories] = useState<AdminCategory[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiGetPackages(), apiGetCategories()])
      .then(([p, c]) => {
        setPackages(p);
        setCategories(c);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat data"));
  }, []);

  if (error) {
    return (
      <AdminShell>
        <PageHeader title="Dashboard" />
        <Card className="p-6 text-red-600 text-[14px]">{error}</Card>
      </AdminShell>
    );
  }

  if (!packages || !categories) {
    return (
      <AdminShell>
        <PageHeader title="Dashboard" />
        <Spinner />
      </AdminShell>
    );
  }

  const total = packages.length;
  const featured = packages.filter((p) => p.featured).length;
  const categoriesCount = categories.length;
  const cheap = packages.filter((p) => Number(p.price) < 300000).length;
  const recent = [...packages].sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );

  const stats = [
    { label: "Total Paket", value: total, hint: "semua kategori" },
    { label: "Unggulan", value: featured, hint: "paket featured" },
    { label: "Kategori", value: categoriesCount, hint: "aktif" },
    { label: "Paket < Rp300rb", value: cheap, hint: "ekonomis" },
  ];

  return (
    <AdminShell>
      <PageHeader title="Dashboard" subtitle="Ringkasan data KRUI.CO" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="text-[12px] font-mono uppercase tracking-wider text-[#98a2b3]">
              {s.label}
            </div>
            <div className="mt-1 font-display font-800 text-[32px] text-[#111827] leading-none">
              {s.value}
            </div>
            <div className="mt-2 text-[12.5px] text-[#98a2b3]">{s.hint}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <div className="px-5 py-4 border-b border-[#f0f1f3] flex items-center justify-between">
            <h2 className="font-display font-700 text-[16px] text-[#111827]">
              Paket Terbaru
            </h2>
            <a href="/admin/packages" className="text-[13px] text-orange no-underline">
              Lihat semua →
            </a>
          </div>
          <div>
            {recent.length === 0 && <EmptyState title="Belum ada paket" />}
            {recent.slice(0, 5).map((p) => (
              <a
                key={p.id}
                href={`/admin/packages/${p.id}`}
                className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-[#fafafa] border-b border-[#f6f6f7] last:border-0 no-underline"
              >
                <div className="min-w-0">
                  <div className="text-[14px] font-600 text-[#111827] truncate">
                    {p.title}
                  </div>
                  <div className="text-[12.5px] text-[#98a2b3] mt-0.5">
                    {p.category?.label || "—"} · {p.location || "—"}
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  {p.featured && <Badge tone="orange">Unggulan</Badge>}
                  <span className="text-[13px] font-mono text-[#111827]">
                    {fmtPrice(p.price)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Card>

        <Card>
          <div className="px-5 py-4 border-b border-[#f0f1f3] flex items-center justify-between">
            <h2 className="font-display font-700 text-[16px] text-[#111827]">
              Kategori
            </h2>
            <a href="/admin/categories" className="text-[13px] text-orange no-underline">
              Kelola →
            </a>
          </div>
          <div>
            {categories.length === 0 && <EmptyState title="Belum ada kategori" />}
            {categories.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between px-5 py-3.5 border-b border-[#f6f6f7] last:border-0"
              >
                <span className="text-[14px] font-600 text-[#111827]">{c.label}</span>
                <Badge>{c.packageCount ?? 0} paket</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
