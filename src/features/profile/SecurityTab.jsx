import React, { useState } from 'react';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import { Lock, KeyRound, ShieldCheck, AlertCircle } from 'lucide-react';

const SecurityTab = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setStatus({ type: '', msg: '' });

    if (formData.newPassword !== formData.confirmPassword) {
      return setStatus({ type: 'error', msg: 'New passwords do not match.' });
    }

    if (formData.newPassword.length < 6) {
      return setStatus({ type: 'error', msg: 'Password must be at least 6 characters.' });
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      
      // 1. Re-authenticate User (CRITICAL STEP for Security)
      const credential = EmailAuthProvider.credential(user.email, formData.currentPassword);
      await reauthenticateWithCredential(user, credential);

      // 2. Update Password
      await updatePassword(user, formData.newPassword);

      setStatus({ type: 'success', msg: 'Password updated successfully! Please login again with new credentials.' });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });

    } catch (err) {
      console.error(err);
      if (err.code === 'auth/wrong-password') {
        setStatus({ type: 'error', msg: 'Incorrect current password.' });
      } else if (err.code === 'auth/too-many-requests') {
        setStatus({ type: 'error', msg: 'Too many attempts. Please try again later.' });
      } else {
        setStatus({ type: 'error', msg: 'Failed to update password. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 max-w-2xl">
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold text-slate-800">Login & Security</h2>
        <p className="text-slate-500 mt-2">Manage your password and account security settings.</p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          
          {/* Current Password */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <KeyRound size={16} className="text-teal-600" /> Current Password
            </label>
            <input 
              type="password" 
              name="currentPassword" 
              value={formData.currentPassword} 
              onChange={handleChange} 
              required
              placeholder="Enter current password" 
              className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
            />
          </div>

          <div className="border-t border-slate-200 my-4"></div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Lock size={16} className="text-teal-600" /> New Password
            </label>
            <input 
              type="password" 
              name="newPassword" 
              value={formData.newPassword} 
              onChange={handleChange} 
              required
              placeholder="Enter new password" 
              className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Lock size={16} className="text-teal-600" /> Confirm New Password
            </label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required
              placeholder="Retype new password" 
              className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
            />
          </div>

          {/* Status Messages */}
          {status.msg && (
            <div className={`p-4 rounded-xl flex items-start gap-3 text-sm ${
              status.type === 'success' 
                ? 'bg-teal-100 text-teal-800 border border-teal-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {status.type === 'success' ? <ShieldCheck size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
              <span className="font-medium mt-0.5">{status.msg}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full md:w-auto bg-slate-900 hover:bg-teal-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 disabled:opacity-70"
            >
              {loading ? 'Verifying & Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecurityTab;