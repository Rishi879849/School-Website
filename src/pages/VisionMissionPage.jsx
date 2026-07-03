import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Eye, ShieldAlert } from 'lucide-react';

export default function VisionMissionPage() {
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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Aspirations</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Vision & Mission</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Discover our long-term objectives and academic core mandates guiding the student growth index.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="border border-[#2E1E17]/10 p-6 rounded-[2rem] space-y-4">
            <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
              <Eye size={18} className="text-[#FF733B]" /> Institutional Vision
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-semibold">
              To be a global centre of learning and research in engineering and technology, nurturing creative minds capable of leading technological advancements and addressing global challenges with ethical values.
            </p>
          </div>

          <div className="border border-[#2E1E17]/10 p-6 rounded-[2rem] space-y-4">
            <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
              <Target size={18} className="text-[#FF733B]" /> Institutional Mission
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-semibold">
              To provide state-of-the-art infrastructure and learning systems, promote research-driven inquiry in collaborative environments, and foster industrial linkages to ensure students graduate with high placement viability.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert size={16} className="text-[#FF733B]" /> Core Values
          </h3>
          <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 font-semibold">
            <li><strong>Innovation:</strong> Supporting computational sandboxes and design twins.</li>
            <li><strong>Integrity:</strong> Upholding strict grading, academic honesty, and code of conduct.</li>
            <li><strong>Inclusivity:</strong> Ensuring multi-tenant educational support across regions.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
