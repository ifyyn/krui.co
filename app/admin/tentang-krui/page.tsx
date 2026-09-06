"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge, Card, EmptyState, Spinner } from "@/components/admin/ui";
import {
  apiGetKruiSections,
  apiDeleteKruiSection,
  apiReorderKruiSections,
  apiUpdateKruiSectionFormData,
  KruiSection,
} from "@/lib/admin-api";
import { resolveImageUrl } from "@/lib/catalog";

export default function AdminKruiSectionsPage() {
  const [sections, setSections] = useState<KruiSection[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    setError("");
    setSections(null);
    apiGetKruiSections()
      .then(setSections)
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat data"));
  }, []);

  useEffect(load, [load]);

  const move = async (i: number, dir: -1 | 1) => {
    if (!sections) return;
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[i], next[j]] = [next[j], next[i]];
    setSections(next);
    setBusy(true);
    try {
      setSections(await apiReorderKruiSections(next.map((s) => s.id)));
    } catch (e) {
      window.alert(e instanceof Error ? e.message : "Gagal mengubah urutan");
      load();
    } finally {
      setBusy(false);
    }
  };

  const toggleActive = async (s: KruiSection) => {
    if (!window.confirm(`${s.active ? "Sembunyikan" : "Tampilkan"} bagian "${s.title}"?`)) return;
    try {
      const formData = new FormData();
      formData.append("title", s.title);
      formData.append("active", String(!s.active));
      await apiUpdateKruiSectionFormData(s.id, formData);
      load();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : "Gagal menyimpan");
    }
  };

  const onDelete = async (s: KruiSection) => {
    if (!window.confirm(`Hapus bagian "${s.title}"?`)) return;
    try {
      await apiDeleteKruiSection(s.id);
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
            Tentang Krui
          </h1>
          <p className="text-[13.5px] text-[#667085] mt-1">
            Bagian-bagian halaman {"Tentang Krui"} — atur urutan dari atas ke bawah
          </p>
        </div>
        <a
          href="/admin/tentang-krui/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg text-[14px] font-600 px-4 py-2.5 transition-colors bg-orange text-white hover:brightness-95 no-underline"
        >
          + Tambah bagian
        </a>
      </div>

      <Card>
        {error && <div className="p-6 text-red-600 text-[14px]">{error}</div>}
        {!sections && !error && <Spinner />}
        {sections && sections.length === 0 && (
          <EmptyState title="Belum ada bagian" subtitle="Mulai dengan bagian Selayang Pandang, Destinasi Wisata, Budaya, Kuliner…" />
        )}
        {sections &&
          sections.map((s, i) => (
            <div
              key={s.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 border-b border-[#f6f6f7] last:border-0"
            >
              <div className="flex flex-col items-center gap-1 shrink-0">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0 || busy}
                  className="w-7 h-7 rounded-md bg-[#f6f7f9] text-[#667085] hover:bg-bg-alt disabled:opacity-30"
                  aria-label="Naik"
                >
                  ↑
                </button>
                <span className="font-mono text-[12px] text-[#98a2b3]">{i + 1}</span>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === sections.length - 1 || busy}
                  className="w-7 h-7 rounded-md bg-[#f6f7f9] text-[#667085] hover:bg-bg-alt disabled:opacity-30"
                  aria-label="Turun"
                >
                  ↓
                </button>
              </div>

              <div className="w-16 h-12 shrink-0 rounded-lg bg-[#f2f4f7] overflow-hidden">
                {s.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resolveImageUrl(s.image)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#98a2b3]">
                    ◈
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-600 text-[#111827]">{s.title}</span>
                  {s.active ? <Badge tone="green">Tampil</Badge> : <Badge>Disembunyikan</Badge>}
                </div>
                <div className="text-[12.5px] text-[#98a2b3] mt-0.5 truncate">
                  {s.summary || "—"}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => toggleActive(s)} className="text-[13px] text-[#667085] hover:text-ink hover:underline">
                  {s.active ? "Sembunyikan" : "Tampilkan"}
                </button>
                <a href={`/admin/tentang-krui/${s.id}`} className="text-[13px] text-orange hover:underline">
                  Edit
                </a>
                <button onClick={() => onDelete(s)} className="text-[13px] text-red-600 hover:underline">
                  Hapus
                </button>
              </div>
            </div>
          ))}
      </Card>
    </AdminShell>
  );
}