import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "orange" | "outline" | "outline-white";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-600 text-[15px] px-6 py-3 transition-all duration-200 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-blue",
  orange:
    "bg-orange text-white hover:brightness-95 shadow-[0_10px_25px_-8px_rgba(245,130,31,0.6)]",
  outline:
    "border-[1.5px] border-ink/70 text-ink hover:bg-ink hover:text-white",
  "outline-white":
    "border-[1.5px] border-white/70 text-white hover:bg-white hover:text-ink",
};

export default function Button({
  href,
  variant = "primary",
  className = "",
  children,
  type,
  onClick,
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block font-mono text-[12px] uppercase text-ink-soft tracking-[0.14em] ${className}`}
    >
      {children}
    </span>
  );
}
