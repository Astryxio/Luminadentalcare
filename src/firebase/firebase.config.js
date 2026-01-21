// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // Login ke liye
import { getFirestore } from "firebase/firestore"; // Database ke liye

// Your NEW web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnU0mKG7UGgjcyjGJmeVlviy0Qh2cngfw",
  authDomain: "luminasdental.firebaseapp.com",
  projectId: "luminasdental",
  storageBucket: "luminasdental.firebasestorage.app",
  messagingSenderId: "273136366933",
  appId: "1:273136366933:web:0c6cc4ea67de4faf456bdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize & Export Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;