"use client"

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaGithub } from "react-icons/fa"

export default function AuthButtons() {
  const providers = [
    {
      id: "google",
      name: "Google",
      color: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
      icon: <FcGoogle className="w-5 h-5 mr-2" />,
    },
    {
      id: "facebook",
      name: "Facebook",
      color: "bg-blue-600 text-white hover:bg-blue-700",
      icon: <FaFacebook className="w-5 h-5 mr-2" />,
    },
    {
      id: "github",
      name: "GitHub",
      color: "bg-gray-800 text-white hover:bg-gray-900",
      icon: <FaGithub className="w-5 h-5 mr-2" />,
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      {providers.map((p) => (
        <button
          key={p.id}
          onClick={() => signIn(p.id)}
          className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition cursor-pointer ${p.color}`}
        >
          {p.icon}
          Sign in with {p.name}
        </button>
      ))}
    </div>
  )
}
