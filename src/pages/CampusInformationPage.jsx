import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Library, Server, Key } from 'lucide-react';

export default function CampusInformationPage() {
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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Facilities</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Campus Information</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Edukids School boasts a modern campus, complete with smart classrooms, a well-stocked library, and dedicated science and computer laboratories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="border border-[#2E1E17]/10 p-6 rounded-[2rem] space-y-3 hover:border-[#FF733B]/30 transition">
            <Library className="text-[#FF733B]" size={20} />
            <h4 className="text-xs font-extrabold text-[#2E1E17] uppercase tracking-wider">School Library</h4>
            <p className="text-[11px] text-gray-500 font-medium">Over 10,005 books, children's encyclopedias, reference guides, and quiet reading spaces.</p>
          </div>

          <div className="border border-[#2E1E17]/10 p-6 rounded-[2rem] space-y-3 hover:border-[#FF733B]/30 transition">
            <Server className="text-[#FF733B]" size={20} />
            <h4 className="text-xs font-extrabold text-[#2E1E17] uppercase tracking-wider">Science & Computer Labs</h4>
            <p className="text-[11px] text-gray-500 font-medium">Equipped science labs for physics, chemistry, and biology experiments, along with a modern computer center.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <Key size={16} className="text-[#FF733B]" /> Campus Infrastructure Overview
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            Spanning over 5 acres of lush greenery, the campus houses modern smart classrooms, separate wings for primary and secondary students, spacious playgrounds, an assembly hall, and student recreation centers to enable holistic development.
          </p>
        </div>
      </div>
    </div>
  );
}
