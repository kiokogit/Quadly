// src/lib/auth.ts
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import axios from "axios"

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
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account && profile) {
          const res = await axios.post(`http://localhost:8000/auth-api/auth/oauth/callback/`, {
            email: profile.email,
            first_name: (profile as any).given_name || profile.name?.split(" ")[0] || "",
            last_name: (profile as any).family_name || profile.name?.split(" ")[1] || "",
            provider: account.provider,
            avatar: (profile as any).picture || "",
            user: user,
            account: account
          })

          if (res.status === 200) {
            console.log('===================-----------------------------===========================')
            console.log(res.data)
            console.log('===================-----------------------------===========================')

            ;(user as any).backendToken = res.data.access
            ;(user as any).backendUser = res.data.user
            return true
          } else {
            console.error("Backend authentication failed:", res.data)
            return false
          }
        }
        return true
      } catch (err: any) {
        console.error("Failed to sync with backend:", err?.response?.data || err)
        return false
      }
    },

    async jwt({ token, user }) {
      // Persist backend tokens in the JWT
      if (user) {
        token.backendToken = (user as any).backendToken
        token.backendUser = (user as any).backendUser
      }
      return token
    },

    async session({ session, token }) {
      // Expose backend tokens in session
      if (token.backendToken) {
        ;(session as any).backendToken = token.backendToken
      }
      if (token.backendUser) {
        ;(session as any).backendUser = token.backendUser
      }
      return session
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (url.includes("error=")) {
        return `${baseUrl}/auth/error?${url.split("?")[1]}`
      }
      return baseUrl
    },
  },
}
