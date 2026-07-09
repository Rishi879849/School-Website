import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRBAC } from '../context/RBACContext';
import { ShieldAlert, Users, DollarSign, Calendar, Clock, BookOpen, AlertTriangle, MessageSquare, Award, Star } from 'lucide-react';

export default function ParentDashboard() {
  const { 
    students, 
    feeLedger, 
    updateFeeStructure, 
    teachers,
    attendanceAlerts,
    attendance
  } = useRBAC();

  // Find students linked to this parent email (parent@school.edu)
  const linkedChildren = students.filter(s => s.parentEmail === 'parent@school.edu');
  
  // Select active child context
  const [selectedChildId, setSelectedChildId] = useState(linkedChildren[0]?.id || 'S101');
  const activeChild = students.find(s => s.id === selectedChildId);

  // Conference Scheduler state
  const [selectedTeacherId, setSelectedTeacherId] = useState('T201');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [scheduledConferences, setScheduledConferences] = useState([
    { id: 1, teacherName: 'Dr. Christopher Vance', date: '2026-07-08', time: '10:00 AM', status: 'Confirmed' }
  ]);

  const handlePayFee = (studentId) => {
    updateFeeStructure(studentId, 'paid', 3500);
    alert('Tuition fee payment processed successfully! Receipt generated.');
  };

  const handleScheduleConference = (e) => {
    e.preventDefault();
    const teacherObj = teachers.find(t => t.id === selectedTeacherId);
    const teacherName = teacherObj ? teacherObj.name : 'Class Advisor';
    
    setScheduledConferences(prev => [
      ...prev,
      { id: Date.now(), teacherName, date: meetingDate, time: meetingTime, status: 'Confirmed' }
    ]);
    
    setMeetingDate('');
    setMeetingTime('');
    alert(`Conference scheduled with ${teacherName}! Check-in confirmation sent.`);
  };

  // Filter alerts for the selected child today
  const childAlerts = attendanceAlerts.filter(a => a.studentId === selectedChildId);

  // Fetch todays period logs
  const childAttendanceLogs = attendance.filter(log => log.studentId === selectedChildId);

  // Calculate child average grade
  const avgGrade = activeChild ? activeChild.grade || 85 : 85;

  return (
    <div className="space-y-6 text-left">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#2E1E17] to-[#1A100B] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-white/5">
        <div className="absolute right-[-5%] top-[-20%] w-64 h-64 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-3 py-0.5 rounded-full tracking-widest inline-block">
              Guardian Control Portal
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-serif mt-1">Frictionless Parent Workspace</h3>
            <p className="text-xs text-white/70">
              Multi-child switcher, real-time periodic attendance, fee ledgers, and advisor conferences.
            </p>
          </div>

          {/* Child Switcher */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl text-xs text-left min-w-[200px]">
            <label className="block text-[8px] uppercase tracking-widest text-white/60 font-bold mb-1.5">Select Scholar</label>
            <select
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(e.target.value)}
              className="bg-transparent text-white font-extrabold border-0 focus:outline-none cursor-pointer outline-none w-full text-xs"
            >
              {linkedChildren.map(c => (
                <option key={c.id} value={c.id} className="text-black">{c.name} ({c.class})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reactive Attendance Warnings */}
      <AnimatePresence>
        {childAlerts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start gap-3 text-xs text-left"
          >
            <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={18} />
            <div>
              <h5 className="font-extrabold uppercase tracking-wide text-[10px] text-red-700">Real-Time Attendance Alert</h5>
              <div className="space-y-1 mt-1 font-semibold">
                {childAlerts.map(a => (
                  <p key={a.id}>{a.message}</p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scholar Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-2xl p-5 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Overall Grade Average</span>
          <h5 className="text-3xl font-extrabold text-[#2E1E17] mt-1.5">{avgGrade}%</h5>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">Grade A (Passing)</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Term Attendance</span>
          <h5 className="text-3xl font-extrabold text-[#2E1E17] mt-1.5">{activeChild ? '98.2%' : '100%'}</h5>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">0 Unexcused Absences</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Assignments Completed</span>
          <h5 className="text-3xl font-extrabold text-[#2E1E17] mt-1.5">15 / 16</h5>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">1 Grading Pending</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Child Attendance Breakdown */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
            <BookOpen size={18} className="text-blue-600" />
            <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Periodic Attendance Breakdown ({activeChild?.name})</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {['Period 1', 'Period 2', 'Period 3', 'Period 4'].map((periodName) => {
              const log = childAttendanceLogs.find(l => l.period === periodName);
              const status = log ? log.status : 'Present'; 

              return (
                <div key={periodName} className="p-4 bg-[#FAF6F0]/40 border border-[#2E1E17]/5 rounded-xl text-left flex justify-between items-center text-xs">
                  <div>
                    <h5 className="font-extrabold text-[#2E1E17]">{periodName}</h5>
                    <span className="text-[9.5px] text-gray-400 font-bold block mt-0.5 font-mono">{log ? log.timestamp.split(', ')[1] || log.timestamp : '08:30 AM'}</span>
                  </div>
                  <span className={`text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded border inline-block ${
                    status === 'Present' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : status === 'Tardy'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tuition Dues Ledger */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between min-h-[250px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <DollarSign size={18} className="text-emerald-600" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Frictionless Fee Payments</h4>
            </div>

            {feeLedger.filter(f => f.studentId === selectedChildId).map((fee) => (
              <div key={fee.id} className="p-4 bg-[#FAF6F0]/40 rounded-2xl border border-[#2E1E17]/5 text-left text-xs space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">Tuition Ledger</span>
                    <h5 className="font-extrabold text-[#2E1E17] text-sm mt-0.5">AY 2026 - Term 1 Dues</h5>
                  </div>
                  <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded border ${
                    fee.status === 'paid' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                  }`}>
                    {fee.status}
                  </span>
                </div>

                <div className="flex justify-between border-t border-[#2E1E17]/5 pt-3">
                  <div>
                    <span className="text-[9px] text-gray-500 block">Total Dues</span>
                    <strong className="text-sm font-extrabold text-[#2E1E17]">${fee.amountDue}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 block">Amount Paid</span>
                    <strong className="text-sm font-extrabold text-emerald-600">${fee.amountPaid}</strong>
                  </div>
                </div>

                {fee.status !== 'paid' && (
                  <button 
                    onClick={() => handlePayFee(fee.studentId)}
                    className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest transition duration-200 shadow-md cursor-pointer"
                  >
                    Pay Remaining Dues (${fee.amountDue - fee.amountPaid})
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Conference Scheduler & Direct Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Scheduler Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
            <Calendar size={18} className="text-purple-600" />
            <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Schedule Teacher Conference</h4>
          </div>

          <form onSubmit={handleScheduleConference} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Teacher</label>
                <select 
                  value={selectedTeacherId} 
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.specialization})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Date</label>
                <input 
                  type="date" 
                  value={meetingDate} 
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none"
                  required 
                />
              </div>

              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Time</label>
                <input 
                  type="time" 
                  value={meetingTime} 
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none"
                  required 
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#2E1E17] hover:bg-black text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer">
              Book Conference Appointment
            </button>
          </form>
        </div>

        {/* Scheduled List */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
            <Clock size={18} className="text-[#FF733B]" />
            <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Scheduled Conferences</h4>
          </div>

          <div className="space-y-3.5 max-h-48 overflow-y-auto pr-1">
            {scheduledConferences.map((conf) => (
              <div key={conf.id} className="p-3.5 bg-[#FAF6F0]/40 border border-[#2E1E17]/5 rounded-2xl flex justify-between items-center text-xs text-left">
                <div>
                  <h5 className="font-extrabold text-[#2E1E17]">{conf.teacherName}</h5>
                  <span className="text-[9.5px] text-gray-400 font-bold block mt-0.5">Date: {conf.date} • Time: {conf.time}</span>
                </div>
                <span className="text-[9px] font-extrabold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-lg">
                  {conf.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
