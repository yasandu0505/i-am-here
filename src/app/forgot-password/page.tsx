"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { QrCode, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { resetPassword, error, setError } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await resetPassword(email)
      setIsSubmitted(true)
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="flex h-16 items-center border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <QrCode className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">I&apos;m Here</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            {!isSubmitted ? (
              <>
                <div className="space-y-2 mb-6">
                  <h1 className="text-2xl font-bold">Reset your password</h1>
                  <p className="text-muted-foreground">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </p>
                </div>

                {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError(null)
                      }}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                      />
                    ) : null}
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Check your email</h2>
                <p className="text-muted-foreground">
                  We&apos;ve sent a password reset link to <span className="font-medium">{email}</span>.
                </p>
                <p className="text-sm text-muted-foreground">If you don&apos;t see it, check your spam folder.</p>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link href="/login" className="inline-flex items-center text-sm text-primary hover:underline">
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to login
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

