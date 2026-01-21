import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // 1️⃣ Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 2️⃣ Not logged in → redirect to login
  if (!currentUser?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3️⃣ Email not verified (manual users)
  if (!currentUser.emailVerified) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#134e4a] p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-envelope text-2xl text-yellow-600"></i>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 mb-6">
            We sent a verification link to{" "}
            <span className="font-semibold text-[#134e4a]">
              {currentUser.email}
            </span>
            .
            <br />
            Please check your inbox (and spam) and click the link to activate
            your account.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#134e4a] hover:bg-[#0f3d3a] text-white font-bold py-3 px-4 rounded transition-colors mb-3"
          >
            I've Verified My Email (Refresh)
          </button>

          <p className="text-sm text-gray-400">
            Still waiting? Check your Spam folder.
          </p>
        </div>
      </div>
    );
  }

  // 4️⃣ All good
  return children;
};

export default ProtectedRoute;
