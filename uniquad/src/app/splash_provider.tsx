"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "@/components/logo"

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [showSplash, setShowSplash] = useState(true)

  // Watch auth status
  useEffect(() => {
    if (status === "loading") return

    // Decide where user should be600
    if (status === "authenticated" && pathname === "/splash") {
      router.replace("/home")
    } else if (status === "unauthenticated" && pathname === "/splash") {
      router.replace("/")
    }

    // Once auth check finishes, fade out splash
    const timer = setTimeout(() => setShowSplash(false), 400)
    return () => clearTimeout(timer)
  }, [status, pathname, router])

  return (
    <>
      {children}

      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center scale-200">
              <Logo />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
