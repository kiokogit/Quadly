"use client"

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Logo from "@/components/logo"
import axiosInstance from "@/lib/api-client"
import { getCampusesEndpoint } from "@/lib/endpoints"

type AuthTab = "signin" | "register"
type AccountType = "minor" | "standard" | "premium" | "super"

interface Community {
  id: string
  name: string
  requiresApproval: boolean
  members: string
  initials: string
}

const AuthenticationPage: React.FC = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<AuthTab>("signin")
  const [selectedAccountType, setSelectedAccountType] = useState<AccountType>("standard")
  const [selectedCommunity, setSelectedCommunity] = useState<string>("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
    dateOfBirth: "",
    phone: "",
    organizationName: "",
    authorizationCode: "",
  })

  const [communities, setCommunities] = useState<Community[]>([])

//   const communities: Community[] = [
//     { id: "unilag", name: "University of Lagos", requiresApproval: false, members: "12.5K" },
//     { id: "amish", name: "The Amish Community", requiresApproval: true, members: "3.2K" },
//     { id: "naivasha", name: "Naivasha Town", requiresApproval: false, members: "8.7K" },
//     { id: "usiani", name: "Usiani Location", requiresApproval: false, members: "5.4K" },
//     { id: "westlands", name: "Westlands, Nairobi", requiresApproval: false, members: "15.2K" },
//     { id: "kisumu", name: "Kisumu City Center", requiresApproval: false, members: "9.8K" },
//   ]

  const fetchCampuses = async() => {
    await axiosInstance.get(getCampusesEndpoint)
    .then(res => setCommunities(res.data))
  }

  useEffect(() => {
    fetchCampuses()
  }, [])

  const accountTypes = [
    {
      type: "minor" as AccountType,
      icon: "👶",
      title: "Minor Account",
      description: "For users under 18 years old",
      features: ["Parental oversight", "Age-appropriate content", "Limited posting"],
      badge: null,
    },
    {
      type: "standard" as AccountType,
      icon: "👤",
      title: "Standard Account",
      description: "Perfect for students and community members",
      features: ["Full community access", "Post updates & events", "Join discussions"],
      badge: null,
    },
    {
      type: "premium" as AccountType,
      icon: "⭐",
      title: "Premium Account",
      description: "For businesses and organizations",
      features: ["Sales platform access", "Premium badge", "Analytics dashboard", "Priority support"],
      badge: "PRO",
    },
    {
      type: "super" as AccountType,
      icon: "👑",
      title: "Super Account",
      description: "For community administrators",
      features: ["Admin panel access", "Moderation tools", "Community management", "Official badge"],
      badge: "ADMIN",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSocialSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/home" })
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    })
    
    if (result?.ok) {
      router.push("/home")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic
    console.log("Registration data:", {
      ...formData,
      accountType: selectedAccountType,
      community: selectedCommunity,
    })
  }

  const selectedCommunityData = communities?.find(c => c.id === selectedCommunity)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center md:p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 dark:bg-orange-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100 dark:bg-orange-950 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-6xl scale-[0.9] ">
        {/* Back to home */}
        <button
          onClick={() => router.push("/")}
          className="mb-4 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-2 transition-colors"
        >
          ← Back to home
        </button>

        <div className=" dark:bg-gray-800 rounded-3xl shadow-md bg-white overflow-hidden">
          <div className="grid md:grid-cols-2 ">
            {/* Left side - Branding */}
            <div className="hidden md:flex bg-gradient-to-br from-orange-500 to-gray-600 p-12 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Logo />
                  <span className="text-3xl font-bold">Uniquad</span>
                </div>
                
                <h2 className="text-4xl font-bold mb-4">
                  {activeTab === "signin" ? "Welcome Back!" : "Join Your Community"}
                </h2>
                
                <p className="text-orange-100 text-lg mb-8">
                  {activeTab === "signin" 
                    ? "Sign in to reconnect with your community and stay updated with local events." 
                    : "Create your account and become part of a vibrant local community."}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                      📍
                    </div>
                    <div>
                      <h3 className="font-semibold">Location-Based</h3>
                      <p className="text-sm text-orange-100">Connect with your local community</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                      🎉
                    </div>
                    <div>
                      <h3 className="font-semibold">Events & Updates</h3>
                      <p className="text-sm text-orange-100">Never miss what's happening</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                      🔒
                    </div>
                    <div>
                      <h3 className="font-semibold">Secure & Private</h3>
                      <p className="text-sm text-orange-100">Your data is protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Auth forms */}
            <div className="p-4">
              {/* Tabs */}
              <div className="flex gap-2 mb-8 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("signin")}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    activeTab === "signin"
                      ? "bg-white dark:bg-gray-800 text-orange-600 shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    activeTab === "register"
                      ? "bg-white dark:bg-gray-800 text-orange-600 shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Sign In Form */}
              {activeTab === "signin" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Sign in to Uniquad
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Continue with your account
                    </p>
                  </div>

                  {/* Social sign in */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleSocialSignIn("google")}
                      className="w-full py-3 px-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M5.27 9.76A7.46 7.46 0 0 1 12 5.5c1.98 0 3.72.67 5.11 1.76l3.8-3.8C18.63 1.19 15.53 0 12 0 7.31 0 3.25 2.69 1.27 6.55l3.99 3.21z"/>
                        <path fill="#34A853" d="M16.04 18.01A7.4 7.4 0 0 1 12 19.5a7.48 7.48 0 0 1-6.73-4.24l-4 3.1C3.25 22.31 7.31 25 12 25c3.43 0 6.49-1.13 8.66-3.07l-4.62-3.92z"/>
                        <path fill="#4A90E2" d="M24 12.26c0-.85-.07-1.67-.2-2.47H12v4.69h6.72a5.74 5.74 0 0 1-2.49 3.76l4.62 3.92C22.57 19.93 24 16.35 24 12.26z"/>
                        <path fill="#FBBC05" d="M5.27 14.76A7.52 7.52 0 0 1 4.5 12c0-.97.19-1.9.54-2.76l-3.99-3.2A11.94 11.94 0 0 0 0 12c0 1.93.47 3.75 1.27 5.35l4-3.1z"/>
                      </svg>
                      Continue with Google
                    </button>
                    <button
                      onClick={() => handleSocialSignIn("facebook")}
                      className="w-full py-3 px-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Continue with Facebook
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">Or continue with email</span>
                    </div>
                  </div>

                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-orange-600 rounded" />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                      </label>
                      <a href="#" className="text-sm text-orange-600 hover:text-orange-700 font-semibold">
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-lg"
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              )}

              {/* Register Form */}
              {activeTab === "register" && (
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Create your account
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Join your community today
                    </p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-5">
                    {/* Account Type Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Select Account Type
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {accountTypes.map((account) => (
                          <button
                            key={account.type}
                            type="button"
                            onClick={() => setSelectedAccountType(account.type)}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              selectedAccountType === account.type
                                ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-2xl">{account.icon}</span>
                              {account.badge && (
                                <span className="text-xs font-bold px-2 py-1 bg-orange-600 text-white rounded-full">
                                  {account.badge}
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                              {account.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {account.description}
                            </p>
                          </button>
                        ))}
                      </div>
                      
                      {/* Account type details */}
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <h5 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                          {accountTypes.find(a => a.type === selectedAccountType)?.title} includes:
                        </h5>
                        <ul className="space-y-1">
                          {accountTypes.find(a => a.type === selectedAccountType)?.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                              <span className="text-orange-600">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Community Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Select Your Community *
                      </label>
                      <select
                        value={selectedCommunity}
                        onChange={(e) => setSelectedCommunity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-orange-500 focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Choose your community</option>
                        {communities.map((community) => (
                          <option key={community.id} value={community.id}>
                            {community.initials} ({community.members} members)
                            {community.requiresApproval ? " - Approval Required" : ""}
                          </option>
                        ))}
                      </select>
                      {selectedCommunityData?.requiresApproval && (
                        <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <span>⚠️</span>
                          This community requires admin approval to join
                        </p>
                      )}
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Username *
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="johndoe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="+254 700 000 000"
                        required
                      />
                    </div>

                    {selectedAccountType === "minor" && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Date of Birth * (Must be under 18)
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-orange-500 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    )}

                    {selectedAccountType === "premium" && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Organization Name *
                        </label>
                        <input
                          type="text"
                          name="organizationName"
                          value={formData.organizationName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="Your Business Name"
                          required
                        />
                      </div>
                    )}

                    {selectedAccountType === "super" && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Authorization Code *
                        </label>
                        <input
                          type="text"
                          name="authorizationCode"
                          value={formData.authorizationCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="Enter admin authorization code"
                          required
                        />
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          Super accounts require verification from community administrators
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="w-4 h-4 mt-1 text-orange-600 rounded" required />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        I agree to the{" "}
                        <a href="#" className="text-orange-600 hover:underline">Terms of Service</a>
                        {" "}and{" "}
                        <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-lg"
                    >
                      Create Account
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ff6b35;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff8c42;
        }
      `}</style>
    </div>
  )
}

export default AuthenticationPage