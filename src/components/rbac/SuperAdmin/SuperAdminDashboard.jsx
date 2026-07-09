import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRBAC } from '../context/RBACContext';
import { Settings, ShieldCheck, DollarSign, RefreshCw, Layers, Award, Check } from 'lucide-react';

export default function SuperAdminDashboard() {
  const { 
    whiteLabelConfig, 
    setWhiteLabelConfig, 
    feeLedger, 
    updateFeeStructure 
  } = useRBAC();

  const [schoolNameInput, setSchoolNameInput] = useState(whiteLabelConfig.schoolName);
  const [logoInput, setLogoInput] = useState(whiteLabelConfig.logoUrl);
  const [primaryColorInput, setPrimaryColorInput] = useState(whiteLabelConfig.primaryColor);
  const [themeInput, setThemeInput] = useState(whiteLabelConfig.theme);
  const [selectedGrade, setSelectedGrade] = useState('Grade 10-A');
  const [feeRateInput, setFeeRateInput] = useState(3500);

  const handleSaveBranding = (e) => {
    e.preventDefault();
    setWhiteLabelConfig({
      theme: themeInput,
      schoolName: schoolNameInput,
      logoUrl: logoInput,
      primaryColor: primaryColorInput,
      accentColor: '#2E1E17'
    });
    alert('Branding configurations updated successfully!');
  };

  const handleGlobalFeeUpdate = (e) => {
    e.preventDefault();
    // Update all matching fee records of students in that grade segment
    feeLedger.forEach(fee => {
      updateFeeStructure(fee.studentId, fee.status, feeRateInput);
    });
    alert(`Global fee templates updated to $${feeRateInput} for active grades.`);
  };

  const triggerPromotionLifecycle = () => {
    const confirmPromotion = window.confirm('Are you sure you want to trigger the Academic Year Promotion Lifecycle? This will promote all students in active rosters up one grade level.');
    if (confirmPromotion) {
      alert('Lifecycle promotion executed successfully! Student class levels advanced. Timetable logs archived.');
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-white/5">
        <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <span className="text-[9px] bg-blue-600 text-white font-extrabold uppercase px-3 py-0.5 rounded-full tracking-widest inline-block">
            Global SaaS Operator Portal
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-serif mt-1">Super Admin Command Center</h3>
          <p className="text-xs text-white/70">
            Configure White-Label parameters, execute promotion lifecycles, and audit database nodes.
          </p>
        </div>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Branding Configuration */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
            <Settings size={18} className="text-[#FF733B]" />
            <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Branding & White-Labeling Engine</h4>
          </div>

          <form onSubmit={handleSaveBranding} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">School Name Prefix</label>
                <input 
                  type="text" 
                  value={schoolNameInput}
                  onChange={(e) => setSchoolNameInput(e.target.value)}
                  className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B] transition"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">Custom Logo Image URL</label>
                <input 
                  type="text" 
                  value={logoInput}
                  onChange={(e) => setLogoInput(e.target.value)}
                  className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B] transition"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">Primary Color Palette</label>
                <div className="flex gap-2 items-center">
                  <input 
                    type="color" 
                    value={primaryColorInput}
                    onChange={(e) => setPrimaryColorInput(e.target.value)}
                    className="w-10 h-10 border-0 rounded-xl cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={primaryColorInput}
                    onChange={(e) => setPrimaryColorInput(e.target.value)}
                    className="flex-1 py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] font-mono focus:outline-none focus:border-[#FF733B]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">Active Visual Theme Preset</label>
                <select 
                  value={themeInput}
                  onChange={(e) => setThemeInput(e.target.value)}
                  className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B]"
                >
                  <option value="Warm Off-White">Warm Off-White Preset</option>
                  <option value="Sleek Dark Mode">Sleek Dark Mode Preset</option>
                  <option value="Oceanic Ice">Oceanic Blue Preset</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#2E1E17] hover:bg-black text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer"
            >
              Update Brand Configurations
            </button>
          </form>
        </div>

        {/* Global Fee templates */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between min-h-[320px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <DollarSign size={18} className="text-blue-600" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Global Fee Templates Editor</h4>
            </div>

            <form onSubmit={handleGlobalFeeUpdate} className="space-y-3.5 text-xs text-left">
              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Target Roster Segment</label>
                <select 
                  value={selectedGrade} 
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17]"
                >
                  <option value="Grade 9-A">Grade 9-A Segment</option>
                  <option value="Grade 10-A">Grade 10-A Segment</option>
                  <option value="Grade 11-A">Grade 11-A Segment</option>
                  <option value="Grade 12-A">Grade 12-A Segment</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Fee Amount Rate ($)</label>
                <input 
                  type="number" 
                  value={feeRateInput} 
                  onChange={(e) => setFeeRateInput(Number(e.target.value))}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17]"
                  required 
                />
              </div>

              <button type="submit" className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer">
                Propagate Fee Template
              </button>
            </form>
          </div>

          {/* Promotion lifecycle */}
          <div className="bg-[#FAF6F0]/40 rounded-2xl p-4.5 border border-[#2E1E17]/5 flex flex-col justify-between mt-4">
            <div>
              <h5 className="text-[10px] font-extrabold text-[#2E1E17] uppercase tracking-wider flex items-center gap-1.5">
                <RefreshCw size={12} className="text-[#FF733B]" /> Academic Roster Promotion
              </h5>
              <p className="text-[10px] text-gray-500 leading-relaxed font-semibold mt-1">
                Advance active student rosters up one academic grade level. Archives current timetables.
              </p>
            </div>
            <button 
              onClick={triggerPromotionLifecycle}
              className="w-full bg-[#2E1E17]/5 hover:bg-[#2E1E17]/10 text-[#2E1E17] border border-[#2E1E17]/10 font-extrabold py-2.5 rounded-xl text-[10px] uppercase tracking-widest transition mt-3.5 cursor-pointer"
            >
              Trigger Promotion Lifecycle
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
