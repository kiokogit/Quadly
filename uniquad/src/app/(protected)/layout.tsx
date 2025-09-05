"use client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const { data: session } = useSession()

    if (!session) {
    redirect("/")
    }
  return (
    <div className="">
        <Navbar />
        <main className="pt-8">{children}</main>
        <Footer border={true} />
    </div>
  )
}
