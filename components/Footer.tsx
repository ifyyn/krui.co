import Link from "next/link";
import { fetchCategories } from "@/lib/catalog";
import { Category } from "@/lib/categories";

export default async function Footer() {
  const categories = await fetchCategories();
  return (
    <footer className="bg-ink text-white mt-auto">
      <div className="max-w-content mx-auto px-[18px] lg:px-7 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
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

          <div>
            <h4 className="font-display font-600 text-[15px] text-white/90 mb-4">Ikuti Kami</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://www.tiktok.com/@krui.co"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok KRUI.CO"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange hover:text-white flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://web.facebook.com/kruico/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook KRUI.CO"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange hover:text-white flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21.9V14h3l.56-3.9H13.5V7.68c0-1.07.36-1.86 1.93-1.86h1.77V2.36A27 27 0 0 0 14.66 2.2c-2.86 0-4.82 1.75-4.82 4.95V10.1H6.82V14h3.02v7.9z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/krui.co"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram KRUI.CO"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange hover:text-white flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.63A6.17 6.17 0 1 0 18.17 12 6.17 6.17 0 0 0 12 5.83zm0 10.17A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.15-11.84a1.44 1.44 0 1 1-1.44 1.44 1.44 1.44 0 0 1 1.44-1.44z" />
                </svg>
              </a>
            </div>
            <p className="mt-4 text-[13px] text-white/40">
              Berbagi momen Krui di media sosial.
            </p>
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
