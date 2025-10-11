import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      avatar: string
      campus?: {initials: string, id: string}
      first_name: string
      last_name: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    avatar: string
    campus?: string
    first_name: string
    last_name: string
  }
}
