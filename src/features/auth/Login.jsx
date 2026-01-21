import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
// --- FIREBASE IMPORTS ---
import { 
  signInWithEmailAndPassword, 
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc 
} from "firebase/firestore"; 
import { 
  X, 
  Loader2,
  Apple,       
  Smartphone,
  MessageSquare,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Mail,
  Eye,
  EyeOff
} from "lucide-react";
// --- ASSETS & CONFIG ---
import loginImg from "../../assets/common/logind2.webp"; 
import logo from "../../assets/common/logo.svg"; 
import { auth, db } from "../../firebase/firebase.config";
import { useAuth } from "../../context/AuthContext";

// ==========================================
// 1. PHONE AUTH MODAL
// ==========================================
const PhoneAuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState('PHONE');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('PHONE');
      setPhoneNumber('');
      setOtp('');
      setError('');
      setLoading(false);
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch(e){}
        window.recaptchaVerifier = null;
      }
    }
  }, [isOpen]);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container-login', {
          'size': 'invisible',
          'callback': () => {},
          'expired-callback': () => {
             setError("Recaptcha expired. Retry.");
             setLoading(false);
          }
        });
      } catch (err) {
        console.error("Recaptcha Setup Error:", err);
      }
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Enter valid phone number.");
      setLoading(false);
      return;
    }

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedNumber = phoneNumber.includes('+') ? phoneNumber : `+1${phoneNumber.trim()}`;
      
      const confirmation = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      window.confirmationResult = confirmation; 
      setStep('OTP');
    } catch (err) {
      console.error("OTP Error:", err);
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch(e){}
        window.recaptchaVerifier = null;
      }
      setError("Failed to send OTP. " + err.code);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          name: "Patient",       
          email: "",             
          phone: user.phoneNumber,
          photoURL: "",          
          address: "",
          gender: "",            
          dob: "",               
          role: "patient",       
          authProvider: "phone",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        });
      }

      onSuccess(); 
      onClose();
    } catch (err) {
      console.error(err);
      setError("Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full sm:max-w-[340px] p-6 rounded-t-3xl sm:rounded-2xl shadow-2xl relative animate-in slide-in-from-bottom-10 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors bg-slate-100 p-1 rounded-full">
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold text-slate-900 mb-1">
          {step === 'PHONE' ? 'Phone Login' : 'Verify Code'}
        </h3>
        <p className="text-slate-500 text-xs mb-6">
          {step === 'PHONE' ? 'Secure login via SMS.' : `Code sent to ${phoneNumber}`}
        </p>

        {error && (
          <div className="mb-4 bg-red-50 text-red-600 text-[11px] p-2 rounded flex gap-2 items-center border border-red-100 font-medium">
            <AlertCircle size={12} /> {error}
          </div>
        )}

        {step === 'PHONE' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
             <div className="relative group">
                <Smartphone className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-[#0f766e] transition-colors" />
                <input 
                  type="tel" 
                  placeholder="+1 98765 43210" 
                  className="w-full pl-10 pr-3 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-1 focus:ring-[#0f766e] focus:border-[#0f766e] outline-none transition-all placeholder:text-slate-400"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
             </div>
             <div id="recaptcha-container-login"></div>
             <button type="submit" disabled={loading} className="w-full bg-[#0f766e] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#115e59] transition-all disabled:opacity-70 shadow-sm flex justify-center items-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Code'}
             </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
             <div className="relative group">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-[#0f766e] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Enter 6-digit OTP" 
                  className="w-full pl-10 pr-3 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-1 focus:ring-[#0f766e] focus:border-[#0f766e] outline-none tracking-widest font-mono"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
             </div>
             <button type="submit" disabled={loading} className="w-full bg-[#0f766e] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#115e59] transition-all disabled:opacity-70 shadow-sm flex justify-center items-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & Login'}
             </button>
             <button type="button" onClick={() => setStep('PHONE')} className="w-full text-slate-500 text-xs font-medium hover:text-slate-800 transition-colors py-2">
               Change Number
             </button>
          </form>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. MAIN LOGIN COMPONENT
// ==========================================

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Animation Mount State
  const [mounted, setMounted] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const redirectUrl = location.state?.from || "/";

  const { googleSignUp, appleSignUp } = useAuth(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Trigger animations with a slight delay
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await googleSignUp();
      navigate(redirectUrl);
    } catch (err) {
      console.error(err);
      setError("Google Login failed.");
    }
  };

  const handleAppleLogin = async () => {
    try {
      await appleSignUp();
      navigate(redirectUrl);
    } catch (err) {
      console.error(err);
      setError("Apple Login failed.");
    }
  };

  const onSubmit = useCallback(async (data) => {
    try {
      setError("");
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
         await signOut(auth);
         setError("Please verify your email address first.");
         setLoading(false);
         return; 
      }
      navigate(redirectUrl);
    } catch (err) {
      console.error("Login Error:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Incorrect email or password.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Access temporarily locked.");
      } else {
        setError("Login failed. Check connection.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, redirectUrl]);

  return (
    // MASTER CONTAINER
    <div className="fixed inset-0 w-screen h-[100dvh] flex bg-white font-sans overflow-hidden">
      
      {/* -----------------------------
          LEFT SIDE: IMAGE (Desktop Only) 
         ----------------------------- */}
      <div className="hidden lg:block w-[55%] h-full relative overflow-hidden bg-black">
        <img 
          src={loginImg} 
          alt="Professional" 
          className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
        
        {/* === BRANDING (Fly in from LEFT) === */}
        <div className={`
            absolute bottom-16 left-16 max-w-lg
            text-white
            transition-all duration-1000 ease-out
            ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}
        `}>
          <h1 className="text-5xl font-bold mb-4 tracking-tight drop-shadow-lg">
            LUMINA CARE<span className="text-teal-400">.</span>
          </h1>
          <p className="text-white/90 text-xl leading-relaxed font-light drop-shadow-md">
            Access procedures, appointments, events, dashboard insights, secure messages, and patient profiles from one place.
          </p>
          <div className="mt-6 flex gap-2">
             <div className="h-1 w-12 bg-teal-400 rounded-full"></div>
             <div className="h-1 w-3 bg-white/50 rounded-full"></div>
             <div className="h-1 w-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* -----------------------------
          RIGHT SIDE: FORM (Full Width Mobile)
         ----------------------------- */}
      <div className="w-full lg:w-[45%] h-full bg-[#f8fafc] lg:bg-white flex flex-col relative overflow-y-auto">
        
        {/* === MOBILE GRID BACKGROUND === */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none lg:hidden" 
             style={{ 
               backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', 
               backgroundSize: '24px 24px' 
             }}>
        </div>

        {/* === NAVIGATION === */}
        <div className="sticky top-0 lg:absolute lg:top-0 left-0 w-full z-50 px-6 py-6 bg-[#f8fafc]/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none flex justify-between items-center">
           <Link 
             to="/" 
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 font-semibold text-xs hover:shadow-md hover:text-slate-900 transition-all hover:-translate-y-0.5"
           >
             <ArrowLeft size={16} />
             <span>Back to Home</span>
           </Link>

           {/* LOGO ON MOBILE */}
           <img src={logo} alt="Logo" className="w-8 h-8 object-contain lg:hidden" />
        </div>

        {/* LOGO ON DESKTOP */}
        <div className="hidden lg:block absolute top-6 right-6 z-50">
           <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
        </div>

        {/* FORM CONTAINER - PUSHED DOWN FOR DESKTOP (lg:pt-36) */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 py-8 lg:pt-36 min-h-full">
          
          {/* Content Wrapper */}
          <div className={`
              w-full max-w-[360px] 
              transition-all duration-1000 ease-out
              ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}
          `}>
            
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-full border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 transition-all group shadow-sm">
                <div className="w-5 h-5 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                      <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
                      <path d="M12.24 24.0008C15.4765 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.24 24.0008Z" fill="#34A853"/>
                      <path d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC05"/>
                      <path d="M12.24 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.0344664 12.24 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.24 4.74966Z" fill="#EA4335"/>
                  </svg>
                </div>
                <span className="text-slate-600 font-medium text-sm group-hover:text-slate-900">Sign in with Google</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleAppleLogin} className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm">
                  <Apple size={18} className="text-slate-800" />
                  <span className="text-slate-700 font-semibold text-sm">Apple</span>
                </button>
                <button onClick={() => setShowPhoneModal(true)} className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm">
                  <Smartphone size={18} className="text-slate-800" />
                  <span className="text-slate-700 font-semibold text-sm">Phone</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex py-2 items-center mb-6">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">or sign in with email</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-medium animate-pulse">
                <AlertCircle size={14} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Manual Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Email */}
              <div className="relative group">
                <input
                  id="email"
                  type="email"
                  className={`peer block w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-transparent focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none transition-all ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <label htmlFor="email" className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[11px] font-medium text-slate-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:bg-white peer-focus:text-[11px] peer-focus:text-[#0f766e]">
                  Email Address
                </label>
              </div>

              {/* Password */}
              <div className="relative group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`peer block w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-transparent focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none transition-all ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <label htmlFor="password" className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[11px] font-medium text-slate-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:bg-white peer-focus:text-[11px] peer-focus:text-[#0f766e]">
                  Password
                </label>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#0f766e] hover:text-[#115e59] px-2 py-1 bg-white/50 rounded">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Forgot & Keep me logged in */}
              <div className="flex items-center justify-between mt-1">
                 <div className="flex items-center gap-2 cursor-pointer group">
                   <input type="checkbox" id="remember" className="w-3.5 h-3.5 text-[#0f766e] border-slate-300 rounded focus:ring-[#0f766e] cursor-pointer"/>
                   <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer group-hover:text-slate-900">Keep me logged in</label>
                 </div>
                 <Link to="/forget-password" className="text-[#0f766e] font-bold text-xs hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0f766e] text-white font-bold text-sm py-3 rounded-full hover:bg-[#115e59] transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-teal-900/10"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
              </button>

              {/* Footer */}
              <p className="text-center text-slate-600 text-xs mt-6">
                New to Lumina Care?{" "}
                <Link to="/register" className="text-[#0f766e] font-bold hover:underline">
                  Join now
                </Link>
              </p>

              {/* Terms & Privacy Links */}
              <div className="mt-8 text-center text-[10px] text-slate-500">
                By signing in, you agree to our{' '}
                <Link to="/terms-of-use" className="text-[#0f766e] hover:underline font-medium">Terms & Conditions</Link>
                {' '}and{' '}
                <Link to="/privacy-policy" className="text-[#0f766e] hover:underline font-medium">Privacy Policy</Link>.
              </div>
            </form>
          </div>
          
          {/* Mobile Footer */}
          <div className="mt-8 text-center lg:hidden pb-6">
             <p className="text-[10px] text-slate-400">© 2026 LUMINA CARE.</p>
          </div>
        </div>
      </div>

      {/* Phone Modal */}
      <PhoneAuthModal 
        isOpen={showPhoneModal} 
        onClose={() => setShowPhoneModal(false)}
        onSuccess={() => navigate(redirectUrl)}
      />
    </div>
  );
};

export default Login;