"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { ReactNode } from "react";

function TB({
  onClick,
  disabled,
  active,
  title,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors disabled:opacity-35 disabled:cursor-not-allowed ${
        active ? "bg-orange-soft text-orange" : "text-[#475467] hover:bg-bg-alt hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

const Icons = {
  undo: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 8L4 12L9 16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12H15.5a4.5 4.5 0 1 1 0 9" strokeLinecap="round" />
    </svg>
  ),
  redo: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 8L20 12L15 16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12H8.5a4.5 4.5 0 1 0 0 9" strokeLinecap="round" />
    </svg>
  ),
  bold: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M7 20V4h5.2a4.4 4.4 0 0 1 0 8.8H7m6-8.8H18a4.4 4.4 0 0 1 0 8.8h-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  italic: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M19 4h-8m2 16h-8m4-16l-4 16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  underline: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M6 4v6a6 6 0 0 0 12 0V4" strokeLinecap="round" />
      <path d="M4 20h16" strokeLinecap="round" />
    </svg>
  ),
  strike: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 4H9a3.5 3.5 0 0 0-1 6.9" strokeLinecap="round" />
      <path d="M15 13.1A2.2 2.2 0 0 1 14 18H7.6a3.4 3.4 0 0 0-1.2-4" strokeLinecap="round" />
      <path d="M4 12h16" strokeLinecap="round" />
    </svg>
  ),
  ul: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h.01M4 12h.01M4 18h.01M9 6h11M9 12h11M9 18h11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ol: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 6h11M10 12h11M10 18h11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 7l1-1v4M3.5 12h1.2M3.5 16.2h1.4l-1.3 1.8h1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  quote: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="currentColor">
      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M8 9L4 12l4 3M16 9l4 3-4 3M13 6l-2 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 14a4.6 4.6 0 0 0 6.5 0l3-3a4.6 4.6 0 1 0-6.5-6.5l-1.2 1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 10a4.6 4.6 0 0 0-6.5 0l-3 3a4.6 4.6 0 1 0 6.5 6.5l1.2-1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  unlink: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 14a4.6 4.6 0 0 0 6.5 0l1-1M17.3 9.3l.8-.8a4.6 4.6 0 1 0-6.5-6.5L10 3.5M14 10a4.6 4.6 0 0 0-6.5 0l-3 3a4.6 4.6 0 1 0 6.5 6.5l.8-.8M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M21 15.5l-4.5-4.5L7.5 20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  hr: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M4 12h16" strokeLinecap="round" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h11M4 17h8" strokeLinecap="round" />
    </svg>
  ),
  center: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M6.5 12h11M8 17h8" strokeLinecap="round" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M9 12h11M12 17h8" strokeLinecap="round" />
    </svg>
  ),
  heading: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 5v14M13 5v14M5 12h8M3 5h20M3 19h20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  paragraph: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M13 5a4 4 0 0 1 0 8H8m5-8v14M8 5v14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  clear: (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6l12 12M8 14l6-6M7 18h10M7 6h10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function promptUrl(title: string, fallback?: string): string | null {
  const value = window.prompt(title, fallback || "");
  return value && value.trim() ? value.trim() : null;
}

function Divider() {
  return <span className="w-px h-6 bg-line mx-1" />;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder,
}: {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer nofollow", target: "_blank" },
      }),
      Image.configure({
        HTMLAttributes: { loading: "lazy" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: placeholder || "Mulai menulis artikel di sini…" }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "rte-content min-h-[480px] max-w-none px-5 lg:px-8 py-6 focus:outline-none cursor-text",
      },
    },
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="border border-[#e5e7eb] rounded-xl overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-[#e5e7eb] bg-[#fbfbfc] sticky top-0 z-10">
        <TB title="Urungkan" disabled={!editor.can().chain().focus().undo().run()} onClick={() => editor.chain().focus().undo().run()}>
          {Icons.undo}
        </TB>
        <TB title="Ulangi" disabled={!editor.can().chain().focus().redo().run()} onClick={() => editor.chain().focus().redo().run()}>
          {Icons.redo}
        </TB>
        <Divider />

        <TB
          title="Judul (H1)"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <span className="font-display font-800 text-[13px] text-[#475467]">H1</span>
        </TB>
        <TB
          title="Subjudul (H2)"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <span className="font-display font-800 text-[13px] text-[#475467]">H2</span>
        </TB>
        <TB
          title="Subjudul (H3)"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <span className="font-display font-800 text-[13px] text-[#475467]">H3</span>
        </TB>
        <TB
          title="Paragraf"
          active={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          {Icons.paragraph}
        </TB>
        <Divider />

        <TB title="Tebal" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          {Icons.bold}
        </TB>
        <TB title="Miring" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          {Icons.italic}
        </TB>
        <TB title="Garis bawah" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          {Icons.underline}
        </TB>
        <TB title="Coret" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          {Icons.strike}
        </TB>
        <Divider />

        <TB
          title="Daftar nomor"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          {Icons.ol}
        </TB>
        <TB
          title="Daftar bullet"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          {Icons.ul}
        </TB>
        <TB title="Kutipan" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          {Icons.quote}
        </TB>
        <TB title="Kode" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          {Icons.code}
        </TB>
        <Divider />

        <TB title="Rata kiri" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          {Icons.left}
        </TB>
        <TB title="Rata tengah" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          {Icons.center}
        </TB>
        <TB title="Rata kanan" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          {Icons.right}
        </TB>
        <Divider />

        <TB
          title="Tautan"
          active={editor.isActive("link")}
          onClick={() => {
            const url = promptUrl("Masukkan URL tautan", editor.getAttributes("link").href as string);
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
        >
          {Icons.link}
        </TB>
        <TB title="Hapus tautan" disabled={!editor.isActive("link")} onClick={() => editor.chain().focus().unsetLink().run()}>
          {Icons.unlink}
        </TB>
        <TB
          title="Sisipkan gambar (URL)"
          onClick={() => {
            const src = promptUrl("Masukkan URL gambar");
            if (src) editor.chain().focus().setImage({ src }).run();
          }}
        >
          {Icons.image}
        </TB>
        <TB title="Garis pemisah" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          {Icons.hr}
        </TB>

        <div className="ml-auto">
          <TB title="Bersihkan format" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
            {Icons.clear}
          </TB>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}