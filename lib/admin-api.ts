export interface AdminCategory {
  id: number;
  slug: string;
  label: string;
  tagline?: string;
  description?: string;
  color: string;
  icon: string;
  image?: string;
  packageCount?: number;
}

export interface AdminPackage {
  id: number;
  slug: string;
  title: string;
  categoryId: number;
  category?: { id: number; slug: string; label: string } | null;
  location: string;
  duration: string;
  price: number | string;
  rating: number | string;
  reviews: number;
  thumbnail: number;
  image: string;
  featured: boolean;
  description: string;
  includes: string[];
  excludes: string[];
  itinerary: { time: string; title: string; detail: string }[];
  meetingPoint: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminArticleCategory {
  id: number;
  slug: string;
  label: string;
  description?: string;
  color?: string;
  articleCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminArticle {
  id: number;
  slug: string;
  title: string;
  articleCategoryId: number;
  category?: { id: number; slug: string; label: string; color?: string } | null;
  excerpt?: string;
  content?: string;
  image?: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface KruiSection {
  id: number;
  slug: string;
  title: string;
  summary?: string;
  content?: string;
  image?: string;
  sortOrder: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const DEFAULT_API_URL = "https://brayendtravel.my.id";
const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
const TOKEN_KEY = "krui_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  if (typeof window !== "undefined") window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window !== "undefined") window.localStorage.removeItem(TOKEN_KEY);
}

export function getApiUrl() {
  return API_URL;
}

interface ApiOptions {
  method?: string;
  body?: unknown;
}

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : "Terjadi kesalahan";
    if (res.status === 401) {
      removeStoredToken();
    }
    throw new ApiError(message, res.status);
  }

  return data as T;
}

function removeStoredToken() {
  try {
    clearToken();
  } catch {
    /* ignore */
  }
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function apiLogin(
  email: string,
  password: string
): Promise<{ token: string; admin: { name: string; email: string; role: string } }> {
  const data = await request<{ token: string; admin: { name: string; email: string; role: string } }>(
    "/api/auth/login",
    { method: "POST", body: { email, password } }
  );
  setToken(data.token);
  return data;
}

export function apiUpdateProfile(
  body: { name?: string; email?: string }
): Promise<{ admin: { name: string; email: string; role: string } }> {
  return request<{ admin: { name: string; email: string; role: string } }>("/api/auth/profile", {
    method: "PUT",
    body,
  });
}

export function apiChangePassword(
  body: { currentPassword: string; newPassword: string }
): Promise<{ message: string }> {
  return request<{ message: string }>("/api/auth/change-password", {
    method: "PUT",
    body,
  });
}

export function apiGetCategories(): Promise<AdminCategory[]> {
  return request<AdminCategory[]>("/api/categories");
}

export function apiCreateCategory(body: Partial<AdminCategory>): Promise<AdminCategory> {
  return request<AdminCategory>("/api/categories", { method: "POST", body });
}

export function apiUpdateCategory(
  id: number,
  body: Partial<AdminCategory>
): Promise<AdminCategory> {
  return request<AdminCategory>(`/api/categories/${id}`, { method: "PUT", body });
}

export function apiDeleteCategory(id: number): Promise<{ message: string }> {
  return request<{ message: string }>(`/api/categories/${id}`, { method: "DELETE" });
}

export async function apiCreateCategoryFormData(
  formData: FormData
): Promise<AdminCategory> {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/categories`, {
    method: "POST",
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: formData,
  });
  let data: unknown = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : "Terjadi kesalahan";
    if (res.status === 401) clearToken();
    throw new ApiError(message, res.status);
  }
  return data as AdminCategory;
}

export async function apiUpdateCategoryFormData(
  id: number,
  formData: FormData
): Promise<AdminCategory> {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/categories/${id}`, {
    method: "PUT",
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: formData,
  });
  let data: unknown = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : "Terjadi kesalahan";
    if (res.status === 401) clearToken();
    throw new ApiError(message, res.status);
  }
  return data as AdminCategory;
}

export function apiGetPackages(): Promise<AdminPackage[]> {
  return request<AdminPackage[]>("/api/packages");
}

export function apiGetPackage(id: number): Promise<AdminPackage> {
  return request<AdminPackage>(`/api/packages/${id}`);
}

export function apiCreatePackage(body: Partial<AdminPackage>): Promise<AdminPackage> {
  return request<AdminPackage>("/api/packages", { method: "POST", body });
}

export function apiUpdatePackage(
  id: number,
  body: Partial<AdminPackage>
): Promise<AdminPackage> {
  return request<AdminPackage>(`/api/packages/${id}`, { method: "PUT", body });
}

export function apiDeletePackage(id: number): Promise<{ message: string }> {
  return request<{ message: string }>(`/api/packages/${id}`, { method: "DELETE" });
}

export async function apiCreatePackageFormData(
  formData: FormData
): Promise<AdminPackage> {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/packages`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  let data: unknown = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : "Terjadi kesalahan";
    if (res.status === 401) clearToken();
    throw new ApiError(message, res.status);
  }
  return data as AdminPackage;
}

export async function apiUpdatePackageFormData(
  id: number,
  formData: FormData
): Promise<AdminPackage> {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/packages/${id}`, {
    method: "PUT",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  let data: unknown = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : "Terjadi kesalahan";
    if (res.status === 401) clearToken();
    throw new ApiError(message, res.status);
  }
  return data as AdminPackage;
}

export function apiGetArticleCategories(): Promise<AdminArticleCategory[]> {
  return request<AdminArticleCategory[]>("/api/article-categories");
}

export function apiCreateArticleCategory(body: Partial<AdminArticleCategory>): Promise<AdminArticleCategory> {
  return request<AdminArticleCategory>("/api/article-categories", { method: "POST", body });
}

export function apiUpdateArticleCategory(
  id: number,
  body: Partial<AdminArticleCategory>
): Promise<AdminArticleCategory> {
  return request<AdminArticleCategory>(`/api/article-categories/${id}`, { method: "PUT", body });
}

export function apiDeleteArticleCategory(id: number): Promise<{ message: string }> {
  return request<{ message: string }>(`/api/article-categories/${id}`, { method: "DELETE" });
}

export function apiGetArticles(): Promise<AdminArticle[]> {
  return request<AdminArticle[]>("/api/articles");
}

export function apiGetArticle(id: number): Promise<AdminArticle> {
  return request<AdminArticle>(`/api/articles/${id}`);
}

export function apiDeleteArticle(id: number): Promise<{ message: string }> {
  return request<{ message: string }>(`/api/articles/${id}`, { method: "DELETE" });
}

async function formDataRequest<T>(path: string, formData: FormData, method: string): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: formData,
  });
  let data: unknown = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : "Terjadi kesalahan";
    if (res.status === 401) clearToken();
    throw new ApiError(message, res.status);
  }
  return data as T;
}

export function apiCreateArticleFormData(formData: FormData): Promise<AdminArticle> {
  return formDataRequest<AdminArticle>("/api/articles", formData, "POST");
}

export function apiUpdateArticleFormData(id: number, formData: FormData): Promise<AdminArticle> {
  return formDataRequest<AdminArticle>(`/api/articles/${id}`, formData, "PUT");
}

export function apiGetKruiSections(): Promise<KruiSection[]> {
  return request<KruiSection[]>("/api/tentang-krui");
}

export function apiGetKruiSection(id: number): Promise<KruiSection> {
  return request<KruiSection>(`/api/tentang-krui/${id}`);
}

export function apiDeleteKruiSection(id: number): Promise<{ message: string }> {
  return request<{ message: string }>(`/api/tentang-krui/${id}`, { method: "DELETE" });
}

export function apiReorderKruiSections(ids: number[]): Promise<KruiSection[]> {
  return request<KruiSection[]>("/api/tentang-krui/reorder", {
    method: "POST",
    body: { ids },
  });
}

export function apiCreateKruiSectionFormData(formData: FormData): Promise<KruiSection> {
  return formDataRequest<KruiSection>("/api/tentang-krui", formData, "POST");
}

export function apiUpdateKruiSectionFormData(id: number, formData: FormData): Promise<KruiSection> {
  return formDataRequest<KruiSection>(`/api/tentang-krui/${id}`, formData, "PUT");
}
