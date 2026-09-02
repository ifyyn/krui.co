"use client";

import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-[#e5e7eb] rounded-xl ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="font-display font-800 text-[22px] lg:text-[26px] text-[#111827] tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="text-[13.5px] text-[#667085] mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Btn({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
}) {
  const styles =
    variant === "primary"
      ? "bg-orange text-white hover:brightness-95"
      : variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-white border border-[#e5e7eb] text-[#111827] hover:bg-[#f6f7f9]";
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg text-[14px] font-600 px-4 py-2.5 transition-colors disabled:opacity-60 ${styles} ${className}`}
      {...props}
    />
  );
}

export function LinkBtn({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-orange text-white hover:brightness-95"
      : variant === "danger"
      ? "bg-red-50 text-red-600 hover:bg-red-100"
      : "bg-white border border-[#e5e7eb] text-[#111827] hover:bg-[#f6f7f9]";
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg text-[14px] font-600 px-4 py-2.5 transition-colors no-underline ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[13px] font-600 text-[#111827] mb-1.5">{label}</span>
      {children}
      {hint && <span className="block mt-1 text-[12px] text-[#98a2b3]">{hint}</span>}
    </label>
  );
}

export const fieldCls =
  "w-full px-3.5 py-2.5 bg-[#f6f7f9] border border-[#e5e7eb] rounded-lg text-[14px] text-[#111827] placeholder:text-[#98a2b3] outline-none focus:border-orange focus:bg-white transition-colors";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={fieldCls} {...props} />;
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return <textarea className={fieldCls} {...props} />;
}

export function Select({
  children,
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${fieldCls} ${className}`} {...props}>
      {children}
    </select>
  );
}

export function Badge({
  children,
  tone = "gray",
}: {
  children: ReactNode;
  tone?: "gray" | "green" | "orange" | "blue";
}) {
  const tones: Record<string, string> = {
    gray: "bg-[#f2f4f7] text-[#667085]",
    green: "bg-[#f0fdf4] text-[#16a34a]",
    orange: "bg-orange-soft text-orange",
    blue: "bg-[#eff6ff] text-[#2563eb]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full text-[12px] font-600 px-2.5 py-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Spinner({ label = "Memuat…" }: { label?: string }) {
  return (
    <div className="py-16 text-center text-[14px] text-[#667085]">{label}</div>
  );
}

export function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="py-16 text-center">
      <div className="text-[15px] font-600 text-[#111827]">{title}</div>
      {subtitle && <div className="text-[13px] text-[#667085] mt-1">{subtitle}</div>}
    </div>
  );
}

export function fmtPrice(n: number | string | undefined | null): string {
  const num = Number(n) || 0;
  return "Rp " + num.toLocaleString("id-ID");
}
