"use client"
import { SessionProvider } from "next-auth/react"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-gray-900 dark:text-gray-100 bg-white dark:bg-orange-900 transition-colors duration-300">
        <SessionProvider>
          {/* <AuthRedirectProvider> */}
            {/* <Splash /> */}
            <main className="">{children}</main>
            {/* </AuthRedirectProvider> */}
        </SessionProvider>
      </body>
    </html>
  )
}
