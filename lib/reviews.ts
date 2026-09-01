export interface Review {
  id: string;
  name: string;
  avatar: number;
  location: string;
  package: string;
  rating: number;
  date: string;
  text: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Ayu Prameswari",
    avatar: 1,
    location: "Jakarta",
    package: "Sunset Sandbar Tour",
    rating: 5,
    date: "Juni 2025",
    text: "Luar biasa! Sunset di sandbar benar-benar magis. Timnya ramah dan sangat perhatian. Worth every rupiah.",
  },
  {
    id: "r2",
    name: "Marco van Dijk",
    avatar: 2,
    location: "Amsterdam",
    package: "Surf Lesson Pemula",
    rating: 5,
    date: "Juli 2025",
    text: "Great waves and even better instructors. I caught my first wave here. Krui is a hidden gem.",
  },
  {
    id: "r3",
    name: "Ratna Sari",
    avatar: 3,
    location: "Bandung",
    package: "Villa Sea View Kapuk",
    rating: 4,
    date: "Mei 2025",
    text: "Villa-nya bersih dan pemandangannya langsung ke laut. Sarapan enak, host-nya hangat sekali.",
  },
  {
    id: "r4",
    name: "Hendra Wijaya",
    avatar: 4,
    location: "Palembang",
    package: "Sewa Motor Harian",
    rating: 5,
    date: "Agustus 2025",
    text: "Motor mulus, helm bersih, proses cepat. Cocok buat explore pantai-pantai sepanjang Krui.",
  },
  {
    id: "r5",
    name: "Grace Liu",
    avatar: 5,
    location: "Singapore",
    package: "Kuliner Pesisir Pagi",
    rating: 5,
    date: "Juni 2025",
    text: "The food tour was the best part of my trip. So much flavor and the stories made it special.",
  },
];
