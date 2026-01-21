import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { 
  Menu, X, ChevronDown, User, LogOut, Calendar, 
  ArrowRight, LayoutDashboard, Settings 
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/common/logo.svg";

/**
 * Logo Component
 * Displays the brand icon and text with adaptive styling for mobile/dark modes.
 */
const Logo = ({ isMobileDrawer = false, isDarkBg = false }) => {
  // Container styles for the text badge
  const badgeBaseClasses = "flex flex-col justify-center px-4 py-1.5 rounded-full transition-all duration-300";
  
  let badgeStyle = "";
  let textStyle = "";

  if (isMobileDrawer) {
    badgeStyle = "bg-[#f1f5f9] border border-[#e2e8f0]";
    textStyle = "text-[#0f172a]";
  } else if (isDarkBg) {
    badgeStyle = "bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20";
    textStyle = "text-[#ffffff]";
  } else {
    badgeStyle = "bg-[#0f766e] border border-[#0f766e] shadow-sm";
    textStyle = "text-[#ffffff]";
  }

  return (
    <div className="flex items-center gap-3 select-none group">
      {/* Icon Circle */}
      <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full border-2 border-[#0f766e] shadow-md transition-transform duration-300 group-hover:scale-105">
        <img src={logo} alt="Logo" className="w-6 h-6 object-contain" />
      </div>
      
      {/* Text Badge */}
      <div className={`${badgeBaseClasses} ${badgeStyle}`}>
        <span className={`text-xs font-bold tracking-widest uppercase ${textStyle}`}>
          LUMINA 
        </span>
       
      </div>
    </div>
  );
};

/**
 * DesktopNavLink Component
 * Handles the conditional styling for navigation links based on scroll/theme state.
 */
const DesktopNavLink = ({ item, isActive, isScrolled, isDarkBg, onClick }) => {
  const baseClasses = "relative px-5 py-2 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 group overflow-hidden flex items-center justify-center";
  
  let stateClasses = "";
  
  if (isActive) {
    // Active: Teal filled
    stateClasses = "bg-[#0f766e] text-white shadow-lg shadow-[#0f766e]/25 border border-[#0f766e] scale-105";
  } else if (isScrolled) {
    // Scrolled: White glass
    stateClasses = "bg-white/80 backdrop-blur-md border border-white/40 shadow-sm text-slate-600 hover:bg-white hover:shadow-md hover:text-[#0f766e] hover:-translate-y-0.5";
  } else if (isDarkBg) {
    // Dark Background: Transparent glass
    stateClasses = "bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20";
  } else {
    // Default: Light glass
    stateClasses = "bg-white/60 backdrop-blur-md border border-white/40 text-slate-600 hover:bg-white hover:text-[#0f766e] hover:shadow-sm";
  }

  return (
    <NavLink to={item.path} onClick={onClick} className={`${baseClasses} ${stateClasses}`}>
      <span className="relative z-10">{item.name}</span>
    </NavLink>
  );
};

/**
 * UserProfileDropdown Component
 * Displays the user's avatar and dropdown menu on desktop.
 */
const UserProfileDropdown = ({ currentUser, isScrolled, isDarkBg, isOpen, setIsOpen, logout }) => {
  const triggerBaseClasses = "flex items-center gap-2 py-1.5 px-3 rounded-full transition-all duration-300 group";
  const triggerScrollClasses = isScrolled ? "bg-white/80 backdrop-blur-md border border-white/40 shadow-sm" : "";
  
  const textColor = isDarkBg && !isScrolled ? "text-[#ffffff]" : "text-[#0f172a]";
  const subTextColor = isDarkBg && !isScrolled ? "text-[#ffffff]/70" : "text-[#64748b]";

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className={`${triggerBaseClasses} ${triggerScrollClasses}`}>
        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-[#f0fdfa] text-[#0f766e] flex items-center justify-center font-bold text-xs border border-[#ccfbf1]">
          {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : "U"}
        </div>
        
        {/* Name & Label */}
        <div className="flex flex-col items-start text-left">
          <span className={`text-[10px] font-bold leading-none ${textColor}`}>
            {currentUser.displayName || "User"}
          </span>
          <span className={`text-[9px] font-medium ${subTextColor}`}>
            My Account
          </span>
        </div>
        
        <ChevronDown size={12} className={`transition-transform duration-200 group-hover:rotate-180 ${subTextColor}`} />
      </button>

      {/* Dropdown Menu */}
      <div className={`
        absolute top-full right-0 w-60 pt-4 transform transition-all duration-200 origin-top-right
        ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"}
      `}>
        <div className="bg-[#ffffff] rounded-xl shadow-xl border border-[#e2e8f0] overflow-hidden p-1">
          <Link to="/my-profile" state={{ activeTab: 'appointments' }} className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-[#0f172a] hover:bg-[#f0fdfa] hover:text-[#0f766e] rounded-lg transition-colors">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link to="/my-profile" state={{ activeTab: 'general' }} className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-[#0f172a] hover:bg-[#f0fdfa] hover:text-[#0f766e] rounded-lg transition-colors">
            <User size={16} /> Profile Settings
          </Link>
          <div className="my-1 border-t border-[#f1f5f9]"></div>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors text-left">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * MobileDrawer Component
 * The slide-out menu for mobile devices.
 */
const MobileDrawer = ({ isOpen, onClose, navLinks, currentUser, logout, handleNavigation, location }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-[100dvh] w-[85%] max-w-[300px] bg-[#ffffff] z-[100] shadow-2xl 
          transform transition-transform duration-300 ease-out will-change-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 flex items-center justify-between border-b border-[#f1f5f9]">
            <Link to="/" onClick={() => { onClose(); handleNavigation("/"); }}>
              <Logo isMobileDrawer={true} />
            </Link>
            <button 
              onClick={onClose}
              className="p-2 bg-[#f1f5f9] text-[#64748b] rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            <div className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest px-3 mb-2">Menu</div>
            
            {/* Navigation Links */}
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => { onClose(); handleNavigation(item.path); }}
                className={({ isActive }) => `
                  flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all
                  ${isActive 
                    ? "bg-[#0f766e]/10 text-[#0f766e]" 
                    : "text-[#0f172a] hover:bg-[#f1f5f9]"
                  }
                `}
              >
                {item.name}
                <ArrowRight size={16} className={`opacity-30 ${location.pathname === item.path ? 'text-[#0f766e]' : ''}`} />
              </NavLink>
            ))}

            <div className="my-6 border-t border-[#f1f5f9]" />

            {/* Account Section */}
            <div className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest px-3 mb-3">Account</div>

            {currentUser ? (
              <div className="bg-[#f8fafc] rounded-2xl p-4 border border-[#f1f5f9]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#134e4a] text-[#ffffff] flex items-center justify-center font-bold text-xl shadow-sm">
                    {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : "U"}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0f172a]">{currentUser.displayName || "User"}</div>
                    <div className="text-xs text-[#64748b] truncate max-w-[140px]">{currentUser.email}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <Link 
                    to="/my-profile"
                    state={{ activeTab: 'appointments' }}
                    onClick={onClose}
                    className="flex flex-col items-center gap-1 bg-[#ffffff] p-3 rounded-xl border border-[#e2e8f0] text-[#0f172a] hover:text-[#0f766e] hover:border-[#0f766e]/30 transition-all shadow-sm"
                  >
                    <LayoutDashboard size={18} />
                    <span className="text-[10px] font-bold">Dashboard</span>
                  </Link>
                  <Link 
                    to="/my-profile"
                    state={{ activeTab: 'general' }}
                    onClick={onClose}
                    className="flex flex-col items-center gap-1 bg-[#ffffff] p-3 rounded-xl border border-[#e2e8f0] text-[#0f172a] hover:text-[#0f766e] hover:border-[#0f766e]/30 transition-all shadow-sm"
                  >
                    <Settings size={18} />
                    <span className="text-[10px] font-bold">Settings</span>
                  </Link>
                </div>

                <button 
                  onClick={() => { logout(); onClose(); }}
                  className="w-full py-2.5 flex items-center justify-center gap-2 bg-[#ffffff] border border-[#e2e8f0] text-red-500 rounded-xl text-xs font-bold hover:bg-red-50 hover:border-red-100 transition-colors shadow-sm"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/login"
                  onClick={onClose}
                  className="py-3 bg-[#ffffff] border border-[#e2e8f0] text-[#0f172a] rounded-xl text-center text-sm font-bold hover:border-[#0f766e] hover:text-[#0f766e] transition-all shadow-sm"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  onClick={onClose}
                  className="py-3 bg-[#0f172a] text-[#ffffff] rounded-xl text-center text-sm font-bold shadow-lg hover:bg-black transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-[#ffffff] border-t border-[#f1f5f9]">
             <Link 
              to="/appointment"
              onClick={() => { onClose(); handleNavigation("/appointment"); }}
              className="w-full py-4 bg-[#134e4a] text-[#ffffff] font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-[#134e4a]/25 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Calendar size={18} /> Book Appointment
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

const Navbar = () => {
  // --- STATE ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // --- HOOKS ---
  const { currentUser, logout } = useAuth(); 
  const location = useLocation();
  
  // Determine if the current page should have a dark background initially
  const darkPaths = ["/", "/about", "/events"];
  const isDarkBg = darkPaths.includes(location.pathname) && !isScrolled;

  // --- SCROLL HANDLER ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Smart Hide/Show logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- BODY LOCK EFFECT ---
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  // --- ROUTE CHANGE CLEANUP ---
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // --- NAVIGATION HELPER ---
  const handleNavigation = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const navLinks = [
    { name: "Clinic", path: "/" },
    { name: "Philosophy", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <header 
        className={`
          fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          ${isScrolled ? "py-3" : "py-4"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* 1. MOBILE MENU TRIGGER */}
            <div className="lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className={`p-2 -ml-2 rounded-full active:scale-95 transition-all ${isDarkBg ? 'text-[#ffffff] bg-[#ffffff]/10' : 'text-[#0f172a] bg-[#f1f5f9]'}`}
                aria-label="Open Menu"
              >
                <Menu size={24} strokeWidth={2.5} />
              </button>
            </div>

            {/* 2. LOGO */}
            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
              <Link to="/" onClick={() => handleNavigation("/")} className="transition-transform duration-300 hover:scale-105">
                <Logo isDarkBg={isDarkBg && !isScrolled} />
              </Link>
            </div>

            {/* 3. DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-2 mx-6">
              {navLinks.map((item) => (
                <DesktopNavLink
                  key={item.name}
                  item={item}
                  isActive={location.pathname === item.path}
                  isScrolled={isScrolled}
                  isDarkBg={isDarkBg}
                  onClick={() => handleNavigation(item.path)}
                />
              ))}
            </nav>

            {/* 4. RIGHT ACTIONS */}
            <div className="w-10 lg:w-auto flex items-center justify-end gap-3">
              
              {/* Desktop User Section */}
              <div className="hidden lg:flex items-center gap-3">
                {currentUser ? (
                  <UserProfileDropdown 
                    currentUser={currentUser}
                    isScrolled={isScrolled}
                    isDarkBg={isDarkBg}
                    isOpen={profileDropdownOpen}
                    setIsOpen={setProfileDropdownOpen}
                    logout={logout}
                  />
                ) : (
                  <Link 
                    to="/login"
                    onClick={() => handleNavigation("/login")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${isScrolled ? "bg-white/80 backdrop-blur-md border border-white/40 shadow-sm text-[#0f172a] hover:text-[#0f766e]" : (isDarkBg ? 'text-[#ffffff] hover:text-[#ccfbf1]' : 'text-[#0f172a] hover:text-[#0f766e]')}`}
                  >
                    Login
                  </Link>
                )}

                <Link 
                  to="/appointment"
                  onClick={() => handleNavigation("/appointment")}
                  className="flex items-center gap-2 px-5 py-2 bg-[#134e4a] text-[#ffffff] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-[#134e4a]/20 hover:shadow-[#134e4a]/40 hover:scale-105 transition-all"
                >
                  <Calendar size={12} />
                  <span>Book Visit</span>
                </Link>
              </div>

              {/* Mobile Profile Icon */}
              <Link 
                to={currentUser ? "/my-profile" : "/login"}
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full bg-[#134e4a] text-[#ffffff] shadow-md active:scale-95 transition-transform"
              >
                {currentUser?.displayName ? (
                  <span className="font-bold text-xs">{currentUser.displayName[0].toUpperCase()}</span>
                ) : (
                  <User size={16} />
                )}
              </Link>

            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <MobileDrawer 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        currentUser={currentUser}
        logout={logout}
        handleNavigation={handleNavigation}
        location={location}
      />
    </>
  );
};

export default Navbar;
