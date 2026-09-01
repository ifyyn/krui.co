"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getPackageBySlug, formatPrice } from "@/lib/packages";
import { Field, inputCls, selectCls } from "@/components/Form";
import { PinIcon, ClockIcon, StarIcon } from "@/components/icons";

const WA_NUMBER = "6281200000000";

const travelDates = ["Flexibel", "Dalam 1 bulan", "Dalam 3 bulan", "Lebih dari 3 bulan"];
const partySize = ["1 orang", "2 orang", "3 - 5 orang", "6 - 10 orang", "Lebih dari 10"];
const budget = ["Belum tahu", "< Rp 500.000", "Rp 500rb – 1jt", "Rp 1jt – 3jt", "> Rp 3jt"];

export default function BookingPage() {
  const params = useParams<{ id: string }>();
  const pkg = getPackageBySlug(params.id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [budgetValue, setBudgetValue] = useState("Belum tahu");
  const [notes, setNotes] = useState("");
  const [adults, setAdults] = useState("2 orang");
  const [when, setWhen] = useState("Flexibel");

  if (!pkg) {
    return (
      <div className="pt-[72px] max-w-content mx-auto px-[18px] lg:px-7 py-20 text-center">
        <h1 className="font-display font-800 text-[28px] text-ink">Paket tidak ditemukan</h1>
        <p className="mt-3 text-ink-soft">Paket yang kamu tuju tidak tersedia. Silakan cari paket lain.</p>
        <a href="/paket" className="mt-6 inline-block rounded-full bg-orange text-white font-display font-600 px-8 py-3">Lihat semua paket</a>
      </div>
    );
  }

  const sendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Halo KRUI.CO, saya ingin inquiry booking:",
      `Paket: ${pkg.title}`,
      `Nama: ${name}`,
      `WhatsApp: ${phone}`,
      `Email: ${email}`,
      `Jumlah orang: ${adults}`,
      `Rencana tanggal: ${when}`,
      `Budget per orang: ${budgetValue}`,
    ];
    if (notes.trim()) lines.push(`Catatan: ${notes.trim()}`);
    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pt-[72px]">
      <div className="bg-bg-alt border-b border-line">
        <div className="max-w-content mx-auto px-[18px] lg:px-7 py-10 lg:py-14">
          <span className="inline-block px-3 py-1 rounded-full text-[12px] font-mono bg-white border border-line text-ink-soft">
            Inquiry Booking
          </span>
          <h1 className="mt-3 font-display font-800 text-[28px] lg:text-[40px] text-ink tracking-tight">
            {pkg.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] text-ink-soft">
            <span className="inline-flex items-center gap-1.5"><PinIcon className="w-4 h-4" /> {pkg.location}</span>
            <span className="inline-flex items-center gap-1.5"><ClockIcon className="w-4 h-4" /> {pkg.duration}</span>
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-[18px] lg:px-7 py-[48px] lg:py-[72px]">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
            <div className="space-y-5">
              <div className="bg-white border border-line rounded-card p-5 shadow-card">
                <div className="relative aspect-[16/10] rounded-card w-full overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[12px] font-mono uppercase tracking-wider text-ink-soft">Perkiraan harga</div>
                    <div className="font-mono text-[24px] font-500 text-ink">{formatPrice(pkg.price)}</div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[13px] text-ink">
                    <StarIcon className="w-4 h-4 text-orange" /> {pkg.rating.toFixed(1)}
                  </div>
                </div>
                <p className="mt-3 text-[12.5px] text-ink-soft leading-relaxed">
                  Harga final bergantung pada jumlah orang dan tanggal. Kami akan konfirmasi lengkapnya.
                </p>
              </div>

              <div className="bg-bg-alt border border-line rounded-card p-5">
                <h3 className="font-display font-600 text-[15px] text-ink">Yang termasuk (ringkas)</h3>
                <ul className="mt-3 space-y-1.5">
                  {pkg.includes.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13.5px] text-ink-soft">
                      <span className="text-green mt-0.5">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[12.5px] text-ink-soft">Titik pertemuan: <span className="text-ink">{pkg.meetingPoint}</span></p>
              </div>
            </div>

            <form className="bg-white border border-line rounded-card p-6 lg:p-8" onSubmit={sendInquiry}>
              <h2 className="font-display font-700 text-[22px] text-ink">Formulir Inquiry</h2>
              <p className="mt-1 text-[13.5px] text-ink-soft">
                Isi preferensimu, tim kami akan menghubungi untuk finalisasi. Tanpa pembayaran online.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-5">
                <Field label="Nama lengkap">
                  <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Nama kamu" />
                </Field>
                <Field label="Nomor WhatsApp">
                  <input required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="08xx-xxxx-xxxx" />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Email">
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="kamu@email.com" />
                </Field>
              </div>

              <div className="mt-5 grid sm:grid-cols-2 gap-5">
                <Field label="Jumlah orang">
                  <div className="relative">
                    <select value={adults} onChange={(e) => setAdults(e.target.value)} className={selectCls()}>
                      {partySize.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft text-xs">▾</span>
                  </div>
                </Field>
                <Field label="Rencana tanggal">
                  <div className="relative">
                    <select value={when} onChange={(e) => setWhen(e.target.value)} className={selectCls()}>
                      {travelDates.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft text-xs">▾</span>
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Perkiraan budget per orang">
                  <div className="relative">
                    <select value={budgetValue} onChange={(e) => setBudgetValue(e.target.value)} className={selectCls()}>
                      {budget.map((b) => <option key={b}>{b}</option>)}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft text-xs">▾</span>
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Catatan tambahan" hint="Preferensi, kebutuhan khusus, atau pertanyaan">
                  <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputCls} placeholder="Ceritakan kebutuhanmu…" />
                </Field>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-full bg-orange text-white font-display font-600 text-[15px] px-8 py-3.5 hover:brightness-95 transition-all"
                >
                  Kirim inquiry
                </button>
                <p className="mt-3 text-[12px] text-ink-soft text-center leading-relaxed">
                  Mengirim kamu akan diarahkan ke WhatsApp dengan isian ini untuk diproses tim KRUI.CO.
                </p>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
}
