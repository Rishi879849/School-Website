import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Award } from 'lucide-react';

export default function OrdinancePage() {
  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-[#2E1E17]/10 p-8 md:p-10 shadow-xl space-y-8 relative overflow-hidden">
        <div className="absolute right-[-5%] top-[-5%] w-[200px] h-[200px] bg-[#FF733B]/5 rounded-full blur-[40px] pointer-events-none" />

        <div className="space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Rules & Regulations</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Academic Ordinances</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Review the official school regulations, promotion criteria, grading policies, and code of conduct approved by the School Board.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <Award size={16} className="text-[#FF733B]" /> Promotion & Attendance Criteria
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            To qualify for promotion to the next class, a student must obtain passing marks in all main subjects (English, Mathematics, Science, and Social Studies) and maintain an overall score above 40%. Mandatory attendance of at least 75% in the academic year is required to appear in the annual school examinations.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert size={16} className="text-[#FF733B]" /> Student Code of Conduct
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            Edukids School enforces high standards of discipline and respect. Any student found engaging in academic dishonesty (cheating during exams or copying assignments) or violating school rules will be referred to the disciplinary committee and the Principal.
          </p>
        </div>
      </div>
    </div>
  );
}
