export { default } from "next-auth/middleware"

// Protect specific routes
export const config = {
  matcher: ["/protected/:path*"],
}
