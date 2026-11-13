"use client";
export const API = process.env.NEXT_PUBLIC_API_URL ?? "";
export interface User { id: number; email: string; name: string }
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(`${API}${path}`, { credentials: "include", ...init });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).detail ?? r.statusText);
  return r.json();
}
export const getMe = () => api<User | null>("/api/auth/me");
export const doLogin = (email: string, password: string) =>
  api<User>("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, name: "" }) });
export const doSignup = (email: string, password: string, name: string) =>
  api<User>("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, name }) });
export const doLogout = () => api<{ ok: boolean }>("/api/auth/logout", { method: "POST" });
