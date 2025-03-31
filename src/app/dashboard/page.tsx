"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"

export default function DashboardPage() {
  const { user, userData, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 p-4">
          <div className="container mx-auto">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Welcome, {userData?.firstName || "User"}!</h2>
              <p>You are logged in as: {userData?.role || "User"}</p>
              <p className="mt-4">This is your dashboard. More features coming soon!</p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

