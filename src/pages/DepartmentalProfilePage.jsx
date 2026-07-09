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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Academic Overview</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Academic Departments & Faculty</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Review our academic strengths, experienced educators, high board examination success rates, and school infrastructures.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <Users className="text-[#FF733B]" size={22} />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Teaching Faculty</h4>
            <span className="block text-2xl font-bold font-serif text-[#2E1E17]">40+ Educators</span>
            <p className="text-[10px] text-gray-500 font-semibold">Trained & certified teachers with years of academic experience.</p>
          </div>

          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <BarChart2 className="text-[#FF733B]" size={22} />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Board Success Rate</h4>
            <span className="block text-2xl font-bold font-serif text-[#2E1E17]">100% Passes</span>
            <p className="text-[10px] text-gray-500 font-semibold">Consistent top grades in Class 10 & Class 12 board exams.</p>
          </div>

          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <Star className="text-[#FF733B]" size={22} />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Parent Satisfaction</h4>
            <span className="block text-2xl font-bold font-serif text-[#2E1E17]">4.9 / 5.0 Rating</span>
            <p className="text-[10px] text-gray-500 font-semibold">Based on annual parent feedback audits and PTM records.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle size={16} className="text-[#FF733B]" /> Academic Infrastructure
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            Each department is supported by dedicated smart classrooms, science labs, art rooms, computer centers, and co-curricular programs, ensuring our curriculum models align with central education board standards.
          </p>
        </div>
      </div>
    </div>
  );
}
