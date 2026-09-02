import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/packages";
import { getCategory } from "@/lib/categories";
import { categoryStyle } from "@/lib/colorMap";
import { fetchPackages } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";
import Button, { Eyebrow } from "@/components/Button";
import PackageCard from "@/components/PackageCard";
import { PinIcon, ClockIcon, StarIcon, CheckIcon, XIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await fetchPackages();
  const pkg = catalog.find((p) => p.slug === slug);
  if (!pkg) return { title: "Paket tidak ditemukan — KRUI.CO" };

  const cat = getCategory(pkg.category);
  const title = `${pkg.title} — Paket ${cat?.label || ""} di Krui`;
  const description = pkg.description
    ? pkg.description.slice(0, 155).trim() + (pkg.description.length > 155 ? "…" : "")
    : `${pkg.title} di ${pkg.location || "Krui"} — mulai dari ${formatPrice(pkg.price)}. Dikelola oleh KRUI.CO.`;

  return {
    title,
    description,
    keywords: [
      pkg.title,
      `paket ${cat?.label?.toLowerCase() || ""} Krui`,
      `wisata ${pkg.location || "Krui"}`,
      "KRUI.CO",
      "paket wisata Krui Lampung",
    ],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/paket/${slug}`,
      type: "website",
      siteName: "KRUI.CO",
      images: pkg.image
        ? [{ url: pkg.image, width: 1200, height: 630, alt: pkg.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: pkg.image ? [pkg.image] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/paket/${slug}`,
    },
  };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const catalog = await fetchPackages();
  const pkg = catalog.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const cat = getCategory(pkg.category)!;
  const style = categoryStyle(pkg.category);
  const sameCat = catalog.filter((p) => p.slug !== pkg.slug && p.category === pkg.category);
  const similar = sameCat.length ? sameCat : catalog.filter((p) => p.slug !== pkg.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.title,
    description: pkg.description || `${pkg.title} di ${pkg.location || "Krui"}`,
    image: pkg.image || undefined,
    brand: { "@type": "Organization", name: "KRUI.CO" },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: pkg.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/paket/${slug}`,
    },
    aggregateRating: pkg.reviews
      ? {
          "@type": "AggregateRating",
          ratingValue: pkg.rating,
          reviewCount: pkg.reviews,
        }
      : undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Paket", item: `${SITE_URL}/paket` },
      { "@type": "ListItem", position: 3, name: pkg.title, item: `${SITE_URL}/paket/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="pt-[72px] bg-bg-alt border-b border-line">
        <div className="max-w-content mx-auto px-[18px] lg:px-7 py-8 lg:py-12">
          <div className="mt-6 grid lg:grid-cols-[1.4fr_1fr] gap-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-mono ${style.badgeBg} ${style.text}`}>
                  {cat.label}
                </span>
                {pkg.featured && (
                  <span className="inline-block px-2.5 py-1 rounded-full bg-ink text-white text-[11px] font-mono uppercase tracking-wider">
                    Dipilih tim
                  </span>
                )}
              </div>
              <h1 className="font-display font-800 text-[28px] lg:text-[44px] leading-tight tracking-tight text-ink">
                {pkg.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-5 text-[14px] text-ink-soft">
                <span className="inline-flex items-center gap-1.5"><PinIcon className="w-4 h-4 text-ink-soft" /> {pkg.location}</span>
                <span className="inline-flex items-center gap-1.5"><ClockIcon className="w-4 h-4 text-ink-soft" /> {pkg.duration}</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-ink">
                  <StarIcon className="w-4 h-4 text-orange" /> {pkg.rating.toFixed(1)}
                  <span className="text-ink-soft">({pkg.reviews} ulasan)</span>
                </span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white border border-line rounded-card p-6 shadow-card sticky top-24">
                <div className="text-[12px] font-mono uppercase tracking-wider text-ink-soft">Mulai dari</div>
                <div className="mt-1 font-mono text-[28px] font-500 text-ink">{formatPrice(pkg.price)}</div>
                <div className="text-[12px] text-ink-soft">/ {pkg.duration.toLowerCase()}</div>
                <div className="mt-5 space-y-2.5">
                  <Button href={`/booking/${pkg.slug}`} variant="orange" className="w-full py-3.5">Kirim Inquiry</Button>
                  <Button href={`/contact`} variant="outline" className="w-full py-3">Tanya dulu</Button>
                </div>
                <p className="mt-4 text-[12px] text-ink-soft text-center leading-relaxed">
                  Gratis konsultasi · Tanpa pembayaran online · Tim kami mengonfirmasi via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg-alt pb-8">
        <div className="max-w-content mx-auto px-[18px] lg:px-7">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-lg2 overflow-hidden shadow-card">
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              priority
              sizes="(min-width: 1024px) 84vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent pointer-events-none" />
            <span
              className={`absolute top-4 left-4 inline-block px-3 py-1 rounded-full text-[12px] font-mono ${style.badgeBg} ${style.text}`}
            >
              {cat.label}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-bg py-[56px] lg:py-[88px]">
        <div className="max-w-content mx-auto px-[18px] lg:px-7 grid lg:grid-cols-[1.6fr_1fr] gap-10">
          <div className="min-w-0 space-y-10">
            <section>
              <h2 className="font-display font-700 text-[22px] text-ink">Tentang paket</h2>
              <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">{pkg.description}</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-[22px] text-ink">Itinerari</h2>
              {pkg.itinerary.length === 0 ? (
                <p className="mt-3 text-[14px] text-ink-soft">
                  Paket ini bersifat fleksibel — waktu dapat disesuaikan dengan kebutuhanmu.
                </p>
              ) : (
                <div className="mt-5 space-y-0">
                  {pkg.itinerary.map((it, i) => (
                    <div key={i} className="flex gap-4 pb-6 relative">
                      <div className="flex flex-col items-center">
                        <span className="w-3 h-3 rounded-full bg-orange mt-1.5" />
                        {i < pkg.itinerary.length - 1 && <span className="w-px flex-1 bg-line" />}
                      </div>
                      <div className="pb-2">
                        <div className="font-mono text-[13px] text-orange">{it.time}</div>
                        <div className="font-display font-600 text-[16px] text-ink">{it.title}</div>
                        <div className="text-[14px] text-ink-soft leading-relaxed mt-1">{it.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="font-display font-700 text-[22px] text-ink">Termasuk &amp; tidak termasuk</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-5">
                <div className="bg-white border border-line rounded-card p-5">
                  <h3 className="font-display font-600 text-[15px] text-green flex items-center gap-2"><CheckIcon className="w-4 h-4" /> Termasuk</h3>
                  <ul className="mt-3 space-y-2">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[14px] text-ink-soft">
                        <CheckIcon className="w-3.5 h-3.5 text-green shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-line rounded-card p-5">
                  <h3 className="font-display font-600 text-[15px] text-ink-soft flex items-center gap-2"><XIcon className="w-4 h-4" /> Tidak termasuk</h3>
                  <ul className="mt-3 space-y-2">
                    {pkg.excludes.length === 0 ? (
                      <li className="flex items-center gap-2.5 text-[14px] text-ink-soft">—</li>
                    ) : (
                      pkg.excludes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-[14px] text-ink-soft">
                          <XIcon className="w-3.5 h-3.5 text-ink-soft shrink-0" /> {item}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display font-700 text-[22px] text-ink">Titik pertemuan</h2>
              <div className="mt-3 flex items-center gap-3 bg-white border border-line rounded-card p-5">
                <span className="w-11 h-11 rounded-full bg-orange-soft text-orange flex items-center justify-center">
                  <PinIcon className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-[15px] font-display font-600 text-ink">{pkg.meetingPoint}</div>
                  <div className="text-[13px] text-ink-soft">Lokasi penjemputan / titik mulai paket ini</div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="lg:hidden bg-white border border-line rounded-card p-6 shadow-card">
              <div className="text-[12px] font-mono uppercase tracking-wider text-ink-soft">Mulai dari</div>
              <div className="mt-1 font-mono text-[28px] font-500 text-ink">{formatPrice(pkg.price)}</div>
              <div className="text-[12px] text-ink-soft">/ {pkg.duration.toLowerCase()}</div>
              <div className="mt-5 space-y-2.5">
                <Button href={`/booking/${pkg.slug}`} variant="orange" className="w-full py-3.5">Kirim Inquiry</Button>
                <Button href={`/contact`} variant="outline" className="w-full py-3">Tanya dulu</Button>
              </div>
              <p className="mt-4 text-[12px] text-ink-soft text-center leading-relaxed">
                Gratis konsultasi · Tanpa pembayaran online · Tim kami mengonfirmasi via WhatsApp
              </p>
            </div>

            <div className="bg-bg-alt border border-line rounded-card p-5">
              <h3 className="font-display font-600 text-[15px] text-ink">Ngobrol langsung</h3>
              <p className="mt-1 text-[13px] text-ink-soft">Butuh bantuan memilih? Tim kami siap membantu.</p>
              <Button href="/contact" variant="outline" className="mt-4 w-full py-2.5 text-[14px]">Hubungi kami</Button>
            </div>
          </aside>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="bg-bg-alt py-[56px] lg:py-[80px] border-t border-line">
          <div className="max-w-content mx-auto px-[18px] lg:px-7">
            <div className="flex items-end justify-between mb-8">
              <div>
                <Eyebrow>Paket serupa</Eyebrow>
                <h2 className="mt-2 font-display font-700 text-[27px] lg:text-[32px] text-ink tracking-tight">
                  {cat.label} lain yang mungkin kamu suka
                </h2>
              </div>
              <Button href={`/paket?cat=${cat.slug}`} variant="outline" className="hidden sm:inline-flex shrink-0">
                Lihat semua {cat.label.toLowerCase()}
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {similar.slice(0, 3).map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
