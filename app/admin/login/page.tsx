"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const { login, user } = useAdmin();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/admin");
    }
  }, [user, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal masuk");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="font-display font-800 text-3xl tracking-tight text-white">
            KRUI<span className="text-orange">.CO</span>
          </div>
          <p className="text-[13px] text-white/50 mt-2">Masuk ke panel admin</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl p-7 shadow-2xl space-y-4"
        >
          {error && (
            <div className="rounded-lg bg-red-50 text-red-600 text-[13px] px-4 py-3">
              {error}
            </div>
          )}
          <div>
            <label className="block text-[13px] font-600 text-[#111827] mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#f6f7f9] border border-[#e5e7eb] rounded-lg text-[14px] outline-none focus:border-orange focus:bg-white transition-colors"
              placeholder="admin@krui.co"
            />
          </div>
          <div>
            <label className="block text-[13px] font-600 text-[#111827] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#f6f7f9] border border-[#e5e7eb] rounded-lg text-[14px] outline-none focus:border-orange focus:bg-white transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-orange text-white font-600 text-[15px] py-3 hover:brightness-95 transition-all disabled:opacity-60"
          >
            {busy ? "Memproses…" : "Masuk"}
          </button>
          <p className="text-[12px] text-center text-[#98a2b3] pt-1">
            Default: admin@krui.co / admin123
          </p>
        </form>
      </div>
    </div>
  );
}
