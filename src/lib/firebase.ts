// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyDXqI-k1_Yfl7p_5ujciP8qMRG-Y1EHHOQ",
  authDomain: "i-am-here-e458d.firebaseapp.com",
  projectId: "i-am-here-e458d",
  storageBucket: "i-am-here-e458d.firebasestorage.app",
  messagingSenderId: "872195235780",
  appId: "1:872195235780:web:1e11b85733cc26f5408e91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

export default app
