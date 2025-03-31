"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { QrCode, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "password") {
      // Simple password strength calculation
      let strength = 0
      if (value.length >= 8) strength += 1
      if (/[A-Z]/.test(value)) strength += 1
      if (/[0-9]/.test(value)) strength += 1
      if (/[^A-Za-z0-9]/.test(value)) strength += 1
      setPasswordStrength(strength)
    }
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle signup logic here
    }, 1500)
  }

  const nextStep = () => {
    setStep(2)
  }

  const prevStep = () => {
    setStep(1)
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
                Create an account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground"
              >
                Join thousands of educators using I&apos;m Here
              </motion.p>
            </div>

            <div className="relative mb-6">
              <div className="flex justify-between mb-2">
                <div className="text-sm font-medium">Account Details</div>
                <div className="text-sm font-medium">Role & Preferences</div>
              </div>
              <div className="overflow-hidden rounded-full bg-muted h-2">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                />
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {step === 1 ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full ${i < passwordStrength ? "bg-primary" : "bg-muted"}`}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {passwordStrength === 0 && "Very weak"}
                          {passwordStrength === 1 && "Weak"}
                          {passwordStrength === 2 && "Medium"}
                          {passwordStrength === 3 && "Strong"}
                          {passwordStrength === 4 && "Very strong"}
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    className="w-full"
                    onClick={nextStep}
                    disabled={
                      !formData.firstName ||
                      !formData.lastName ||
                      !formData.email ||
                      !formData.password ||
                      passwordStrength < 2
                    }
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Select value={formData.role} onValueChange={handleRoleChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="administrator">Administrator</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" required className="mt-1" />
                      <Label htmlFor="terms" className="text-sm font-normal leading-tight">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="updates" className="mt-1" />
                      <Label htmlFor="updates" className="text-sm font-normal leading-tight">
                        I want to receive updates about product news and features
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isLoading || !formData.role}>
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                        />
                      ) : null}
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                  </div>
                </>
              )}
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center text-sm"
            >
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
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
            <div className="relative flex h-full flex-col items-center justify-center p-6">
              <div className="mb-6 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mb-4 rounded-full bg-primary/10 p-3"
                >
                  <CheckCircle className="h-8 w-8 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold">Join I&apos;m Here Today</h3>
                <p className="mt-2 text-muted-foreground">Simplify attendance tracking and gain valuable insights</p>
              </div>

              <div className="space-y-4 w-full max-w-md">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="flex items-start space-x-3 rounded-lg border bg-background/60 backdrop-blur-sm p-3"
                  >
                    <div className="rounded-full bg-primary/10 p-1.5 text-primary">{feature.icon}</div>
                    <div>
                      <h4 className="text-sm font-medium">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
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

const features = [
  {
    title: "QR Code Check-ins",
    description: "Streamline attendance with quick QR code scanning",
    icon: <QrCode className="h-4 w-4" />,
  },
  {
    title: "Real-time Analytics",
    description: "Get instant insights into attendance patterns",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  {
    title: "Secure & Reliable",
    description: "Your data is protected with enterprise-grade security",
    icon: <CheckCircle className="h-4 w-4" />,
  },
]

