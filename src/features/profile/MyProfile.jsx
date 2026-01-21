import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";
import ProfileSidebar from "./ProfileSidebar";
import GeneralTab from "./GeneralTab";
import SecurityTab from "./SecurityTab";
import AppointmentsTab from "./AppointmentsTab";
import { Loader2 } from "lucide-react";

const MyProfile = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "appointments"); // Default to appointments for quick view
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Force show after 1.5s to prevent infinite loading
    const timer = setTimeout(() => setLoading(false), 1500);

    const userRef = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        setUserData({
          displayName: currentUser.displayName || "Patient",
          email: currentUser.email,
        });
      }
      setLoading(false);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-teal-600 mb-4" />
        <p className="text-slate-400 text-xs font-bold tracking-[0.2em] animate-pulse">
          LOADING DASHBOARD...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 md:px-8 font-sans animate-in fade-in duration-500">
      
      {/* --- HEADER SECTION --- */}
      <div className="mt-16 mb-8 flex flex-col items-center text-center">
        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-teal-50 border-4 border-white shadow-lg flex items-center justify-center flex-shrink-0">
             <span className="text-3xl md:text-4xl font-bold text-teal-700">
               {userData?.displayName?.charAt(0).toUpperCase() || "P"}
             </span>
          </div>
          
          {/* User Info */}
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
              {userData?.displayName || "Welcome Back"}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 text-slate-500 text-xs md:text-sm font-medium">
              <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Patient ID: #{currentUser?.uid?.slice(0, 6).toUpperCase()}
              </span>
              <span>{currentUser?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT (Stack on Mobile, Row on Desktop) --- */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24 z-10">
          <ProfileSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 p-5 md:p-10 w-full min-h-[500px]">
          {activeTab === "appointments" && (
            <AppointmentsTab currentUser={currentUser} />
          )}
          {activeTab === "general" && (
            <GeneralTab userData={userData} currentUser={currentUser} setUserData={setUserData} />
          )}
          {activeTab === "security" && (
            <SecurityTab user={currentUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;