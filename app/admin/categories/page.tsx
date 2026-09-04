"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  Badge,
  Btn,
  Card,
  EmptyState,
  Field,
  Input,
  PageHeader,
  Select,
  Spinner,
  Textarea,
} from "@/components/admin/ui";
import {
  apiGetCategories,
  apiCreateCategoryFormData,
  apiUpdateCategoryFormData,
  apiDeleteCategory,
  AdminCategory,
} from "@/lib/admin-api";
import { resolveImageUrl } from "@/lib/catalog";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const colorOptions = ["blue", "green", "orange", "surf", "rental", "experience"];
const iconOptions = ["compass", "bed", "car", "surf", "bike", "star"];

const colorHex: Record<string, string> = {
  blue: "#1E6FD9",
  green: "#2FA84F",
  orange: "#F5821F",
  surf: "#0E8FBF",
  rental: "#3C9A3F",
  experience: "#E0672F",
};

const emptyForm = {
  label: "",
  tagline: "",
  description: "",
  color: "blue",
  icon: "compass",
  image: "",
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[] | null>(null);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(() => {
    setError("");
    setCategories(null);
    apiGetCategories()
      .then(setCategories)
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat data"));
  }, []);

  useEffect(load, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setFile(null);
    setPreview(null);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (c: AdminCategory) => {
    setEditing(c);
    setForm({
      label: c.label,
      tagline: c.tagline || "",
      description: c.description || "",
      color: c.color || "blue",
      icon: c.icon || "compass",
      image: c.image || "",
    });
    setFile(null);
    setPreview(c.image ? resolveImageUrl(c.image) : null);
    setFormError("");
    setModalOpen(true);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setFormError("Hanya file gambar yang diperbolehkan");
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setFormError("Ukuran gambar maksimal 2MB");
      return;
    }
    setFormError("");
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setBusy(true);
    const formData = new FormData();
    formData.append("label", form.label);
    formData.append("tagline", form.tagline);
    formData.append("description", form.description);
    formData.append("color", form.color);
    formData.append("icon", form.icon);
    if (file) formData.append("image", file);
    try {
      if (editing) {
        await apiUpdateCategoryFormData(editing.id, formData);
      } else {
        await apiCreateCategoryFormData(formData);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Gagal menyimpan kategori");
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (c: AdminCategory) => {
    if (c.packageCount && c.packageCount > 0) {
      window.alert(
        `Masih ada ${c.packageCount} paket di kategori "${c.label}". Pindahkan dulu sebelum menghapus.`
      );
      return;
    }
    if (!window.confirm(`Hapus kategori "${c.label}"?`)) return;
    try {
      await apiDeleteCategory(c.id);
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
            Kategori
          </h1>
          <p className="text-[13.5px] text-[#667085] mt-1">
            Kelola kategori paket wisata
          </p>
        </div>
        <Btn onClick={openCreate}>+ Tambah kategori</Btn>
      </div>

      <Card>
        {error && <div className="p-6 text-red-600 text-[14px]">{error}</div>}
        {!categories && !error && <Spinner />}
        {categories && categories.length === 0 && (
          <EmptyState title="Belum ada kategori" subtitle="Tambahkan kategori baru" />
        )}
        {categories &&
          categories.map((c) => (
            <div
              key={c.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 border-b border-[#f6f6f7] last:border-0"
            >
              <span
                className="w-11 h-11 shrink-0 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ background: colorHex[c.color] || "#98a2b3" }}
              >
                {c.label.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-600 text-[#111827]">{c.label}</span>
                  <span className="text-[12px] font-mono text-[#98a2b3]">/{c.slug}</span>
                </div>
                <div className="text-[12.5px] text-[#98a2b3] mt-0.5 truncate">
                  {c.tagline || "—"}
                </div>
              </div>
              <Badge>{c.packageCount ?? 0} paket</Badge>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => openEdit(c)}
                  className="text-[13px] text-orange hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(c)}
                  className="text-[13px] text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
      </Card>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 overflow-y-auto py-10">
          <form
            onSubmit={onSubmit}
            className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display font-700 text-[18px] text-[#111827]">
                {editing ? "Edit Kategori" : "Tambah Kategori"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#98a2b3] hover:text-[#111827] text-xl leading-none"
              >
                ×
              </button>
            </div>

            {formError && (
              <div className="rounded-lg bg-red-50 text-red-600 text-[13px] px-4 py-3">
                {formError}
              </div>
            )}

            <Field label="Nama kategori">
              <Input
                required
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="Tour"
              />
            </Field>
            <Field label="Tagline">
              <Input
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="Paket wisata terkurasi"
              />
            </Field>
            <Field label="Deskripsi">
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Deskripsi singkat kategori"
              />
            </Field>
            <Field label="Gambar kategori">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={onFileChange}
                className="hidden"
              />
              {preview ? (
                <div className="relative rounded-lg border border-[#e5e7eb] overflow-hidden bg-[#f6f7f9]">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white/90 backdrop-blur text-[13px] font-600 text-[#111827] px-3 py-1.5 rounded-lg border border-[#e5e7eb] hover:bg-white transition-colors cursor-pointer"
                    >
                      Ganti
                    </button>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="bg-white/90 backdrop-blur text-[13px] font-600 text-red-600 px-3 py-1.5 rounded-lg border border-[#e5e7eb] hover:bg-white transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-1.5 h-28 rounded-lg border-2 border-dashed border-[#d0d5dd] bg-[#f6f7f9] cursor-pointer hover:border-orange hover:bg-orange-50/50 transition-colors"
                >
                  <svg className="w-8 h-8 text-[#98a2b3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  <span className="text-[13px] text-[#667085]">Klik untuk upload gambar</span>
                  <span className="text-[12px] text-[#98a2b3]">JPEG, PNG, WebP, GIF (maks. 2MB)</span>
                </div>
              )}
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Warna">
                <Select
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                >
                  {colorOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Ikon">
                <Select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                >
                  {iconOptions.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Btn type="submit" disabled={busy}>
                {busy ? "Menyimpan…" : editing ? "Simpan" : "Buat"}
              </Btn>
              <Btn type="button" variant="secondary" onClick={() => setModalOpen(false)}>
                Batal
              </Btn>
            </div>
          </form>
        </div>
      )}
    </AdminShell>
  );
}
