"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getMe, doLogout, type User } from "@/lib/auth";

interface AuthApi { user: User | null; loading: boolean; refresh: () => Promise<void>; logout: () => Promise<void> }
const AuthContext = createContext<AuthApi | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = async () => { try { setUser(await getMe()); } catch { setUser(null); } finally { setLoading(false); } };
  useEffect(() => { refresh(); }, []);
  const logout = async () => { await doLogout().catch(() => {}); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, refresh, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
