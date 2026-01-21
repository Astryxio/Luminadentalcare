import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = ({ children }) => {
  const location = useLocation();

  // "Senior Dev" Touch: Force scroll to top on every route change.
  // We use useLayoutEffect to prevent a visual "flash" of the old position.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-secondary-light">
      {/* Navbar (Fixed position handled inside component) */}
      <Navbar />

      {/* Main Content Area 
        - flex-1: Pushes footer to bottom
        - page-fade: Smooth entry animation defined in global css
      */}
      <main className="flex-1 w-full page-fade relative">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;