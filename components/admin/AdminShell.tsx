"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      window.location.href = "/admin/login";
    }
  }, [loading, user, pathname]);

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

  return (
    <div className="min-h-screen bg-[#f6f7f9] flex">
      <aside className="w-60 shrink-0 bg-[#111827] text-white flex flex-col sticky top-0 h-screen">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="font-display font-800 text-lg tracking-tight">
            KRUI<span className="text-orange">.CO</span>
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mt-0.5">
            Admin Panel
          </div>
        </div>
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
        <div className="px-3 py-4 border-t border-white/10">
          <div className="px-3 py-2 text-[12px] text-white/50 truncate">{user.email}</div>
          <button
            onClick={logout}
            className="mt-1 w-full text-left px-3 py-2 rounded-lg text-[13px] text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            Keluar
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="h-16 bg-white border-b border-[#e5e7eb] px-6 lg:px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="text-[14px] text-[#667085]">
            Selamat datang, <span className="font-600 text-[#111827]">{user?.name || user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-[13px] text-[#667085] hover:text-[#111827]"
            >
              Lihat situs ↗
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0fdf4] text-[#16a34a] text-[12px] font-600 px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              {user.role}
            </span>
          </div>
        </header>
        <main className="px-6 lg:px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
