import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Globe, Award } from 'lucide-react';

export default function SwayamNptelPage() {
  const handleRegister = () => {
    alert('Redirecting to the central e-learning resource portal.');
  };

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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">E-Learning Portal</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">E-Learning & Digital Resources</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            DTV School Support integrates with digital portals like Diksha and NCERT e-Pathshala, enabling students to access supplementary study guides and video lessons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="border border-[#2E1E17]/10 p-6 rounded-[2rem] space-y-3">
            <Globe className="text-[#FF733B]" size={20} />
            <h4 className="text-xs font-extrabold text-[#2E1E17] uppercase tracking-wider">Video Lessons</h4>
            <p className="text-[11px] text-gray-500 font-medium">Students can clarify their concepts by watching certified animation and video lessons created by educators.</p>
          </div>

          <div className="border border-[#2E1E17]/10 p-6 rounded-[2rem] space-y-3">
            <Award className="text-[#FF733B]" size={20} />
            <h4 className="text-xs font-extrabold text-[#2E1E17] uppercase tracking-wider">Interactive Quizzes</h4>
            <p className="text-[11px] text-gray-500 font-medium">Practice multiple-choice questions, solve sample board exam papers, and evaluate learning progress instantly.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="max-w-xl">
            <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={16} className="text-[#FF733B]" /> Study Guides
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-semibold mt-1">
              Curated e-books and CBSE/NCERT revision notes are available for download. Select your class and access the digital study material portal.
            </p>
          </div>
          
          <button
            onClick={handleRegister}
            className="bg-[#FF733B] hover:bg-[#E6622E] text-white text-xs font-extrabold px-6 py-3 rounded-xl transition shadow-md shadow-orange-500/10 shrink-0"
          >
            Access Portal
          </button>
        </div>
      </div>
    </div>
  );
}
