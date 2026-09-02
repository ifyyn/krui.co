import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";

export const metadata = {
  title: "Cari — KRUI.CO",
  description: "Cari paket wisata, penginapan, transport, dan pengalaman di Krui.",
};

export default function SearchPage() {
  return (
    <div className="pt-[72px]">
      <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-ink-soft">Memuat…</div>}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
