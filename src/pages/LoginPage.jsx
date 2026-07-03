import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function LoginPage({ onLogin, activeRole, onRoleChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Auto-fill values if redirected from Registration Page
  useEffect(() => {
    if (location.state) {
      if (location.state.email) setEmail(location.state.email);
      if (location.state.password) setPassword(location.state.password);
      if (location.state.role) onRoleChange(location.state.role);
    }
  }, [location.state, onRoleChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill out all credentials.');
      return;
    }

    const success = onLogin(email, password);
    if (success) {
      // If login is successful, state in App.jsx updates, showing the Dashboard.
      // We navigate to / to ensure rendering states align.
      navigate('/');
    } else {
      alert('Authentication failed. Invalid email or password.');
    }
  };

  const simulationPresets = [
    { role: 'super_admin', email: 'superadmin@school.edu', pass: '123456', label: 'Super Admin' },
    { role: 'school_admin', email: 'schooladmin@school.edu', pass: '123456', label: 'School Admin' },
    { role: 'principal', email: 'principal@school.edu', pass: '123456', label: 'Principal' },
    { role: 'teacher', email: 'teacher@school.edu', pass: '123456', label: 'Teacher' }
  ];

  return (
    <div className="flex-1 max-w-md w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-[#2E1E17]/10 p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] w-[150px] h-[150px] bg-[#FF733B]/5 rounded-full blur-[40px] pointer-events-none" />

        <h3 className="text-xl md:text-2xl font-bold text-[#2E1E17] text-center font-serif flex items-center justify-center gap-2">
          <LogIn className="text-[#FF733B]" size={22} /> ERP Credentials Gate
        </h3>
        <p className="text-xs text-[#2E1E17]/60 text-center mb-6 mt-1 font-medium">Select your portal role directory and enter system tokens</p>

        {/* One-Click Presets */}
        <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#2E1E17]/10 mb-4 text-left shadow-sm">
          <span className="text-[10px] font-extrabold text-[#FF733B] uppercase tracking-wider block mb-2 flex items-center gap-1">
            <ShieldCheck size={12} /> One-Click Simulation Helper:
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {simulationPresets.map(preset => (
              <button
                key={preset.role}
                type="button"
                onClick={() => {
                  onRoleChange(preset.role);
                  setEmail(preset.email);
                  setPassword(preset.pass);
                }}
                className="px-2 py-1.5 bg-white border border-[#2E1E17]/10 rounded-lg hover:bg-gray-50 text-[9px] font-extrabold text-[#2E1E17] transition text-center truncate"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1.5">1. Active Workspace Role</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'super_admin', label: 'Super Admin' },
                { id: 'school_admin', label: 'School Admin' },
                { id: 'principal', label: 'Principal' },
                { id: 'teacher', label: 'Teacher' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onRoleChange(item.id)}
                  className={`text-[9px] font-extrabold p-2 rounded-xl border text-center transition-all ${
                    activeRole === item.id 
                      ? 'bg-[#FF733B] border-none text-white shadow-md' 
                      : 'bg-white border-[#2E1E17]/10 text-[#2E1E17] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1">Email / Simulation Token</label>
            <input 
              type="text" 
              placeholder="e.g. teacher@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest">Secret Access Key</label>
              <Link to="/forgot-password" className="text-[10px] text-[#FF733B] font-bold hover:underline">Forgot Key?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-4 bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-3 rounded-xl text-xs md:text-sm uppercase tracking-widest transition duration-300 shadow-lg shadow-orange-500/20"
          >
            Authenticate Session
          </button>
          
          <p className="text-[10px] text-center text-gray-400 mt-2 font-bold uppercase tracking-wider">
            Need a secure login token?{' '}
            <Link to="/registration" className="text-[#FF733B] hover:underline flex items-center justify-center gap-1 mt-1">
              Create Account Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
