import { CategorySlug } from "./categories";

export interface Package {
  id: string;
  slug: string;
  title: string;
  category: CategorySlug;
  location: string;
  duration: string;
  price: number;
  currency?: string;
  rating: number;
  reviews: number;
  thumbnail: number;
  image: string;
  featured?: boolean;
  description: string;
  includes: string[];
  excludes: string[];
  itinerary: { time: string; title: string; detail: string }[];
  meetingPoint: string;
}

const packages: Package[] = [
  {
    id: "p1",
    slug: "sunset-sandbar-tour",
    title: "Sunset Sandbar Tour",
    category: "tour",
    location: "Pantai Tanjung Setia",
    duration: "4 jam",
    price: 450000,
    rating: 4.9,
    reviews: 128,
    thumbnail: 1,
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description:
      "Naik perahu ke sandbar tersembunyi di tengah laut saat matahari mulai tenggelam. Pemandangan panorama pesisir Krui yang tak terlupakan, ditemani angin laut dan langit jingga.",
    includes: [
      "Transport PP ke dermaga",
      "Perahu + crew lokal",
      "Minuman dingin & snack",
      "Dokumentasi kamera",
      "Asuransi trip",
    ],
    excludes: ["Makan malam", "Tip untuk crew"],
    itinerary: [
      { time: "15:00", title: "Berangkat", detail: "Penjemputan di meeting point, perjalanan ke dermaga." },
      { time: "15:45", title: "Sandbar", detail: "Tiba di sandbar, waktu bebas foto dan bermain air." },
      { time: "17:30", title: "Golden hour", detail: "Golden hour terbaik saat matahari terbenam." },
      { time: "19:00", title: "Kembali", detail: "Kembali dan diantar ke meeting point." },
    ],
    meetingPoint: "Pondok Surf Tanjung Setia",
  },
  {
    id: "p2",
    slug: "air-terjun-walur",
    title: "Air Terjun Walur Adventure",
    category: "tour",
    location: "Desa Walur",
    duration: "6 jam",
    price: 350000,
    rating: 4.8,
    reviews: 74,
    thumbnail: 2,
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description:
      "Trekking menembus hutan ke Air Terjun Walur yang jernih. Berenang di kolam alami, dikelilingi tebing dan suara alam yang menenangkan.",
    includes: [
      "Pemandu lokal ahli",
      "Transport 4x4",
      "Makan siang box",
      "Air mineral",
    ],
    excludes: ["Tips", "Peralatan trekking"],
    itinerary: [
      { time: "07:00", title: "Penjemputan", detail: "Jemput di meeting point, menuju Desa Walur." },
      { time: "09:00", title: "Trekking", detail: "Mulai trekking menuju air terjun melewati hutan." },
      { time: "10:30", title: "Air terjun", detail: "Tiba, berenang dan foto di air terjun." },
      { time: "12:00", title: "Makan siang", detail: "Makan siang box di lokasi." },
      { time: "13:00", title: "Kembali", detail: "Kembali dan antar ke meeting point." },
    ],
    meetingPoint: "Posko Walur",
  },
  {
    id: "p3",
    slug: "villa-sea-view",
    title: "Villa Sea View Kapuk",
    category: "stay",
    location: "Pantai Labuhan Jukung",
    duration: "Per malam",
    price: 850000,
    rating: 4.7,
    reviews: 61,
    thumbnail: 3,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description:
      "Villa pribadi dengan pemandangan laut langsung dari kamar. Dua kamar tidur, kolam renang, dapur lengkap, dan taman tropis.",
    includes: [
      "2 kamar tidur + AC",
      "Kolam renang pribadi",
      "Sarapan pagi",
      "WiFi cepat",
      "Parkir mobil",
    ],
    excludes: ["Makan malam", "Layanan laundry"],
    itinerary: [],
    meetingPoint: "Lagi Lagi Homestay — Front Office",
  },
  {
    id: "p4",
    slug: "homestay-rumah-rama",
    title: "Homestay Rumah Rama",
    category: "stay",
    location: "Desa Pugung",
    duration: "Per malam",
    price: 250000,
    rating: 4.6,
    reviews: 43,
    thumbnail: 4,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    description:
      "Tinggal bersama keluarga lokal di Desa Pugung. Kesempatan merasakan kehidupan sehari-hari Krui yang hangat dan autentik.",
    includes: [
      "Kamar + kamar mandi",
      "Sarapan lokal",
      "Makan malam rumahan",
      "Interaksi budaya",
    ],
    excludes: ["Makan siang", "Laundry"],
    itinerary: [],
    meetingPoint: "Depan Balai Desa Pugung",
  },
  {
    id: "p5",
    slug: "sewa-mobil-hiace",
    title: "Sewa Mobil Hiace + Driver",
    category: "transport",
    location: "Banding Agung & sekitar",
    duration: "12 jam",
    price: 650000,
    rating: 4.8,
    reviews: 52,
    thumbnail: 5,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description:
      "Mobil Hiace berkapasitas 12 orang dengan driver lokal berpengalaman. Ideal untuk trip keluarga atau rombongan menjelajah Krui.",
    includes: [
      "Mobil + BBM",
      "Driver lokal",
      "Area 100km/hari",
      "Musik & charger",
    ],
    excludes: ["Tol & parkir", "Makan driver"],
    itinerary: [],
    meetingPoint: "Dijemput di penginapan",
  },
  {
    id: "p6",
    slug: "ant-jemput-bandara",
    title: "Antar Jemput Bandara",
    category: "transport",
    location: "Bandara Radin Inten II",
    duration: "3 jam",
    price: 400000,
    rating: 4.9,
    reviews: 66,
    thumbnail: 6,
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=900&q=80",
    description:
      "Penjemputan dari bandara ke penginapan di Krui dan sebaliknya. Perjalanan nyaman dengan air minum dan berhenti bila perlu.",
    includes: [
      "Mobil + BBM",
      "Driver",
      "Air minum",
      "Tunggu di bandara",
    ],
    excludes: ["Tol"],
    itinerary: [],
    meetingPoint: "Terminal kedatangan bandara",
  },
  {
    id: "p7",
    slug: "surf-course-pemula",
    title: "Surf Lesson Pemula",
    category: "surf",
    location: "Pantai Tanjung Setia",
    duration: "2 jam",
    price: 300000,
    rating: 4.9,
    reviews: 89,
    thumbnail: 7,
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description:
      "Belajar selancar dari nol bersama instruktur bersertifikat. Termasuk papan, leash, dan pengarahan teori sebelum terjun ke laut.",
    includes: [
      "Instruktur bersertifikat",
      "Papan + leash",
      "Kelas teori singkat",
      "Air mineral",
    ],
    excludes: ["Baju renang", "Reef booties"],
    itinerary: [
      { time: "09:00", title: "Teori", detail: "Dasar-dasar selancar di darat." },
      { time: "09:30", title: "Praktek", detail: "Praktek di air bersama instruktur." },
      { time: "11:00", title: "Review", detail: "Review & tips untuk latihan mandiri." },
    ],
    meetingPoint: "WaveKrui Surf School",
  },
  {
    id: "p8",
    slug: "sewa-papan-surf",
    title: "Sewa Papan Surf Harian",
    category: "surf",
    location: "Pantai Labuhan Jukung",
    duration: "24 jam",
    price: 100000,
    rating: 4.7,
    reviews: 110,
    thumbnail: 8,
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
    description:
      "Sewa papan selancar pilihan untuk hari ini. Tersedia berbagai ukuran untuk pemula hingga pro, dengan kondisi terawat baik.",
    includes: ["Papan pilihan", "Leash & wax"],
    excludes: [],
    itinerary: [],
    meetingPoint: "WaveKrui Surf School",
  },
  {
    id: "p9",
    slug: "sewa-motor-harian",
    title: "Sewa Motor Harian",
    category: "rental",
    location: "Banding Agung",
    duration: "24 jam",
    price: 80000,
    rating: 4.6,
    reviews: 97,
    thumbnail: 9,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
    description:
      "Motor matic 150cc siap menjelajah pantai dan desa. Bensin full, helm dua, dan perawatan terjamin agar tripmu mulus.",
    includes: ["Motor + BBM", "2 helm", "Dokumen lengkap", "Tas pengiriman"],
    excludes: ["Kerusakan akibat pengguna"],
    itinerary: [],
    meetingPoint: "Krui Roda Rental — Banding Agung",
  },
  {
    id: "p10",
    slug: "sewa-perlengkapan-snorkeling",
    title: "Sewa Perlengkapan Snorkeling",
    category: "rental",
    location: "Pantai Tanjung Setia",
    duration: "Per hari",
    price: 60000,
    rating: 4.5,
    reviews: 38,
    thumbnail: 10,
    image: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&w=900&q=80",
    description:
      "Masker, snorkel, dan fins bersih siap pakai untuk menjelajah terumbu karang yang cantik di perairan Krui.",
    includes: ["Masker", "Snorkel", "Fins", "Tas jaring"],
    excludes: [],
    itinerary: [],
    meetingPoint: "Krui Roda Rental",
  },
  {
    id: "p11",
    slug: "kulinari-pesisir",
    title: "Kuliner Pesisir Pagi",
    category: "experience",
    location: "Pasar Krui",
    duration: "3 jam",
    price: 280000,
    rating: 4.8,
    reviews: 57,
    thumbnail: 11,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description:
      "Cicipi sarapan khas pesisir dari pasar pagi Krui. Campur sari, gorengan, dan kopi lokal, sambil belajar cerita tiap kuliner.",
    includes: [
      "Food tour guide",
      "5+ street food",
      "Kopi/susu lokal",
      "Cerita budaya",
    ],
    excludes: ["Makan siang"],
    itinerary: [
      { time: "06:30", title: "Pasar pagi", detail: "Kunjungi pasar pagi Krui." },
      { time: "07:30", title: "Food hopping", detail: "Cicipi berbagai jajanan." },
      { time: "09:00", title: "Kopi", detail: "Ngopi sambil mendengar cerita." },
    ],
    meetingPoint: "Pintu samping Pasar Krui",
  },
  {
    id: "p12",
    slug: "workshop-tradisi",
    title: "Workshop Tenun & Kerajinan",
    category: "experience",
    location: "Desa Sumberjaya",
    duration: "4 jam",
    price: 320000,
    rating: 4.7,
    reviews: 29,
    thumbnail: 12,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
    description:
      "Belajar menenun dan membuat kerajinan khas bersama perajin lokal. Bawa pulang karya buatan tanganmu sendiri.",
    includes: [
      "Instruktur perajin",
      "Bahan material",
      "Karya untuk dibawa pulang",
      "Snack lokal",
    ],
    excludes: ["Transport"],
    itinerary: [],
    meetingPoint: "Rumah Tenun Sumberjaya",
  },
];

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

export function getPackageById(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}

export function getAllPackages(): Package[] {
  return packages;
}

export function getPackagesByCategory(cat: CategorySlug): Package[] {
  return packages.filter((p) => p.category === cat);
}

export function getFeatured(): Package[] {
  return packages.filter((p) => p.featured);
}

export function getSimilar(pkg: Package): Package[] {
  return packages
    .filter((p) => p.category === pkg.category && p.id !== pkg.id)
    .slice(0, 3);
}

export function formatPrice(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}
