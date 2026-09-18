"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function TentangKruiImage({
  src,
  alt,
  sizes,
  priority,
}: {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!failed && src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-soft to-bg-alt text-orange">
      <span className="text-4xl lg:text-5xl">◈</span>
      <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-orange/70 font-600">
        {alt}
      </span>
    </div>
  );
}