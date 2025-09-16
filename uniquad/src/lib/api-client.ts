// src/lib/axios-instance.ts
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request
axiosInstance.interceptors.request.use(async (config: any) => {
  if (config.skipAuth) return config;

  const session = await getSession();
  const token = (session as any)?.backendToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors (auto sign out on 401)
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await signOut({ redirect: true, callbackUrl: "/" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
