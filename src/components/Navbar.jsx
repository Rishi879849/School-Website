import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, LogIn, Key, Award, Calendar, FileText, ShieldAlert, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setOpenDropdown(null);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleDropdownToggle = (name, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="w-full bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#2E1E17]/10 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300">
      <Link to="/" className="flex items-center gap-1.5 cursor-pointer">
        <span className="text-xl md:text-2xl font-extrabold tracking-tight text-[#2E1E17] font-serif flex items-center gap-1">
          Edukids<span className="text-[#FF733B]">.</span>
        </span>
      </Link>

      {/* Main Desktop Navbar */}
      <nav className="hidden xl:flex items-center gap-6 text-xs text-[#2E1E17]/80 font-extrabold">
        <Link to="/" className="hover:text-black py-2 transition-all duration-200">Home</Link>
        
        {/* About Us Dropdown */}
        <div className="relative py-2 cursor-pointer">
          <span 
            onClick={(e) => handleDropdownToggle('about', e)}
            className="flex items-center gap-0.5 hover:text-black transition-all duration-200 select-none"
          >
            About Us <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'about' ? 'rotate-180' : ''}`} />
          </span>
          <div 
            className={`absolute top-full left-0 bg-white border border-[#2E1E17]/10 py-2 w-52 rounded-xl shadow-lg mt-1 z-50 text-left transition-all duration-300 ease-out origin-top ${
              openDropdown === 'about' 
                ? 'opacity-100 translate-y-0 scale-100 visible' 
                : 'opacity-0 -translate-y-2 scale-95 invisible pointer-events-none'
            }`}
          >
            <Link to="/about-edukids" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">About Edukids</Link>
            <Link to="/vision-mission" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Vision & Mission</Link>
            <Link to="/directors-message" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Director's Message</Link>
            <Link to="/campus-information" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Campus Information</Link>
            <Link to="/ncc" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">NCC</Link>
            <Link to="/location" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Location</Link>
            <Link to="/contact-us" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold text-[#FF733B]">Contact Us</Link>
          </div>
        </div>

        {/* Streams Dropdown */}
        <div className="relative py-2 cursor-pointer">
          <span 
            onClick={(e) => handleDropdownToggle('streams', e)}
            className="flex items-center gap-0.5 hover:text-black transition-all duration-200 select-none"
          >
            Streams <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'streams' ? 'rotate-180' : ''}`} />
          </span>
          <div 
            className={`absolute top-full left-0 bg-white border border-[#2E1E17]/10 py-2 w-52 rounded-xl shadow-lg mt-1 z-50 text-left transition-all duration-300 ease-out origin-top ${
              openDropdown === 'streams' 
                ? 'opacity-100 translate-y-0 scale-100 visible' 
                : 'opacity-0 -translate-y-2 scale-95 invisible pointer-events-none'
            }`}
          >
            <Link to="/institution-login" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Institution/Department Login</Link>
            <Link to="/departmental-profile" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Departmental Profile</Link>
          </div>
        </div>

        {/* Admission Dropdown */}
        <div className="relative py-2 cursor-pointer">
          <span 
            onClick={(e) => handleDropdownToggle('admission', e)}
            className="flex items-center gap-0.5 hover:text-black transition-all duration-200 select-none"
          >
            Admission <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'admission' ? 'rotate-180' : ''}`} />
          </span>
          <div 
            className={`absolute top-full left-0 bg-white border border-[#2E1E17]/10 py-2 w-52 rounded-xl shadow-lg mt-1 z-50 text-left transition-all duration-300 ease-out origin-top ${
              openDropdown === 'admission' 
                ? 'opacity-100 translate-y-0 scale-100 visible' 
                : 'opacity-0 -translate-y-2 scale-95 invisible pointer-events-none'
            }`}
          >
            <Link to="/policy" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Policy</Link>
            <Link to="/admission-form" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Admission Form</Link>
            <Link to="/fee-structure" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold text-[#FF733B]">Fee Structure</Link>
          </div>
        </div>

        {/* Academics Dropdown */}
        <div className="relative py-2 cursor-pointer">
          <span 
            onClick={(e) => handleDropdownToggle('academics', e)}
            className="flex items-center gap-0.5 hover:text-black transition-all duration-200 select-none"
          >
            Academics <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'academics' ? 'rotate-180' : ''}`} />
          </span>
          <div 
            className={`absolute top-full left-0 bg-white border border-[#2E1E17]/10 py-2 w-56 rounded-xl shadow-lg mt-1 z-50 text-left transition-all duration-300 ease-out origin-top ${
              openDropdown === 'academics' 
                ? 'opacity-100 translate-y-0 scale-100 visible' 
                : 'opacity-0 -translate-y-2 scale-95 invisible pointer-events-none'
            }`}
          >
            <Link to="/academic-calendar" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Academic Calendar</Link>
            <Link to="/fee-structure" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Fee Structure</Link>
            <Link to="/scheme-syllabus" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Scheme/Syllabus</Link>
            <Link to="/ordinance" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Ordinance</Link>
            <Link to="/pos" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">PO's</Link>
            <Link to="/swayam-nptel" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold uppercase tracking-tight text-[#FF733B]">SWAYAM -NPTEL LOCAL CHAPTER</Link>
          </div>
        </div>

        {/* Examination Dropdown */}
        <div className="relative py-2 cursor-pointer">
          <span 
            onClick={(e) => handleDropdownToggle('examination', e)}
            className="flex items-center gap-0.5 hover:text-black transition-all duration-200 select-none"
          >
            Examination <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'examination' ? 'rotate-180' : ''}`} />
          </span>
          <div 
            className={`absolute top-full left-0 bg-white border border-[#2E1E17]/10 py-2 w-48 rounded-xl shadow-lg mt-1 z-50 text-left transition-all duration-300 ease-out origin-top ${
              openDropdown === 'examination' 
                ? 'opacity-100 translate-y-0 scale-100 visible' 
                : 'opacity-0 -translate-y-2 scale-95 invisible pointer-events-none'
            }`}
          >
            <Link to="/results" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Results</Link>
            <Link to="/timetable" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Time Table</Link>
          </div>
        </div>

        {/* Student Life Dropdown */}
        <div className="relative py-2 cursor-pointer">
          <span 
            onClick={(e) => handleDropdownToggle('studentLife', e)}
            className="flex items-center gap-0.5 hover:text-[#FF733B] text-black font-extrabold transition-all duration-200 select-none"
          >
            Student Life <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'studentLife' ? 'rotate-180' : ''}`} />
          </span>
          <div 
            className={`absolute top-full left-0 bg-white border border-[#2E1E17]/10 py-2 w-52 rounded-xl shadow-xl mt-1 z-50 text-left transition-all duration-300 ease-out origin-top ${
              openDropdown === 'studentLife' 
                ? 'opacity-100 translate-y-0 scale-100 visible' 
                : 'opacity-0 -translate-y-2 scale-95 invisible pointer-events-none'
            }`}
          >
            <Link to="/results" className="flex items-center gap-2 px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">
              <Award size={12} className="text-[#FF733B]" /> Results
            </Link>
            <Link to="/login" className="flex items-center gap-2 px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">
              <LogIn size={12} className="text-[#FF733B]" /> Login
            </Link>
            <Link to="/scheme-syllabus" className="flex items-center gap-2 px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">
              <BookOpen size={12} className="text-[#FF733B]" /> Scheme/Syllabus
            </Link>
            <Link to="/timetable" className="flex items-center gap-2 px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">
              <Calendar size={12} className="text-[#FF733B]" /> Time Table
            </Link>
            <Link to="/download-forms" className="flex items-center gap-2 px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">
              <FileText size={12} className="text-[#FF733B]" /> Download Forms
            </Link>
            <Link to="/anti-ragging" className="flex items-center gap-2 px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">
              <ShieldAlert size={12} className="text-[#FF733B]" /> Anti Ragging
            </Link>
            <Link to="/forgot-password" className="flex items-center gap-2 px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">
              <Key size={12} className="text-[#FF733B]" /> Forgot Password
            </Link>
          </div>
        </div>
      </nav>

      {/* Auth Action Buttons */}
      <div className="flex items-center gap-2.5">
        <Link 
          to="/login"
          className="hidden md:flex items-center gap-1.5 text-xs font-extrabold px-5 py-2.5 rounded-full border-2 border-[#2E1E17]/15 text-[#2E1E17] bg-[#FF733B] hover:bg-[#E6622E] text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-orange-500/10"
        >
          <LogIn size={14} /> Login Portal
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden text-[#2E1E17] hover:text-black p-2 hover:bg-[#2E1E17]/5 rounded-full transition"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#FAF6F0] border-b border-[#2E1E17]/10 py-6 px-6 flex flex-col gap-4 shadow-xl xl:hidden animate-fade-in z-50 max-h-[75vh] overflow-y-auto">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-[#2E1E17]/80 hover:text-black py-1">Home</Link>
          
          <div className="h-px bg-[#2E1E17]/5 my-0.5" />
          
          {/* About Us */}
          <div className="flex flex-col gap-2 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">About Us</span>
            <Link to="/about-edukids" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">About Edukids</Link>
            <Link to="/vision-mission" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Vision & Mission</Link>
            <Link to="/directors-message" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Director's Message</Link>
            <Link to="/campus-information" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Campus Information</Link>
            <Link to="/ncc" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">NCC</Link>
            <Link to="/location" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Location</Link>
            <Link to="/contact-us" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#FF733B] pl-2 font-extrabold">Contact Us</Link>
          </div>

          <div className="h-px bg-[#2E1E17]/5 my-0.5" />

          {/* Streams */}
          <div className="flex flex-col gap-2 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Streams</span>
            <Link to="/institution-login" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Institution/Department Login</Link>
            <Link to="/departmental-profile" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Departmental Profile</Link>
          </div>

          <div className="h-px bg-[#2E1E17]/5 my-0.5" />

          {/* Admission */}
          <div className="flex flex-col gap-2 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Admission</span>
            <Link to="/policy" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Policy</Link>
            <Link to="/admission-form" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Admission Form</Link>
            <Link to="/fee-structure" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Fee Structure</Link>
          </div>

          <div className="h-px bg-[#2E1E17]/5 my-0.5" />

          {/* Academics */}
          <div className="flex flex-col gap-2 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Academics</span>
            <Link to="/academic-calendar" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Academic Calendar</Link>
            <Link to="/fee-structure" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Fee Structure</Link>
            <Link to="/scheme-syllabus" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Scheme/Syllabus</Link>
            <Link to="/ordinance" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Ordinance</Link>
            <Link to="/pos" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">PO's</Link>
            <Link to="/swayam-nptel" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">SWAYAM - NPTEL Chapter</Link>
          </div>

          <div className="h-px bg-[#2E1E17]/5 my-0.5" />

          {/* Examination */}
          <div className="flex flex-col gap-2 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Examination</span>
            <Link to="/results" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Results</Link>
            <Link to="/timetable" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Time Table</Link>
          </div>

          <div className="h-px bg-[#2E1E17]/5 my-0.5" />

          {/* Student Life */}
          <div className="flex flex-col gap-2 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Student Life</span>
            <Link to="/results" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Results</Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Login</Link>
            <Link to="/scheme-syllabus" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Scheme/Syllabus</Link>
            <Link to="/timetable" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Time Table</Link>
            <Link to="/download-forms" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Download Forms</Link>
            <Link to="/anti-ragging" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Anti Ragging</Link>
            <Link to="/forgot-password" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#2E1E17]/80 hover:text-black pl-2">Forgot Password</Link>
          </div>

          <div className="h-px bg-[#2E1E17]/5 my-1" />

          {/* Mobile Auth Buttons */}
          <div className="flex gap-3 pt-2">
            <Link 
              to="/login" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-extrabold py-3 rounded-xl bg-gradient-to-r from-[#FF733B] to-[#FF9A5C] text-white shadow-md transition-all"
            >
              <LogIn size={14} /> Login Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
