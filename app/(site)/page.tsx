import Link from "next/link";
import Image from "next/image";
import { categoryIcon, ArrowRightIcon, VerifiedIcon, StarIcon, CheckIcon } from "@/components/icons";
import Button, { Eyebrow } from "@/components/Button";
import PackageCard from "@/components/PackageCard";
import HeroSection from "@/components/HeroSection";
import { Package } from "@/lib/packages";
import { Category } from "@/lib/categories";
import { fetchCatalog } from "@/lib/catalog";
import { SITE_URL, SOCIALS } from "@/lib/site";
import CategoryImage from "@/components/CategoryImage";
import { reviews } from "@/lib/reviews";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "KRUI.CO — Platform Wisata Terkurasi Krui, Pesisir Barat Lampung",
  description:
    "Jelajahi Krui, Pesisir Barat Lampung — paket wisata, penginapan, selancar, transport, dan pengalaman lokal terkurasi. Harga transparan, tanpa biaya tersembunyi.",
  keywords: [
    "wisata Krui",
    "paket wisata Krui",
    "Krui Pesisir Barat Lampung",
    "surfing Tanjung Setia",
    "pantai Krui",
    "homestay Krui",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "KRUI.CO — Platform Wisata Terkurasi Krui",
    description:
      "Jelajahi Krui — paket wisata, penginapan, selancar, transport, dan pengalaman lokal. Harga transparan.",
    url: SITE_URL,
    siteName: "KRUI.CO",
    type: "website",
    locale: "id_ID",
  },
};

export default async function HomePage() {
  const { packages, categories } = await fetchCatalog();
  const featured = packages.filter((p) => p.featured);
  const all = packages;
  const stays = packages.filter((p) => p.category === "stay").slice(0, 3);
  const experiences = packages.filter((p) => p.category === "experience").slice(0, 3);
  const countByCat = (slug: string) => packages.filter((p) => p.category === slug).length;

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "KRUI.CO",
    url: SITE_URL,
    logo: `${SITE_URL}/krui.png`,
    description:
      "Platform wisata terkurasi untuk Krui, Pesisir Barat Lampung — paket wisata, penginapan, selancar, transport, dan pengalaman lokal.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Raya Krui, Banding Agung",
      addressRegion: "Lampung",
      addressCountry: "ID",
    },
    sameAs: [SOCIALS.tiktok, SOCIALS.facebook, SOCIALS.instagram],
    areaServed: {
      "@type": "Place",
      name: "Krui, Pesisir Barat, Lampung",
    },
  };

  const destinationLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Krui, Pesisir Barat Lampung",
    description:
      "Surga tersembunyi di pesisir barat Lampung dengan gelombang kelas dunia, pantai keemasan, dan budaya lokal yang autentik.",
    url: SITE_URL,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    touristType: ["Surfer", "Beach lover", "Nature explorer", "Family"],
    includedInSchema: {
      "@type": "WebPage",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationLd) }}
      />
      <HeroSection />
      <CategoriesSection categories={categories} counts={countByCat} />
      <AboutSection />
      <FeaturedSection packages={featured} extra={all} />
      <StaysSection packages={stays} />
      <ExperiencesSection packages={experiences} />
      <WhyUs />
      <Testimonials />
      <Guide />
      <FinalCTA />
    </>
  );
}

function CategoriesSection({ categories, counts }: { categories: Category[]; counts: (slug: string) => number }) {
  return (
    <section className="py-[56px] lg:py-[72px] bg-bg overflow-hidden">
      <div className="max-w-content mx-auto px-[18px] lg:px-7">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <Eyebrow className="text-orange">Jelajahi</Eyebrow>
            <h2 className="mt-2 font-display font-700 text-[27px] lg:text-[36px] text-ink tracking-tight">
              Pilih kategori paket
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-5">
          {categories.map((c) => {
            const count = counts(c.slug);
            return (
              <Link
                key={c.slug}
                href={`/paket?cat=${c.slug}`}
                className="group shrink-0"
              >
                <div className="flex flex-col items-center gap-2.5 text-center">
                  <div className="aspect-square w-full max-w-[112px] lg:max-w-[150px] rounded-2xl overflow-hidden">
                    <CategoryImage slug={c.slug} className="w-full h-full" showIcon={false} showLabel={false} />
                  </div>
                  <div>
                    <div className="font-display font-700 text-[14px] lg:text-[15px] text-[#111827] group-hover:text-orange transition-colors">
                      {c.label}
                    </div>
                    <div className="mt-0.5 text-[11px] font-mono text-[#98a2b3]">{count} paket</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="relative py-[56px] lg:py-[88px] bg-bg-alt overflow-hidden">
      <div className="wave-ink absolute inset-0 opacity-60 pointer-events-none" aria-hidden />
      <div className="relative max-w-content mx-auto px-[18px] lg:px-7">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Eyebrow className="text-orange">Tentang KRUI.CO</Eyebrow>
            <h2 className="mt-3 font-display font-700 text-[27px] lg:text-[36px] text-ink tracking-tight max-w-xl">
              Terhubung dengan Krui lewat kurasi yang bisa dipercaya
            </h2>
            <p className="mt-4 text-[15px] lg:text-[16px] text-ink-soft leading-relaxed max-w-xl">
              KRUI.CO lahir dari kecintaan pada Krui — surga tersembunyi di Pesisir
              Barat Lampung dengan gelombang legendaris, pantai keemasan, dan
              masyarakat yang hangat. Kami mengkurasi wisata, penginapan,
              transportasi, hingga pengalaman lokal terbaik, agar setiap
              perjalananmu berkesan dan berdampak positif bagi warga setempat.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/about" variant="primary">
                Lihat detail tentang kami
              </Button>
              <Button href="/paket" variant="outline">
                Jelajahi paket
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-card overflow-hidden items-center justify-center hidden lg:flex">
            <img
              src="/krui.png"
              alt="KRUI.CO"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  sub,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-2 font-display font-700 text-[27px] lg:text-[36px] text-ink tracking-tight">{title}</h2>
        {sub && <p className="mt-2 text-[15px] text-ink-soft max-w-xl">{sub}</p>}
      </div>
      <Button href={href} variant="outline" className="hidden sm:inline-flex shrink-0">
        {linkLabel}
      </Button>
    </div>
  );
}

function FeaturedSection({ packages, extra }: { packages: Package[]; extra: Package[] }) {
  const shown = [...packages, ...extra.slice(0, 3 - packages.length)].slice(0, 6);
  return (
    <section className="py-[56px] lg:py-[88px] bg-bg-alt">
      <div className="max-w-content mx-auto px-[18px] lg:px-7">
        <SectionHeader
          eyebrow="Pilihan Tim"
          title="Paket unggulan"
          sub="Dipilih langsung oleh tim KRUI.CO — paling diminati traveler sepanjang tahun."
          href="/paket"
          linkLabel="Semua paket"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {shown.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Button href="/paket" variant="outline" className="w-full">Semua paket</Button>
        </div>
      </div>
    </section>
  );
}

function StaysSection({ packages }: { packages: Package[] }) {
  return (
    <section className="py-[56px] lg:py-[88px] bg-bg">
      <div className="max-w-content mx-auto px-[18px] lg:px-7">
        <SectionHeader
          eyebrow="Stay"
          title="Temukan tempat menginap"
          sub="Villa, homestay, dan resort pilihan — dari yang sederhana hingga mewah."
          href="/paket?cat=stay"
          linkLabel="Lihat semua stay"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {packages.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperiencesSection({ packages }: { packages: Package[] }) {
  return (
    <section className="py-[56px] lg:py-[88px] bg-bg-alt">
      <div className="max-w-content mx-auto px-[18px] lg:px-7">
        <SectionHeader
          eyebrow="Experience"
          title="Pengalaman lokal yang otentik"
          sub="Menyelami budaya, kuliner, dan kerajinan Krui bersama warga setempat."
          href="/paket?cat=experience"
          linkLabel="Lihat semua experience"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {packages.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TransportSection({ packages }: { packages: Package[] }) {
  return (
    <section className="py-[56px] lg:py-[88px] bg-bg">
      <div className="max-w-content mx-auto px-[18px] lg:px-7 grid lg:grid-cols-[1fr_1.4fr] gap-10 items-center">
        <div>
          <Eyebrow>Transport</Eyebrow>
          <h2 className="mt-2 font-display font-700 text-[27px] lg:text-[36px] text-ink tracking-tight">
            Mobilitas tanpa repot
          </h2>
          <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">
            Sewa mobil + driver, antar-jemput bandara, sampai pemandu lokal yang paham betul jalur pesisir Krui. Tinggal pilih, kami atur sisanya.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {packages.length === 0 ? (
              <Button href="/paket?cat=transport" variant="orange">Lihat transport</Button>
            ) : (
              <Button href="/paket?cat=transport" variant="orange">Lihat semua transport</Button>
            )}
          </div>
          <div className="mt-8 space-y-4">
            {[
              { title: "Sewa mobil + driver", desc: "Trip keluarga atau rombongan" },
              { title: "Antar jemput bandara", desc: "Radin Inten II → Krui" },
              { title: "Pemandu lokal", desc: "Jalur yang paham betul" },
            ].map((f, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-soft text-orange flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3 h-3" />
                </span>
                <div>
                  <div className="text-[15px] font-display font-600 text-ink">{f.title}</div>
                  <div className="text-[13px] text-ink-soft">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:gap-5">
          {packages.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
          {packages.length < 4 &&
            Array.from({ length: 4 - packages.length }).map((_, i) => (
              <div key={`ph-${i}`} className="aspect-[4/3] rounded-card wave-pattern bg-gradient-to-br from-[#E0672F] to-[#F5821F] relative overflow-hidden">
                <div className="absolute bottom-3 left-3"><span className="px-3 py-1 rounded-full bg-white/90 text-[#171717] text-[12px] font-mono">Transport</span></div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    { title: "Kurasi ketat", desc: "Setiap paket dicek langsung oleh tim kami sebelum tayang.", icon: "compass" },
    { title: "Terverifikasi", desc: "Semua paket terverifikasi sehingga kami bisa jamin kualitasnya.", icon: "verified" },
    { title: "Tanpa biaya alias", desc: "Harga transparan, tanpa biaya tersembunyi. Yang kamu lihat itulah yang kamu bayar.", icon: "tag" },
    { title: "Didukung lokal", desc: "Langsung memberdayakan warga & bisnis lokal Krui.", icon: "heart" },
  ];
  return (
    <section className="py-[56px] lg:py-[88px] bg-bg-alt">
      <div className="max-w-content mx-auto px-[18px] lg:px-7">
        <div className="text-center mb-10">
          <Eyebrow>Kenapa KRUI.CO</Eyebrow>
          <h2 className="mt-2 font-display font-700 text-[27px] lg:text-[36px] text-ink tracking-tight">
            Wisata yang bisa kamu percaya
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {points.map((p, i) => (
            <div key={i} className="bg-white border border-line rounded-card p-6 hover:-translate-y-1 hover:shadow-card transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-soft text-blue flex items-center justify-center mb-4">
                {categoryIcon(p.icon === "verified" ? "star" : p.icon === "tag" ? "star" : p.icon === "heart" ? "star" : "compass")}
              </div>
              <h3 className="font-display font-700 text-[17px] text-ink">{p.title}</h3>
              <p className="mt-2 text-[14px] text-ink-soft leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-[56px] lg:py-[88px] bg-bg-alt">
      <div className="max-w-content mx-auto px-[18px] lg:px-7">
        <div className="text-center mb-10">
          <Eyebrow>Testimoni</Eyebrow>
          <h2 className="mt-2 font-display font-700 text-[27px] lg:text-[36px] text-ink tracking-tight">
            Kata para penjelajah
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {reviews.map((r) => (
            <figure key={r.id} className="bg-white border border-line rounded-card p-6 flex flex-col">
              <div className="flex gap-1 text-orange">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 fill-orange text-orange" />
                ))}
              </div>
              <blockquote className="mt-3 text-[14px] text-ink-soft leading-relaxed flex-1">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-line flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-blue-soft text-blue flex items-center justify-center">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <div className="text-[14px] font-display font-600 text-ink">{r.name}</div>
                  <div className="text-[12px] text-ink-soft">{r.location} · {r.package}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guide() {
  return (
    <section className="py-[56px] lg:py-[88px] bg-bg">
      <div className="max-w-content mx-auto px-[18px] lg:px-7 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] lg:aspect-square rounded-lg2 w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80"
              alt="Pemandangan alam perbukitan dan danau di Krui"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent pointer-events-none" />
          </div>
          <div className="absolute -bottom-5 right-4 bg-white border border-line rounded-card shadow-card px-4 py-3">
            <div className="font-mono text-[18px] text-ink">50+ Paket</div>
            <div className="text-[12px] text-ink-soft">seluruh Krui</div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <Eyebrow>Panduan</Eyebrow>
          <h2 className="mt-2 font-display font-700 text-[27px] lg:text-[36px] text-ink tracking-tight">
            Belum tahu harus mulai dari mana?
          </h2>
          <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">
            Tim KRUI.CO siap membantu meracik itinerary sesuai minatmu — dari pencinta pantai, pecinta surfing, sampai yang ingin menyelami budaya lokal.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { q: "Cara memesan paket", a: "Pilih paket → kirim inquiry → tim kami yang menindaklanjuti." },
              { q: "Apakah ada pembayaran online?", a: "Tidak. Sistem kami berbasis inquiry — tim yang menghubungi kamu." },
              { q: "Dari mana saya dijemput?", a: "Tiap paket punya meeting point yang jelas di halaman detail." },
            ].map((f, i) => (
              <details key={i} className="group bg-white border border-line rounded-card px-5 py-4">
                <summary className="flex items-center justify-between cursor-pointer font-display font-600 text-[15px] text-ink list-none">
                  {f.q}
                  <span className="text-ink-soft transition-transform group-open:rotate-45 text-lg leading-none">+</span>
                </summary>
                <p className="mt-3 text-[14px] text-ink-soft leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-6">
            <Button href="/contact" variant="primary">Tanya tim kami</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-ink py-[56px] lg:py-[88px]">
      <div className="max-w-content mx-auto px-[18px] lg:px-7 text-center">
        <svg viewBox="0 0 160 40" className="w-40 mx-auto mb-6" fill="none" stroke="rgba(245,130,31,0.7)" strokeWidth="2" strokeLinecap="round">
          <path d="M10 20 Q 25 8 40 20 T 70 20 T 100 20 T 130 20 T 155 20" />
        </svg>
        <h2 className="font-display font-800 text-[28px] lg:text-[44px] text-white tracking-tight">
          Krui menunggumu.
        </h2>
        <p className="mt-3 text-white/60 text-[15px] lg:text-[17px] max-w-xl mx-auto">
          Mulai rencanakan perjalananmu hari ini — semua yang kamu butuhkan ada di satu tempat.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/paket" variant="orange" className="px-8 py-3.5 text-[16px]">
            Jelajah paket
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
          <Button href="/contact" variant="outline-white" className="px-8 py-3.5 text-[16px]">
            Hubungi kami
          </Button>
        </div>
      </div>
    </section>
  );
}
