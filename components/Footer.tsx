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
            <Link href="/" className="flex items-center">
              <img src="/krui.png" alt="KRUI.CO" className="h-12 w-auto object-contain" />
              <span className="font-display font-800 text-[22px] tracking-tight text-white">
                KRUI<span className="text-orange">.CO</span>
              </span>
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
              <li>
                <a
                  href="https://wa.me/6285379997771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.47 1.34 5L2 22l5.17-1.35a9.96 9.96 0 0 0 4.87 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.83 14.16c-.25.7-1.46 1.33-2.03 1.38-.55.05-1.03.25-3.46-.72-2.93-1.16-4.79-4.15-4.94-4.34-.15-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .57.01.18.01.43-.07.67.52.25.6.85 2.07.93 2.22.08.15.13.33.02.54-.1.2-.15.33-.3.5-.15.18-.32.4-.46.54-.15.15-.3.31-.13.61.17.3.76 1.26 1.64 2.04 1.13 1.01 2.09 1.32 2.38 1.47.3.15.47.13.64-.08.17-.2.74-.86.93-1.16.2-.3.39-.25.66-.15.26.1 1.68.8 1.97.94.29.15.48.22.55.34.07.12.07.7-.18 1.4z" />
                  </svg>
                  +62 853-7999-7771
                </a>
              </li>
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
