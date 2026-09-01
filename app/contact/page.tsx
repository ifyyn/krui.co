"use client";

import { useState } from "react";
import Button, { Eyebrow } from "@/components/Button";
import { Field, inputCls, SuccessState, useFormFlow } from "@/components/Form";
import { PinIcon, ClockIcon } from "@/components/icons";

const channels = [
  { label: "WhatsApp", value: "+62 812-0000-0000", sub: "Respon cepat 08.00–21.00 WIB", icon: "wa" },
  { label: "Email", value: "halo@krui.co", sub: "Balasan dalam 1×24 jam", icon: "mail" },
  { label: "Instagram", value: "@krui.co", sub: "DM untuk pertanyaan ringan", icon: "ig" },
];

export default function ContactPage() {
  const { submitted, submit } = useFormFlow();
  const [touched, setTouched] = useState(false);

  return (
    <div className="pt-[72px]">
      <div className="bg-bg-alt border-b border-line">
        <div className="max-w-content mx-auto px-[18px] lg:px-7 py-10 lg:py-16">
          <Eyebrow className="text-orange">Kontak</Eyebrow>
          <h1 className="mt-2 font-display font-800 text-[32px] lg:text-[44px] text-ink tracking-tight">
            Kami di sini untuk membantumu
          </h1>
          <p className="mt-3 text-[15px] text-ink-soft max-w-xl">
            Ada pertanyaan soal paket, itinerary, atau wisata Krui? Tim kami siap membantu merencanakan perjalananmu.
          </p>
        </div>
      </div>

      <div className="max-w-content mx-auto px-[18px] lg:px-7 py-[56px] lg:py-[80px]">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div className="space-y-6">
            {channels.map((c) => (
              <div key={c.label} className="bg-white border border-line rounded-card p-5 flex gap-4 items-start">
                <span className="w-11 h-11 rounded-full bg-blue-soft text-blue flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold">{c.icon.toUpperCase().slice(0, 1)}</span>
                </span>
                <div>
                  <div className="text-[12px] font-mono uppercase tracking-wider text-ink-soft">{c.label}</div>
                  <div className="text-[16px] font-display font-600 text-ink mt-1">{c.value}</div>
                  <div className="text-[13px] text-ink-soft mt-0.5">{c.sub}</div>
                </div>
              </div>
            ))}

            <div className="bg-bg-alt border border-line rounded-card p-5 flex gap-4 items-start">
              <span className="w-11 h-11 rounded-full bg-orange-soft text-orange flex items-center justify-center shrink-0">
                <PinIcon className="w-5 h-5" />
              </span>
              <div>
                <div className="text-[12px] font-mono uppercase tracking-wider text-ink-soft">Kantor</div>
                <div className="text-[15px] font-display font-600 text-ink mt-1">Jl. Raya Krui, Banding Agung</div>
                <div className="text-[13px] text-ink-soft mt-0.5 flex items-center gap-1.5">
                  <ClockIcon className="w-3.5 h-3.5" /> Senin–Sabtu, 08.00–17.00 WIB
                </div>
              </div>
            </div>

            <div className="bg-orange-soft border border-orange/20 rounded-card p-5">
              <h3 className="font-display font-600 text-[15px] text-ink">Bingung pilih paket?</h3>
              <p className="mt-2 text-[13.5px] text-ink-soft leading-relaxed">
                Ceritakan minat & budgetmu melalui formulir di samping, kami akan sarankan paket yang paling cocok.
              </p>
            </div>
          </div>

          <div>
            {submitted ? (
              <SuccessState
                title="Pesan terkirim!"
                message="Terima kasih sudah menghubungi KRUI.CO. Tim kami akan membalas paling lambat 1×24 jam ke email atau WhatsApp kamu."
                note="Sementara menunggu, kamu bisa terus menjelajahi paket kami."
                onDone="/paket"
                doneLabel="Jelajahi paket"
              />
            ) : (
              <form
                className="bg-white border border-line rounded-card p-6 lg:p-8"
                onSubmit={(e) => {
                  setTouched(true);
                  submit(e);
                }}
                noValidate={false}
              >
                <h2 className="font-display font-700 text-[22px] text-ink">Kirim pesan</h2>
                <div className="mt-6 grid sm:grid-cols-2 gap-5">
                  <Field label="Nama lengkap">
                    <input required className={inputCls} placeholder="Nama kamu" />
                  </Field>
                  <Field label="Nomor WhatsApp">
                    <input required className={inputCls} placeholder="08xx-xxxx-xxxx" />
                  </Field>
                </div>
                <div className="mt-5">
                  <Field label="Email">
                    <input type="email" required className={inputCls} placeholder="kamu@email.com" />
                  </Field>
                </div>
                <div className="mt-5">
                  <Field label="Subjek" hint="Misal: tanya paket Surf, atau saran itinerary">
                    <input required className={inputCls} placeholder="Pilih topik atau tulis sendiri" />
                  </Field>
                </div>
                <div className="mt-5">
                  <Field label="Pesan">
                    <textarea required rows={5} className={inputCls} placeholder="Tulis pertanyaanmu di sini…" />
                  </Field>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button type="submit" variant="orange" className="px-8 py-3">Kirim pesan</Button>
                  {touched && (
                    <span className="text-[12px] text-ink-soft">Cek kembali isianmu sebelum kirim</span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
