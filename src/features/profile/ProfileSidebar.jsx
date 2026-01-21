import React from 'react';
import { User, Shield, LogOut, CalendarCheck } from 'lucide-react';
import { auth } from '../../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';

const ProfileSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const NavItem = ({ id, icon: Icon, label }) => {
    const isActive = activeTab === id;

    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`
          /* 1. Layout & Shape */
          group flex items-center gap-2 transition-all duration-200 rounded-xl relative overflow-hidden
          
          /* Mobile: Compact Centered Grid */
          justify-center py-3 px-2 w-full text-xs font-bold border border-slate-100 shadow-sm
          
          /* Desktop: Left Aligned List */
          lg:justify-start lg:w-full lg:px-5 lg:py-4 lg:text-sm lg:shadow-none lg:border-none lg:mb-1

          /* 2. COLORS & VISIBILITY (Crucial Fix) */
          ${isActive 
            ? 'bg-teal-700 text-white shadow-teal-700/20 ring-1 ring-teal-700 lg:ring-0' // ACTIVE STATE: Solid Teal, White Text
            : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 lg:bg-transparent' // INACTIVE STATE: White/Transparent, Grey Text
          }
        `}
      >
        {/* Icon Coloring */}
        <Icon 
          size={16} 
          className={`flex-shrink-0 ${isActive ? 'text-teal-100' : 'text-slate-400 group-hover:text-teal-600'}`} 
        />
        
        <span className="truncate">{label}</span>
        
        {/* Active Indicator Strip (Desktop Only) */}
        {isActive && (
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-400 rounded-l-full" />
        )}
      </button>
    );
  };

  return (
    <div className="bg-transparent lg:bg-white lg:rounded-2xl lg:shadow-lg lg:border border-slate-100 overflow-visible flex flex-col w-full">
      
      {/* Menu Header (Desktop Only) */}
      <div className="hidden lg:block p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Menu
        </h3>
      </div>

      {/* --- STICKY NAV CONTAINER (Mobile Only) --- */}
      <div className="sticky top-20 z-30 lg:static">
        
        {/* The Navigation Grid */}
        <nav className="
          /* MOBILE: 2x2 Grid + Solid Background to hide scroll overlap */
          grid grid-cols-2 gap-2 w-full bg-slate-50/95 backdrop-blur-sm p-1 rounded-xl lg:bg-transparent lg:p-0
          
          /* DESKTOP: Vertical List */
          lg:flex lg:flex-col lg:p-4 lg:mb-0 lg:gap-1
        ">
          <NavItem id="appointments" icon={CalendarCheck} label="Appointments" />
          <NavItem id="general" icon={User} label="Personal Info" />
          <NavItem id="security" icon={Shield} label="Security" />
          
          {/* Mobile Logout Button */}
          <button 
            onClick={handleLogout}
            className="lg:hidden flex items-center justify-center gap-2 py-3 px-2 text-xs font-bold text-red-600 bg-white border border-red-100 shadow-sm rounded-xl whitespace-nowrap hover:bg-red-50"
          >
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </div>

      {/* Desktop Logout (Fixed at Bottom) */}
      <div className="hidden lg:block p-4 border-t border-slate-100 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;