import { Suspense } from "react";
import PaketListing from "@/components/PaketListing";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Semua Paket Wisata Krui — KRUI.CO",
  description:
    "Jelajahi semua paket wisata, penginapan, selancar, transport, dan pengalaman lokal di Krui, Pesisir Barat Lampung.",
  keywords: [
    "paket wisata Krui",
    "daftar wisata Krui",
    "paket stay Krui",
    "paket surf Tanjung Setia",
    "rental Krui",
    "paket wisata Lampung",
  ],
  alternates: { canonical: `${SITE_URL}/paket` },
  openGraph: {
    title: "Semua Paket Wisata Krui — KRUI.CO",
    description: "Jelajahi semua paket wisata, penginapan, selancar, dan pengalaman di Krui.",
    url: `${SITE_URL}/paket`,
    siteName: "KRUI.CO",
    type: "website",
    locale: "id_ID",
  },
};

export default function PaketPage() {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <PaketListing />
    </Suspense>
  );
}

function ListingSkeleton() {
  return (
    <div className="pt-[72px]">
      <div className="bg-bg-alt border-b border-line">
        <div className="max-w-content mx-auto px-[18px] lg:px-7 py-12">
          <div className="h-4 w-24 bg-line rounded-full animate-pulse" />
          <div className="mt-4 h-10 w-64 bg-line rounded-lg animate-pulse" />
        </div>
      </div>
      <div className="max-w-content mx-auto px-[18px] lg:px-7 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-line rounded-card overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-bg-alt" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-line rounded" />
                <div className="h-4 w-1/2 bg-line rounded" />
                <div className="h-4 w-2/3 bg-line rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}