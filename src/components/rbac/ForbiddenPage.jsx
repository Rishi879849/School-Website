import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center px-6 py-12 text-left">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-[#2E1E17]/10 p-8 shadow-xl text-center space-y-6 relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] w-[150px] h-[150px] bg-red-500/5 rounded-full blur-[40px] pointer-events-none" />

        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert size={32} />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-serif text-[#2E1E17]">403: Access Restrained</h2>
          <p className="text-xs text-gray-500 font-semibold leading-relaxed">
            Your current credential session role does not have authorization clearance to view this directory node.
          </p>
        </div>

        <div className="pt-4 border-t border-[#2E1E17]/5 flex flex-col gap-2">
          <Link 
            to="/" 
            className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest transition duration-300 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} /> Go Back to Dashboard
          </Link>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mt-1">
            Secure Portal Audits Active
          </span>
        </div>
      </div>
    </div>
  );
}
