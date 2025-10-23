// src/lib/axios-instance.ts
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

let cachedAccessToken: string | null = null;
let lastFetchedAt: number | null = null;

const axiosInstance = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://localhost:8000"}` +
    `/${process.env.NEXT_PUBLIC_API_VERSION}`,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(async (config) => {
  // Only call getSession() if no cached token or if cache is old (optional)
  const shouldRefresh = !cachedAccessToken || (lastFetchedAt && Date.now() - lastFetchedAt > 15 * 60 * 1000);

  if (shouldRefresh) {
    const session = await getSession();
    cachedAccessToken = (session as any)?.access_token || null;
    lastFetchedAt = Date.now();
  }

  if (cachedAccessToken) {
    config.headers.Authorization = `Bearer ${cachedAccessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      cachedAccessToken = null; // Clear cache
      await signOut();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
