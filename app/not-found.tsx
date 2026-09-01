import Link from "next/link";
import Button from "@/components/Button";
import { Eyebrow } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="pt-[72px] min-h-[70vh] flex items-center justify-center">
      <div className="max-w-content mx-auto px-[18px] lg:px-7 py-16 text-center">
        <div className="relative mx-auto w-48 h-32 rounded-lg2 wave-pattern bg-gradient-to-br from-blue to-surf flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 80" className="w-44 h-20" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
              <path d="M10 40 Q 30 20 50 40 T 90 40 T 130 40 T 170 40 T 195 40" />
              <path d="M10 60 Q 30 40 50 60 T 90 60 T 130 60 T 170 60 T 195 60" />
            </svg>
          </div>
        </div>

        <Eyebrow className="mt-14">Oops · 404</Eyebrow>
        <h1 className="mt-3 font-display font-800 text-[40px] lg:text-[56px] text-ink tracking-tight">
          Gelombang ini tak ditemukan
        </h1>
        <p className="mt-4 text-[15px] lg:text-[17px] text-ink-soft max-w-xl mx-auto leading-relaxed">
          Halaman yang kamu cari tidak ada atau telah dipindahkan. Tapi jangan khawatir — masih banyak petualangan menunggumu di Krui.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="orange" className="px-8 py-3.5">Kembali ke beranda</Button>
          <Button href="/paket" variant="outline" className="px-8 py-3.5">Jelajahi paket</Button>
        </div>
      </div>
    </div>
  );
}
