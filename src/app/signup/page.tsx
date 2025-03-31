"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { QrCode, ArrowRight, Eye, EyeOff, BarChart3, Shield, Users, CheckCircle, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"

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
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [receiveUpdates, setReceiveUpdates] = useState(false)

  const { signUp, error, setError } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (error) setError(null)

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
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
        receiveUpdates: receiveUpdates,
      })

      router.push("/dashboard")
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false)
    }
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
        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Already have an account?</span>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
        </div>
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
                <div className={`text-sm font-medium ${step === 1 ? "text-primary" : ""}`}>Account Details</div>
                <div className={`text-sm font-medium ${step === 2 ? "text-primary" : ""}`}>Role & Preferences</div>
              </div>
              <div className="overflow-hidden rounded-full bg-muted h-2">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/15 text-destructive text-sm p-3 rounded-md"
              >
                {error}
              </motion.div>
            )}

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
                      <Checkbox
                        id="terms"
                        required
                        className="mt-1"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                      />
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
                      <Checkbox
                        id="updates"
                        className="mt-1"
                        checked={receiveUpdates}
                        onCheckedChange={(checked) => setReceiveUpdates(checked === true)}
                      />
                      <Label htmlFor="updates" className="text-sm font-normal leading-tight">
                        I want to receive updates about product news and features
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isLoading || !formData.role || !acceptTerms}>
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
            className="hidden md:block relative overflow-hidden rounded-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-background z-0" />
            <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10" />

            <div className="relative z-10 h-full flex flex-col p-8">
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-4">
                    <QrCode className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Join I&apos;m Here</h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    The smart attendance tracking system trusted by thousands of educators worldwide
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="w-full max-w-md mb-8"
                >
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-primary/10">
                    <div className="flex justify-center mb-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2">Streamlined Attendance</h3>
                    <p className="text-muted-foreground text-center">
                      QR code scanning makes taking attendance quick and accurate, saving time and reducing errors
                    </p>
                    <div className="flex justify-center mt-4">
                      <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary">
                        <Clock className="h-4 w-4" />
                        <span>Save up to 15 minutes per class</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="bg-background/80 backdrop-blur-sm rounded-lg p-4 flex items-start gap-3 shadow-sm"
                    >
                      <div className="rounded-full bg-primary/10 p-2 shrink-0">{feature.icon}</div>
                      <div>
                        <h4 className="text-sm font-medium">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-auto pt-6 flex justify-between items-center text-sm text-muted-foreground"
              >
                <div>Trusted by 500+ schools worldwide</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="text-primary">
                      ★
                    </div>
                  ))}
                  <span className="ml-1">4.9/5</span>
                </div>
              </motion.div>
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
    description: "Fast and reliable attendance tracking",
    icon: <QrCode className="h-4 w-4 text-primary" />,
  },
  {
    title: "Real-time Analytics",
    description: "Instant insights into attendance patterns",
    icon: <BarChart3 className="h-4 w-4 text-primary" />,
  },
  {
    title: "Secure Data",
    description: "Enterprise-grade security for your data",
    icon: <Shield className="h-4 w-4 text-primary" />,
  },
  {
    title: "User Management",
    description: "Easily manage students and classes",
    icon: <Users className="h-4 w-4 text-primary" />,
  },
]

