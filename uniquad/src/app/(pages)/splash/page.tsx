"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function SplashScreen() {
  const { status, data: session } = useSession()
  const router = useRouter()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (status === "loading") return // still checking auth

    const timer = setTimeout(() => {
      setShow(false) // trigger fade-out
    }, 500) // fade-out once auth status resolved

    const redirect = setTimeout(() => {
      if (status === "authenticated") {
      router.replace("/home")
    } else if (status === "unauthenticated") {
      router.replace("/")
    }
    }, 1100)

    return () => {
      clearTimeout(timer)
      clearTimeout(redirect)
    }
  }, [status, session, router])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="flex items-center justify-center h-screen w-screen transition-colors duration-300 bg-white dark:bg-gray-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center">
            {/* App Icon */}
            <Image
              src="/icon-192x192.png"
              alt="App icon"
              width={96}
              height={96}
              className="mb-4"
              priority
            />

            {/* Tagline */}
            <h1 className="text-lg font-semibold text-orange-600 dark:text-orange-400">
              Your world is here
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
