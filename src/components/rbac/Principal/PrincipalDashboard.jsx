import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRBAC } from '../context/RBACContext';
import { Bell, Heart, ShieldAlert, Award, FileText, Send, UserCheck, Star } from 'lucide-react';

export default function PrincipalDashboard() {
  const { 
    students, 
    teachers, 
    broadcasts, 
    addBroadcast 
  } = useRBAC();

  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('all');

  const handlePublish = (e) => {
    e.preventDefault();
    addBroadcast(broadcastTitle, broadcastContent, broadcastTarget, 'Principal Arthur Pendelton');
    setBroadcastTitle('');
    setBroadcastContent('');
    alert('Campus-wide announcement broadcasted successfully!');
  };

  // Metric aggregates
  const avgAttendance = 94.2;
  const avgGpa = 83.5;
  const riskStudentsCount = students.filter(s => s.xp < 200).length;

  return (
    <div className="space-y-6 text-left">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#451A03] to-[#200B00] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-white/5">
        <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1.5">
          <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-3 py-0.5 rounded-full tracking-widest inline-block">
            Academic Executive Portal
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-serif mt-1">Academic Command Center</h3>
          <p className="text-xs text-white/70">
            School Trust standing, announcements, compliance records, and campus sentiment index.
          </p>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Campus Avg Attendance', value: `${avgAttendance}%`, detail: 'Optimal (Target: 95%)', icon: UserCheck, color: 'text-blue-600 bg-blue-50/50 border-blue-500/10' },
          { title: 'Global Grade Average', value: `${avgGpa}%`, detail: 'Grade B+ Cohort Standing', icon: Award, color: 'text-indigo-600 bg-indigo-50/50 border-indigo-500/10' },
          { title: 'Scholars at Academic Risk', value: `${riskStudentsCount} Pupils`, detail: 'Requires peer study buddy', icon: ShieldAlert, color: 'text-red-600 bg-red-50/50 border-red-500/10' },
          { title: 'Campus Sentiment Index', value: '4.8 / 5.0', detail: 'High positive engagement', icon: Heart, color: 'text-emerald-600 bg-emerald-50/50 border-emerald-500/10' }
        ].map((stat, idx) => (
          <div key={idx} className={`bg-white border rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:scale-[1.02] transition duration-300 cursor-pointer ${stat.color}`}>
            <div className="p-3 rounded-xl bg-white border border-[#2E1E17]/5 shadow-sm">
              <stat.icon size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{stat.title}</span>
              <h4 className="text-xl font-bold text-[#2E1E17] mt-1">{stat.value}</h4>
              <span className="text-[9.5px] text-gray-400 block mt-0.5 font-semibold">{stat.detail}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Broadcast compiler */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
            <Bell size={18} className="text-[#FF733B]" />
            <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Campus Communication Dispatcher</h4>
          </div>

          <form onSubmit={handlePublish} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Broadcast Headline</label>
                <input 
                  type="text" 
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. Mandatory Assembly"
                  className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B] transition"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Target Audience</label>
                <select 
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value)}
                  className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none"
                >
                  <option value="all">All School Segments</option>
                  <option value="teachers">Teachers & Staff Only</option>
                  <option value="parents">Parents Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Content Details</label>
              <textarea 
                rows={3}
                value={broadcastContent}
                onChange={(e) => setBroadcastContent(e.target.value)}
                placeholder="Type message content here..."
                className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B] transition"
                required
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-[#2E1E17] hover:bg-black text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest transition flex items-center justify-center gap-1.5 cursor-pointer">
              <Send size={13} /> Dispatch Broadcast Announcement
            </button>
          </form>
        </div>

        {/* Compliance & sentiment index */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between min-h-[350px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <FileText size={18} className="text-indigo-600" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Compliance & Accreditation Auditing</h4>
            </div>

            <div className="space-y-3.5">
              {[
                { title: 'Vanguard Fire Safety Permit', status: 'Compliant', date: 'Expires 2027-02' },
                { title: 'CBSE Secondary Affiliation', status: 'Active Renewal', date: 'Reviewed 2026-06' },
                { title: 'Student Health & Wellness Index', status: 'Excellent', date: '98% Pass Rate' },
                { title: 'Teacher Qualification Ratio', status: 'Perfect', date: '100% Certified' }
              ].map((doc, idx) => (
                <div key={idx} className="p-3 bg-[#FAF6F0]/40 border border-[#2E1E17]/5 rounded-2xl flex justify-between items-center text-xs text-left hover:shadow-sm transition-shadow cursor-pointer">
                  <div>
                    <h5 className="font-extrabold text-[#2E1E17]">{doc.title}</h5>
                    <span className="text-[9px] text-gray-400 font-bold block mt-0.5">{doc.date}</span>
                  </div>
                  <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
