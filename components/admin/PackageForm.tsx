"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Btn,
  Card,
  Field,
  Input,
  Textarea,
  Select,
  fieldCls,
} from "./ui";
import {
  apiCreatePackageFormData,
  apiUpdatePackageFormData,
  AdminCategory,
  AdminPackage,
} from "@/lib/admin-api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Slot {
  time: string;
  title: string;
  detail: string;
}

export function PackageForm({
  categories,
  initial,
}: {
  categories: AdminCategory[];
  initial?: AdminPackage | null;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initial?.title || "");
  const [categoryId, setCategoryId] = useState(
    initial?.categoryId || categories[0]?.id || 0
  );
  const [location, setLocation] = useState(initial?.location || "");
  const [duration, setDuration] = useState(initial?.duration || "");
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [rating, setRating] = useState(String(initial?.rating ?? ""));
  const [reviews, setReviews] = useState(String(initial?.reviews ?? ""));
  const [featured, setFeatured] = useState(initial?.featured || false);
  const [description, setDescription] = useState(initial?.description || "");
  const [meetingPoint, setMeetingPoint] = useState(initial?.meetingPoint || "");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initial?.image ? (initial.image.startsWith("http") ? initial.image : `${API_URL}${initial.image}`) : null
  );
  const [dragOver, setDragOver] = useState(false);

  const [includes, setIncludes] = useState((initial?.includes || []).join("\n"));
  const [excludes, setExcludes] = useState((initial?.excludes || []).join("\n"));
  const [itinerary, setItinerary] = useState<Slot[]>(
    initial?.itinerary?.length ? initial.itinerary : [{ time: "", title: "", detail: "" }]
  );

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const updateSlot = (i: number, key: keyof Slot, value: string) => {
    setItinerary((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)));
  };

  const addSlot = () => setItinerary((prev) => [...prev, { time: "", title: "", detail: "" }]);
  const removeSlot = (i: number) =>
    setItinerary((prev) => prev.filter((_, idx) => idx !== i));

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

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

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
    formData.append("title", title);
    formData.append("categoryId", String(categoryId));
    formData.append("location", location);
    formData.append("duration", duration);
    formData.append("price", price ? String(Number(price)) : "0");
    formData.append("rating", rating ? String(Number(rating)) : "0");
    formData.append("reviews", reviews ? String(Number(reviews)) : "0");
    formData.append("featured", String(featured));
    formData.append("description", description);
    formData.append("meetingPoint", meetingPoint);
    formData.append("includes", JSON.stringify(includes.split("\n").map((s) => s.trim()).filter(Boolean)));
    formData.append("excludes", JSON.stringify(excludes.split("\n").map((s) => s.trim()).filter(Boolean)));
    formData.append("itinerary", JSON.stringify(itinerary.filter((s) => s.time || s.title || s.detail)));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (isEdit && initial) {
        await apiUpdatePackageFormData(initial.id, formData);
      } else {
        await apiCreatePackageFormData(formData);
      }
      router.push("/admin/packages");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan paket");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 text-red-600 text-[14px] px-4 py-3">
          {error}
        </div>
      )}

      <Card className="p-6">
        <h2 className="font-display font-700 text-[16px] text-[#111827] mb-4">
          Informasi Dasar
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Judul paket" className="md:col-span-2">
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sunset Sandbar Tour"
            />
          </Field>
          <Field label="Kategori">
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Harga (Rp)">
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="450000"
            />
          </Field>
          <Field label="Lokasi">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Pantai Tanjung Setia"
            />
          </Field>
          <Field label="Durasi">
            <Input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="4 jam"
            />
          </Field>
          <Field label="Rating">
            <Input
              type="number"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="4.9"
            />
          </Field>
          <Field label="Jumlah review">
            <Input
              type="number"
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              placeholder="128"
            />
          </Field>

          <Field label="Gambar paket" className="md:col-span-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={onFileChange}
              className="hidden"
            />
            {imagePreview ? (
              <div className="relative rounded-lg border border-[#e5e7eb] overflow-hidden bg-[#f6f7f9]">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
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
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-2 h-48 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
                  dragOver
                    ? "border-orange bg-orange-50"
                    : "border-[#d0d5dd] bg-[#f6f7f9] hover:border-orange hover:bg-orange-50/50"
                }`}
              >
                <svg className="w-10 h-10 text-[#98a2b3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                <span className="text-[14px] text-[#667085]">
                  {dragOver ? "Lepaskan di sini" : "Klik atau seret gambar ke sini"}
                </span>
                <span className="text-[12px] text-[#98a2b3]">
                  JPEG, PNG, WebP, GIF (maks. 2MB)
                </span>
              </div>
            )}
          </Field>

          <Field label="Deskripsi" className="md:col-span-2">
            <Textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsikan paket ini…"
            />
          </Field>
          <Field label="Titik pertemuan" className="md:col-span-2">
            <Input
              value={meetingPoint}
              onChange={(e) => setMeetingPoint(e.target.value)}
              placeholder="Pondok Surf Tanjung Setia"
            />
          </Field>
          <label className="md:col-span-2 inline-flex items-center gap-2.5 text-[14px] text-[#111827] cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-orange"
            />
            Tampilkan sebagai paket Unggulan
          </label>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-display font-700 text-[16px] text-[#111827] mb-4">
          Termasuk & Tidak Termasuk
        </h2>
        <p className="text-[12px] text-[#98a2b3] -mt-2 mb-4">
          Satu item per baris
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Termasuk">
            <Textarea
              rows={5}
              value={includes}
              onChange={(e) => setIncludes(e.target.value)}
              placeholder={"Transport PP ke dermaga\nPerahu + crew lokal\nAsuransi trip"}
            />
          </Field>
          <Field label="Tidak termasuk">
            <Textarea
              rows={5}
              value={excludes}
              onChange={(e) => setExcludes(e.target.value)}
              placeholder={"Makan malam\nTip untuk crew"}
            />
          </Field>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-700 text-[16px] text-[#111827]">Itinerary</h2>
          <Btn type="button" variant="secondary" onClick={addSlot} className="!px-3 !py-1.5 text-[13px]">
            + Baris
          </Btn>
        </div>
        {itinerary.length === 0 && (
          <p className="text-[13px] text-[#98a2b3]">Belum ada itinerary untuk paket ini.</p>
        )}
        <div className="space-y-3">
          {itinerary.map((slot, i) => (
            <div key={i} className="grid md:grid-cols-[120px_1fr_1.2fr_auto] gap-3 items-start">
              <div>
                <Input
                  value={slot.time}
                  onChange={(e) => updateSlot(i, "time", e.target.value)}
                  placeholder="15:00"
                />
              </div>
              <div>
                <Input
                  value={slot.title}
                  onChange={(e) => updateSlot(i, "title", e.target.value)}
                  placeholder="Judul"
                />
              </div>
              <div>
                <Input
                  value={slot.detail}
                  onChange={(e) => updateSlot(i, "detail", e.target.value)}
                  placeholder="Detail kegiatan…"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSlot(i)}
                className="text-[13px] text-red-500 pt-2.5 hover:underline"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Btn type="submit" disabled={busy}>
          {busy ? "Menyimpan…" : isEdit ? "Simpan perubahan" : "Buat paket"}
        </Btn>
        <a
          href="/admin/packages"
          className={fieldCls + " !w-auto !px-5 !py-2.5 text-center no-underline text-[#667085]"}
        >
          Batal
        </a>
      </div>
    </form>
  );
}
