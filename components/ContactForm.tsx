"use client";

import { useState } from "react";
import Button, { Eyebrow } from "@/components/Button";
import { Field, inputCls, SuccessState, useFormFlow } from "@/components/Form";
import { PinIcon, ClockIcon } from "@/components/icons";
import { SOCIALS } from "@/lib/site";

const channels = [
  {
    label: "WhatsApp",
    value: "+62 851-2800-9771",
    sub: "Respon cepat 08.00–21.00 WIB",
    icon: "wa",
    href: "https://wa.me/6285128009771",
  },
  {
    label: "Email",
    value: "kruidotco@gmail.com",
    sub: "Balasan dalam 1×24 jam",
    icon: "mail",
    href: "mailto:kruidotco@gmail.com",
  },
];

const socials = [
  { label: "TikTok", href: SOCIALS.tiktok, path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" },
  { label: "Facebook", href: SOCIALS.facebook, path: "M13.5 21.9V14h3l.56-3.9H13.5V7.68c0-1.07.36-1.86 1.93-1.86h1.77V2.36A27 27 0 0 0 14.66 2.2c-2.86 0-4.82 1.75-4.82 4.95V10.1H6.82V14h3.02v7.9z" },
  { label: "Instagram", href: SOCIALS.instagram, path: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.63A6.17 6.17 0 1 0 18.17 12 6.17 6.17 0 0 0 12 5.83zm0 10.17A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.15-11.84a1.44 1.44 0 1 1-1.44 1.44 1.44 1.44 0 0 1 1.44-1.44z" },
];

function ChannelIcon({ name }: { name: string }) {
  if (name === "wa") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.47 1.34 5L2 22l5.17-1.35a9.96 9.96 0 0 0 4.87 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.83 14.16c-.25.7-1.46 1.33-2.03 1.38-.55.05-1.03.25-3.46-.72-2.93-1.16-4.79-4.15-4.94-4.34-.15-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .57.01.18.01.43-.07.67.52.25.6.85 2.07.93 2.22.08.15.13.33.02.54-.1.2-.15.33-.3.5-.15.18-.32.4-.46.54-.15.15-.3.31-.13.61.17.3.76 1.26 1.64 2.04 1.13 1.01 2.09 1.32 2.38 1.47.3.15.47.13.64-.08.17-.2.74-.86.93-1.16.2-.3.39-.25.66-.15.26.1 1.68.8 1.97.94.29.15.48.22.55.34.07.12.07.7-.18 1.4z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

export default function ContactForm() {
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
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-white border border-line rounded-card p-5 flex gap-4 items-start no-underline hover:border-orange transition-all"
              >
                <span className="w-11 h-11 rounded-full bg-blue-soft text-blue flex items-center justify-center shrink-0">
                  <ChannelIcon name={c.icon} />
                </span>
                <div>
                  <div className="text-[12px] font-mono uppercase tracking-wider text-ink-soft">{c.label}</div>
                  <div className="text-[16px] font-display font-600 text-ink mt-1">{c.value}</div>
                  <div className="text-[13px] text-ink-soft mt-0.5">{c.sub}</div>
                </div>
              </a>
            ))}

            <div className="bg-white border border-line rounded-card p-5">
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 rounded-full bg-blue-soft text-blue flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.63A6.17 6.17 0 1 0 18.17 12 6.17 6.17 0 0 0 12 5.83zm0 10.17A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.15-11.84a1.44 1.44 0 1 1-1.44 1.44 1.44 1.44 0 0 1 1.44-1.44z" />
                  </svg>
                </span>
                <div>
                  <div className="text-[12px] font-mono uppercase tracking-wider text-ink-soft">
                    Ikuti Kami
                  </div>
                  <div className="text-[15px] font-display font-600 text-ink mt-1">
                    @krui.co di media sosial
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} KRUI.CO`}
                    className="w-10 h-10 rounded-full bg-bg-alt text-ink-soft hover:bg-orange hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-bg-alt border border-line rounded-card p-5 flex gap-4 items-start">
              <span className="w-11 h-11 rounded-full bg-orange-soft text-orange flex items-center justify-center shrink-0">
                <PinIcon className="w-5 h-5" />
              </span>
              <div>
                <div className="text-[12px] font-mono uppercase tracking-wider text-ink-soft">Kantor</div>
                <div className="text-[15px] font-display font-600 text-ink mt-1">Krui, Pesisir Barat, Lampung</div>
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