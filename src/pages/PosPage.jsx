import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Check } from 'lucide-react';

export default function PosPage() {
  const outcomes = [
    { code: 'LO-1: Foundational Knowledge', desc: 'Apply mathematical concepts, scientific facts, and language skills to solve real-world problems.' },
    { code: 'LO-2: Critical Thinking', desc: 'Identify and analyze local and global problems to reach logical solutions using scientific inquiry.' },
    { code: 'LO-3: Creative Expression', desc: 'Develop artistic, physical, and verbal skills through active co-curricular and sports programs.' },
    { code: 'LO-4: Modern Learning Tools', desc: 'Utilize digital libraries, smart classroom tools, and e-learning resources safely and effectively.' },
    { code: 'LO-5: Moral & Ethical Values', desc: 'Understand school values, respect towards peers, social responsibility, and civic awareness.' }
  ];

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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Accreditation Matrix</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Learning Outcomes (LOs)</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Review learning objectives, school targets, and developmental criteria mapped for our students.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <Target size={16} className="text-[#FF733B]" /> Core Outcomes List
          </h3>
          
          <div className="grid grid-cols-1 gap-4 pt-2">
            {outcomes.map((po, idx) => (
              <div key={idx} className="border border-[#2E1E17]/10 p-5 rounded-2xl flex gap-3.5 items-start hover:border-[#FF733B]/30 transition duration-200">
                <div className="w-5 h-5 bg-orange-500/10 text-[#FF733B] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={10} className="stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#2E1E17] uppercase tracking-wide">{po.code}</h4>
                  <p className="text-[11px] text-gray-500 font-semibold mt-1 leading-relaxed">{po.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
