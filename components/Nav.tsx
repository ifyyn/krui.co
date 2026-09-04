"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCategories } from "@/lib/use-catalog";
import { MenuIcon, XIcon, ChevronDownIcon, SearchIcon } from "./icons";

interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
  { href: "/", label: "Beranda" },
  { href: "/paket", label: "Paket" },
  { href: "/about", label: "Tentang" },
  { href: "/contact", label: "Kontak" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paketOpen, setPaketOpen] = useState(false);
  const pathname = usePathname();
  const { categories } = useCategories();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/paket")
      return pathname === "/paket" || pathname.startsWith("/paket/");
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-bg border-b border-line`}
      >
        <div className="max-w-content mx-auto px-[18px] lg:px-7 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/krui.png"
              alt="KRUI.CO"
              className="h-12 lg:h-14 w-auto object-contain"
            />
            <span className="font-display font-800 text-[22px] tracking-tight text-ink">
              KRUI<span className="text-orange">.CO</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) =>
              l.href === "/paket" ? (
                <div key={l.href} className="relative group">
                  <span
                    className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-[15px] font-500 cursor-pointer transition-colors ${
                      isActive(l.href) ? "text-ink" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {l.label}
                    <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </span>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="w-56 bg-white border border-line rounded-card shadow-card p-2">
                      <Link
                        href="/paket"
                        className="block px-3 py-2.5 rounded-[10px] text-[14px] font-500 text-ink hover:bg-bg-alt"
                      >
                        Semua Paket
                      </Link>
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/paket?cat=${c.slug}`}
                          className="flex items-center justify-between px-3 py-2.5 rounded-[10px] text-[14px] text-ink-soft hover:bg-bg-alt hover:text-ink"
                        >
                          {c.label}
                          <span className="font-mono text-[11px] uppercase tracking-wider">{c.slug}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-4 py-2 rounded-full text-[15px] font-500 transition-colors ${
                    isActive(l.href) ? "text-ink bg-bg-alt" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/search"
              className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink-soft hover:text-blue hover:border-blue transition-colors"
              aria-label="Cari"
            >
              <SearchIcon className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/6285379997771?text=Halo%20KRUI.CO%2C%20saya%20ingin%20melakukan%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-orange text-white font-display font-600 text-[14px] px-5 py-2.5 transition-colors hover:brightness-95"
            >
              Booking Now
            </a>
          </div>

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-ink"
            onClick={() => setMobileOpen(true)}
            aria-label="Buka menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-bg flex flex-col lg:hidden">
          <div className="h-[72px] px-[18px] flex items-center justify-between">
          <div className="flex items-center">
            <img src="/krui.png" alt="KRUI.CO" className="h-12 w-auto object-contain" />
            <span className="font-display font-800 text-[22px] text-ink">
              KRUI<span className="text-orange">.CO</span>
            </span>
          </div>
            <button
              className="w-10 h-10 flex items-center justify-center text-ink"
              onClick={() => setMobileOpen(false)}
              aria-label="Tutup menu"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-[18px] py-4">
            {links.map((l) =>
              l.href === "/paket" ? (
                <div key={l.href}>
                  <button
                    className="w-full flex items-center justify-between py-4 text-[20px] font-display font-600 text-ink border-b border-line"
                    onClick={() => setPaketOpen(!paketOpen)}
                  >
                    Paket
                    <ChevronDownIcon className={`w-5 h-5 transition-transform ${paketOpen ? "rotate-180" : ""}`} />
                  </button>
                  {paketOpen && (
                    <div className="pt-1 pb-3">
                      <Link
                        href="/paket"
                        className="block py-3 px-2 text-[16px] font-500 text-ink"
                      >
                        Semua Paket
                      </Link>
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/paket?cat=${c.slug}`}
                          className="block py-3 px-2 text-[16px] text-ink-soft"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block py-4 text-[20px] font-display font-600 text-ink border-b border-line"
                >
                  {l.label}
                </Link>
              )
            )}
            <Link
              href="/search"
              className="block py-4 text-[20px] font-display font-600 text-ink border-b border-line"
            >
              Cari
            </Link>
          </nav>

          <div className="px-[18px] pb-8">
            <Link
              href="/search"
              className="block text-center rounded-full bg-orange text-white font-display font-600 text-[15px] px-6 py-3.5"
            >
              Cari Paket
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
