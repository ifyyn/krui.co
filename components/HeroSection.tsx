"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons";
import Button from "@/components/Button";

const heroImages = [
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/6b/37/dc/caption.jpg?w=900&h=500&s=1",
  "https://thumb.viva.id/vivalampung/665x374/2023/01/22/63cd5bf29d2aa-pesona-pantai-labuhan-jukung-krui-pesisir-barat_lampung.jpg",
  "https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2025/03/30/1558284251.jpg",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&w=2000&q=80",
];

const kenBurnsClasses = [
  "hero-kenburns-1",
  "hero-kenburns-2",
  "hero-kenburns-3",
  "hero-kenburns-4",
  "hero-kenburns-5",
  "hero-kenburns-1",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.6)));

        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${rect.top * 0.35}px)`;
        }
        el.style.opacity = String(1 - progress);
        el.style.transform = `translateY(${progress * -40}px)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-[72px]">
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        {heroImages.map((src, i) => (
          <div
            key={`${i}-${i === index ? "active" : "idle"}`}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              i === index ? `opacity-100 ${kenBurnsClasses[i]}` : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Pantai dan laut di Krui, Pesisir Barat Lampung"
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[#F3F0E9]/40 pointer-events-none" aria-hidden />
      <div className="relative max-w-content mx-auto px-[18px] lg:px-7 pt-10 pb-16 lg:pt-16 lg:pb-24 z-10">
        <div className="max-w-xl">
          <h1 className="hero-reveal hero-reveal-1 mt-4 font-display font-800 text-[32px] leading-[1.05] lg:text-[58px] tracking-tight text-ink">
            Everything you need to explore{" "}
            <span className="text-blue">Krui</span>, in one place.
          </h1>
          <p className="hero-reveal hero-reveal-2 mt-5 text-[15px] lg:text-[17px] text-ink leading-relaxed max-w-lg">
            Paket wisata, penginapan, selancar, dan pengalaman lokal yang terkurasi — Surga tersembunyi di Pesisir Barat Lampung.
          </p>
          <div className="hero-reveal hero-reveal-3 mt-8 flex flex-wrap gap-3">
            <Button href="/paket" variant="orange" className="px-8 py-3.5 text-[16px]">
              Mulai Jelajah
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
          <div className="hero-reveal hero-reveal-4 mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              { n: "6", label: "Kategori Paket" },
              { n: "4.8", label: "Rating Rata-rata" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-mono text-[26px] lg:text-[30px] font-500 text-ink">{s.n}</div>
                <div className="text-[12px] text-ink-soft mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
