import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, FileText } from 'lucide-react';

export default function PolicyPage() {
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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Rules & Directives</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Admissions Policy</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Review registration guidelines, seat allocations, reservations, and compliance codes for engineering track intakes.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <Award size={16} className="text-[#FF733B]" /> Eligibility Criteria
          </h3>
          <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 font-semibold pl-2">
            <li><strong>Undergraduate (B.Tech):</strong> Candidates must pass 10+2 with Physics, Mathematics, and Chemistry with a minimum average score of 60%.</li>
            <li><strong>Postgraduate (M.Tech):</strong> Candidates must possess a valid B.E./B.Tech degree in a relevant discipline with a qualifying GATE index score.</li>
          </ul>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <FileText size={16} className="text-[#FF733B]" /> Reservation Guidelines
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            In compliance with state government directives, seats are reserved for scheduled castes (SC), scheduled tribes (ST), other backward classes (OBC), and economically weaker sections (EWS). Sports quotas and defense personnel ward waivers are processed under special intake committees.
          </p>
        </div>
      </div>
    </div>
  );
}
