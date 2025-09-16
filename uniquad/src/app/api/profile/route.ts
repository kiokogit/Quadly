// src/app/api/profile/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import axios from "axios"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !(session as any).backendToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Call your Django backend with the saved token
    const res = await axios.get("http://localhost:8000/auth-api/profile/", {
      headers: {
        Authorization: `Bearer ${(session as any).backendToken}`,
      },
    })

    return NextResponse.json(res.data)
  } catch (error: any) {
    console.error("Profile fetch failed:", error.response?.data || error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}
