"use client"

import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function AuthRedirectProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      if (pathname === "/") {
        router.replace("/home")
      }
    }
  }, [session, pathname, router])

  return <>{children}</>
}
