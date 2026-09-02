import { AdminAuthProvider } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin — KRUI.CO",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
