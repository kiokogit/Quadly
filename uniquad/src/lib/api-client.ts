// src/lib/axios-instance.ts
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json"},
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  if ((session as any)?.access_token) {
    config.headers.Authorization = `Bearer ${(session as any).access_token}`;
  }
  return config;
});


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // await signOut();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
