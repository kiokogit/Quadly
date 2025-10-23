"use client"

import Logo from "@/components/logo"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const LandingPage: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
 
  useEffect(() => {
    if (session) {
      router.push("/home")
    }
  }, [session, router])

  const communities = [
    { name: "University of Lagos", members: "12.5K", type: "Open" },
    { name: "The Amish Community", members: "3.2K", type: "Approval Required" },
    { name: "Naivasha Town", members: "8.7K", type: "Open" },
    { name: "Usiani Location", members: "5.4K", type: "Open" },
  ]

  const stats = [
    { label: "Active Communities", value: "250+" },
    { label: "Connected Members", value: "180K+" },
    { label: "Events Shared", value: "15K+" },
    { label: "Daily Posts", value: "5K+" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-2xl font-bold text-orange-600">Uniquad</span>
        </div>
        <button
          onClick={() => router.push("/authentication")}
          className="px-6 py-2 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors text-sm"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Bringing Communities Together
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Connect with your local community, share events, discover what's happening around you, and stay in touch with people who matter most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => router.push("/authentication")}
              className="px-8 py-4 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg">
              Continue on Web
            </button>
            <button className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
              <span>Download App</span>
              <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 px-2 py-1 rounded-full">Coming Soon</span>
            </button>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/students-talking-to-each-other-illustration-svg-png-download-5979483.png"
            alt="Community connection"
            className="w-full h-auto drop-shadow-2xl"
          />
          <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-pulse">
            <p className="text-sm text-gray-600 dark:text-gray-300">🎉 New event in your area!</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-orange-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Communities */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Active Communities
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join location-based communities tailored to your interests
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((community, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mb-4 flex items-center justify-center text-white font-bold text-2xl">
                {community.name.charAt(0)}
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                {community.name}
              </h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">{community.members} members</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  community.type === "Open" 
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                }`}>
                  {community.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything Your Community Needs
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                📍
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Location-Based</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect only with your local community. Your space, your people.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                🎉
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Events & Updates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share and discover local events, announcements, and important updates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                🔒
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Private & Secure</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Some communities require approval. Your privacy is protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to Join Your Community?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Get started today and stay connected with what matters most to you.
        </p>
        <button
          onClick={() => router.push("/authentication")}
          className="px-10 py-4 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg text-lg"
        >
          Join Uniquad Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo />
            <span className="text-2xl font-bold">Uniquad</span>
          </div>
          <p className="text-gray-400 mb-6">
            Bringing communities together, one connection at a time.
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            © 2025 Uniquad. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage