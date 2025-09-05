import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function NotFoundPage() {
  const { data: session } = useSession()

  if (session) {
    redirect("/home")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-600">Oops! We couldn’t find that page.</p>
    </div>
  )
}
