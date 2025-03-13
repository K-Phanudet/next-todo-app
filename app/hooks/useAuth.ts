"use client";

import { useCallback } from "react";
import { login, logout, getCookie } from "@/app/lib/api/auth";
import { useRouter } from "next/navigation";

interface Credentials {
  username: string;
  password: string;
}

export const useAuth = () => {
  const router = useRouter();

  const handleLogin = useCallback(async (credentials: Credentials) => {
    await login(credentials);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    router.push('/')
  }, []);

  return {
    login: handleLogin,
    logout: handleLogout,
    accessToken: getCookie("accessToken"),
  };
}
