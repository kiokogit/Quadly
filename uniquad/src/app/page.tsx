"use client"

import AuthButtons from "@/components/AuthButtons"
import Logo from "@/components/logo"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"

const LandingPage: React.FC = () => {
  const { data: session } = useSession()
  const [schoolEmail, setSchoolEmail] = useState("")

  if (session) {
    redirect("/home")
  }

  const signInWithEmail = () => {
    if (schoolEmail) {
      console.log(`Signing in with email: ${schoolEmail}`)
    } else {
      alert("Please enter your school email address")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-4">
        <Logo />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200 mb-2">UniQuad</h1>
        
        <img
          src={"https://cdni.iconscout.com/illustration/premium/thumb/students-talking-to-each-other-illustration-svg-png-download-5979483.png"}
          alt="Campus community"
          className="w-64 h-auto mb-4"
        />
        <p className="text-gray-700 dark:text-gray-400 max-w-md text-sm leading-relaxed">
          Connect with friends, share campus updates, and discover events
          happening near you.
        </p>
      </section>

      {/* Auth Section */}
      <section className="flex flex-col items-center px-4 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="w-full max-w-xs">
          <input
            type="email"
            placeholder="Enter School email"
            value={schoolEmail}
            onChange={(e) => setSchoolEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded mb-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <button
            onClick={signInWithEmail}
            className="w-full px-3 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            Continue with Email
          </button>

          <div className="flex items-center my-4 text-gray-400 text-xs">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-2">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <AuthButtons />
        </div>

        <p className="text-xs text-gray-400 mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="text-orange-600 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-orange-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </section>
    </div>
  )
}

export default LandingPage
