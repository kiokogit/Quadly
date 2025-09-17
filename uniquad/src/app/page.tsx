"use client"

import AuthButtons from "@/components/AuthButtons"
import Logo from "@/components/logo"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const LandingPage: React.FC = () => {
  const { data: session } = useSession()
 
  if (session) {
    redirect("/home")
  }


  return (
    <div className=" flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-4">
        <div>
          <Logo />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">UniQuad</h1>
        
        </div>
        
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
      <section className="flex flex-col items-center px-4 ">
        <div className="w-full max-w-xs">
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
