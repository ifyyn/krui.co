"use client";

import { ReactNode, useState } from "react";
import { CheckIcon } from "./icons";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[13.5px] font-600 text-ink mb-1.5">{label}</span>
      {children}
      {hint && <span className="block mt-1 text-[12px] text-ink-soft">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full px-4 py-3 bg-bg border-[1.5px] border-line rounded-[10px] text-[14px] text-ink placeholder:text-ink-soft focus:border-blue outline-none transition-colors";

export function selectCls(extra = "") {
  return `${inputCls} appearance-none pr-10 ${extra}`;
}

export function SuccessState({
  title,
  message,
  note,
  onDone = "/",
  doneLabel = "Kembali ke beranda",
}: {
  title: string;
  message: string;
  note?: string;
  onDone?: string;
  doneLabel?: string;
}) {
  return (
    <div className="bg-white border border-line rounded-card p-10 text-center max-w-xl mx-auto">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-soft text-green flex items-center justify-center mb-5">
        <CheckIcon className="w-8 h-8" />
      </div>
      <h2 className="font-display font-700 text-[26px] text-ink">{title}</h2>
      <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">{message}</p>
      {note && <p className="mt-4 text-[14px] text-ink font-medium">{note}</p>}
      <a
        href={onDone}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-ink text-white font-display font-600 text-[15px] px-8 py-3 hover:bg-blue transition-all"
      >
        {doneLabel}
      </a>
    </div>
  );
}

export function useFormFlow() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return { submitted, submit };
}
