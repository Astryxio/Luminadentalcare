import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { useAuth } from '../../context/AuthContext';
import services from '../services/services.data';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ChevronDown, 
  User, 
  Mail, 
  Phone, 
  FileText,
  Stethoscope,
  Loader2
} from 'lucide-react';

// --- SUBCOMPONENTS ---

const SuccessView = memo(({ onReset, onViewProfile }) => (
  <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
    <div className="bg-[#ffffff] rounded-[2.5rem] p-10 max-w-lg w-full text-center shadow-2xl border border-[#e2e8f0] animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-[#ecfdf5] rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-[#10b981]" />
      </div>
      <h2 className="text-3xl font-medium font-serif text-[#0f172a] mb-4">Booking Confirmed</h2>
      <p className="text-[#64748b] mb-8 font-light">
        Your appointment request has been securely transmitted. Our clinical coordinator will review and confirm your slot shortly.
      </p>
      <div className="flex flex-col gap-3">
        <button 
          onClick={onViewProfile}
          className="w-full py-4 bg-[#0f172a] text-[#ffffff] rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#0f766e] transition-all shadow-lg"
        >
          View My Appointments
        </button>
        <button 
          onClick={onReset}
          className="w-full py-4 bg-[#ffffff] text-[#64748b] border border-[#e2e8f0] rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#f8fafc] transition-all"
        >
          Book Another
        </button>
      </div>
    </div>
  </div>
));

const AppointmentHeader = memo(() => (
  <div className="text-center mb-12 animate-slide-up">
    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#f0fdfa] border border-[#ccfbf1]">
      <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse"></span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f766e]">Live Scheduling</span>
    </div>
    <h1 className="text-4xl md:text-5xl font-medium font-serif text-[#0f172a] mb-4">
      Secure Your <span className="italic text-[#0f766e]">Visit</span>
    </h1>
    <p className="text-[#64748b] font-light max-w-xl mx-auto">
      Select your preferred clinical procedure and time slot. Our digital system ensures zero-wait scheduling.
    </p>
  </div>
));

const AppointmentForm = memo(({ formData, handleChange, handleSubmit, loading, error }) => {
  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-[#ffffff] rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#e2e8f0] relative overflow-hidden animate-fade-in-up delay-200">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0f766e] via-[#2dd4bf] to-[#0f766e]"></div>

      {error && (
        <div className="mb-8 p-4 bg-[#fef2f2] border border-[#fecaca] rounded-xl flex items-center gap-3 text-[#b91c1c] text-sm font-bold animate-shake">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">Patient Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#0f766e] transition-colors" size={16} />
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                disabled={loading}
                placeholder="Full Name"
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl pl-12 pr-4 py-3.5 text-[#0f172a] text-sm focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">Contact Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#0f766e] transition-colors" size={16} />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                disabled={loading}
                placeholder="email@address.com"
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl pl-12 pr-4 py-3.5 text-[#0f172a] text-sm focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">Phone Number</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#0f766e] transition-colors" size={16} />
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                disabled={loading}
                placeholder="+1 000 000 0000"
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl pl-12 pr-4 py-3.5 text-[#0f172a] text-sm focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
              />
            </div>
          </div>
        </div>

        <div className="h-px bg-[#f1f5f9]"></div>

        {/* Section 2: Clinical Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">Select Procedure</label>
            <div className="relative group">
              <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#0f766e] transition-colors" size={16} />
              <select 
                name="serviceId" 
                value={formData.serviceId} 
                onChange={handleChange} 
                required
                disabled={loading}
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl pl-12 pr-10 py-3.5 text-[#0f172a] text-sm appearance-none focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select a Clinical Service...</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>{service.title}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" size={16} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">Preferred Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#0f766e] transition-colors" size={16} />
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required 
                  min={today}
                  disabled={loading}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl pl-12 pr-4 py-3.5 text-[#0f172a] text-sm focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">Preferred Time</label>
              <div className="relative group">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#0f766e] transition-colors" size={16} />
                <input 
                  type="time" 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl pl-12 pr-4 py-3.5 text-[#0f172a] text-sm focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">Additional Notes</label>
            <div className="relative group">
              <FileText className="absolute left-4 top-4 text-[#94a3b8] group-focus-within:text-[#0f766e] transition-colors" size={16} />
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                rows="3" 
                disabled={loading}
                placeholder="Any specific concerns or medical history..."
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl pl-12 pr-4 py-3.5 text-[#0f172a] text-sm focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              ></textarea>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#0f172a] text-[#ffffff] font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#0f766e] transition-all duration-300 shadow-lg shadow-[#0f172a]/10 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-xs group"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Processing...
            </>
          ) : (
            <>
              Confirm Appointment <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </>
          )}
        </button>

      </form>
    </div>
  );
});

// --- MAIN COMPONENT ---

const Appointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Pre-select service if passed via navigation state
  const preSelectedServiceId = location.state?.serviceId || "";

  const [formData, setFormData] = useState({
    name: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phone: "",
    date: "",
    time: "",
    serviceId: preSelectedServiceId,
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Update form if user logs in after page load
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.displayName || prev.name,
        email: currentUser.email || prev.email
      }));
    }
  }, [currentUser]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!currentUser) {
      setError("Please login to book an appointment.");
      setLoading(false);
      return;
    }

    // Basic Validation
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError("Please select a valid future date.");
      setLoading(false);
      return;
    }

    try {
      if (!db) throw new Error("Database connection failed");

      // Find service name for the record
      const selectedService = Array.isArray(services) ? services.find(s => s.id === Number(formData.serviceId)) : null;
      const serviceName = selectedService ? selectedService.title : "General Consultation";

      await addDoc(collection(db, "appointments"), {
        userId: currentUser.uid,
        ...formData,
        serviceName,
        status: "Pending",
        createdAt: new Date().toISOString()
      });

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Booking Error:", err);
      setError(`Failed to book appointment. ${err.message || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    setSuccess(false);
    setFormData(prev => ({ ...prev, serviceId: "", date: "", time: "", notes: "" }));
  }, []);

  const handleViewProfile = useCallback(() => {
    navigate('/my-profile');
  }, [navigate]);

  if (success) {
    return <SuccessView onReset={handleReset} onViewProfile={handleViewProfile} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-[#134e4a] selection:text-[#ffffff]">
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]" 
           style={{ backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-16">
        <AppointmentHeader />
        <AppointmentForm 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        .delay-200 { animation-delay: 200ms; }
      `}</style>
    </div>
  );
};

export default Appointment;
