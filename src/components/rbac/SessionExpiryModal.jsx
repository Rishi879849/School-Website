import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, LogOut } from 'lucide-react';
import api from '../../services/api';

export default function SessionExpiryModal({ expiryTimestamp, onSessionExtended, onLogout }) {
  const [secondsRemaining, setSecondsRemaining] = useState(120); // Default to 2 minutes warning
  const [extending, setExtending] = useState(false);

  useEffect(() => {
    if (!expiryTimestamp) return;

    const interval = setInterval(() => {
      const remaining = Math.round((new Date(expiryTimestamp) - new Date()) / 1000);
      
      if (remaining <= 0) {
        clearInterval(interval);
        onLogout(); // Automatically log out if expired
      } else {
        setSecondsRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTimestamp, onLogout]);

  const handleExtend = async () => {
    setExtending(true);
    try {
      // API call to silent token extend endpoint
      const response = await api.post('/auth/extend');
      if (response.data?.success) {
        onSessionExtended(response.data.newExpiry);
      }
    } catch (error) {
      console.error('Failed to extend session token context.', error);
    } finally {
      setExtending(false);
    }
  };

  // Show only if there's less than 2 minutes (120 seconds) remaining
  if (secondsRemaining > 120 || secondsRemaining <= 0) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-[#2E1E17]/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-[#2E1E17]/10 p-6 md:p-8 shadow-2xl space-y-6 text-left relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] w-[150px] h-[150px] bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center shadow-sm shrink-0">
            <Clock size={24} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-serif text-[#2E1E17]">ERP Session Expiring</h3>
            <span className="text-[10px] text-amber-600 font-extrabold uppercase tracking-wider">
              Security Timeout Looming
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-500 font-semibold leading-relaxed">
          Your active security session token will expire in <span className="text-amber-600 font-extrabold">{secondsRemaining} seconds</span> due to portal inactivity. Extend now to prevent loss of page progress.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onLogout}
            className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-[#2E1E17]/10 rounded-xl text-xs font-bold text-gray-700 transition flex items-center justify-center gap-1.5"
          >
            <LogOut size={14} /> Log Out
          </button>
          
          <button
            onClick={handleExtend}
            disabled={extending}
            className="px-4 py-2.5 bg-[#FF733B] hover:bg-[#E6622E] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-orange-500/20 flex items-center justify-center gap-1.5"
          >
            <RefreshCw size={14} className={extending ? 'animate-spin' : ''} />
            {extending ? 'Extending...' : 'Extend Session'}
          </button>
        </div>
      </div>
    </div>
  );
}
