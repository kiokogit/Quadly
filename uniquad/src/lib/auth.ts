// src/lib/auth.ts
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"
import { fetchLoggedProfile } from "./api-calls"

// 👇 single backend sync function for all providers
async function syncWithBackend(payload: any) {
  try {
    const res = await axios.post("http://localhost:8000/auth-api/login/", payload)

    if (res.status === 200) {
      return {
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        backendUser: res.data.user,
      }
    }
    return null
  } catch (err: any) {
    console.error("Backend auth failed:", err?.response?.data || err)
    return null
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const result = await syncWithBackend({
          email: credentials.email,
          password: credentials.password,
          provider: "credentials"
        })
        if (!result) return null
        // Map backendUser to the shape NextAuth expects for User
        return {
          id: result.backendUser.id?.toString() || result.backendUser.email || credentials.email,
          name: result.backendUser.first_name
            ? `${result.backendUser.first_name} ${result.backendUser.last_name || ""}`.trim()
            : result.backendUser.email,
          email: result.backendUser.email,
          avatar: result.backendUser.avatar || "",
          first_name: result.backendUser.first_name || "",
          last_name: result.backendUser.last_name || "",
          access_token: result.access_token,
          refresh_token: result.refresh_token,
          backendUser: result.backendUser,
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/", // your login page
  },

  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      // handle OAuth providers
      if (account && profile) {
        const result = await syncWithBackend({
          email: profile.email,
          first_name: (profile as any).given_name || profile.name?.split(" ")[0] || "",
          last_name: (profile as any).family_name || profile.name?.split(" ")[1] || "",
          provider: account.provider,
          avatar: (profile as any).image || "",
          user: user,
          account: account
        })
        if (!result) return false
        ;(user as any) = result
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.access_token = (user as any).access_token
        token.refresh_token = (user as any).refresh_token
        token.backendUser = (user as any).backendUser
      }
      return token
    },

    async session({ session, token }) {
      if (token.access_token) {
        ;(session as any).access_token = token.access_token
        ;(session as any).refresh_token = token.refresh_token
      }
      if (token.backendUser) {
        (session as any).user = token.backendUser
      }
      // optional: fetch fresh profile from backend
      if ((session as any).user && token.access_token) {
        const freshUser = await fetchLoggedProfile(token.access_token as string)
        if (freshUser) {
          session.user = { ...session.user, ...freshUser }
        }
      }
      return session
    },

    async redirect({ url, baseUrl }) { 
      if (url.startsWith("/")) return `${baseUrl}${url} `
      if (url.includes("error=")) { 
        return `${baseUrl}/auth/error?${url.split("?")[1]}`
      } 
      return baseUrl 
    }, 
  }, 
}
