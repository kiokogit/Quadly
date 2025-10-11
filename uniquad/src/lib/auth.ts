// src/lib/auth.ts
import { DefaultSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { fetchLoggedProfile } from "./api-calls"
import axiosInstance from "./api-client"

// src/types/auth.ts (or next-auth.d.ts)

interface BackendUser {
  id: number | string
  email: string
  first_name?: string
  last_name?: string
  avatar?: string
  [key: string]: any
}

interface User {
  id: string
  name: string
  email?: string
  avatar?: string
  first_name?: string
  last_name?: string
  access_token: string
  refresh_token: string
  backendUser: BackendUser
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      avatar: string
      campus?: {initials: string, id: string}
      first_name: string
      last_name: string
    } & DefaultSession["user"]
    access_token: string
    refresh_token: string
    expires: string
  }
}

interface Profile {
  email: string
  name?: string
  given_name?: string
  family_name?: string
  image?: string
  [key: string]: any 
}

interface Payload {
  email?: string,
  password?: string,
  provider: string,
  [key: string]: any 
}


// 👇 single backend sync function for all providers
async function syncWithBackend(payload: Payload) {
  try {
    const res = await axiosInstance.post("/accounts/login/", payload)

    if (res.status === 200) {
      return {
        id: res.data.user.id,
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        backendUser: res.data.user,
        name: res.data.user.first_name
      }
    }
    return null
  } catch (err) {
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
          username_or_email: credentials.email,
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
    signIn: "/",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      // handle OAuth providers
      if (account && profile) {
        const result = await syncWithBackend({
          email: profile.email,
          first_name: (profile as Profile).given_name || profile.name?.split(" ")[0] || "",
          last_name: (profile as Profile).family_name || profile.name?.split(" ")[1] || "",
          provider: account.provider,
          avatar: (profile as Profile).image || "",
          user: user,
          account: account
        })
        if (!result) return false
        ;(user as User) = result
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.access_token = (user as User).access_token
        token.refresh_token = (user as User).refresh_token
        token.backendUser = (user as User).backendUser
      }
      return token
    },

    async session({ session, token }) {
      if (token.access_token) {
        session.access_token = token?.access_token as string
        session.refresh_token = token.refresh_token as string
      }
      if (token.backendUser) {
        session.user = token.backendUser as typeof session.user
      }
      // optional: fetch fresh profile from backend
      if (session.user && token.access_token) {
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
