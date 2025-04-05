"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { QrCode, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-muted/10 px-4">
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center rounded-lg border bg-background p-8 shadow-lg">
        {/* Decorative elements - QR code with reduced size */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.9, 1.1, 0.9] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute -inset-3 rounded-full bg-primary/20 blur-xl"
            />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-background shadow-lg">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <QrCode className="h-12 w-12 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Main content */}
        <div className="mt-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-7xl font-bold text-primary"
          >
            404
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-3xl font-bold tracking-tight"
          >
            Page Not Found
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-muted-foreground"
          >
            Oops! We couldn&apos;t find the page you&apos;re looking for.
          </motion.p>
        </div>

        {/* Animated illustration - Only search icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-10 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                x: [0, -10, 10, -10, 0],
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="relative z-10"
            >
              <Search className="h-16 w-16 text-muted-foreground" />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute -inset-4 z-0 rounded-full bg-primary/10 blur-lg"
            />
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="fixed -right-20 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
    </div>
  )
}

