// AuthLayout.jsx
// This layout will be used ONLY for auth pages (login, register)
// No Navbar / Footer here by design (clean auth screens)

import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* 
        children = Login / Register form
        Centered layout for clean auth UI
      */}
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
