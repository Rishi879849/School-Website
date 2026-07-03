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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Bylaws & Regulations</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Academic Ordinances</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Review the official regulatory structures, credit requirements, grading policies, and behavioral bylaws approved by the Academic Council.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <Award size={16} className="text-[#FF733B]" /> Graduation & Credit Rules
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            To qualify for the B.Tech degree, a student must acquire a minimum of 160 credits across core lectures, laboratory modules, and virtual sandboxes, maintaining a Cumulative Grade Point Average (CGPA) above 5.0. Attendance below 75% in any module automatically flags a student as "At Risk" and disqualifies them from final term audits.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert size={16} className="text-[#FF733B]" /> Academic Integrity & Code Conduct
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            Edukids Academy enforces strict anti-plagiarism ordinances on all digital twins, code submissions, and lab audits. Plagiarism above 15% detected by our audit node results in an automatic zero-grade evaluation and reporting to the Principal’s Honor Court.
          </p>
        </div>
      </div>
    </div>
  );
}
