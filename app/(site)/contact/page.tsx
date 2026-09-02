import ContactForm from "@/components/ContactForm";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Hubungi Kami — KRUI.CO",
  description:
    "Butuh bantuan memilih paket wisata Krui? Tim KRUI.CO siap membantu via WhatsApp, email, atau formulir kontak.",
  keywords: [
    "kontak KRUI.CO",
    "hubungi KRUI.CO",
    "customer service wisata Krui",
    "tanya paket wisata Krui",
  ],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Hubungi Kami — KRUI.CO",
    description: "Butuh bantuan memilih paket wisata Krui? Tim kami siap membantu.",
    url: `${SITE_URL}/contact`,
    siteName: "KRUI.CO",
    type: "website",
    locale: "id_ID",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}