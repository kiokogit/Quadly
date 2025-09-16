"use client"
import { SessionProvider } from "next-auth/react"
import "./globals.css"
import { SplashProvider } from "./splash_provider"
import { Providers } from "./providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#050505ff" />
      </head>
      <body className="min-h-screen text-gray-900 dark:text-gray-100 bg-white dark:bg-orange-900 transition-colors duration-300">
        <SessionProvider>
          <Providers>
            <SplashProvider>
              <main className="">{children}</main>
            </SplashProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
