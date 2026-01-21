import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { Calendar, Clock, Stethoscope, MapPin, ChevronRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppointmentsTab = ({ currentUser }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid) return;

    // Query: Find appointments where userId == current user, ordered by date
    const appointmentsRef = collection(db, 'appointments');
    const q = query(
      appointmentsRef, 
      where('userId', '==', currentUser.uid)
      // Note: If you get a "Missing Index" error in console, remove the orderBy for now
      // or click the link in the console to create the index.
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAppointments(fetchedData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // --- Helper to format Status Colors ---
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]';
      case 'completed': return 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]';
      case 'cancelled': return 'bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]';
      default: return 'bg-[#fffbeb] text-[#b45309] border-[#fde68a]'; // Pending
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#94a3b8]">
        <div className="w-8 h-8 border-4 border-[#14b8a6] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xs font-bold uppercase tracking-widest">Syncing Appointments...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-[#e2e8f0] pb-6">
        <div>
          <h2 className="text-2xl font-medium font-serif text-[#0f172a]">My Appointments</h2>
          <p className="text-[#64748b] mt-1 text-sm font-light">View and manage your upcoming visits.</p>
        </div>
        <Link to="/contact" className="hidden sm:flex items-center gap-2 text-[#0f766e] font-bold text-xs uppercase tracking-wider hover:text-[#134e4a] transition-colors">
          Need Help? <ChevronRight size={16} />
        </Link>
      </div>

      {/* --- EMPTY STATE --- */}
      {appointments.length === 0 ? (
        <div className="text-center py-16 bg-[#f8fafc] rounded-[2rem] border border-dashed border-[#cbd5e1]">
          <div className="w-16 h-16 bg-[#ffffff] rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 border border-[#e2e8f0]">
            <Calendar size={28} className="text-[#0d9488]" />
          </div>
          <h3 className="text-lg font-medium text-[#0f172a] mb-2 font-serif">No Appointments Yet</h3>
          <p className="text-[#64748b] max-w-xs mx-auto mb-6 text-sm font-light">
            You haven't booked any dental checkups yet. Schedule your first visit today!
          </p>
          <Link 
            to="/appointment" 
            className="inline-flex items-center justify-center px-6 py-3 bg-[#0f766e] text-[#ffffff] font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-[#0f766e]/20 hover:bg-[#134e4a] transition-all hover:-translate-y-1"
          >
            Book Appointment
          </Link>
        </div>
      ) : (
        /* --- APPOINTMENT LIST --- */
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div 
              key={apt.id} 
              className="group bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#e2e8f0] shadow-sm hover:shadow-xl hover:shadow-[#0f766e]/5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Left Color Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#14b8a6] group-hover:bg-[#0f766e] transition-colors"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 pl-2">
                
                {/* Date & Time Block */}
                <div className="flex items-start gap-4 min-w-[140px]">
                  <div className="bg-[#f0fdfa] rounded-xl p-3 text-center min-w-[70px] border border-[#ccfbf1]">
                    <span className="block text-[10px] font-bold text-[#0f766e] uppercase tracking-wider">
                      {apt.date ? new Date(apt.date).toLocaleString('default', { month: 'short' }) : 'DATE'}
                    </span>
                    <span className="block text-xl font-black text-[#0f172a]">
                      {apt.date ? new Date(apt.date).getDate() : '--'}
                    </span>
                  </div>
                  <div className="py-1">
                    <div className="flex items-center gap-1.5 text-[#0f172a] font-bold mb-1 text-sm">
                      <Clock size={14} className="text-[#0d9488]" />
                      {apt.time || 'Time TBD'}
                    </div>
                    <div className="text-xs text-[#64748b] font-medium">
                      {apt.date ? new Date(apt.date).toLocaleString('default', { weekday: 'long' }) : ''}
                    </div>
                  </div>
                </div>

                {/* Details Block */}
                <div className="flex-1">
                  <h4 className="font-medium font-serif text-[#0f172a] text-lg mb-1 flex items-center gap-2">
                    {apt.serviceName || "General Consultation"}
                  </h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#64748b]">
                    <span className="flex items-center gap-1">
                      <Stethoscope size={14} /> Dr. Isabella Rossi, DMD
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> Clinic Branch
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#f1f5f9]">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(apt.status)}`}>
                    {apt.status || 'Pending'}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsTab;