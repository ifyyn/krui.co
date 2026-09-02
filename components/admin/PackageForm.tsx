"use client";

import { useState } from "react";
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
  apiCreatePackage,
  apiUpdatePackage,
  AdminCategory,
  AdminPackage,
} from "@/lib/admin-api";

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

  const [title, setTitle] = useState(initial?.title || "");
  const [categoryId, setCategoryId] = useState(
    initial?.categoryId || categories[0]?.id || 0
  );
  const [location, setLocation] = useState(initial?.location || "");
  const [duration, setDuration] = useState(initial?.duration || "");
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [rating, setRating] = useState(String(initial?.rating ?? ""));
  const [reviews, setReviews] = useState(String(initial?.reviews ?? ""));
  const [image, setImage] = useState(initial?.image || "");
  const [featured, setFeatured] = useState(initial?.featured || false);
  const [description, setDescription] = useState(initial?.description || "");
  const [meetingPoint, setMeetingPoint] = useState(initial?.meetingPoint || "");

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const body = {
      title,
      categoryId,
      location,
      duration,
      price: price ? Number(price) : 0,
      rating: rating ? Number(rating) : 0,
      reviews: reviews ? Number(reviews) : 0,
      image,
      featured,
      description,
      meetingPoint,
      includes: includes.split("\n").map((s) => s.trim()).filter(Boolean),
      excludes: excludes.split("\n").map((s) => s.trim()).filter(Boolean),
      itinerary: itinerary.filter(
        (s) => s.time || s.title || s.detail
      ),
    };
    try {
      if (isEdit && initial) {
        await apiUpdatePackage(initial.id, body);
      } else {
        await apiCreatePackage(body);
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
          <Field label="URL gambar" className="md:col-span-2">
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/…"
            />
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
