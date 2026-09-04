"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatPrice } from "@/lib/packages";
import { usePackages } from "@/lib/use-catalog";
import { Field, inputCls } from "@/components/Form";
import { PinIcon, ClockIcon, StarIcon } from "@/components/icons";

const WA_NUMBER = "6285379997771";

export default function BookingPage() {
  const params = useParams<{ id: string }>();
  const { packages, loading } = usePackages();
  const pkg = packages.find((p) => p.slug === params.id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [when, setWhen] = useState("");

  const adultCountNum = Math.max(1, Number(adultCount) || 1);
  const totalBudget = pkg ? pkg.price * adultCountNum : 0;

  if (loading) {
    return (
      <div className="pt-[72px] max-w-content mx-auto px-[18px] lg:px-7 py-20 text-center">
        <div className="text-ink-soft">Memuat…</div>
      </div>
    );
  }

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
      `Jumlah orang: ${adultCountNum} orang`,
      `Rencana tanggal: ${when ? when : "Flexibel"}`,
      `Perkiraan budget: ${formatPrice(totalBudget)} (${formatPrice(pkg.price)} × ${adultCountNum} orang)`,
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
                  <input
                    type="number"
                    min={1}
                    value={adultCount}
                    onChange={(e) => setAdultCount(Number(e.target.value))}
                    className={inputCls}
                    placeholder="1"
                  />
                </Field>
                <Field label="Rencana tanggal">
                  <input
                    type="date"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="mt-5 bg-bg-alt border border-line rounded-[10px] p-4">
                <Field label="Perkiraan budget">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[20px] font-500 text-ink">
                      {formatPrice(totalBudget)}
                    </span>
                    <span className="text-[12.5px] text-ink-soft">
                      ({formatPrice(pkg.price)} × {adultCountNum} orang)
                    </span>
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
