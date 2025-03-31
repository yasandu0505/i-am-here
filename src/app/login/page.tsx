"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { QrCode, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle login logic here
    }, 1500)
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
        <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2 lg:max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-6 p-4 md:p-8"
          >
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Welcome back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground"
              >
                Enter your credentials to access your account
              </motion.p>
            </div>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                  />
                ) : null}
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </motion.form>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center text-sm"
            >
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-background"
          >
            <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10" />
            <div className="relative flex h-full items-center justify-center p-6">
              <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Login illustration"
                  width={600}
                  height={600}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold">Track attendance with ease</h3>
                  <p className="mt-2 text-sm text-white/80">
                    Streamline your attendance process with QR code check-ins
                  </p>
                </div>
              </div>
            </div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                delay: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl"
            />
          </motion.div>
        </div>
      </main>
    </div>
  )
}

