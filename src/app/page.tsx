"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Clock, BarChart3, QrCode, Shield, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import DashboardPreview from "../../public/dashboard-preview"

export default function HomePage() {
  const router = useRouter()
  const [text, setText] = useState("")
  const [secondText, setSecondText] = useState("")
  const [isFirstTypingComplete, setIsFirstTypingComplete] = useState(false)
  const [isSecondTypingComplete, setIsSecondTypingComplete] = useState(false)
  const fullText = "Smart Attendance Tracking"
  const secondFullText = " Made Simple"

  // First text typing animation
  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      setIsFirstTypingComplete(true)
    }
  }, [text])

  // Second text typing animation (starts after first is complete)
  useEffect(() => {
    if (isFirstTypingComplete && secondText.length < secondFullText.length) {
      const timeout = setTimeout(() => {
        setSecondText(secondFullText.slice(0, secondText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else if (secondText.length === secondFullText.length) {
      setIsSecondTypingComplete(true)
    }
  }, [isFirstTypingComplete, secondText])

  useEffect(() => {
    const handleScroll = () => {}
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleGetStart = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6 text-center md:text-left"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="inline-block">{text}</span>
                  {isFirstTypingComplete && <span className="text-primary inline-block">{secondText}</span>}
                  {/* Only show cursor if typing is not complete */}
                  {!isSecondTypingComplete && (
                    <span className="inline-block w-1 h-8 md:h-10 lg:h-12 bg-primary animate-blink"></span>
                  )}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground">
                  Streamline your attendance process with QR code check-ins and real-time analytics.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button size="lg" className="font-medium w-full sm:w-auto" onClick={handleGetStart}>
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" className="font-medium w-full sm:w-auto">
                    See Demo
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mx-auto w-full max-w-md mt-5 md:mt-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                  <DashboardPreview />
                </div>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
              </motion.div>
            </div>
          </div>
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10" />
        </section>

        <section id="features" className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4"
              >
                Powerful Features
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Everything you need to manage attendance efficiently
              </motion.p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col gap-4 rounded-xl border p-4 sm:p-6 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-12 sm:py-16 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4"
              >
                How It Works
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Simple, fast, and reliable attendance tracking in three easy steps
              </motion.p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="relative flex flex-col items-center text-center gap-4"
                >
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl sm:text-2xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{step.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="absolute hidden sm:block top-7 left-[calc(50%+3.5rem)] w-[calc(100%-7rem)] h-0.5 bg-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4"
              >
                What Our Users Say
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Join hundreds of satisfied institutions using I&apos;m Here
              </motion.p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col gap-4 rounded-xl border p-4 sm:p-6 bg-card text-card-foreground shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground italic">&quot;{testimonial.quote}&quot;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Ready to transform your attendance system?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80">
                Join thousands of educators and administrators who have simplified their attendance tracking.
              </p>
              <Button size="lg" variant="secondary" className="font-medium w-full sm:w-auto">
                Get Started Today
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 sm:py-10 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex flex-col gap-2 max-w-xs">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold">I&apos;m Here</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Smart attendance tracking system built with Next.js and Firebase, using QR codes for seamless check-ins.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Product</h3>
                <nav className="flex flex-col gap-2">
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </nav>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Resources</h3>
                <nav className="flex flex-col gap-2">
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Guides
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </nav>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Company</h3>
                <nav className="flex flex-col gap-2">
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} I&apos;m Here. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "QR Code Check-ins",
    description: "Students can mark attendance by simply scanning a QR code with their smartphone.",
    icon: <QrCode className="h-6 w-6 text-primary" />,
  },
  {
    title: "Real-time Tracking",
    description: "Monitor attendance in real-time with instant updates as students check in.",
    icon: <Clock className="h-6 w-6 text-primary" />,
  },
  {
    title: "Detailed Analytics",
    description: "Access comprehensive reports and analytics to identify attendance patterns.",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
  {
    title: "Automated Verification",
    description: "Verify student identity automatically with secure authentication methods.",
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
  {
    title: "Secure Data",
    description: "All attendance data is securely stored and protected with Firebase authentication.",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: "User Management",
    description: "Easily manage students, classes, and administrators with role-based access control.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
]

const steps = [
  {
    title: "Generate QR Code",
    description: "Create a unique QR code for each class or event that needs attendance tracking.",
  },
  {
    title: "Students Scan",
    description: "Students use their smartphones to scan the QR code when they arrive.",
  },
  {
    title: "View Reports",
    description: "Access detailed attendance reports and analytics in real-time.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "University Professor",
    quote:
      "I'm Here has completely transformed how I take attendance in my large lecture classes. No more wasted time calling names!",
  },
  {
    name: "Michael Chen",
    role: "High School Principal",
    quote:
      "The analytics provided by I'm Here have helped us identify attendance patterns and improve student engagement.",
  },
  {
    name: "Emily Rodriguez",
    role: "Event Coordinator",
    quote:
      "We use I'm Here for all our campus events now. It's so much easier than manual check-ins and gives us accurate attendance data.",
  },
]
