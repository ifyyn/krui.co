"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Btn, Card, Field, Input, Textarea } from "./ui";
import { RichTextEditor } from "./RichTextEditor";
import {
  apiCreateKruiSectionFormData,
  apiUpdateKruiSectionFormData,
  KruiSection,
} from "@/lib/admin-api";
import { resolveImageUrl } from "@/lib/catalog";

export function KruiSectionForm({ initial }: { initial?: KruiSection | null }) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initial?.title || "");
  const [summary, setSummary] = useState(initial?.summary || "");
  const [content, setContent] = useState(initial?.content || "");
  const [active, setActive] = useState(initial?.active !== false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initial?.image ? resolveImageUrl(initial.image) : null
  );
  const [dragOver, setDragOver] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Hanya file gambar yang diperbolehkan");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 2MB");
      return;
    }
    setError("");
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("active", String(active));
    if (imageFile) formData.append("image", imageFile);
    else if (isEdit && initial?.image && !imagePreview) formData.append("removeImage", "true");

    try {
      if (isEdit && initial) {
        await apiUpdateKruiSectionFormData(initial.id, formData);
      } else {
        await apiCreateKruiSectionFormData(formData);
      }
      router.push("/admin/tentang-krui");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan bagian");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {error && (
        <div className="rounded-lg bg-red-50 text-red-600 text-[13px] px-4 py-3">
          {error}
        </div>
      )}

      <Card className="p-6">
        <Field label="Judul bagian" hint='Misal: "Selayang Pandang", "Destinasi Wisata", "Budaya", "Kuliner".'>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul bagian…"
            className="w-full px-4 py-3 bg-[#f6f7f9] border border-[#e5e7eb] rounded-lg text-[17px] font-600 text-[#111827] placeholder:text-[#98a2b3] outline-none focus:border-orange focus:bg-white transition-colors"
          />
        </Field>
      </Card>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        <Card className="p-6">
          <Field label="Gambar bagian">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={onFileChange}
              className="hidden"
            />
            {imagePreview ? (
              <div className="relative rounded-lg border border-[#e5e7eb] overflow-hidden bg-[#f6f7f9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Preview" className="w-full aspect-[16/10] object-cover" />
                <div className="absolute bottom-2 right-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white/90 backdrop-blur text-[12.5px] font-600 text-[#111827] px-3 py-1.5 rounded-lg border border-[#e5e7eb] hover:bg-white transition-colors cursor-pointer"
                  >
                    Ganti
                  </button>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="bg-white/90 backdrop-blur text-[12.5px] font-600 text-red-600 px-3 py-1.5 rounded-lg border border-[#e5e7eb] hover:bg-white transition-colors cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`flex flex-col items-center justify-center gap-1.5 aspect-[16/10] rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
                  dragOver
                    ? "border-orange bg-orange-soft"
                    : "border-[#d0d5dd] bg-[#f6f7f9] hover:border-orange hover:bg-orange-soft/60"
                }`}
              >
                <svg className="w-9 h-9 text-[#98a2b3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                <span className="text-[13px] text-[#667085] font-500">Klik atau seret gambar ke sini</span>
                <span className="text-[12px] text-[#98a2b3]">JPEG, PNG, WebP, GIF (maks. 2MB)</span>
              </div>
            )}
          </Field>
          <label className="mt-5 inline-flex items-center gap-2 text-[14px] text-[#111827] cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-4 h-4 accent-orange"
            />
            Tampilkan di halaman
          </label>
          {!isEdit && (
            <p className="mt-3 text-[12px] text-[#98a2b3]">
              Bagian ini otomatis ditempatkan di urutan terakhir. Atur urutan di halaman
              daftar Tentang Krui.
            </p>
          )}
        </Card>

        <Card className="p-6">
          <Field label="Ringkasan" hint="Kalimat pengantar singkat yang tampil di sampul bagian.">
            <Textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Ringkasan bagian…"
            />
          </Field>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e7eb]">
          <div className="text-[14px] font-600 text-[#111827]">Isi bagian</div>
          <div className="text-[12px] text-[#98a2b3] mt-0.5">
            Tulis dan format seperti dokumen Word — judul, teks, daftar, kutipan, foto.
          </div>
        </div>
        <div className="p-2 lg:p-3 bg-[#f6f7f9]">
          <RichTextEditor content={content} onChange={setContent} placeholder="Mulai menulis isi bagian di sini…" />
        </div>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Btn type="submit" disabled={busy} className="min-w-[120px]">
          {busy ? "Menyimpan…" : isEdit ? "Simpan Perubahan" : "Simpan Bagian"}
        </Btn>
        <Btn type="button" variant="secondary" onClick={() => router.push("/admin/tentang-krui")}>
          Batal
        </Btn>
        <a
          href="/tentang-krui"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[13px] text-orange hover:underline no-underline"
        >
          Lihat halaman →
        </a>
      </div>
    </form>
  );
}