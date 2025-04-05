"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-lg text-center">
        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mb-8 h-64 w-full"
        >
          {/* Trees/Circles */}
          <div className="absolute right-4 top-0 h-32 w-32 rounded-full bg-gray-200"></div>
          <div className="absolute right-12 top-16 h-16 w-16 rounded-full bg-gray-100"></div>
          <div className="absolute right-0 top-24 h-20 w-20 rounded-full bg-gray-100"></div>

          {/* Stems */}
          <div className="absolute right-16 top-32 h-32 w-1 bg-gray-200"></div>
          <div className="absolute right-20 top-32 h-24 w-1 bg-gray-200"></div>
          <div className="absolute right-8 top-32 h-20 w-1 bg-gray-200"></div>

          {/* Ground line */}
          <div className="absolute bottom-0 h-px w-full bg-gray-200"></div>

          {/* Person */}
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-0 left-12"
          >
            {/* Person illustration */}
            <div className="relative h-48 w-24">
              {/* Head */}
              <div className="absolute left-6 top-0 h-10 w-10 rounded-t-full bg-gray-800"></div>
              <div className="absolute left-8 top-2 h-4 w-6 rounded-t-full bg-blue-900"></div>

              {/* Body */}
              <div className="absolute left-4 top-10 h-20 w-16 rounded-md bg-primary"></div>

              {/* Arms */}
              <div className="absolute left-0 top-14 h-6 w-10 rounded-full bg-primary"></div>
              <div className="absolute left-14 top-16 h-6 w-10 rounded-full bg-primary"></div>

              {/* Map/Paper */}
              <div className="absolute left-2 top-16 h-10 w-10 rotate-12 rounded-sm bg-white border border-gray-300"></div>
              <div className="absolute left-4 top-18 h-1 w-6 bg-gray-300"></div>
              <div className="absolute left-4 top-20 h-1 w-6 bg-gray-300"></div>
              <div className="absolute left-4 top-22 h-1 w-6 bg-gray-300"></div>

              {/* Legs */}
              <div className="absolute left-6 top-30 h-18 w-8 bg-gray-800"></div>
              <div className="absolute left-10 top-30 h-18 w-8 bg-gray-800"></div>

              {/* Feet */}
              <div className="absolute bottom-0 left-5 h-4 w-10 rounded-md bg-gray-900"></div>
              <div className="absolute bottom-0 left-9 h-4 w-10 rounded-md bg-gray-900"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Lost in <span className="text-primary">some</span>where!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-muted-foreground"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Button asChild className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

