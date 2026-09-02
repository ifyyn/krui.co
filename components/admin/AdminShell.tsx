"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/lib/admin-auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "▦" },
  { href: "/admin/packages", label: "Paket", icon: "▤" },
  { href: "/admin/categories", label: "Kategori", icon: "▣" },
  { href: "/admin/settings", label: "Pengaturan", icon: "⚙" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAdmin();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      window.location.href = "/admin/login";
    }
  }, [loading, user, pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7f9] flex items-center justify-center text-[15px] text-[#667085]">
        Memuat…
      </div>
    );
  }

  if (!user) return null;

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const NavList = (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-colors ${
            isActive(item.href)
              ? "bg-orange text-white font-600"
              : "text-white/70 hover:bg-white/5 hover:text-white"
          }`}
        >
          <span className="w-4 text-center">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );

  const UserFooter = (
    <div className="px-3 py-4 border-t border-white/10">
      <div className="px-3 py-2 text-[12px] text-white/50 truncate">{user.email}</div>
      <button
        onClick={logout}
        className="mt-1 w-full text-left px-3 py-2 rounded-lg text-[13px] text-white/70 hover:bg-white/5 hover:text-white transition-colors"
      >
        Keluar
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f7f9] flex">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed inset-x-0 top-0 z-30 bg-[#111827] text-white h-14 flex items-center justify-between px-4">
        <div className="font-display font-800 text-lg tracking-tight">
          KRUI<span className="text-orange">.CO</span>
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Buka menu"
          className="text-[22px] leading-none px-2 py-1 hover:text-orange transition-colors"
        >
          ☰
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-[#111827] text-white flex flex-col shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="font-display font-800 text-lg tracking-tight">
                KRUI<span className="text-orange">.CO</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Tutup menu"
                className="text-white/70 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            </div>
            {NavList}
            {UserFooter}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 bg-[#111827] text-white flex-col sticky top-0 h-screen">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="font-display font-800 text-lg tracking-tight">
            KRUI<span className="text-orange">.CO</span>
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mt-0.5">
            Admin Panel
          </div>
        </div>
        {NavList}
        {UserFooter}
      </aside>

      <div className="flex-1 min-w-0 lg:pt-0 pt-14">
        <header className="h-16 bg-white border-b border-[#e5e7eb] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-20 gap-3">
          <div className="text-[13px] sm:text-[14px] text-[#667085] truncate">
            Selamat datang, <span className="font-600 text-[#111827]">{user?.name || user?.email}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="text-[13px] text-[#667085] hover:text-[#111827] hidden sm:inline"
            >
              Lihat situs ↗
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0fdf4] text-[#16a34a] text-[12px] font-600 px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              {user.role}
            </span>
          </div>
        </header>
        <main className="px-4 lg:px-8 py-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}