import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, ArrowRight, FileText, Download, Eye
} from 'lucide-react';

export default function MarketingSite() {
  const [activeReportTab, setActiveReportTab] = useState('curriculum');
  const [galleryFilter, setGalleryFilter] = useState('all');

  // Photo Gallery Data
  const galleryItems = [
    { id: 1, type: 'sandbox', title: 'VR Simulation Lab', url: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&auto=format&fit=crop&q=60' },
    { id: 2, type: 'campus', title: 'Central Glass Library', url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500&auto=format&fit=crop&q=60' },
    { id: 3, type: 'sandbox', title: 'Robotics Workshop', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60' },
    { id: 4, type: 'classroom', title: 'Computational Physics Hall', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=60' },
    { id: 5, type: 'classroom', title: 'Design Twin Studio', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60' },
    { id: 6, type: 'campus', title: 'Student Innovation Garden', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=60' }
  ];

  const filteredGallery = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.type === galleryFilter);

  // Simulated PDF Downloader
  const triggerPdfDownload = (fileName) => {
    alert(`Compiling DTV Secure Archive: ${fileName}.pdf is preparing for system download.`);
  };

  return (
    <div className="relative bg-[#FAF6F0] text-[#2E1E17] flex flex-col font-sans selection:bg-[#FF733B] selection:text-white">
      <main className="flex-1 flex flex-col">
        {/* Centered Hero Section */}
        <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-12 text-center space-y-6">
          <div className="absolute left-10 md:left-24 top-4 hidden md:block animate-float opacity-90">
            <svg width="48" height="60" viewBox="0 0 100 130" fill="none">
              <path d="M50 10 C25 10 10 30 10 55 C10 80 30 95 50 95 C70 95 90 80 90 55 C90 30 75 10 50 10 Z" fill="#EF4444" />
              <path d="M10 55 Q 50 35 90 55" stroke="white" strokeWidth="2" fill="none" />
              <path d="M50 95 L50 115" stroke="#78350F" strokeWidth="3" />
              <rect x="44" y="112" width="12" height="10" rx="2" fill="#D97706" />
            </svg>
          </div>
          
          <div className="absolute right-10 md:right-24 top-8 hidden md:block animate-float opacity-90" style={{ animationDelay: '2.5s' }}>
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="45" fill="#84CC16" />
              <path d="M20 30 Q 50 60 80 30" stroke="white" strokeWidth="4" fill="none" />
              <path d="M20 70 Q 50 40 80 70" stroke="white" strokeWidth="4" fill="none" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#2E1E17] tracking-tight max-w-3xl mx-auto leading-tight font-serif">
            Putting your child's <span className="italic text-[#2E1E17]">Future</span> <br />
            in great motion
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#2E1E17] font-bold pt-2">
            <span className="flex items-center gap-1.5 bg-white border border-[#2E1E17]/10 py-1.5 px-4 rounded-full shadow-sm">
              <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check size={10} /></span> Accredited Curriculum
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-[#2E1E17]/10 py-1.5 px-4 rounded-full shadow-sm">
              <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check size={10} /></span> Admissions Open 2026-27
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-[#2E1E17]/10 py-1.5 px-4 rounded-full shadow-sm">
              <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check size={10} /></span> Experienced Educators
            </span>
          </div>

          {/* Prominent Admission CTA and routing link buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <Link 
              to="/admission-form"
              className="bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold text-xs md:text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5"
            >
              Admission Form <ArrowRight size={14} />
            </Link>
            <Link 
              to="/registration"
              className="bg-white border border-[#2E1E17]/20 hover:border-black text-[#2E1E17] font-extrabold text-xs md:text-sm px-7 py-3.5 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Create Account
            </Link>
            <Link 
              to="/login"
              className="bg-[#2F221E] hover:bg-black text-white font-extrabold text-xs md:text-sm px-7 py-3.5 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Access Portal
            </Link>
          </div>

          <p className="text-xs md:text-sm text-[#2E1E17]/70 max-w-sm mx-auto pt-2 leading-relaxed font-bold">
            We just don't give our students only lecture but real life experiences.
          </p>

          {/* Three Columns Visual Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-10 max-w-5xl mx-auto">
            <div className="lg:col-span-4 flex justify-center relative">
              <div className="absolute -left-6 bottom-16 z-10 animate-bounce">
                <svg width="60" height="60" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="#38BDF8" />
                  <circle cx="50" cy="50" r="30" fill="white" />
                  <circle cx="50" cy="50" r="20" fill="#38BDF8" />
                  <line x1="20" y1="80" x2="80" y2="20" stroke="#EF4444" strokeWidth="4" />
                  <polygon points="80,20 70,30 80,30" fill="#EF4444" />
                </svg>
              </div>
              <div className="relative w-64 h-80 flex items-end">
                <div className="absolute inset-x-4 top-10 bottom-0 bg-[#4ADE80] rounded-[100px_100px_20px_20px] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=60" alt="Student" className="w-full h-full object-cover object-top pt-6" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center py-6">
              <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
                <rect x="40" y="90" width="120" height="70" rx="8" stroke="#2E1E17" strokeWidth="4" fill="#FAF6F0" />
                <rect x="50" y="100" width="100" height="50" rx="4" stroke="#2E1E17" strokeWidth="4" fill="white" />
                <line x1="30" y1="160" x2="170" y2="160" stroke="#2E1E17" strokeWidth="5" strokeLinecap="round" />
                <line x1="20" y1="166" x2="180" y2="166" stroke="#2E1E17" strokeWidth="5" strokeLinecap="round" />
                <path d="M70 125 Q 100 105 130 125" stroke="#2E1E17" strokeWidth="4" fill="none" />
                <path d="M70 125 Q 100 145 130 125" stroke="#2E1E17" strokeWidth="4" fill="none" />
                <circle cx="100" cy="125" r="8" fill="#38BDF8" stroke="#2E1E17" strokeWidth="3" />
              </svg>
            </div>

            <div className="lg:col-span-4 flex justify-center relative">
              <div className="absolute -right-6 top-20 z-10 animate-bounce" style={{ animationDelay: '1.2s' }}>
                <svg width="45" height="55" viewBox="0 0 80 100">
                  <rect x="10" y="20" width="60" height="70" rx="20" fill="#EF4444" stroke="#2E1E17" strokeWidth="4" />
                  <rect x="25" y="45" width="30" height="35" rx="5" fill="#EF4444" stroke="#2E1E17" strokeWidth="3" />
                </svg>
              </div>
              <div className="relative w-64 h-80 flex items-end">
                <div className="absolute inset-x-4 top-10 bottom-0 bg-[#FBBF24] rounded-[100px_100px_20px_20px] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=60" alt="Student" className="w-full h-full object-cover object-top pt-6" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Column Stats Panel */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#2F221E] text-white rounded-[2.5rem] p-10 relative overflow-hidden">
            <div className="absolute right-10 top-8 animate-float text-3xl">✈️</div>

            <div className="text-left flex items-start gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              <div className="p-3.5 bg-orange-500/20 text-orange-400 rounded-2xl flex-shrink-0">
                <span className="text-xl">⛺</span>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-serif text-white">50+</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">Schools are supported across 29 states</p>
              </div>
            </div>

            <div className="text-left flex items-start gap-4 border-b md:border-b-0 md:border-r border-white/10 py-6 md:py-0 md:px-8">
              <div className="p-3.5 bg-amber-500/20 text-amber-400 rounded-2xl flex-shrink-0">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-serif text-white">12K+</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">Helping the students of all ages thrive</p>
              </div>
            </div>

            <div className="text-left flex items-start gap-4 pt-6 md:pt-0 md:pl-8">
              <div className="p-3.5 bg-emerald-50/20 text-emerald-400 rounded-2xl flex-shrink-0">
                <span className="text-xl">💼</span>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-serif text-white">70+</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">Available field workspaces and increasing</p>
              </div>
            </div>
          </div>
        </section>

        {/* School Progression Report */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-[#2E1E17]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="text-[11px] font-bold text-[#FF733B] uppercase tracking-widest block">Audit Telemetry</span>
              <h3 className="text-3xl font-normal text-[#2E1E17] font-serif leading-tight">School Progression Report</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                A high-fidelity growth chart mapping academic achievement metrics, digital sandbox active sessions, and student placement growth over the last five fiscal terms.
              </p>
              
              <div className="space-y-3 pt-2 text-xs font-semibold text-[#2E1E17]/85">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF733B]"></span>
                  <span>98.2% Placement in Advanced AI Laboratories</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80]"></span>
                  <span>12 Virtual Sandbox Facilities fully operational</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 border border-[#2E1E17]/10 rounded-3xl shadow-sm">
              <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-6 text-left">Academic & Placement Progression Index (2022-2026)</h4>
              
              <div className="relative h-60 w-full flex items-end justify-between px-4 pb-2 border-b border-[#2E1E17]/10">
                <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" viewBox="0 0 500 200">
                  <path d="M 10,180 L 120,130 L 240,110 L 360,70 L 480,20" fill="none" stroke="#FF733B" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 10,190 L 120,160 L 240,140 L 360,110 L 480,60" fill="none" stroke="#4ADE80" strokeWidth="3" strokeDasharray="6,6" />
                  
                  <circle cx="120" cy="130" r="5" fill="#FF733B" />
                  <circle cx="240" cy="110" r="5" fill="#FF733B" />
                  <circle cx="360" cy="70" r="5" fill="#FF733B" />
                  <circle cx="480" cy="20" r="6" fill="#FF733B" />
                </svg>

                {['2022', '2023', '2024', '2025', '2026'].map((year, idx) => (
                  <div key={idx} className="text-[10px] text-gray-400 font-extrabold">{year}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Academic Directories & Syllabus Section */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-[#2E1E17]/10 bg-[#FAF6F0]">
          <div className="text-center space-y-3 mb-10">
            <span className="text-[11px] font-bold text-[#FF733B] uppercase tracking-widest block">Resource Repository</span>
            <h3 className="text-3xl font-normal text-[#2E1E17] font-serif">Academic Directories & Syllabus</h3>
            <p className="text-xs text-gray-500 max-w-lg mx-auto font-semibold">Access digital syllabus binders, curriculum matrices, and campus audit reports directly.</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#2E1E17]/10 overflow-hidden shadow-sm">
            <div className="flex border-b border-[#2E1E17]/10 text-xs font-bold text-gray-500 bg-gray-50/50">
              <button 
                onClick={() => setActiveReportTab('curriculum')}
                className={`flex-1 py-3.5 border-r border-[#2E1E17]/10 transition ${activeReportTab === 'curriculum' ? 'bg-white text-[#FF733B]' : 'hover:bg-gray-100/50'}`}
              >
                Curriculum Guides (PDF)
              </button>
              <button 
                onClick={() => setActiveReportTab('reports')}
                className={`flex-1 py-3.5 border-r border-[#2E1E17]/10 transition ${activeReportTab === 'reports' ? 'bg-white text-[#FF733B]' : 'hover:bg-gray-100/50'}`}
              >
                Annual Progress Audits
              </button>
              <button 
                onClick={() => setActiveReportTab('manual')}
                className={`flex-1 py-3.5 transition ${activeReportTab === 'manual' ? 'bg-white text-[#FF733B]' : 'hover:bg-gray-100/50'}`}
              >
                Student Handbooks
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-left">
              {activeReportTab === 'curriculum' && (
                <div className="space-y-3">
                  {[
                    { title: 'Biomedical & Genomes AI Syllabus (Term 1-4)', size: '2.4 MB' },
                    { title: 'Quantum Financial Engineering Specialization Code', size: '3.1 MB' },
                    { title: 'Interactive Generative WebGL Design Module', size: '1.8 MB' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/5">
                      <span className="font-bold text-[#2E1E17] flex items-center gap-2">
                        <FileText size={14} className="text-gray-400" /> {item.title}
                      </span>
                      <button 
                        onClick={() => triggerPdfDownload(item.title)}
                        className="bg-white border border-[#2E1E17]/15 hover:bg-gray-50 px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold transition text-[10px]"
                      >
                        <Download size={12} /> Download ({item.size})
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeReportTab === 'reports' && (
                <div className="space-y-3">
                  {[
                    { title: 'DTV Operational Efficiency Progress Audit 2025', size: '4.8 MB' },
                    { title: 'Multi-Tenant Placement Metrics & Review Report', size: '5.2 MB' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/5">
                      <span className="font-bold text-[#2E1E17] flex items-center gap-2">
                        <FileText size={14} className="text-gray-400" /> {item.title}
                      </span>
                      <button 
                        onClick={() => triggerPdfDownload(item.title)}
                        className="bg-white border border-[#2E1E17]/15 hover:bg-gray-50 px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold transition text-[10px]"
                      >
                        <Download size={12} /> Download ({item.size})
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeReportTab === 'manual' && (
                <div className="space-y-3">
                  {[
                    { title: 'Student Sandbox Code of Conduct & Honor Guide', size: '1.2 MB' },
                    { title: 'Parent Portal Security & Consent Directory', size: '1.5 MB' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/5">
                      <span className="font-bold text-[#2E1E17] flex items-center gap-2">
                        <FileText size={14} className="text-gray-400" /> {item.title}
                      </span>
                      <button 
                        onClick={() => triggerPdfDownload(item.title)}
                        className="bg-white border border-[#2E1E17]/15 hover:bg-gray-50 px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold transition text-[10px]"
                      >
                        <Download size={12} /> Download ({item.size})
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-[#2E1E17]/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-left">
            <div>
              <span className="text-[11px] font-bold text-[#FF733B] uppercase tracking-widest block">Visual Binders</span>
              <h3 className="text-3xl font-normal text-[#2E1E17] font-serif mt-1">Campus Life Photo Gallery</h3>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {['all', 'sandbox', 'classroom', 'campus'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setGalleryFilter(filter)}
                  className={`text-xs px-4 py-2 rounded-full border transition-all uppercase tracking-wider font-extrabold ${
                    galleryFilter === filter
                      ? 'bg-[#FF733B] border-none text-white'
                      : 'bg-white border-[#2E1E17]/15 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-[#2E1E17]/10 shadow-sm group">
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-bold bg-black/60 px-4 py-2 rounded-full flex items-center gap-1">
                      <Eye size={12} /> Inspect Space
                    </span>
                  </div>
                </div>
                <div className="p-4 text-left">
                  <h4 className="text-xs font-extrabold text-[#2E1E17]">{item.title}</h4>
                  <span className="text-[9px] text-[#FF733B] uppercase tracking-widest font-extrabold block mt-0.5">{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lower Serif Banner */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#2E1E17]/10">
          <div className="text-left max-w-xl">
            <h3 className="text-2xl md:text-3xl font-normal text-[#2E1E17] leading-tight font-serif">
              Smart and clever kids <br />
              ready to <span className="underline decoration-[#FF733B] decoration-4 underline-offset-8">fly high!</span>
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#2E1E17]/70 max-w-md">
            <p className="font-semibold">Learn smartly with us. We teach 'One Smart Lesson' at a time!</p>
            <Link 
              to="/admission-form"
              className="bg-white border border-[#2E1E17]/20 hover:bg-[#FF733B] hover:border-none hover:text-white text-[#2E1E17] font-extrabold py-3 px-6 rounded-full transition flex items-center gap-1.5 shadow-sm"
            >
              Enroll Now <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Core Feature Highlights */}
        <section className="w-full bg-[#FAF6F0] py-16 border-t border-[#2E1E17]/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[11px] font-bold tracking-widest text-[#FF733B] uppercase">Core Benefits</span>
              <h2 className="text-2xl md:text-4xl font-normal text-[#2E1E17] font-serif">Why Learn In Digital Twin Verse</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Scholarship Facility', desc: 'Up to 75% tuition support for highly technical students.', highlight: 'From $1,500/Yr' },
                { title: 'Skilled Lecturers', desc: 'Academics from MIT, Stanford, and leading AI Labs.', highlight: 'Ph.D. Anchored' },
                { title: 'Book Library Facility', desc: 'Comprehensive online databases, datasets, and guides.', highlight: '24/7 Remote Access' },
                { title: 'Affordable Prices', desc: 'Elastic pricing structure adjusted per class modules.', highlight: 'Tiered Options' }
              ].map((feat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-[#2E1E17]/5 shadow-sm hover:shadow-md transition flex flex-col justify-between h-48">
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-[#2E1E17] mb-2">{feat.title}</h4>
                    <p className="text-xs text-[#2E1E17]/70 leading-relaxed">{feat.desc}</p>
                  </div>
                  <span className="text-[10px] text-[#FF733B] font-bold uppercase tracking-wider border-t border-[#2E1E17]/5 pt-2 inline-block">
                    {feat.highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
