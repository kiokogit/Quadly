import axios from "axios"
import { getSession } from "next-auth/react"
import { loaderStore } from "@/stores/genericStores"

let cachedAccessToken: string | null = null
let lastFetchedAt: number | null = null

const axiosInstance = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://localhost:8000"}` +
    `/${process.env.NEXT_PUBLIC_API_VERSION}`,
  headers: { "Content-Type": "application/json" },
})

// Track ongoing requests (so we only hide loader when all are done)
let activeRequests = 0

axiosInstance.interceptors.request.use(async (config) => {
  // ✅ Show loader globally on first request
  if (activeRequests === 0) loaderStore.show("Please wait...")
  activeRequests++

  const shouldRefresh =
    !cachedAccessToken ||
    (lastFetchedAt && Date.now() - lastFetchedAt > 15 * 60 * 1000)

  if (shouldRefresh) {
    const session = await getSession()
    cachedAccessToken = (session as any)?.access_token || null
    lastFetchedAt = Date.now()
  }

  if (cachedAccessToken) {
    config.headers.Authorization = `Bearer ${cachedAccessToken}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    activeRequests--
    if (activeRequests === 0) loaderStore.hide()
    return response
  },
  async (error) => {
    activeRequests--
    if (activeRequests === 0) loaderStore.hide()

    if (error.response?.status === 401 || error.response?.status === 403) {
      cachedAccessToken = null
      // await signOut()
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
