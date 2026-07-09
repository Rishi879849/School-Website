import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, LogIn } from 'lucide-react';

export default function InstitutionLoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill out all credentials.');
      return;
    }
    setIsSubmitting(true);
    try {
      if (onLogin) {
        await onLogin(email, password);
      } else {
        alert('Authentication system offline.');
      }
    } catch (err) {
      alert(err.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <ShieldAlert className="text-[#FF733B]" size={22} /> Staff Portal Login
        </h3>
        <p className="text-xs text-[#2E1E17]/60 text-center mb-6 mt-1 font-medium">Access node for department heads, principal, and staff</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1.5">Staff Email Address</label>
            <input 
              type="text" 
              required
              placeholder="e.g. head@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1.5">Secret Access Key</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 bg-[#FF733B] hover:bg-[#E6622E] disabled:opacity-60 text-white font-extrabold py-3 rounded-xl text-xs md:text-sm uppercase tracking-widest transition duration-300 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-1.5"
          >
            <LogIn size={12} /> {isSubmitting ? 'Logging in…' : 'Login to Staff Portal'}
          </button>
          
          <div className="pt-2 text-center">
            <span className="text-[10px] text-gray-400 font-bold block">Predefined Staff Credentials:</span>
            <code className="text-[10px] text-[#FF733B] font-extrabold mt-0.5 block font-mono">head@school.edu / 123456</code>
          </div>
        </form>
      </div>
    </div>
  );
}
