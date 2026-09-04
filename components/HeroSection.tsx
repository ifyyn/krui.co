"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons";
import Button from "@/components/Button";

const heroImages = [
  "https://res.cloudinary.com/dv0uopb3q/image/upload/v1788534180/WhatsApp_Image_2026-09-04_at_21.28.11_zzgtct.jpg",
  "https://res.cloudinary.com/dv0uopb3q/image/upload/v1788534180/WhatsApp_Image_2026-09-04_at_21.28.15_mzbduz.jpg",
  "https://res.cloudinary.com/dv0uopb3q/image/upload/v1788534179/WhatsApp_Image_2026-09-04_at_21.26.55_kzzjmw.jpg",
  "https://res.cloudinary.com/dv0uopb3q/image/upload/v1788534179/WhatsApp_Image_2026-09-04_at_21.26.53_skcjf3.jpg",
  "https://res.cloudinary.com/dv0uopb3q/image/upload/v1788534178/WhatsApp_Image_2026-09-04_at_21.26.48_qlt0xe.jpg",
  "https://res.cloudinary.com/dv0uopb3q/image/upload/v1788534179/WhatsApp_Image_2026-09-04_at_21.26.51_ewjrit.jpg",
  "https://res.cloudinary.com/dv0uopb3q/image/upload/v1788534178/WhatsApp_Image_2026-09-04_at_21.26.46_hzklo6.jpg",
  "https://res.cloudinary.com/dv0uopb3q/image/upload/v1788534177/WhatsApp_Image_2026-09-04_at_21.26.24_c16mub.jpg",
  "https://res.cloudinary.com/dv0uopb3q/image/upload/v1788534177/WhatsApp_Image_2026-09-04_at_21.26.27_ptkyp5.jpg",
  "https://res.cloudinary.com/dv0uopb3q/image/upload/v1788534176/WhatsApp_Image_2026-09-04_at_21.26.16_l49yhq.jpg",
];

const kenBurnsClasses = [
  "hero-kenburns-1",
  "hero-kenburns-2",
  "hero-kenburns-3",
  "hero-kenburns-1",
  "hero-kenburns-2",
  "hero-kenburns-3",
  "hero-kenburns-1",
  "hero-kenburns-2",
  "hero-kenburns-3",
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
      <div className="absolute inset-0 pointer-events-none" aria-hidden />
      <div className="relative max-w-content mx-auto px-[18px] lg:px-7 pt-10 pb-16 lg:pt-16 lg:pb-24 z-10">
        <div className="max-w-xl">
          <h1 className="hero-reveal hero-reveal-1 mt-4 font-display font-800 text-[32px] leading-[1.05] lg:text-[58px] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
            Everything you need to explore{" "}
            <span className="text-orange">Krui</span>, in one place.
          </h1>
          <p className="hero-reveal hero-reveal-2 mt-5 text-[15px] lg:text-[17px] text-white/95 leading-relaxed max-w-lg [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
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
                <div className="font-mono text-[26px] lg:text-[30px] font-800 text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">{s.n}</div>
                <div className="text-[12px] text-white/90 mt-1 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
