import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Calendar, Award } from 'lucide-react';

export default function NccPage() {
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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Military & Social Training</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">National Cadet Corps (NCC)</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            The NCC wing at UIT RGPV focuses on developing character, discipline, leadership, and a spirit of selfless service among the students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="border border-[#2E1E17]/10 p-6 rounded-[2rem] space-y-3">
            <Award className="text-[#FF733B]" size={20} />
            <h4 className="text-xs font-extrabold text-[#2E1E17] uppercase tracking-wider">Achievements</h4>
            <p className="text-[11px] text-gray-500 font-medium">Cadets regularly participate in the Republic Day Camp (RDC) and Thal Sainik Camp (TSC), bagging institutional awards.</p>
          </div>

          <div className="border border-[#2E1E17]/10 p-6 rounded-[2rem] space-y-3">
            <Calendar className="text-[#FF733B]" size={20} />
            <h4 className="text-xs font-extrabold text-[#2E1E17] uppercase tracking-wider">Training & Activities</h4>
            <p className="text-[11px] text-gray-500 font-medium">Weekly drill sessions, national integration camps, disaster management simulations, and adventure trainings.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert size={16} className="text-[#FF733B]" /> Enrollment Details
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            Enrollments for new cadets open annually during the first term intake. Interested students must pass a basic physical fitness evaluation and interview conducted by the NCC Officer-in-Charge.
          </p>
        </div>
      </div>
    </div>
  );
}
