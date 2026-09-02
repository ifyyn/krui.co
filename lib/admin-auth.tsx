"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { apiLogin, getToken, clearToken } from "./admin-api";

interface AdminUser {
  name: string;
  email: string;
  role: string;
}

interface AdminAuthValue {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUserState: (user: AdminUser | null) => void;
}

const AdminAuthContext = createContext<AdminAuthValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("unauthorized"))))
      .then((data) => setUser((data as { admin: AdminUser }).admin))
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await apiLogin(email, password);
      setUser(data.admin);
      setLoading(false);
    },
    []
  );

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    router.push("/admin/login");
  }, [router]);

  const setUserState = useCallback((next: AdminUser | null) => {
    setUser(next);
  }, []);

  const value: AdminAuthValue = { user, loading, login, logout, setUserState };
  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminAuthProvider");
  return ctx;
}
