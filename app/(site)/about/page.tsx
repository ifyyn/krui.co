import Link from "next/link";
import { Eyebrow } from "@/components/Button";
import Button from "@/components/Button";
import { Category } from "@/lib/categories";
import { categoryIcon, CheckIcon } from "@/components/icons";
import CategoryImage from "@/components/CategoryImage";
import { fetchCategories } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tentang Kami — KRUI.CO",
  description: "Kenali KRUI.CO — platform wisata terkurasi untuk Krui, Pesisir Barat Lampung.",
};

export default async function AboutPage() {
  const categories = await fetchCategories();
  return (
    <>
      <div className="pt-[72px]">
        <div className="bg-bg-alt border-b border-line">
          <div className="max-w-content mx-auto px-[18px] lg:px-7 py-10 lg:py-20">
            <Eyebrow className="text-orange">Tentang Kami</Eyebrow>
            <h1 className="mt-3 font-display font-800 text-[32px] lg:text-[52px] text-ink tracking-tight max-w-3xl">
              Terhubung dengan Krui lewat kurasi yang bisa dipercaya
            </h1>
            <p className="mt-4 text-[15px] lg:text-[17px] text-ink-soft max-w-2xl leading-relaxed">
              KRUI.CO lahir dari kecintaan pada Krui — surga tersembunyi di Pesisir Barat Lampung dengan gelombang legendaris, pantai keemasan, dan masyarakat yang hangat.
            </p>
          </div>
        </div>
      </div>

      <MissionValues />

      <WhyKrui />

      <Ecosystem categories={categories} />

      <FinalCTA />
    </>
  );
}

function MissionValues() {
  const values = [
    { title: "Kurasi", desc: "Kami tidak menampilkan semua — hanya yang terbaik dan terverifikasi, agar kamu selalu merasa aman memesan." },
    { title: "Keaslian", desc: "Pengalaman otentik yang menghadirkan Krui sesungguhnya, nilai budaya, dan kehidupan lokalnya." },
    { title: "Pemberdayaan", desc: "Setiap pemesanan berdampak langsung pada ekonomi warga dan bisnis lokal Krui." },
  ];
  return (
    <section className="py-[56px] lg:py-[88px] bg-bg">
      <div className="max-w-content mx-auto px-[18px] lg:px-7">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <Eyebrow>Visi & Misi</Eyebrow>
            <h2 className="mt-3 font-display font-700 text-[27px] lg:text-[32px] text-ink tracking-tight">
              Wisata yang baik untuk traveler, dan baik untuk Krui
            </h2>
            <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">
              Misi kami sederhana: menjadikan Krui mudah dijelajahi oleh siapa pun, sekaligus memastikan manfaatnya kembali ke komunitas lokal.
            </p>
            <div className="mt-8 space-y-4">
              {values.map((v, i) => (
                <div key={i} className="bg-white border border-line rounded-card p-5 flex gap-4">
                  <span className="w-10 h-10 rounded-full bg-blue-soft text-blue flex items-center justify-center shrink-0">
                    <CheckIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-700 text-[17px] text-ink">{v.title}</h3>
                    <p className="mt-1 text-[14px] text-ink-soft leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            {[
              { q: "01", label: "Pastikan kualitas", desc: "Setiap paket diverifikasi sebelum tayang." },
              { q: "02", label: "Kelola dengan mudah", desc: "Semua inquiry ditangani tim, bukan Anda yang pusing." },
              { q: "03", label: "Ciptakan dampak", desc: "Pendapatan kembali langsung ke komunitas lokal Krui." },
            ].map((s, i) => (
              <div key={i} className="bg-bg-alt border border-line rounded-card p-6 flex gap-5">
                <span className="font-mono text-[24px] font-500 text-orange">{s.q}</span>
                <div>
                  <h3 className="font-display font-700 text-[18px] text-ink">{s.label}</h3>
                  <p className="mt-1 text-[14px] text-ink-soft leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyKrui() {
  const points = [
    { title: "Gelombang kelas dunia", desc: "Om Ujung Bocor & Tanjung Setia jadi magnet surfer dunia." },
    { title: "Pantai yang masih asri", desc: "Pasir keemasan dan laut biru yang belum terlalu ramai." },
    { title: "Budaya lokal kaya", desc: "Tradisi pesisir, kuliner, dan kerajinan yang autentik." },
    { title: "Keramahan warga", desc: "Masyarakat Krui menyambut tamu bagai keluarga sendiri." },
  ];
  return (
    <section className="py-[56px] lg:py-[88px] bg-bg-alt">
      <div className="max-w-content mx-auto px-[18px] lg:px-7">
        <div className="text-center mb-10">
          <Eyebrow>Kenapa Krui?</Eyebrow>
          <h2 className="mt-3 font-display font-700 text-[27px] lg:text-[36px] text-ink tracking-tight">
            Sebuah destinasi yang layak dieksplor
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {points.map((p, i) => (
            <div key={i} className="bg-white border border-line rounded-card p-6 text-center hover:-translate-y-1 hover:shadow-card transition-all duration-300">
              <div className="mx-auto w-14 h-14 rounded-full bg-orange-soft text-orange flex items-center justify-center">
                {i % 2 === 0 ? categoryIcon("compass") : categoryIcon("surf")}
              </div>
              <h3 className="mt-4 font-display font-700 text-[17px] text-ink">{p.title}</h3>
              <p className="mt-2 text-[14px] text-ink-soft leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem({ categories }: { categories: Category[] }) {
  return (
    <section className="py-[56px] lg:py-[88px] bg-bg-alt">
      <div className="max-w-content mx-auto px-[18px] lg:px-7">
        <div className="text-center mb-10">
          <Eyebrow>Ekosistem Paket</Eyebrow>
          <h2 className="mt-3 font-display font-700 text-[27px] lg:text-[36px] text-ink tracking-tight">
            Satu platform, enam cara menjelajah
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((c) => {
            return (
              <Link key={c.slug} href={`/paket?cat=${c.slug}`} className="group relative overflow-hidden rounded-card block">
                <CategoryImage
                  slug={c.slug}
                  className="aspect-[16/10] w-full"
                  showIcon={false}
                  showLabel={false}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[#171717] text-[12px] font-mono">{c.label}</span>
                    <span className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-white">
                      {categoryIcon(c.icon)}
                    </span>
                  </div>
                  <span className="text-white font-medium text-[13px] max-w-[85%] leading-snug drop-shadow-sm">{c.tagline}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-ink py-[56px] lg:py-[80px]">
      <div className="max-w-content mx-auto px-[18px] lg:px-7 text-center">
        <svg viewBox="0 0 160 40" className="w-40 mx-auto mb-6" fill="none" stroke="rgba(245,130,31,0.7)" strokeWidth="2" strokeLinecap="round">
          <path d="M10 20 Q 25 8 40 20 T 70 20 T 100 20 T 130 20 T 155 20" />
        </svg>
        <h2 className="font-display font-800 text-[28px] lg:text-[40px] text-white tracking-tight">
          Jadilah bagian dari cerita Krui
        </h2>
        <p className="mt-3 text-white/60 text-[15px] lg:text-[17px] max-w-xl mx-auto">
          Baik sebagai traveler maupun penikmat wisata, bersama-sama kita wujudkan pariwisata yang tak terlupakan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/paket" variant="orange" className="px-8 py-3.5">Jelajah paket</Button>
          <Button href="/contact" variant="outline-white" className="px-8 py-3.5">Hubungi kami</Button>
        </div>
      </div>
    </section>
  );
}
