"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function LogoutButton({ variant = "default" }: { variant?: "default" | "ghost" | "outline" }) {
  const [isLoading, setIsLoading] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout()
      router.push("/login")
    } catch (error) {
      console.error("Error logging out:", error)
      toast.error("Error logging out", {
        description: "There was a problem logging out. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant={variant} onClick={handleLogout} disabled={isLoading} size="sm">
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
      ) : (
        <LogOut className="h-4 w-4 mr-2" />
      )}
      Logout
    </Button>
  )
}

