import type { Metadata } from "next";
import Image from "next/image";
import { fetchKruiSections, isHtml, stripHtml, PublicKruiSection } from "@/lib/krui";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tentang Krui — KRUI.CO",
  description:
    "Selayang pandang, destinasi wisata, budaya, dan kuliner Krui, Pesisir Barat Lampung. Surga tersembunyi di pesisir barat Sumatra.",
  keywords: [
    "tentang Krui",
    "selayang pandang Krui",
    "destinasi wisata Krui",
    "budaya Krui",
    "kuliner Krui",
    "Pesisir Barat Lampung",
    "KRUI.CO",
  ],
  alternates: { canonical: `${SITE_URL}/tentang-krui` },
  openGraph: {
    title: "Tentang Krui — KRUI.CO",
    description:
      "Destinasi wisata, budaya, dan kuliner Krui, Pesisir Barat Lampung.",
    url: `${SITE_URL}/tentang-krui`,
    siteName: "KRUI.CO",
    type: "website",
    locale: "id_ID",
  },
};

export default async function TentangKruiPage() {
  const sections = await fetchKruiSections();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tentang Krui", item: `${SITE_URL}/tentang-krui` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="pt-[72px]">
        <div className="bg-bg-alt border-b border-line">
          <div className="max-w-content mx-auto px-[18px] lg:px-7 py-12 lg:py-16">
            <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-orange font-600">
              Tentang Krui
            </p>
            <h1 className="mt-3 font-display font-800 text-[28px] lg:text-[40px] leading-tight text-ink">
              Selami Keindahan Krui
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              Dari selayang pandang hingga destinasi wisata, budaya, dan kuliner yang
              menggoda — kenali Krui, surga tersembunyi di Pesisir Barat Lampung.
            </p>
          </div>
        </div>

        {sections.length === 0 ? (
          <div className="max-w-content mx-auto px-[18px] lg:px-7 py-16">
            <div className="rounded-card border border-dashed border-line bg-bg-alt/50 px-8 py-16 text-center">
              <div className="text-3xl">◈</div>
              <h2 className="mt-3 font-display font-700 text-[18px] text-ink">
                Halaman ini sedang disiapkan
              </h2>
              <p className="mt-2 text-[14px] text-ink-soft">
                Konten Tentang Krui akan segera hadir di sini.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="sticky top-[72px] z-30 bg-bg/90 backdrop-blur-md border-b border-line">
              <div className="max-w-content mx-auto px-[18px] lg:px-7 py-3 overflow-x-auto">
                <div className="flex gap-2 w-max">
                  {sections.map((s, i) => (
                    <a
                      key={s.id}
                      href={`#bagian-${s.slug}`}
                      className="shrink-0 px-3.5 py-2 rounded-full text-[12.5px] font-600 no-underline transition-colors border border-line bg-white text-ink-soft hover:border-orange hover:text-orange"
                    >
                      {i === 0 ? "Intro" : s.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-content mx-auto px-[18px] lg:px-7">
              <TentangKruiHero section={sections[0]} />
              {sections.slice(1).map((s, i) => (
                <TentangKruiRow key={s.id} section={s} index={i} />
              ))}
            </div>
          </>
        )}

        <div className="max-w-content mx-auto px-[18px] lg:px-7 py-16 lg:py-24">
          <div className="rounded-card bg-gradient-to-br from-orange to-[#D96B0B] text-white p-8 lg:p-12">
            <h2 className="font-display font-800 text-[22px] lg:text-[30px] leading-tight">
              Siap menjelajahi Krui?
            </h2>
            <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/85">
              Lalu pilih paket wisata yang paling cocok untukmu dan mulai petualangan di
              pesisir yang menakjubkan ini.
            </p>
            <p className="mt-4">
              <a
                href="/paket"
                className="inline-block rounded-lg bg-white text-orange text-[14px] font-700 px-5 py-3 no-underline hover:bg-orange-50 transition-colors"
              >
                Lihat Paket Wisata →
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function renderContent(section: PublicKruiSection) {
  return isHtml(section.content) ? (
    <div
      className="prose-article"
      dangerouslySetInnerHTML={{ __html: section.content }}
    />
  ) : (
    <div className="whitespace-pre-wrap text-[15px] leading-[1.85] text-ink">
      {section.content}
    </div>
  );
}

function TentangKruiHero({ section }: { section: PublicKruiSection }) {
  return (
    <section id={`bagian-${section.slug}`} className="relative">
      <div className="relative h-[340px] lg:h-[480px] rounded-card overflow-hidden border border-line">
        {section.image ? (
          <Image
            src={section.image}
            alt={section.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-soft to-bg-alt flex items-center justify-center text-orange text-5xl">
            ◈
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
          <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-white/70 font-600">
            Selayang Pandang
          </p>
          <h2 className="mt-2 font-display font-800 text-[24px] lg:text-[36px] leading-tight text-white max-w-2xl">
            {section.title}
          </h2>
          {section.summary && (
            <p className="mt-3 max-w-2xl text-[14.5px] lg:text-[15.5px] leading-relaxed text-white/85">
              {section.summary}
            </p>
          )}
        </div>
      </div>
      {section.content && <div className="mt-8 max-w-3xl">{renderContent(section)}</div>}
    </section>
  );
}

function TentangKruiRow({ section, index }: { section: PublicKruiSection; index: number }) {
  const flip = index % 2 === 1;
  return (
    <section
      id={`bagian-${section.slug}`}
      className="py-14 lg:py-20 scroll-mt-[120px] border-t border-line"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className={flip ? "lg:order-2" : ""}>
          <div className="relative aspect-[16/11] rounded-card overflow-hidden border border-line">
            {section.image ? (
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 50vw, 640px"
              />
            ) : (
              <div className="w-full h-full bg-bg-alt flex items-center justify-center text-[#98a2b3] text-4xl">
                ◈
              </div>
            )}
          </div>
        </div>
        <div className={flip ? "lg:order-1" : ""}>
          <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-orange font-600">
            {String(index + 2).padStart(2, "0")}
          </p>
          <h2 className="mt-2 font-display font-800 text-[22px] lg:text-[30px] leading-tight text-ink">
            {section.title}
          </h2>
          {section.summary && (
            <p className="mt-4 text-[16px] leading-relaxed text-ink font-500">
              {section.summary}
            </p>
          )}
          {section.content && <div className="mt-4">{renderContent(section)}</div>}
        </div>
      </div>
    </section>
  );
}