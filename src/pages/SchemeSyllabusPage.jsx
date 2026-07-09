import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, ArrowLeft, Terminal, PieChart, PenTool, ShieldAlert } from 'lucide-react';

export default function SchemeSyllabusPage() {
  const [activeTab, setActiveTab] = useState('science');

  const syllabusData = {
    science: {
      title: 'Department of Science & Computer Science',
      icon: <Terminal size={18} className="text-[#FF733B]" />,
      courses: [
        { code: 'SCI-01', name: 'General Science & Life Systems', semester: 'Term I', credits: '5 Periods/Wk', file: 'General_Science_Syllabus.pdf' },
        { code: 'SCI-02', name: 'Basic Computer Programming & Logic', semester: 'Term I', credits: '4 Periods/Wk', file: 'Computer_Logic_Syllabus.pdf' },
        { code: 'SCI-03', name: 'Physics: Force, Work & Energy', semester: 'Term II', credits: '5 Periods/Wk', file: 'Physics_Force_Energy.pdf' },
        { code: 'SCI-04', name: 'Introduction to Chemistry & Lab Practices', semester: 'Term II', credits: '4 Periods/Wk', file: 'Chemistry_Intro_Syllabus.pdf' }
      ]
    },
    mathematics: {
      title: 'Department of Mathematics & Statistics',
      icon: <PieChart size={18} className="text-[#FF733B]" />,
      courses: [
        { code: 'MAT-01', name: 'Algebra, Geometry & Trigonometry', semester: 'Term I', credits: '6 Periods/Wk', file: 'Algebra_Geometry_Syllabus.pdf' },
        { code: 'MAT-02', name: 'Commercial Mathematics & Bookkeeping', semester: 'Term II', credits: '5 Periods/Wk', file: 'Commercial_Maths_Syllabus.pdf' },
        { code: 'MAT-03', name: 'Statistics & Probability Foundations', semester: 'Term II', credits: '4 Periods/Wk', file: 'Statistics_Foundations.pdf' }
      ]
    },
    languages: {
      title: 'Department of Languages & Literature',
      icon: <PenTool size={18} className="text-[#FF733B]" />,
      courses: [
        { code: 'ENG-01', name: 'English Grammar & Writing Composition', semester: 'Term I', credits: '5 Periods/Wk', file: 'English_Writing_Syllabus.pdf' },
        { code: 'ENG-02', name: 'English Literature: Classics & Poetry', semester: 'Term II', credits: '4 Periods/Wk', file: 'English_Literature_Syllabus.pdf' },
        { code: 'HIN-01', name: 'Hindi Literature & Creative Writing', semester: 'Term I', credits: '4 Periods/Wk', file: 'Hindi_Literature_Syllabus.pdf' }
      ]
    },
    social: {
      title: 'Department of Social Sciences & Civics',
      icon: <ShieldAlert size={18} className="text-[#FF733B]" />,
      courses: [
        { code: 'SOC-01', name: 'History: Ancient & Modern Civilizations', semester: 'Term I', credits: '4 Periods/Wk', file: 'History_Civilizations_Syllabus.pdf' },
        { code: 'SOC-02', name: 'Geography: Map Study & Climatic Regions', semester: 'Term II', credits: '4 Periods/Wk', file: 'Geography_Map_Study.pdf' },
        { code: 'SOC-03', name: 'Civics: Indian Constitution & Local Governance', semester: 'Term II', credits: '3 Periods/Wk', file: 'Civics_Constitution_Syllabus.pdf' }
      ]
    }
  };

  const handleDownload = (fileName) => {
    alert(`Compiling Secure Archive: ${fileName} is preparing for system download.`);
  };

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Curriculum Binders</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17]">Course Scheme & Syllabus</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto font-medium">
            Explore credit requirements, departmental divisions, and download official syllabus guides.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-[#2E1E17]/10 text-xs font-bold text-gray-500 bg-white rounded-t-3xl overflow-hidden">
          {Object.keys(syllabusData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-3 border-r border-[#2E1E17]/5 transition-all text-center flex items-center justify-center gap-2 uppercase tracking-wider text-[10px] ${
                activeTab === tab 
                  ? 'bg-white text-[#FF733B] border-b-2 border-b-[#FF733B]' 
                  : 'hover:bg-gray-50/50 bg-[#FAF6F0]/20'
              }`}
            >
              {syllabusData[tab].icon}
              <span className="hidden sm:inline">{tab}</span>
            </button>
          ))}
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-b-[2rem] rounded-tr-none border border-t-0 border-[#2E1E17]/10 p-6 md:p-8 shadow-lg mt-0">
          <div className="space-y-6">
            <div>
              <h3 className="text-base md:text-lg font-bold text-[#2E1E17] font-serif flex items-center gap-2">
                {syllabusData[activeTab].icon} {syllabusData[activeTab].title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">Official learning blueprints approved for the 2026 academic term.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#2E1E17]/10">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-[#2E1E17]/10 font-bold text-gray-500">
                    <th className="p-4 w-24">Subject Code</th>
                    <th className="p-4">Subject Title</th>
                    <th className="p-4 w-28">Term</th>
                    <th className="p-4 w-28">Weekly Periods</th>
                    <th className="p-4 w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2E1E17]/10 font-semibold text-[#2E1E17]/80">
                  {syllabusData[activeTab].courses.map((course, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF6F0]/20 transition duration-150">
                      <td className="p-4 font-extrabold text-[#FF733B] font-mono">{course.code}</td>
                      <td className="p-4 font-bold flex items-center gap-2 text-[#2E1E17]">
                        <FileText size={12} className="text-gray-400" /> {course.name}
                      </td>
                      <td className="p-4 text-gray-500">{course.semester}</td>
                      <td className="p-4 text-gray-500">{course.credits}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDownload(course.file)}
                          className="bg-[#FAF6F0] hover:bg-[#FF733B] hover:text-white border border-[#2E1E17]/10 p-1.5 rounded-lg flex items-center justify-center transition"
                          title="Download Syllabus PDF"
                        >
                          <Download size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
