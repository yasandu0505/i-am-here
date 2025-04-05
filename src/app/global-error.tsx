"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-muted/10 px-4">
          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center rounded-lg border bg-background p-8 shadow-lg">
            {/* Decorative elements */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
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
                  className="absolute -inset-4 rounded-full bg-destructive/20 blur-xl"
                />
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-background shadow-lg">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <AlertTriangle className="h-16 w-16 text-destructive" />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Main content */}
            <div className="mt-20 text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-bold text-destructive"
              >
                Something went wrong!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-4 text-muted-foreground"
              >
                We apologize for the inconvenience. Please try again later.
              </motion.p>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button onClick={reset} size="lg" variant="destructive" className="gap-2">
                Try Again
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Background decorative elements */}
          <div className="fixed -bottom-20 -left-20 h-64 w-64 rounded-full bg-destructive/5 blur-3xl" />
          <div className="fixed -right-20 top-20 h-64 w-64 rounded-full bg-destructive/5 blur-3xl" />
        </div>
      </body>
    </html>
  )
}

