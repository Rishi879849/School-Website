import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Compass, Train, Send } from 'lucide-react';

export default function LocationPage() {
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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Navigation & Coordinates</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Campus Location</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Edukids Academy is situated in the historical city of Bhopal, easily accessible via rail, road, and air links.
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-80 rounded-[2rem] border border-[#2E1E17]/15 overflow-hidden shadow-inner bg-slate-50 relative flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#FAF6F0]/20 pointer-events-none" />
          {/* Simulated Map Graphic using simple visual markers */}
          <div className="text-center space-y-2 z-10">
            <div className="w-12 h-12 bg-orange-500/20 text-[#FF733B] rounded-full flex items-center justify-center mx-auto animate-bounce">
              <MapPin size={24} />
            </div>
            <h4 className="text-xs font-bold text-[#2E1E17]">Edukids Academy Campus</h4>
            <p className="text-[10px] text-gray-400 font-medium">Bhopal Bypass Road, Gandhi Nagar, Bhopal, MP 462033</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <Compass size={20} className="text-[#FF733B]" />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Coordinates</h4>
            <p className="text-[10px] text-gray-500 font-medium">Latitude: 23.2599° N<br />Longitude: 77.4126° E</p>
          </div>
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <Train size={20} className="text-[#FF733B]" />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Access Node</h4>
            <p className="text-[10px] text-gray-500 font-medium">10 km from Bhopal Junction Railway Station, 5 km from Raja Bhoj Airport.</p>
          </div>
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
            <Send size={20} className="text-[#FF733B]" />
            <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Bypass Routes</h4>
            <p className="text-[10px] text-gray-500 font-medium">Connected directly via National Highway 12 bypass lanes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
