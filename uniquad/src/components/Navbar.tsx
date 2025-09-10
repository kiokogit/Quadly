"use client"

import { signOut, useSession } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"

import { usePathname } from "next/navigation";
import Logo from "./logo"
import { 
  ChevronDown, 
  User, 
  Settings, 
  LogOut,
  Bell,
  HelpCircle,
  Home,
  MessageSquare,
  CalendarHeartIcon,
} from 'lucide-react'
import { FaSearchengin, FaStarHalfAlt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

export default function Header() {
  const { data: session } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname();


  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const dropdownItems = [
    { icon: Home, label: 'Home', href: '/home', className: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
    { icon: User, label: 'Profile', href: '/profile', className: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
    { icon: Settings, label: 'Settings', href: '/settings', className: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
    { icon: Bell, label: 'Notifications', href: '/notifications', className: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
    { icon: MessageSquare, label: 'Messages', href: '/direct-messages', className: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
    { icon: HelpCircle, label: 'Help & Support', href: '/help', className: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
    { type: 'divider' },
    { icon: LogOut, label: 'Sign out', action: () => signOut(), className: 'hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400' }
  ]

  const generalNavLinks = [
    { icon: Home, label: 'Home', href: '/home'},
    {icon: CalendarHeartIcon, label: 'Events', href:'/events'},
    {icon: FaSearchengin, label: 'Discover', href:'/discover'},
    {icon: FaPeopleGroup, label: 'Forum', href:'/forum'},
    {icon: FaStarHalfAlt, label: 'Reviews', href:'/reviews'},
    
  ]

  return (
    <header className="fixed z-30 w-full">
      <div className="mx-auto max-w-lg">
        <div className="relative flex h-14 items-center justify-between bg-white/90 dark:bg-gray-900/90 px-4 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] dark:before:[background:linear-gradient(var(--color-gray-800),var(--color-gray-700))_border-box]">
          
          {/* Site branding with dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex md:hidden items-center gap-0 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors -ml-2 scale-90"
            >
              <Logo />
              {session && (
                <ChevronDown 
                  size={16} 
                  className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              )}
            </button>

            {isDropdownOpen && session && (
              <div className="absolute top-full left-[-16px] mt-2 w-64 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="absolute -top-2 left-6 w-4 h-4 bg-white dark:bg-gray-900 border-l border-t border-gray-200 dark:border-gray-700 rotate-45"></div>

                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {session.user?.name?.[0]}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {session.user?.email || "user@example.com"}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  {dropdownItems.map((item, index) => {
                    if (item.type === 'divider') {
                      return <div key={index} className="border-t border-gray-100 dark:border-gray-700 my-1" />
                    }

                    if (item.href) {
                      return (
                        <Link
                          key={index}
                          href={item.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors text-gray-700 dark:text-gray-300 ${item.className}`}
                        >
                          {item.icon && <item.icon size={16} />}
                          <span>{item.label}</span>
                        </Link>
                      )
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (item.action) item.action()
                          setIsDropdownOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors text-gray-700 dark:text-gray-300 ${item.className}`}
                      >
                        {item.icon && <item.icon size={16} />}
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Desktop nav */}
          <ul className="flex-1 items-center justify-evenly gap-3 md:gap-8 flex text-xs md:text-sm font-semibold">
            {generalNavLinks.map((item, index) => {
                   return <Link
                          key={index}
                          href={item.href || "#"}
                          className={`text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors relative pb-1 `}>
                                <div className={`${pathname === item.href ? 'text-orange-600':''} flex flex-col items-center`}>
                                  {item.icon && <item.icon size={16} />}
                                   <span className="text-xs">{item.label}</span>
                                </div>
                        </Link>
              })}
          </ul>

          {/* Desktop auth buttons */}
          <ul className="items-center flex">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell 
                  size={20} 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 cursor-pointer transition-colors" 
                />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>
               <div className="hidden md:relative">
                <MessageSquare 
                  size={20} 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 cursor-pointer transition-colors" 
                />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </header>
  )
}
