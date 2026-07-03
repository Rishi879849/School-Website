import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Key, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="flex-1 max-w-md w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Login Gate
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-[#2E1E17]/10 p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] w-[150px] h-[150px] bg-[#FF733B]/5 rounded-full blur-[40px] pointer-events-none" />

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2E1E17] font-serif">Recovery Email Dispatched!</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
              A secure recovery token has been dispatched to <strong>{email}</strong>. Use it within 15 minutes to reset your security access key.
            </p>
            <div className="pt-2">
              <Link to="/login" className="bg-[#FF733B] hover:bg-[#E6622E] text-white text-xs font-extrabold px-6 py-2.5 rounded-full transition shadow-md shadow-orange-500/10">
                Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-[#2E1E17] text-center font-serif flex items-center justify-center gap-2">
              <Key className="text-[#FF733B]" size={20} /> Security Key Recovery
            </h3>
            <p className="text-xs text-[#2E1E17]/60 text-center mb-6 mt-1 font-medium">Enter your registered email address to retrieve your access key</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1.5">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. parent@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                  />
                  <Mail size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-4 bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-3 rounded-xl text-xs md:text-sm uppercase tracking-widest transition duration-300 shadow-lg shadow-orange-500/20"
              >
                Send Recovery Token
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
