import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, LogIn, Key, Award, Calendar, FileText, ShieldAlert, BookOpen, ChevronRight, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileActiveAccordion, setMobileActiveAccordion] = useState(null);

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

  const menuSections = [
    {
      title: 'About Us',
      links: [
        { label: 'About DTV School Support', path: '/about-dtvschoolsupport' },
        { label: 'Vision & Mission', path: '/vision-mission' },
        { label: 'Director\'s Message', path: '/directors-message' },
        { label: 'Campus Information', path: '/campus-information' },
        { label: 'NCC', path: '/ncc' },
        { label: 'Location', path: '/location' },
        { label: 'Contact Us', path: '/contact-us', highlight: true }
      ]
    },
    {
      title: 'Streams',
      links: [
        { label: 'Institution/Department Login', path: '/institution-login' },
        { label: 'Departmental Profile', path: '/departmental-profile' }
      ]
    },
    {
      title: 'Admission',
      links: [
        { label: 'Policy', path: '/policy' },
        { label: 'Admission Form', path: '/admission-form' },
        { label: 'Fee Structure', path: '/fee-structure', highlight: true }
      ]
    },
    {
      title: 'Academics',
      links: [
        { label: 'Academic Calendar', path: '/academic-calendar' },
        { label: 'Ordinance', path: '/ordinance' },
        { label: 'PO\'s', path: '/pos' },
        { label: 'SWAYAM - NPTEL Chapter', path: '/swayam-nptel' }
      ]
    },
    {
      title: 'Examination',
      links: [
        { label: 'Results', path: '/results' },
        { label: 'Time Table', path: '/timetable' }
      ]
    },
    {
      title: 'Student Life',
      links: [
        { label: 'Download Forms', path: '/download-forms' },
        { label: 'Anti Ragging', path: '/anti-ragging' },
        { label: 'Forgot Password', path: '/forgot-password' }
      ]
    }
  ];

  return (
    <>
      <header className="w-full bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#2E1E17]/10 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300">
      <Link to="/" className="flex items-center gap-1.5 cursor-pointer">
        <span className="text-xl md:text-2xl font-extrabold tracking-tight text-[#2E1E17] font-serif flex items-center gap-1">
          DTV School Support<span className="text-[#FF733B]">.</span>
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
            <Link to="/about-dtvschoolsupport" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">About DTV School Support</Link>
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
            className={`absolute top-full left-0 bg-white border border-[#2E1E17]/10 py-2 w-52 rounded-xl shadow-lg mt-1 z-50 text-left transition-all duration-300 ease-out origin-top ${
              openDropdown === 'academics' 
                ? 'opacity-100 translate-y-0 scale-100 visible' 
                : 'opacity-0 -translate-y-2 scale-95 invisible pointer-events-none'
            }`}
          >
            <Link to="/academic-calendar" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Academic Calendar</Link>
            <Link to="/ordinance" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Ordinance</Link>
            <Link to="/pos" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">PO's</Link>
            <Link to="/swayam-nptel" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">SWAYAM - NPTEL Chapter</Link>
          </div>
        </div>

        {/* Examination Dropdown */}
        <div className="relative py-2 cursor-pointer">
          <span 
            onClick={(e) => handleDropdownToggle('exam', e)}
            className="flex items-center gap-0.5 hover:text-black transition-all duration-200 select-none"
          >
            Examination <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'exam' ? 'rotate-180' : ''}`} />
          </span>
          <div 
            className={`absolute top-full left-0 bg-white border border-[#2E1E17]/10 py-2 w-52 rounded-xl shadow-lg mt-1 z-50 text-left transition-all duration-300 ease-out origin-top ${
              openDropdown === 'exam' 
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
            onClick={(e) => handleDropdownToggle('studentlife', e)}
            className="flex items-center gap-0.5 hover:text-black transition-all duration-200 select-none"
          >
            Student Life <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'studentlife' ? 'rotate-180' : ''}`} />
          </span>
          <div 
            className={`absolute top-full right-0 bg-white border border-[#2E1E17]/10 py-2 w-52 rounded-xl shadow-lg mt-1 z-50 text-left transition-all duration-300 ease-out origin-top ${
              openDropdown === 'studentlife' 
                ? 'opacity-100 translate-y-0 scale-100 visible' 
                : 'opacity-0 -translate-y-2 scale-95 invisible pointer-events-none'
            }`}
          >
            <Link to="/download-forms" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Download Forms</Link>
            <Link to="/anti-ragging" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Anti Ragging</Link>
            <Link to="/forgot-password" className="block px-4 py-2 hover:bg-[#FAF6F0] text-[11px] text-[#2E1E17]/85 hover:text-black font-bold">Forgot Password</Link>
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
          className="xl:hidden text-[#2E1E17] hover:text-black p-2 hover:bg-[#2E1E17]/5 rounded-full transition relative z-50 cursor-pointer"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>

    {/* Mobile Drawer (Responsive Slider Overlay) - rendered outside sticky header stacking context */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#2E1E17]/40 backdrop-blur-sm z-[999] xl:hidden"
          />

          {/* Slide-out Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[310px] sm:w-[350px] bg-[#FAF6F0] border-l border-[#2E1E17]/10 z-[1000] xl:hidden shadow-2xl flex flex-col p-6 text-left"
          >
            {/* Header Title */}
            <div className="flex items-center justify-between pb-4 border-b border-[#2E1E17]/10 mb-5 pt-10">
              <div>
                <h4 className="font-serif font-extrabold text-base text-[#2E1E17]">Campus Navigator</h4>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-extrabold">Responsive Portal Map</span>
              </div>
            </div>

            {/* Scrollable Accordion Links */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs">
              
              {/* Home link */}
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between font-extrabold text-[#2E1E17]/85 hover:text-black py-1.5 border-b border-[#2E1E17]/5"
              >
                <span>Home</span>
                <ChevronRight size={14} className="text-[#FF733B]" />
              </Link>

              {/* Accordion groups */}
              {menuSections.map((section, idx) => {
                const isOpen = mobileActiveAccordion === idx;
                return (
                  <div key={idx} className="border-b border-[#2E1E17]/5 pb-2">
                    <button
                      onClick={() => setMobileActiveAccordion(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between font-extrabold text-[#2E1E17]/85 hover:text-black py-1 select-none"
                    >
                      <span>{section.title}</span>
                      <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-3.5 mt-1.5 space-y-2 border-l border-[#FF733B]/20"
                        >
                          {section.links.map((link, lIdx) => (
                            <Link
                              key={lIdx}
                              to={link.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`block py-1 font-bold ${
                                link.highlight 
                                  ? 'text-[#FF733B] hover:text-[#E6622E]' 
                                  : 'text-gray-500 hover:text-black'
                              }`}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

            </div>

            {/* Quick Contact & Action Buttons at Bottom */}
            <div className="pt-4 border-t border-[#2E1E17]/10 mt-5 space-y-4">
              <div className="space-y-1.5 text-[10.5px] text-gray-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <Phone size={12} className="text-[#FF733B]" />
                  <span>+1 (800) 555-0199</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail size={12} className="text-[#FF733B]" />
                  <span>contact@dtvschoolsupport.edu</span>
                </div>
              </div>

              <Link 
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF733B] to-[#D85620] text-white text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10 active:scale-95 transition-all cursor-pointer"
              >
                <LogIn size={13} /> Login Portal
              </Link>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
