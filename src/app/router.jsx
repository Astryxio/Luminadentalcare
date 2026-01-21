import { createBrowserRouter } from "react-router-dom";

/* =========================================
   1. LAYOUTS & GUARDS
   ========================================= */
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import TermsOfUse from "../pages/TermsOfUse";

/* =========================================
   2. PUBLIC PAGES (Marketing)
   ========================================= */
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import EventList from "../pages/EventList";
import NotFound from "../pages/NotFound";
import PrivacyPolicy from "../pages/PrivacyPolicy";

/* =========================================
   3. FEATURE MODULES
   ========================================= */
// Services
import ServiceDetails from "../features/services/ServiceDetails";

// User Dashboard (Protected)
import MyProfile from "../features/profile/MyProfile";
import Appointment from "../features/appointment/Appointment";

// Authentication
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ForgotPassword from "../features/auth/ForgotPassword";

/* =========================================
   ROUTER CONFIGURATION
   ========================================= */
const router = createBrowserRouter([
  
  // --- A. PUBLIC WEBSITE ---------------------
  {
    path: "/",
    element: <MainLayout><Home /></MainLayout>,
  },
  {
    path: "/about",
    element: <MainLayout><About /></MainLayout>,
  },
  {
    path: "/contact",
    element: <MainLayout><Contact /></MainLayout>,
  },
  {
    path: "/events",
    element: <MainLayout><EventList /></MainLayout>,
  },
  
  
  // --- B. SERVICES & DETAILS -----------------
  {
    path: "/services",
    element: <MainLayout><Services /></MainLayout>,
  },
  {
    path: "/services/:id/:slug",
    element: <MainLayout><ServiceDetails /></MainLayout>,
  },

  // --- C. PROTECTED AREA (Logged In Users) ---
  {
    path: "/my-profile",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <MyProfile />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/appointment",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Appointment />
        </MainLayout>
      </ProtectedRoute>
    ),
  },

  // --- D. AUTHENTICATION FLOW ----------------
  {
    path: "/login",
    element: (
      <PublicRoute>
        <AuthLayout>
          <Login />
        </AuthLayout>
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <AuthLayout>
          <Register />
        </AuthLayout>
      </PublicRoute>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <PublicRoute>
        <AuthLayout>
          <ForgotPassword />
        </AuthLayout>
      </PublicRoute>
    ),
  },
{
  path: "/privacy-policy",
  element: <PrivacyPolicy />
},

{
  path: "/terms-of-use",
  element: <TermsOfUse />
},
  // --- E. SYSTEM ROUTES ----------------------
  { 
    path: "*", 
    element: <NotFound /> 
  },
]);

export default router;