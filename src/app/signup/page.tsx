"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { QrCode, ArrowRight, Eye, EyeOff, BarChart3, Shield, Users, GraduationCap, Building } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    // Organization specific fields
    organizationName: "",
    organizationType: "",
    // Student specific fields
    studentId: "",
    institution: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [accountType, setAccountType] = useState("student")

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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
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

  const isStepOneValid = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || passwordStrength < 2) {
      return false
    }

    if (accountType === "organization" && !formData.organizationName) {
      return false
    }

    if (accountType === "student" && !formData.studentId) {
      return false
    }

    return true
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
            className="flex flex-col justify-center space-y-8 p-6 md:p-10 max-w-md mx-auto w-full"
          >
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl font-bold tracking-tight"
              >
                {accountType === "student" ? "Student signup" : "Organization signup"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-xl"
              >
                Create your account to get started
              </motion.p>
            </div>

            <Tabs defaultValue="student" value={accountType} onValueChange={setAccountType} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Student</span>
                </TabsTrigger>
                <TabsTrigger value="organization" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>Organization</span>
                </TabsTrigger>
              </TabsList>

              <div className="relative mb-8">
                <div className="flex justify-between mb-2">
                  <div className={`text-sm font-medium ${step === 1 ? "text-primary" : ""}`}>Account Details</div>
                  <div className={`text-sm font-medium ${step === 2 ? "text-primary" : ""}`}>
                    {accountType === "student" ? "Student Info" : "Organization Info"}
                  </div>
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
                className="space-y-6"
              >
                <TabsContent value="student" className="mt-0 space-y-6">
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
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          name="studentId"
                          placeholder="S12345"
                          required
                          value={formData.studentId}
                          onChange={handleChange}
                        />
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
                        <div className="flex justify-between">
                          <Label htmlFor="password">Password</Label>
                        </div>
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
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                        className="w-full  mt-3"
                        onClick={nextStep}
                        disabled={!isStepOneValid()}
                      >
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution</Label>
                        <Input
                          id="institution"
                          name="institution"
                          placeholder="University/School Name"
                          value={formData.institution}
                          onChange={handleChange}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Your Role</Label>
                        <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="undergraduate">Undergraduate Student</SelectItem>
                            <SelectItem value="graduate">Graduate Student</SelectItem>
                            <SelectItem value="phd">PhD Student</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" required />
                          <Label htmlFor="terms" className="text-sm font-normal">
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

                        <div className="flex items-center space-x-2">
                          <Checkbox id="updates" />
                          <Label htmlFor="updates" className="text-sm font-normal">
                            I want to receive updates about product news and features
                          </Label>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" className="flex-1 h-12" onClick={prevStep}>
                          Back
                        </Button>
                        <Button type="submit" className="flex-1 h-12" disabled={isLoading}>
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
                </TabsContent>

                <TabsContent value="organization" className="mt-0 space-y-6">
                  {step === 1 ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="organizationName">Organization Name</Label>
                        <Input
                          id="organizationName"
                          name="organizationName"
                          placeholder="Acme University"
                          required
                          value={formData.organizationName}
                          onChange={handleChange}
                          className="h-12"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Admin First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Admin Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="h-12"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="admin@organization.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="password">Password</Label>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="h-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                        className="w-full h-12 mt-4"
                        onClick={nextStep}
                        disabled={!isStepOneValid()}
                      >
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="organizationType">Organization Type</Label>
                        <Select
                          value={formData.organizationType}
                          onValueChange={(value) => handleSelectChange("organizationType", value)}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select organization type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="university">University</SelectItem>
                            <SelectItem value="k12">K-12 School</SelectItem>
                            <SelectItem value="college">College</SelectItem>
                            <SelectItem value="training">Training Center</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Your Role</Label>
                        <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administrator">Administrator</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="it">IT Department</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" required />
                          <Label htmlFor="terms" className="text-sm font-normal">
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

                        <div className="flex items-center space-x-2">
                          <Checkbox id="updates" />
                          <Label htmlFor="updates" className="text-sm font-normal">
                            I want to receive updates about product news and features
                          </Label>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" className="flex-1 h-12" onClick={prevStep}>
                          Back
                        </Button>
                        <Button type="submit" className="flex-1 h-12" disabled={isLoading}>
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
                </TabsContent>
              </motion.form>
            </Tabs>

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
                    {accountType === "student"
                      ? "The smart attendance tracking system trusted by thousands of students worldwide"
                      : "The smart attendance tracking system trusted by thousands of educational institutions worldwide"}
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {(accountType === "student" ? studentFeatures : organizationFeatures).map((feature, index) => (
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
                <div>
                  {accountType === "student" ? "Used by 100,000+ students" : "Trusted by 500+ schools worldwide"}
                </div>
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

const studentFeatures = [
  {
    title: "QR Code Check-ins",
    description: "Fast and reliable attendance tracking",
    icon: <QrCode className="h-4 w-4 text-primary" />,
  },
  {
    title: "Attendance History",
    description: "Track your class attendance over time",
    icon: <BarChart3 className="h-4 w-4 text-primary" />,
  },
  {
    title: "Secure Data",
    description: "Your information is always protected",
    icon: <Shield className="h-4 w-4 text-primary" />,
  },
  {
    title: "Connect with Peers",
    description: "Join study groups and connect with classmates",
    icon: <Users className="h-4 w-4 text-primary" />,
  },
]

const organizationFeatures = [
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

