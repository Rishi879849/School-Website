import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, ArrowLeft, Terminal, PieChart, PenTool, ShieldAlert } from 'lucide-react';

export default function SchemeSyllabusPage() {
  const [activeTab, setActiveTab] = useState('science');

  const syllabusData = {
    science: {
      title: 'Department of Science & Artificial Intelligence',
      icon: <Terminal size={18} className="text-[#FF733B]" />,
      courses: [
        { code: 'SCI-101', name: 'Introduction to Neural Architecture & Weights', semester: 'Semester I', credits: '4.0 Credits', file: 'Neural_Architecture_Syllabus.pdf' },
        { code: 'SCI-204', name: 'Biomedical Engineering & Genomics Modeling', semester: 'Semester II', credits: '4.0 Credits', file: 'Biomedical_Genomics_Syllabus.pdf' },
        { code: 'SCI-309', name: 'Advanced Machine Learning & Vector Math', semester: 'Semester III', credits: '3.0 Credits', file: 'Machine_Learning_Syllabus.pdf' },
        { code: 'SCI-412', name: 'WebGL Quantum Design & Space Telemetry', semester: 'Semester IV', credits: '4.5 Credits', file: 'WebGL_Quantum_Telemetry.pdf' }
      ]
    },
    finance: {
      title: 'Department of Computational Finance & Cryptography',
      icon: <PieChart size={18} className="text-[#FF733B]" />,
      courses: [
        { code: 'FIN-102', name: 'Foundations of Algorithmic Trading & Ledger', semester: 'Semester I', credits: '3.0 Credits', file: 'Algo_Trading_Syllabus.pdf' },
        { code: 'FIN-208', name: 'Quantitative Micro-Market Economics', semester: 'Semester II', credits: '4.0 Credits', file: 'Microeconomics_Syllabus.pdf' },
        { code: 'FIN-315', name: 'Predictive Stock Constellation Math', semester: 'Semester III', credits: '4.0 Credits', file: 'Stock_Constellation_Syllabus.pdf' }
      ]
    },
    arts: {
      title: 'Department of Generative Arts & Interactive Media',
      icon: <PenTool size={18} className="text-[#FF733B]" />,
      courses: [
        { code: 'ART-104', name: 'WebGL Binders & Physics Engine Renders', semester: 'Semester I', credits: '3.0 Credits', file: 'WebGL_Binders_Syllabus.pdf' },
        { code: 'ART-211', name: 'Interactive Virtual Reality Design', semester: 'Semester II', credits: '4.0 Credits', file: 'VR_Interactive_Design.pdf' },
        { code: 'ART-320', name: '3D Mesh Generation & Algorithmic Clay', semester: 'Semester III', credits: '4.0 Credits', file: 'Algorithmic_Clay_Syllabus.pdf' }
      ]
    },
    law: {
      title: 'Department of Cyber Law & Digital Ethics',
      icon: <ShieldAlert size={18} className="text-[#FF733B]" />,
      courses: [
        { code: 'LAW-202', name: 'Introduction to Internet Jurisprudence & IP', semester: 'Semester II', credits: '3.0 Credits', file: 'Internet_Jurisprudence_Syllabus.pdf' },
        { code: 'LAW-305', name: 'AI Ethics, Safety Standards & Alignment Codes', semester: 'Semester III', credits: '4.0 Credits', file: 'AI_Alignment_Ethics.pdf' },
        { code: 'LAW-401', name: 'Corporate Multi-Tenant Compliance Regulations', semester: 'Semester IV', credits: '3.0 Credits', file: 'Compliance_Regulation.pdf' }
      ]
    }
  };

  const handleDownload = (fileName) => {
    alert(`Compiling DTV Secure Archive: ${fileName} is preparing for system download.`);
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
                    <th className="p-4 w-24">Course Code</th>
                    <th className="p-4">Course Title</th>
                    <th className="p-4 w-28">Semester</th>
                    <th className="p-4 w-28">Weight</th>
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
