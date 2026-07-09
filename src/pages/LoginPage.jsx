import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, ArrowLeft } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeRole, setActiveRole] = useState('teacher');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.email) setEmail(location.state.email);
    if (location.state?.password) setPassword(location.state.password);
    if (location.state?.role) setActiveRole(location.state.role);
  }, [location.state]);



  const attemptLogin = async (loginEmail, loginPassword, roleHint) => {
    if (!loginEmail || !loginPassword) {
      alert('Please fill out all credentials.');
      return;
    }

    if (roleHint) setActiveRole(roleHint);
    setIsSubmitting(true);
    try {
      await onLogin(loginEmail, loginPassword);
    } catch (err) {
      alert(err?.message || 'Authentication failed. Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    attemptLogin(email, password);
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
          <LogIn className="text-[#FF733B]" size={22} /> School Portal Login
        </h3>
        <p className="text-xs text-[#2E1E17]/60 text-center mb-6 mt-1 font-medium">Select your role and enter your login credentials</p>



        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1.5">1. Select Your Role</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'super_admin', label: 'Super Admin' },
                { id: 'school_admin', label: 'School Admin' },
                { id: 'principal', label: 'Principal' },
                { id: 'teacher', label: 'Teacher' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveRole(item.id)}
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
            <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1">Email Address</label>
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
              <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest">Password</label>
              <Link to="/forgot-password" className="text-[10px] text-[#FF733B] font-bold hover:underline">Forgot Password?</Link>
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
            disabled={isSubmitting}
            className="w-full mt-4 bg-[#FF733B] hover:bg-[#E6622E] disabled:opacity-60 text-white font-extrabold py-3 rounded-xl text-xs md:text-sm uppercase tracking-widest transition duration-300 shadow-lg shadow-orange-500/20"
          >
            {isSubmitting ? 'Logging in…' : 'Login to Portal'}
          </button>
        </form>
      </div>
    </div>
  );
}
