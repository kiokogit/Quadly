"use client"

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaGithub } from "react-icons/fa"
import { useState } from "react"

export default function AuthButtons() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCredentialsLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password")
      return
    }

    setLoading(true)
    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
    })
    setLoading(false)

    if (result?.error) {
      alert("Invalid login credentials")
    }
  }

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
      {/* Credentials login form */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded mb-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded mb-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
      />
      <button
        onClick={handleCredentialsLogin}
        disabled={loading}
        className="w-full px-3 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 transition disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Proceed"}
      </button>

      <div className="flex items-center my-4 text-gray-400 text-xs">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="px-2">OR</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Social providers */}
      {providers.map((p) => (
        <button
          key={p.id}
          onClick={() => signIn(p.id, { redirect: true })}
          className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition cursor-pointer ${p.color}`}
        >
          {p.icon}
          Sign in with {p.name}
        </button>
      ))}
    </div>
  )
}
