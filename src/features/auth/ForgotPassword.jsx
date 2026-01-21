import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { 
  X, Mail, ArrowRight, CheckCircle2, AlertCircle, ArrowLeft, Loader2, ChevronLeft 
} from 'lucide-react';
import { auth } from '../../firebase/firebase.config';
import loginImg from "../../assets/common/logind.webp"; // Using same image for consistency
import logo from "../../assets/common/logo.svg"; 

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  // Trigger animations
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      await sendPasswordResetEmail(auth, data.email);
      setSuccess(true);
    } catch (err) {
      console.error("Reset Error:", err);
      if (err.code === 'auth/user-not-found') {
        setError("No account found with this email address.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
            Account Recovery<span className="text-teal-400">.</span>
          </h1>
          <p className="text-white/90 text-xl leading-relaxed font-light drop-shadow-md">
         Restore access to appointments, procedures, dashboards,
         messages, and settings quickly with secure
         account recovery.          </p>
          <div className="mt-6 flex gap-2">
             <div className="h-1 w-12 bg-teal-400 rounded-full"></div>
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
             to="/login" 
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 font-semibold text-xs hover:shadow-md hover:text-slate-900 transition-all hover:-translate-y-0.5"
           >
             <ArrowLeft size={16} />
             <span>Back to Login</span>
           </Link>

           {/* LOGO ON MOBILE */}
           <img src={logo} alt="Logo" className="w-8 h-8 object-contain lg:hidden" />
        </div>

        {/* LOGO ON DESKTOP */}
        <div className="hidden lg:block absolute top-6 right-6 z-50">
           <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
        </div>

        {/* FORM CONTAINER */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 py-8 lg:pt-36 min-h-full">
          
          {/* Content Wrapper - Fly in from RIGHT */}
          <div className={`
              w-full max-w-[360px] 
              transition-all duration-1000 ease-out
              ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}
          `}>
            
            {success ? (
               // SUCCESS UI
               <div className="text-center py-10 animate-in fade-in zoom-in duration-500 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                 <div className="w-16 h-16 bg-[#0f766e]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#0f766e]/20">
                   <CheckCircle2 className="w-8 h-8 text-[#0f766e]" />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
                 <p className="text-slate-500 text-sm mb-8">
                   We've sent a password reset link to your inbox.
                 </p>
                 <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full bg-[#0f766e] hover:bg-[#115e59] text-white py-3 px-6 rounded-full transition-all mb-3 font-medium shadow-sm text-sm">
                   <Mail size={16} /> Open Gmail
                 </a>
                 <button onClick={() => navigate("/login")} className="inline-flex items-center justify-center gap-2 w-full border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 py-3 px-6 rounded-full transition-all text-sm font-medium">
                   Back to Login
                 </button>
               </div>
            ) : (
              // FORGOT PASSWORD FORM
              <>
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Reset Password</h2>
                  <p className="text-slate-500 text-sm">Enter your email to receive a reset link.</p>
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-medium animate-pulse">
                    <AlertCircle size={14} className="shrink-0" />
                    {error}
                  </div>
                )}

                {/* Manual Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Email Field */}
                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      className={`peer block w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-transparent focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none transition-all ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                    <label htmlFor="email" className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[11px] font-medium text-slate-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:bg-white peer-focus:text-[11px] peer-focus:text-[#0f766e]">
                      Email Address
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0f766e] text-white font-bold text-sm py-3 rounded-full hover:bg-[#115e59] transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-teal-900/10"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
                  </button>

                  {/* Footer */}
                  <p className="text-center text-slate-600 text-xs mt-6">
                    Remember your password?{" "}
                    <Link to="/login" className="text-[#0f766e] font-bold hover:underline">
                      Log in
                    </Link>
                  </p>

                  {/* Terms & Privacy Links */}
                  <div className="mt-8 text-center text-[10px] text-slate-500">
                    <Link to="/terms-of-use" className="text-[#0f766e] hover:underline font-medium">Terms & Conditions</Link>
                    {' '}and{' '}
                    <Link to="/privacy-policy" className="text-[#0f766e] hover:underline font-medium">Privacy Policy</Link>.
                  </div>
                </form>
              </>
            )}
          </div>
          
          {/* Mobile Footer */}
          <div className="mt-8 text-center lg:hidden pb-6">
             <p className="text-[10px] text-slate-400">© 2026 Lumina Care.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;