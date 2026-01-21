import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Apple, Smartphone } from "lucide-react"; 
import { useAuth } from "../../context/AuthContext";

const SocialLogin = () => {
  // NOTE: appleSignUp and phoneSignUp need to be added to your AuthContext
  const { googleSignUp, appleSignUp, phoneSignUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirect_url = location.state?.from || "/";

  // --- Google Handler ---
  const handleGoogleSignUp = async () => {
    try {
      setError("");
      setLoading(true);
      await googleSignUp();
      navigate(redirect_url);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Apple Handler ---
  const handleAppleSignUp = async () => {
    try {
      setError("");
      setLoading(true);
      // Ensure appleSignUp is defined in AuthContext
      if (!appleSignUp) throw new Error("Apple Login is not configured in AuthContext yet.");
      
      await appleSignUp();
      navigate(redirect_url);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to access Apple login.");
    } finally {
      setLoading(false);
    }
  };

  // --- Phone Handler ---
  const handlePhoneSignUp = async () => {
    try {
        setError("");
        // Phone auth requires a different flow (Input Number -> Get SMS code).
        // Usually, this button triggers a Modal or toggles the form state.
        if (!phoneSignUp) throw new Error("Phone Login is not configured in AuthContext yet.");
        
        console.log("Trigger Phone Auth UI here");
        // Example: props.setShowPhoneModal(true);
    } catch (err) {
        console.error(err);
        setError(err.message);
    }
  };

  return (
    <div className="w-full mt-6">
      
      {/* Error Message Display */}
      {error && (
        <p className="text-red-400 text-sm text-center mb-4 bg-red-500/10 p-2 rounded border border-red-500/20">
          {error}
        </p>
      )}

      {/* Grid for 3 buttons */}
      <div className="grid grid-cols-3 gap-3">
        
        {/* --- Google Button --- */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="group flex flex-col lg:flex-row items-center justify-center gap-2 py-3 px-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-[#ffffff] hover:border-[#0f766e] transition-all duration-300 focus:outline-none disabled:opacity-50 shadow-sm"
        >
          <div className="w-5 h-5 flex items-center justify-center bg-white rounded-full p-0.5 group-hover:scale-110 transition-transform duration-300">
             <img 
               src="https://www.svgrepo.com/show/475656/google-color.svg" 
               alt="Google" 
               className="w-full h-full"
             />
          </div>
          <span className="text-[#64748b] font-bold text-[10px] lg:text-xs uppercase tracking-wider group-hover:text-[#0f172a] transition-colors">
            Google
          </span>
        </button>

        {/* --- Apple Button --- */}
        <button
          type="button"
          onClick={handleAppleSignUp}
          disabled={loading}
          className="group flex flex-col lg:flex-row items-center justify-center gap-2 py-3 px-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-[#ffffff] hover:border-[#0f172a] transition-all duration-300 focus:outline-none disabled:opacity-50 shadow-sm"
        >
          <Apple className="w-5 h-5 text-[#0f172a] group-hover:scale-110 transition-transform duration-300" />
          <span className="text-[#64748b] font-bold text-[10px] lg:text-xs uppercase tracking-wider group-hover:text-[#0f172a] transition-colors">
            Apple
          </span>
        </button>

        {/* --- Phone Button --- */}
        <button
          type="button"
          onClick={handlePhoneSignUp}
          disabled={loading}
          className="group flex flex-col lg:flex-row items-center justify-center gap-2 py-3 px-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-[#ffffff] hover:border-[#0f766e] transition-all duration-300 focus:outline-none disabled:opacity-50 shadow-sm"
        >
          <Smartphone className="w-5 h-5 text-[#0f172a] group-hover:scale-110 transition-transform duration-300" />
          <span className="text-[#64748b] font-bold text-[10px] lg:text-xs uppercase tracking-wider group-hover:text-[#0f172a] transition-colors">
            Phone
          </span>
        </button>

      </div>
    </div>
  );
};

export default SocialLogin;