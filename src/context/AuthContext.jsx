import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  OAuthProvider,        // NEW: For Apple
  signInWithPhoneNumber // NEW: For Phone
} from "firebase/auth";

import { auth } from "../firebase/firebase.config";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// Initialize Providers
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com'); // NEW: Apple Provider

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // auth bootstrap only

  // 🔐 Auth listener (single source of truth)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // --- Email/Password ---
  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const forgetPassword = (email) =>
    sendPasswordResetEmail(auth, email);

  // --- Social Login Wrappers ---
  
  const googleSignUp = () =>
    signInWithPopup(auth, googleProvider);

  // NEW: Apple Sign Up
  const appleSignUp = () =>
    signInWithPopup(auth, appleProvider);

  // NEW: Phone Sign Up
  // Note: 'appVerifier' is the RecaptchaVerifier instance that MUST be created in the UI component
  const phoneSignUp = (phoneNumber, appVerifier) =>
    signInWithPhoneNumber(auth, phoneNumber, appVerifier);

  const value = {
    currentUser,
    loading,
    signUp,
    login,
    logout,
    googleSignUp,
    appleSignUp, // Exposed to UI
    phoneSignUp, // Exposed to UI
    forgetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;