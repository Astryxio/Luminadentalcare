import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db } from '../../firebase/firebase.config';
import { Save, User, Phone, Calendar, MapPin, Hash, CheckCircle2, AlertCircle } from 'lucide-react';

const GeneralTab = ({ userData, currentUser }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });
  
  // Initialize form with data or empty strings to prevent "uncontrolled input" errors
  const [formData, setFormData] = useState({
    displayName: '',
    phone: '',
    age: '',
    dob: '',
    address: '',
  });

  // Sync state when userData arrives
  useEffect(() => {
    if (userData) {
      setFormData({
        displayName: userData.displayName || '',
        phone: userData.phone || '',
        age: userData.age || '',
        dob: userData.dob || '',
        address: userData.address || '',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus({ type: '', msg: '' });

    try {
      // Update Firebase Auth Profile so the name updates globally (Navbar, etc.)
      if (currentUser && formData.displayName) {
        await updateProfile(currentUser, { displayName: formData.displayName });
      }

      // Use setDoc with merge: true. 
      // This fixes the error where data wouldn't save if the profile didn't exist yet.
      const userRef = doc(db, 'users', currentUser.uid);
      
      await setDoc(userRef, {
        ...formData,
        email: currentUser.email, // Ensure email is always synced
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setStatus({ type: 'success', msg: 'Profile updated successfully!' });
      
      // Auto-hide success message
      setTimeout(() => setStatus({ type: '', msg: '' }), 4000);

    } catch (error) {
      console.error("Save error:", error);
      setStatus({ type: 'error', msg: 'Failed to save. check internet connection.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
        <p className="text-slate-500 mt-2">Update your personal details for our dental records.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name & Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <User size={16} className="text-teal-600" /> Full Name
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="e.g. WIlliam jain Sharma"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Phone size={16} className="text-teal-600" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 98765 43210"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all font-medium"
            />
          </div>
        </div>

        {/* Age & DOB Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Hash size={16} className="text-teal-600" /> Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 25"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Calendar size={16} className="text-teal-600" /> Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all font-medium text-slate-600"
            />
          </div>
        </div>

        {/* Address Row */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <MapPin size={16} className="text-teal-600" /> Residential Address
          </label>
          <textarea
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full address..."
            className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all font-medium resize-none"
          ></textarea>
        </div>

        {/* Status Messages */}
        {status.msg && (
          <div className={`p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 shadow-sm ${
            status.type === 'success' 
              ? 'bg-teal-50 text-teal-800 border border-teal-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-semibold">{status.msg}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-slate-900 hover:bg-teal-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-xl shadow-slate-900/10 hover:shadow-teal-700/20 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSaving ? "Saving Changes..." : "Save Changes"}
            {!isSaving && <Save size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralTab;