"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/footer"
import { useSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { Home, User, Settings, Bell, InboxIcon, HelpCircle, LogOut } from "lucide-react"
import Logo from "@/components/logo"
import FloatingFab from "@/components/FloatingActionButton"
import LeftSideBar from "@/components/LeftSideBar"

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
    <div className="min-h-screen flex flex-col">
      {/* Top navbar */}
      <Navbar />

      {/* Page grid */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-0 py-8 grid grid-cols-1 md:grid-cols-12 gap-2">
        
        {/* Left Sidebar */}
       <LeftSideBar session={session} />

        {/* Main Content */}
        <FloatingFab />
        <main className="md:col-span-6 max-w-2xl w-full mx-auto py-6">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden md:col-span-3 md:flex flex-col mt-[-12px] sticky top-0 h-[calc(100vh-3.5rem)] overflow-y-auto overflow-x-hidden scrollbar-hide"
            >
          <div className="flex-1 space-y-6">
            <section>
              <h2 className="text-sm font-semibold mb-2">Promoted Ads</h2>
              <div className="text-xs text-gray-500">Ads go here...</div>
            </section>
            <section>
              <h2 className="text-sm font-semibold mb-2">Suggested Groups</h2>
              <div className="text-xs text-gray-500">Groups go here...</div>
            </section>
           
          </div>
          
        </aside>
      </div>
    </div>
  )
}
