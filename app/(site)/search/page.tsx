import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Cari Paket Wisata Krui — KRUI.CO",
  description:
    "Cari paket wisata, penginapan, transport, selancar, dan pengalaman lokal di Krui, Pesisir Barat Lampung.",
  keywords: ["cari wisata Krui", "pencarian paket Krui", "template wisata Krui"],
  alternates: { canonical: `${SITE_URL}/search` },
  openGraph: {
    title: "Cari Paket Wisata Krui — KRUI.CO",
    description: "Cari paket wisata, penginapan, transport, dan pengalaman lokal di Krui.",
    url: `${SITE_URL}/search`,
    siteName: "KRUI.CO",
    type: "website",
    locale: "id_ID",
  },
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