import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
  type UserCredential,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp, type Timestamp, type FieldValue } from "firebase/firestore"
import { auth } from "@/lib/firebase"
import { db } from "@/lib/firebase"

export type UserRole = "student" | "administrator" | "teacher" | "staff" | "it" | "other"

export interface UserData {
  uid: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  createdAt: Timestamp | FieldValue | null
  updatedAt: Timestamp | FieldValue | null
  // Student specific fields
  studentId?: string
  institution?: string
  // Organization specific fields
  organizationName?: string
  organizationType?: string
}

// Create a new user with email and password
export const createUser = async (
  email: string,
  password: string,
  userData: Omit<UserData, "uid" | "createdAt" | "updatedAt">,
): Promise<UserCredential> => {
  try {
    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const { user } = userCredential

    // Create the user document in Firestore
    await createUserDocument(user, userData)

    return userCredential
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Create a user document in Firestore
export const createUserDocument = async (
  user: FirebaseUser,
  userData: Omit<UserData, "uid" | "createdAt" | "updatedAt">,
) => {
  if (!user) return

  const userRef = doc(db, "users", user.uid)
  const userSnap = await getDoc(userRef)

  // Only create the document if it doesn't already exist
  if (!userSnap.exists()) {
    const timestamp = serverTimestamp()

    const userDataToSave: UserData = {
      uid: user.uid,
      email: user.email || userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    // Add student-specific fields if they exist
    if (userData.studentId) userDataToSave.studentId = userData.studentId
    if (userData.institution) userDataToSave.institution = userData.institution

    // Add organization-specific fields if they exist
    if (userData.organizationName) userDataToSave.organizationName = userData.organizationName
    if (userData.organizationType) userDataToSave.organizationType = userData.organizationType

    try {
      await setDoc(userRef, userDataToSave)
    } catch (error) {
      console.error("Error creating user document:", error)
      throw error
    }
  }
}

// Sign in a user with email and password
export const signInUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error("Error signing in:", error)
    // We'll handle the error translation in the login component
    throw error
  }
}

// Sign out the current user
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

// Get the current user's data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, "users", uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return userSnap.data() as UserData
    }

    return null
  } catch (error) {
    console.error("Error getting user data:", error)
    throw error
  }
}

