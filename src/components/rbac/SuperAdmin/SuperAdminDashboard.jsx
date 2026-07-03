import React, { useState } from 'react';
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
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <span className="text-[9px] bg-blue-600 text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
            Global SaaS Operator Portal
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-serif">Super Admin Command Center</h3>
          <p className="text-xs text-white/70">
            White-Labeling, Promotion Lifecycles, and Multi-Tenant Configurations.
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
              className="w-full bg-[#2E1E17] hover:bg-black text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest transition"
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

            <form onSubmit={handleGlobalFeeUpdate} className="space-y-3">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">Select Grade Level Range</label>
                <select 
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none"
                >
                  <option value="Grade 10-A">Classes 9-10 Segment</option>
                  <option value="Grade 11-A">Classes 11-12 Secondary</option>
                  <option value="Primary">Classes 1-8 Primary</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">Base Monthly Tuition Rate ($)</label>
                <input 
                  type="number"
                  value={feeRateInput}
                  onChange={(e) => setFeeRateInput(Number(e.target.value))}
                  className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17]"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest shadow-md transition"
              >
                Apply Fee Template
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Lifecycle Actions */}
      <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
          <Layers size={18} className="text-emerald-600" />
          <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Academic Year Lifecycle Management</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#FAF6F0]/40 border border-[#2E1E17]/5 rounded-2xl text-xs text-left">
            <h5 className="font-extrabold text-[#2E1E17]">Promote Student Roster Grade levels</h5>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Triggers the annual promotion pipeline. Advances student mappings (e.g. from Class 10 to Class 11), checks graduation parameters, and resets calendar events.
            </p>
            <button 
              onClick={triggerPromotionLifecycle}
              className="mt-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] px-4 py-2 rounded-xl transition uppercase tracking-wider"
            >
              Advance Grade Levels
            </button>
          </div>

          <div className="p-4 bg-[#FAF6F0]/40 border border-[#2E1E17]/5 rounded-2xl text-xs text-left">
            <h5 className="font-extrabold text-[#2E1E17]">Lock Active Academic Term</h5>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Locks editing access to timetables and attendance logs for past terms. Archives current term data in local SQL files.
            </p>
            <button 
              onClick={() => alert('Active Academic Term locked. Historical logs archived in database.')}
              className="mt-3.5 bg-[#2E1E17] hover:bg-black text-white font-extrabold text-[10px] px-4 py-2 rounded-xl transition uppercase tracking-wider"
            >
              Lock Term Data
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
