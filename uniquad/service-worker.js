// import { registerRoute, setCatchHandler } from "workbox-routing"
// import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from "workbox-strategies"
// import { ExpirationPlugin } from "workbox-expiration"
import { precacheAndRoute } from "workbox-precaching"

// Precache build assets + offline page
precacheAndRoute(self.__WB_MANIFEST || [])

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open("pages-cache").then((cache) => cache.add("/splash"))
//   )
// })

// 🎨 Static resources (JS, CSS, fonts) → CacheFirst
// registerRoute(
//   ({ request }) =>
//     request.destination === "style" ||
//     request.destination === "script" ||
//     request.destination === "font",
//   new CacheFirst({
//     cacheName: "static-resources",
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
//       }),
//     ],
//   })
// )

// // 🖼️ Images → StaleWhileRevalidate
// registerRoute(
//   ({ request }) => request.destination === "image",
//   new StaleWhileRevalidate({
//     cacheName: "images",
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
//       }),
//     ],
//   })
// )

// // 🌐 API responses → NetworkFirst (fallback cache)
// registerRoute(
//   ({ url }) => url.pathname.startsWith("/api/"),
//   new NetworkFirst({
//     cacheName: "api-cache",
//     networkTimeoutSeconds: 5,
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 5 * 60, // 5 minutes
//       }),
//     ],
//   })
// )

// // 📄 Pages (HTML) → NetworkFirst, but keep cached copies
// registerRoute(
//   ({ request, url }) => request.destination === "document" && !url.pathname.startsWith("/api/"),
//   new NetworkFirst({
//     cacheName: "pages-cache",
//     networkTimeoutSeconds: 3,
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 20, // keep last 20 pages
//         maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
//       }),
//     ],
//   })
// )

// // 🔴 Offline fallback
// setCatchHandler(async ({ event }) => {
//   if (event.request.destination === "document") {
//     return caches.match("/offline")
//   }
//   return Response.error()
// })
