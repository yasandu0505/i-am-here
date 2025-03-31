"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Clock, BarChart3, QrCode, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">I&apos;m Here</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
          <div className="container relative z-10">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Smart Attendance Tracking <span className="text-primary">Made Simple</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Streamline your attendance process with QR code check-ins and real-time analytics.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="font-medium">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" className="font-medium">
                    See Demo
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mx-auto w-full max-w-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="I'm Here dashboard preview"
                    width={800}
                    height={600}
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
              </motion.div>
            </div>
          </div>
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10" />
        </section>

        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              >
                Powerful Features
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Everything you need to manage attendance efficiently
              </motion.p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col gap-4 rounded-xl border p-6 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              >
                How It Works
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Simple, fast, and reliable attendance tracking in three easy steps
              </motion.p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="relative flex flex-col items-center text-center gap-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="absolute hidden md:block top-8 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-0.5 bg-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              >
                What Our Users Say
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Join hundreds of satisfied institutions using I&apos;m Here
              </motion.p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col gap-4 rounded-xl border p-6 bg-card text-card-foreground shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">&quot;{testimonial.quote}&quot;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to transform your attendance system?
              </h2>
              <p className="text-xl text-primary-foreground/80">
                Join thousands of educators and administrators who have simplified their attendance tracking.
              </p>
              <Button size="lg" variant="secondary" className="font-medium">
                Get Started Today
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
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

