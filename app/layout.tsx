import type { Metadata, Viewport } from "next";
import { Outfit, Inter, DM_Mono } from "next/font/google";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS, OG_IMAGE } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dmmono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — KRUI.CO",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "KRUI.CO" }],
  creator: "KRUI.CO",
  publisher: "KRUI.CO",
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "KRUI.CO",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "KRUI.CO — Platform Wisata Krui, Pesisir Barat Lampung",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/krui.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${outfit.variable} ${inter.variable} ${dmMono.variable}`}>
      <head>
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}