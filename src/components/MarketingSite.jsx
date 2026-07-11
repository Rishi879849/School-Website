import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, ArrowRight, FileText, Download, Eye,
  GraduationCap, Users, BookOpen, HeartHandshake, Award, Star, Sparkles
} from 'lucide-react';

export default function MarketingSite() {
  const [activeReportTab, setActiveReportTab] = useState('curriculum');
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [chartTab, setChartTab] = useState('academics');

  const chartData = {
    academics: {
      title: 'Academic Achievement Index (2022-2026)',
      path1: 'M 10,180 L 120,130 L 240,110 L 360,70 L 480,20',
      path2: 'M 10,190 L 120,160 L 240,140 L 360,110 L 480,60',
      points: [{ cx: 120, cy: 130 }, { cx: 240, cy: 110 }, { cx: 360, cy: 70 }, { cx: 480, cy: 20 }]
    },
    attendance: {
      title: 'Smart Classroom Activity Index (2022-2026)',
      path1: 'M 10,190 L 120,150 L 240,90 L 360,80 L 480,30',
      path2: 'M 10,195 L 120,170 L 240,120 L 360,95 L 480,50',
      points: [{ cx: 120, cy: 150 }, { cx: 240, cy: 90 }, { cx: 360, cy: 80 }, { cx: 480, cy: 30 }]
    },
    sports: {
      title: 'Sports & Co-curricular Win Ratio (2022-2026)',
      path1: 'M 10,195 L 120,160 L 240,130 L 360,60 L 480,10',
      path2: 'M 10,199 L 120,180 L 240,150 L 360,90 L 480,40',
      points: [{ cx: 120, cy: 160 }, { cx: 240, cy: 130 }, { cx: 360, cy: 60 }, { cx: 480, cy: 10 }]
    }
  };

  // Photo Gallery Data
  const galleryItems = [
    { id: 1, type: 'lab', title: 'Science Laboratory', url: '/gallery_science_lab.png' },
    { id: 2, type: 'campus', title: 'School Library', url: '/gallery_school_library.png' },
    { id: 3, type: 'lab', title: 'Computer Lab', url: '/gallery_computer_lab.png' },
    { id: 4, type: 'classroom', title: 'Smart Classroom', url: '/gallery_smart_classroom.png' },
    { id: 5, type: 'classroom', title: 'Art & Craft Studio', url: '/gallery_art_studio.png' },
    { id: 6, type: 'campus', title: 'School Play Ground', url: '/gallery_playground.png' }
  ];

  const filteredGallery = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.type === galleryFilter);

  // Simulated PDF Downloader
  const triggerPdfDownload = (fileName) => {
    alert(`Compiling Secure Archive: ${fileName}.pdf is preparing for system download.`);
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="relative bg-[#FAF6F0] text-[#2E1E17] flex flex-col font-sans selection:bg-[#FF733B] selection:text-white">
      <main className="flex-1 flex flex-col">
        
        {/* Premium Two-Column Hero Section */}
        <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-16 text-left overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading and CTAs */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6"
            >
              <motion.span 
                variants={itemVariants}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF733B]/10 text-[#FF733B] text-[10px] font-extrabold uppercase tracking-widest rounded-full"
              >
                <Sparkles size={10} /> Admissions Open 2026-27
              </motion.span>

              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#2E1E17] tracking-tight leading-tight font-serif"
              >
                Putting your child's <span className="italic text-[#FF733B]">Future</span> <br />
                in great motion.
              </motion.h2>

              <motion.p 
                variants={itemVariants}
                className="text-xs md:text-sm text-gray-500 font-semibold max-w-lg leading-relaxed"
              >
                At DTV School Support, we combine foundational academic excellence with modern smart classroom modules, scientific lab investigations, and active sports to nurture tomorrow's leaders.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-3.5 text-xs text-[#2E1E17] font-bold pt-2"
              >
                <span className="flex items-center gap-1.5 bg-white border border-[#2E1E17]/10 py-1.5 px-4 rounded-full shadow-sm">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check size={10} /></span> CBSE Accredited
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-[#2E1E17]/10 py-1.5 px-4 rounded-full shadow-sm">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check size={10} /></span> Smart Classrooms
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-[#2E1E17]/10 py-1.5 px-4 rounded-full shadow-sm">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check size={10} /></span> Dedicated Educators
                </span>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                variants={itemVariants}
                className="pt-2 flex flex-wrap gap-4"
              >
                <Link 
                  to="/admission-form"
                  className="bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold text-xs md:text-sm px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5"
                >
                  Apply For Admission <ArrowRight size={14} />
                </Link>
                <Link 
                  to="/login"
                  className="bg-[#2F221E] hover:bg-black text-white font-extrabold text-xs md:text-sm px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5"
                >
                  Staff Portal Login <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Overlapping Collage */}
            <div className="lg:col-span-5 relative h-[450px] w-full flex items-center justify-center pt-8 lg:pt-0">
              
              {/* Backglow Orb */}
              <div className="absolute w-72 h-72 bg-[#FF733B]/10 rounded-full blur-[80px] top-10 left-10 pointer-events-none" />

              {/* Central main student photo */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-64 h-80 rounded-3xl overflow-hidden border-4 border-white shadow-2xl z-20"
              >
                <img 
                  src="/hero_student_portrait.png" 
                  alt="Student Portrait" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>

              {/* Top-Right Overlapping Image (Classroom) */}
              <motion.div 
                initial={{ opacity: 0, x: 50, rotate: -6 }}
                animate={{ opacity: 1, x: 0, rotate: -6 }}
                transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                className="absolute right-0 top-4 w-40 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl hover:scale-105 transition-all duration-500 z-30 hidden sm:block cursor-pointer"
              >
                <img 
                  src="/school_smart_classroom.png" 
                  alt="Smart Classroom" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>

              {/* Bottom-Left Overlapping Image (Science Lab) */}
              <motion.div 
                initial={{ opacity: 0, x: -50, rotate: -4 }}
                animate={{ opacity: 1, x: 0, rotate: -4 }}
                transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                className="absolute left-0 bottom-4 w-44 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl hover:scale-105 transition-all duration-500 z-30 hidden sm:block cursor-pointer"
              >
                <img 
                  src="/school_science_laboratory.png" 
                  alt="Science Lab" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>

              {/* Floating Glassmorphic Badges */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.55 }}
                className="absolute left-[-20px] top-12 bg-white/80 backdrop-blur-md border border-[#2E1E17]/10 p-3 rounded-2xl shadow-lg z-40 flex items-center gap-2 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500"><Star size={16} fill="currentColor" /></div>
                <div className="text-[10px] text-left">
                  <span className="font-extrabold text-[#2E1E17] block">★ 4.9/5 Rating</span>
                  <span className="text-gray-400 font-bold">Trusted by Parents</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.7 }}
                className="absolute right-[-10px] bottom-16 bg-white/80 backdrop-blur-md border border-[#2E1E17]/10 p-3 rounded-2xl shadow-lg z-40 flex items-center gap-2 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#FF733B]"><Award size={16} /></div>
                <div className="text-[10px] text-left">
                  <span className="font-extrabold text-[#2E1E17] block">Affiliated School</span>
                  <span className="text-gray-400 font-bold">Primary & Secondary</span>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* Premium 3-Column Stats Panel */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
          <motion.div 
            variants={statsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gradient-to-tr from-[#2F221E] via-[#3D2C27] to-[#2F221E] text-white rounded-[2.5rem] p-10 border border-[#FF733B]/20 shadow-2xl shadow-orange-950/20 relative overflow-hidden group hover:border-[#FF733B]/40 transition-colors duration-500"
          >
            {/* Visual background ambient details */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-[#FF733B]/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute left-[-10%] bottom-[-10%] w-48 h-48 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />
            <div className="absolute right-10 top-8 animate-float text-3xl opacity-20 pointer-events-none">✨</div>

            <motion.div 
              variants={statCardVariants}
              className="text-left flex items-start gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="p-3.5 bg-orange-500/20 text-orange-400 rounded-2xl flex-shrink-0">
                <span className="text-xl">🏫</span>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-serif text-white">50+</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed font-semibold">Supported school networks nationwide</p>
              </div>
            </motion.div>

            <motion.div 
              variants={statCardVariants}
              className="text-left flex items-start gap-4 border-b md:border-b-0 md:border-r border-white/10 py-6 md:py-0 md:px-8 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="p-3.5 bg-amber-500/20 text-amber-400 rounded-2xl flex-shrink-0">
                <span className="text-xl">👥</span>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-serif text-white">12K+</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed font-semibold">Thriving students active daily</p>
              </div>
            </motion.div>

            <motion.div 
              variants={statCardVariants}
              className="text-left flex items-start gap-4 pt-6 md:pt-0 md:pl-8 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="p-3.5 bg-emerald-50/20 text-emerald-400 rounded-2xl flex-shrink-0">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-serif text-white">98%</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed font-semibold">CBSE board exam success rate</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* School Progression Report */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-[#2E1E17]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 text-left space-y-4"
            >
              <span className="text-[11px] font-bold text-[#FF733B] uppercase tracking-widest block">School Telemetry</span>
              <h3 className="text-3xl font-normal text-[#2E1E17] font-serif leading-tight">School Progression Report</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                A high-fidelity growth chart mapping academic achievement metrics, digital classroom active sessions, and student board exam success rates over the last five terms.
              </p>
              
              <div className="space-y-3 pt-2 text-xs font-semibold">
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#2E1E17]/5 shadow-sm hover:scale-[1.01] transition-all cursor-pointer">
                  <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-[#FF733B] font-extrabold text-[10px]">★</div>
                  <span className="text-[#2E1E17]/85">98.2% Board exam average index</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#2E1E17]/5 shadow-sm hover:scale-[1.01] transition-all cursor-pointer">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-500 font-extrabold text-[10px]">✓</div>
                  <span className="text-[#2E1E17]/85">12 Smart Classrooms operational</span>
                </div>
              </div>
            </motion.div>

            {/* Right Chart Card with Interactive Tabs & Grid Lines */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-7 bg-white p-8 border border-[#2E1E17]/10 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-[#FF733B]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="z-10">
                {/* Data Toggle Buttons */}
                <div className="flex flex-wrap gap-2 mb-6 justify-start">
                  <button 
                    type="button"
                    onClick={() => setChartTab('academics')} 
                    className={`text-[9px] uppercase font-extrabold tracking-wider px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                      chartTab === 'academics' 
                        ? 'bg-[#FF733B] border-none text-white shadow-sm' 
                        : 'bg-white border-[#2E1E17]/15 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    Academic Index
                  </button>
                  <button 
                    type="button"
                    onClick={() => setChartTab('attendance')} 
                    className={`text-[9px] uppercase font-extrabold tracking-wider px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                      chartTab === 'attendance' 
                        ? 'bg-[#FF733B] border-none text-white shadow-sm' 
                        : 'bg-white border-[#2E1E17]/15 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    Smart Attendance
                  </button>
                  <button 
                    type="button"
                    onClick={() => setChartTab('sports')} 
                    className={`text-[9px] uppercase font-extrabold tracking-wider px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                      chartTab === 'sports' 
                        ? 'bg-[#FF733B] border-none text-white shadow-sm' 
                        : 'bg-white border-[#2E1E17]/15 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    Co-Curricular wins
                  </button>
                </div>

                <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-6 text-left">
                  {chartData[chartTab].title}
                </h4>
              </div>
              
              <div className="relative h-60 w-full flex items-end justify-between px-4 pb-2 border-b border-[#2E1E17]/10 z-10">
                <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" viewBox="0 0 500 200">
                  {/* Dashboard Grid Lines */}
                  <line x1="0" y1="40" x2="480" y2="40" stroke="#2E1E17" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="80" x2="480" y2="80" stroke="#2E1E17" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="120" x2="480" y2="120" stroke="#2E1E17" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="160" x2="480" y2="160" stroke="#2E1E17" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
                  
                  <line x1="120" y1="0" x2="120" y2="190" stroke="#2E1E17" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="240" y1="0" x2="240" y2="190" stroke="#2E1E17" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="360" y1="0" x2="360" y2="190" stroke="#2E1E17" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="480" y1="0" x2="480" y2="190" stroke="#2E1E17" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />

                  <motion.path 
                    animate={{ d: chartData[chartTab].path1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    fill="none" 
                    stroke="#FF733B" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                  />
                  <motion.path 
                    animate={{ d: chartData[chartTab].path2 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    fill="none" 
                    stroke="#4ADE80" 
                    strokeWidth="3" 
                    strokeDasharray="6,6" 
                  />
                  
                  {chartData[chartTab].points.map((pt, idx) => (
                    <motion.circle 
                      key={idx}
                      animate={{ cx: pt.cx, cy: pt.cy }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      r={idx === 3 ? "6" : "5"} 
                      fill="#FF733B" 
                      className="cursor-pointer hover:r-7 transition-all"
                    />
                  ))}
                </svg>

                {['2022', '2023', '2024', '2025', '2026'].map((year, idx) => (
                  <div key={idx} className="text-[10px] text-gray-400 font-extrabold">{year}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Academic Directories & Syllabus Section */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-[#2E1E17]/10 bg-[#FAF6F0]/35 rounded-[3rem] my-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-12"
          >
            <div className="text-center space-y-3 mb-10">
              <span className="text-[11px] font-bold text-[#FF733B] uppercase tracking-widest block">Resource Repository</span>
              <h3 className="text-3xl font-normal text-[#2E1E17] font-serif">Academic Directories & Syllabus</h3>
              <p className="text-xs text-gray-500 max-w-lg mx-auto font-semibold">Access digital syllabus binders, curriculum matrices, and campus audit reports directly.</p>
            </div>

            {/* Sliding Pill Tab Switcher */}
            <div className="max-w-xl mx-auto bg-[#FAF6F0] p-1.5 rounded-2xl flex border border-[#2E1E17]/5 relative z-10">
              {[
                { id: 'curriculum', label: 'Curriculum Binders' },
                { id: 'reports', label: 'Progress Audits' },
                { id: 'manual', label: 'Student Handbooks' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveReportTab(tab.id)}
                  className="flex-1 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all relative z-10 cursor-pointer"
                >
                  {activeReportTab === tab.id && (
                    <motion.div
                      layoutId="activeRepoTab"
                      className="absolute inset-0 bg-[#FF733B] rounded-xl shadow-md -z-10"
                      transition={{ type: "spring", damping: 20, stiffness: 150 }}
                    />
                  )}
                  <span className={activeReportTab === tab.id ? 'text-white' : 'text-gray-500'}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Grid of Interactive Document Cards */}
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                {activeReportTab === 'curriculum' && (
                  <motion.div
                    key="curriculum-grid"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {[
                      { title: 'Mathematics & Science School Syllabus (Class 1-12)', size: '2.4 MB', desc: 'Central board alignment and term learning guidelines.' },
                      { title: 'English & Social Studies Curriculum Guide', size: '1.8 MB', desc: 'Language skills rubrics and interactive maps overview.' }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-48 text-left"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="p-3 bg-[#FAF6F0] rounded-2xl text-[#FF733B] border border-[#2E1E17]/5">
                              <FileText size={18} />
                            </div>
                            <span className="text-[10px] text-gray-400 font-extrabold bg-[#FAF6F0] px-2.5 py-1 rounded-full">{item.size}</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-extrabold text-[#2E1E17]">{item.title}</h4>
                            <p className="text-[10px] text-gray-400 font-semibold mt-1">{item.desc}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => triggerPdfDownload(item.title)}
                          className="w-full bg-[#FAF6F0] hover:bg-[#FF733B]/10 text-[#FF733B] py-2 rounded-xl flex items-center justify-center gap-1.5 font-bold transition text-[10px] cursor-pointer"
                        >
                          <Download size={12} /> Download PDF
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeReportTab === 'reports' && (
                  <motion.div
                    key="reports-grid"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {[
                      { title: 'DTV School Support Academic Performance Report 2025', size: '4.8 MB', desc: 'Grade progression reports and term audit parameters.' },
                      { title: 'School Infrastructure and Facilities Review Report', size: '5.2 MB', desc: 'Smart classroom setups and science laboratory safety checks.' }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-48 text-left"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="p-3 bg-[#FAF6F0] rounded-2xl text-[#FF733B] border border-[#2E1E17]/5">
                              <FileText size={18} />
                            </div>
                            <span className="text-[10px] text-gray-400 font-extrabold bg-[#FAF6F0] px-2.5 py-1 rounded-full">{item.size}</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-extrabold text-[#2E1E17]">{item.title}</h4>
                            <p className="text-[10px] text-gray-400 font-semibold mt-1">{item.desc}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => triggerPdfDownload(item.title)}
                          className="w-full bg-[#FAF6F0] hover:bg-[#FF733B]/10 text-[#FF733B] py-2 rounded-xl flex items-center justify-center gap-1.5 font-bold transition text-[10px] cursor-pointer"
                        >
                          <Download size={12} /> Download PDF
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeReportTab === 'manual' && (
                  <motion.div
                    key="manual-grid"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {[
                      { title: 'Student Handbook & School Honor Code', size: '1.2 MB', desc: 'Code of conduct, campus timelines, and ethics guidelines.' },
                      { title: 'Parent Portal Security & Consent Guidelines', size: '1.5 MB', desc: 'Secure portal access details and record storage consent.' }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-48 text-left"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="p-3 bg-[#FAF6F0] rounded-2xl text-[#FF733B] border border-[#2E1E17]/5">
                              <FileText size={18} />
                            </div>
                            <span className="text-[10px] text-gray-400 font-extrabold bg-[#FAF6F0] px-2.5 py-1 rounded-full">{item.size}</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-extrabold text-[#2E1E17]">{item.title}</h4>
                            <p className="text-[10px] text-gray-400 font-semibold mt-1">{item.desc}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => triggerPdfDownload(item.title)}
                          className="w-full bg-[#FAF6F0] hover:bg-[#FF733B]/10 text-[#FF733B] py-2 rounded-xl flex items-center justify-center gap-1.5 font-bold transition text-[10px] cursor-pointer"
                        >
                          <Download size={12} /> Download PDF
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* Photo Gallery Section */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-[#2E1E17]/10">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-left"
          >
            <div>
              <span className="text-[11px] font-bold text-[#FF733B] uppercase tracking-widest block">Visual Binders</span>
              <h3 className="text-3xl font-normal text-[#2E1E17] font-serif mt-1">Campus Life Photo Gallery</h3>
            </div>

            {/* Sliding Pill Filter Selector */}
            <div className="bg-[#FAF6F0] p-1.5 rounded-full flex border border-[#2E1E17]/5 relative z-10">
              {['all', 'lab', 'classroom', 'campus'].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setGalleryFilter(filter)}
                  className="px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all relative z-10 cursor-pointer"
                >
                  {galleryFilter === filter && (
                    <motion.div
                      layoutId="activeGalleryFilter"
                      className="absolute inset-0 bg-[#FF733B] rounded-full shadow-md -z-10"
                      transition={{ type: "spring", damping: 20, stiffness: 150 }}
                    />
                  )}
                  <span className={galleryFilter === filter ? 'text-white' : 'text-gray-500'}>
                    {filter}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Premium Cards Grid with Hover Overlays */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="bg-white rounded-[2rem] overflow-hidden border border-[#2E1E17]/10 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 group cursor-pointer relative h-64 flex flex-col justify-end"
                >
                  <div className="absolute inset-0 bg-gray-100 z-0 overflow-hidden">
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Shadow gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />
                  </div>

                  {/* Caption Overlay */}
                  <div className="p-6 text-left z-10 text-white relative">
                    <span className="text-[8px] text-[#FF733B] uppercase tracking-widest font-extrabold block mb-0.5">{item.type}</span>
                    <h4 className="text-sm font-bold text-white flex items-center justify-between">
                      {item.title}
                      <span className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all duration-300 bg-white/20 backdrop-blur-sm p-1.5 rounded-full text-[9px] font-bold">
                        <Eye size={10} />
                      </span>
                    </h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Lower Serif Banner */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#2E1E17]/10"
        >
          <div className="text-left max-w-xl">
            <h3 className="text-2xl md:text-3xl font-normal text-[#2E1E17] leading-tight font-serif">
              Smart and clever kids <br />
              ready to <span className="underline decoration-[#FF733B] decoration-4 underline-offset-8">fly high!</span>
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#2E1E17]/70 max-w-md text-left">
            <p className="font-semibold">Learn smartly with us. We teach 'One Smart Lesson' at a time!</p>
            <Link 
              to="/admission-form"
              className="bg-white border border-[#2E1E17]/20 hover:bg-[#FF733B] hover:border-none hover:text-white text-[#2E1E17] font-extrabold py-3 px-6 rounded-full transition flex items-center gap-1.5 shadow-sm"
            >
              Enroll Now <ArrowRight size={14} />
            </Link>
          </div>
        </motion.section>

        {/* Core Feature Highlights Redesign */}
        <section className="w-full bg-[#FAF6F0] py-16 border-t border-[#2E1E17]/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[11px] font-bold tracking-widest text-[#FF733B] uppercase">Core Benefits</span>
              <h2 className="text-2xl md:text-4xl font-normal text-[#2E1E17] font-serif">Why Choose DTV School Support</h2>
            </div>
            
            <motion.div 
              variants={statsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
            >
              {[
                { 
                  icon: <GraduationCap className="text-[#FF733B]" size={24} />, 
                  title: 'Academic Excellence', 
                  desc: 'A robust curriculum designed to foster critical thinking, concept clarity, and CBSE board exam success.', 
                  highlight: 'CBSE Curriculum' 
                },
                { 
                  icon: <HeartHandshake className="text-[#FF733B]" size={24} />, 
                  title: 'Holistic Care', 
                  desc: 'Comprehensive personal attention, co-curricular arts, sports leagues, and public speaking clubs.', 
                  highlight: 'Creative Development' 
                },
                { 
                  icon: <BookOpen className="text-[#FF733B]" size={24} />, 
                  title: 'Smart Infrastructure', 
                  desc: 'Access to modern computer labs, smart classroom whiteboards, and fully equipped science labs.', 
                  highlight: 'Smart Classrooms' 
                },
                { 
                  icon: <Users className="text-[#FF733B]" size={24} />, 
                  title: 'NCC & Excursions', 
                  desc: 'Active student participation in NCC training corps, science exhibitions, and annual outdoor study trips.', 
                  highlight: 'Co-Curriculars' 
                }
              ].map((feat, idx) => {
                const accentColors = [
                  'border-t-4 border-t-[#FF733B]',
                  'border-t-4 border-t-amber-500',
                  'border-t-4 border-t-emerald-500',
                  'border-t-4 border-t-sky-500'
                ];
                return (
                  <motion.div 
                    variants={statCardVariants}
                    key={idx} 
                    className={`bg-white rounded-3xl p-6 border border-[#2E1E17]/10 ${accentColors[idx]} shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between h-56 hover:-translate-y-1.5 cursor-pointer`}
                  >
                    <div className="space-y-3">
                      <div className="p-3 bg-[#FAF6F0] w-fit rounded-2xl border border-[#2E1E17]/5">
                        {feat.icon}
                      </div>
                      <h4 className="text-sm md:text-base font-bold text-[#2E1E17]">{feat.title}</h4>
                      <p className="text-xs text-gray-500 font-semibold leading-relaxed">{feat.desc}</p>
                    </div>
                    <span className="text-[10px] text-[#FF733B] font-extrabold uppercase tracking-wider border-t border-[#2E1E17]/5 pt-2 inline-block">
                      {feat.highlight}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
