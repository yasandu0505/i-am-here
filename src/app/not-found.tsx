"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-md text-center">
        {/* Illustration - made smaller and more compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mb-6 h-48 w-full max-w-xs"
        >
          {/* Trees/Circles - positioned closer together */}
          <div className="absolute right-12 top-0 h-24 w-24 rounded-full bg-gray-200"></div>
          <div className="absolute right-16 top-12 h-12 w-12 rounded-full bg-gray-100"></div>
          <div className="absolute right-6 top-16 h-16 w-16 rounded-full bg-gray-100"></div>

          {/* Stems - adjusted to match new positions */}
          <div className="absolute right-24 top-24 h-24 w-1 bg-gray-200"></div>
          <div className="absolute right-22 top-24 h-20 w-1 bg-gray-200"></div>
          <div className="absolute right-14 top-24 h-16 w-1 bg-gray-200"></div>

          {/* Ground line */}
          <div className="absolute bottom-0 h-px w-full bg-gray-200"></div>

          {/* Person - enhanced with better details */}
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-0 left-16"
          >
            {/* Person illustration - improved proportions */}
            <div className="relative h-40 w-20">
              {/* Head - improved shape */}
              <div className="absolute left-5 top-0 h-8 w-8 rounded-full bg-gray-800"></div>
              <div className="absolute left-7 top-1 h-3 w-5 rounded-t-full bg-blue-900"></div>

              {/* Body - smoother shape */}
              <div className="absolute left-3 top-8 h-16 w-12 rounded-md bg-primary"></div>

              {/* Arms - better positioning */}
              <div className="absolute left-0 top-12 h-4 w-8 rounded-full bg-primary transform -rotate-12"></div>
              <div className="absolute left-11 top-13 h-4 w-8 rounded-full bg-primary transform rotate-12"></div>

              {/* Map/Paper - more detailed */}
              <div className="absolute left-2 top-13 h-8 w-8 rotate-12 rounded-sm bg-white border border-gray-300 shadow-sm"></div>
              <div className="absolute left-3 top-15 h-0.5 w-5 bg-gray-300"></div>
              <div className="absolute left-3 top-17 h-0.5 w-5 bg-gray-300"></div>
              <div className="absolute left-3 top-19 h-0.5 w-5 bg-gray-300"></div>

              {/* Legs - better shape */}
              <div className="absolute left-4 top-24 h-14 w-5 bg-gray-800 rounded-t-sm"></div>
              <div className="absolute left-9 top-24 h-14 w-5 bg-gray-800 rounded-t-sm"></div>

              {/* Feet - improved shape */}
              <div className="absolute bottom-0 left-3 h-3 w-7 rounded-md bg-gray-900"></div>
              <div className="absolute bottom-0 left-9 h-3 w-7 rounded-md bg-gray-900"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Lost in <span className="text-primary">some</span>where!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-3 text-sm text-muted-foreground sm:text-base"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
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

