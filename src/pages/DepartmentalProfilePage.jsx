import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, BarChart2, Star, CheckCircle } from 'lucide-react';

export default function DepartmentalProfilePage() {
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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Stream Telemetry</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Departmental Profile</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Review computational capacities, academic achievements, research publications, and faculty metrics across major streams.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <Users className="text-[#FF733B]" size={22} />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Faculty Strengths</h4>
            <span className="block text-2xl font-bold font-serif text-[#2E1E17]">120+ Professors</span>
            <p className="text-[10px] text-gray-500 font-semibold">Ph.D. holders from top universities globally.</p>
          </div>

          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <BarChart2 className="text-[#FF733B]" size={22} />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Research Publications</h4>
            <span className="block text-2xl font-bold font-serif text-[#2E1E17]">450+ Papers</span>
            <p className="text-[10px] text-gray-500 font-semibold">Published in IEEE, Springer, and Nature journals.</p>
          </div>

          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <Star className="text-[#FF733B]" size={22} />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Average Rating</h4>
            <span className="block text-2xl font-bold font-serif text-[#2E1E17]">4.8 / 5.0 Rating</span>
            <p className="text-[10px] text-gray-500 font-semibold">Based on student evaluations and feedback audits.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle size={16} className="text-[#FF733B]" /> Stream Infrastructure
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            Each stream is supported by dedicated hardware labs, virtual simulators, student innovation centers, and advisory councils, ensuring curriculum models are continuously updated in alignment with industrial requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
