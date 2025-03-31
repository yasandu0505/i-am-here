"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { toast } from "sonner"
import { auth, db } from "@/lib/firebase"

type UserData = {
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: any
  lastLogin: any
}

type AuthContextType = {
  user: User | null
  userData: UserData | null
  loading: boolean
  signUp: (email: string, password: string, userData: Omit<UserData, "createdAt" | "lastLogin">) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  error: string | null
  setError: (error: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        // Get user data from Firestore
        try {
          const docRef = doc(db, "users", user.uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData)
          }

          // Update last login
          await setDoc(docRef, { lastLogin: serverTimestamp() }, { merge: true })
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      } else {
        setUserData(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData: Omit<UserData, "createdAt" | "lastLogin">) => {
    try {
      setError(null)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      })

      toast.success("Account created successfully", {
        description: "Welcome to I'm Here! You're now logged in.",
      })
    } catch (error: any) {
      console.error("Error signing up:", error)
      const errorMessage = getFirebaseErrorMessage(error.code)
      setError(errorMessage)
      toast.error("Error creating account", {
        description: errorMessage,
      })
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Login successful", {
        description: "Welcome back to I'm Here!",
      })
    } catch (error: any) {
      console.error("Error logging in:", error)
      const errorMessage = getFirebaseErrorMessage(error.code)
      setError(errorMessage)
      toast.error("Login failed", {
        description: errorMessage,
      })
      throw error
    }
  }

  const logout = async () => {
    try {
      setError(null)
      await signOut(auth)
      toast.success("Logged out successfully")
    } catch (error: any) {
      console.error("Error logging out:", error)
      const errorMessage = getFirebaseErrorMessage(error.code)
      setError(errorMessage)
      toast.error("Error logging out", {
        description: errorMessage,
      })
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      await sendPasswordResetEmail(auth, email)
      toast.success("Password reset email sent", {
        description: "Check your inbox for instructions to reset your password.",
      })
    } catch (error: any) {
      console.error("Error resetting password:", error)
      const errorMessage = getFirebaseErrorMessage(error.code)
      setError(errorMessage)
      toast.error("Error resetting password", {
        description: errorMessage,
      })
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        signUp,
        login,
        logout,
        resetPassword,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Helper function to get readable error messages
function getFirebaseErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please use a different email or try logging in."
    case "auth/invalid-email":
      return "The email address is not valid."
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support."
    case "auth/user-not-found":
      return "No account found with this email. Please check your email or sign up."
    case "auth/wrong-password":
      return "Incorrect password. Please try again or reset your password."
    case "auth/weak-password":
      return "Password is too weak. Please use a stronger password."
    case "auth/too-many-requests":
      return "Too many unsuccessful login attempts. Please try again later or reset your password."
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection and try again."
    default:
      return "An error occurred. Please try again later."
  }
}

