import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Optional loading state (recommended)
  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  // If already logged in → redirect to home
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  // Otherwise allow access
  return children;
};

export default PublicRoute;
