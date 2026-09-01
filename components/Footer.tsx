import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-auto">
      <div className="max-w-content mx-auto px-[18px] lg:px-7 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display font-800 text-[22px] tracking-tight">
              <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M4 20 Q 8 14 12 20 T 20 20 T 28 20" />
                <path d="M4 24 Q 8 18 12 24 T 20 24 T 28 24" />
              </svg>
              KRUI<span className="text-orange">.CO</span>
            </Link>
            <p className="mt-4 text-[14px] text-white/60 leading-relaxed max-w-xs">
              Everything you need to explore Krui, in one place. Platform wisata kurasi untuk Krui, Pesisir Barat Lampung.
            </p>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-white/40">
              Explore · Capture · Experience
            </p>
          </div>

          <div>
            <h4 className="font-display font-600 text-[15px] text-white/90 mb-4">Paket</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/paket" className="text-[14px] text-white/60 hover:text-white transition-colors">Semua Paket</Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/paket?cat=${c.slug}`} className="text-[14px] text-white/60 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-600 text-[15px] text-white/90 mb-4">Perusahaan</h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-[14px] text-white/60 hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/contact" className="text-[14px] text-white/60 hover:text-white transition-colors">Kontak</Link></li>
              <li><Link href="/search" className="text-[14px] text-white/60 hover:text-white transition-colors">Cari Paket</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-600 text-[15px] text-white/90 mb-4">Hubungi Kami</h4>
            <ul className="space-y-2.5 text-[14px] text-white/60">
              <li>Jl. Raya Krui, Banding Agung</li>
              <li>Krui, Pesisir Barat, Lampung</li>
              <li><span className="font-mono">0812-0000-0000</span></li>
              <li>halo@krui.co</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-white/40">© {new Date().getFullYear()} KRUI.CO. Semua hak dilindungi.</p>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/40">Managed marketplace · Curated locally</p>
        </div>
      </div>
    </footer>
  );
}
