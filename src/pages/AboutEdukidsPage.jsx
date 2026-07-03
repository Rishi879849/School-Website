import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Cpu, Globe, Award } from 'lucide-react';

export default function AboutEdukidsPage() {
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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Ecosystem Profile</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">About Edukids</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Edukids is a premium, multi-tenant digital school ecosystem. It seamlessly bridges high-conversion public school portals with secure, feature-rich ERP administrative hubs and advanced AI-driven study companions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <Cpu size={24} className="text-[#FF733B]" />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Multi-Tenant ERP</h4>
            <p className="text-[11px] text-gray-500 font-medium">Integrated dashboard profiles for students, parents, teachers, and school administrators.</p>
          </div>
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <Globe size={24} className="text-[#FF733B]" />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Unified Streams</h4>
            <p className="text-[11px] text-gray-500 font-medium">Structured curriculum planning, weekly timetables, and digital report cards for all academic streams.</p>
          </div>
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <Award size={24} className="text-[#FF733B]" />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">AI Study Mentor</h4>
            <p className="text-[11px] text-gray-500 font-medium">Interactive computational helpers, grading analysis, and course recommendation networks.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <BookOpen size={16} className="text-[#FF733B]" /> Modern Educational Paradigm
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            Edukids is designed to empower modern educational institutions. By combining standard school registries with flexible curriculum matrices, online study catalogs, and regulatory compliance features like anti-ragging grids and secure admission forms, Edukids delivers a unified framework for 21st-century academic excellence.
          </p>
        </div>
      </div>
    </div>
  );
}
