import React, { useState } from 'react';
import { useRBAC } from '../context/RBACContext';
import { ShieldAlert, Users, DollarSign, Calendar, Clock, BookOpen, AlertTriangle } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#2E1E17] to-[#3D251A] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute right-[-5%] top-[-20%] w-64 h-64 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
              Guardian Control Portal
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-serif">Frictionless Parent Workspace</h3>
            <p className="text-xs text-white/70">
              Multi-child switcher, real-time periodic attendance, fee ledgers, and advisor conference schedulers.
            </p>
          </div>

          {/* Child Switcher */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl text-xs text-left">
            <label className="block text-[8px] uppercase tracking-widest text-white/60 font-bold mb-1">Select Child</label>
            <select
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(e.target.value)}
              className="bg-transparent text-white font-bold border-0 focus:outline-none cursor-pointer outline-none"
            >
              {linkedChildren.map(c => (
                <option key={c.id} value={c.id} className="text-black">{c.name} ({c.class})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reactive Attendance Warnings */}
      {childAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start gap-3 text-xs text-left animate-pulse">
          <AlertTriangle className="text-red-600 shrink-0" size={18} />
          <div>
            <h5 className="font-extrabold uppercase tracking-wide text-[10px] text-red-700">Real-Time Attendance Alert</h5>
            <div className="space-y-1 mt-1">
              {childAlerts.map(a => (
                <p key={a.id}>{a.message}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Child Attendance Breakdown */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
            <BookOpen size={18} className="text-blue-600" />
            <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Periodic Attendance Breakdown ({activeChild?.name})</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {['Period 1', 'Period 2', 'Period 3', 'Period 4'].map((periodName) => {
              const log = childAttendanceLogs.find(l => l.period === periodName);
              const status = log ? log.status : 'Present'; // Defaults to Present

              return (
                <div key={periodName} className="p-3 bg-[#FAF6F0]/40 border border-[#2E1E17]/5 rounded-xl text-left flex justify-between items-center text-xs">
                  <div>
                    <h5 className="font-bold text-[#2E1E17]">{periodName}</h5>
                    <span className="text-[9.5px] text-gray-500 block mt-0.5 font-mono">{log ? log.timestamp.split(' ')[1] : '08:30 AM'}</span>
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
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">Scholar Ledger</span>
                    <strong className="text-base font-serif text-[#2E1E17]">{fee.studentName}</strong>
                  </div>
                  <span className={`text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded border inline-block ${
                    fee.status === 'paid' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                  }`}>
                    {fee.status}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-[#2E1E17]/85 pt-1 border-t border-[#2E1E17]/5">
                  <span>Balance Due:</span>
                  <strong className="text-black font-extrabold">${fee.status === 'paid' ? 0 : fee.amountDue - fee.amountPaid}</strong>
                </div>

                {fee.status !== 'paid' && (
                  <button 
                    onClick={() => handlePayFee(fee.studentId)}
                    className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-widest transition shadow-md"
                  >
                    Clear Dues via Secure API
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Conference Scheduler */}
      <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
          <Calendar size={18} className="text-indigo-600" />
          <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Conference Scheduler (Parent-Teacher Advisory)</h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <form onSubmit={handleScheduleConference} className="lg:col-span-5 space-y-3.5 text-left">
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Select Advisor</label>
              <select 
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17]"
              >
                {teachers.map(t => <option key={t.id} value={t.id}>{t.name} ({t.specialization})</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Preferred Date</label>
                <input 
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17]"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Preferred Time</label>
                <input 
                  type="text"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  placeholder="e.g. 10:30 AM"
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17]"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#2E1E17] hover:bg-black text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest transition">
              Confirm Conference
            </button>
          </form>

          <div className="lg:col-span-7 space-y-3 text-left">
            <h5 className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Scheduled Conferences</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scheduledConferences.map((conf) => (
                <div key={conf.id} className="p-3 bg-[#FAF6F0]/40 border border-[#2E1E17]/5 rounded-xl text-xs space-y-1">
                  <h6 className="font-extrabold text-[#2E1E17]">{conf.teacherName}</h6>
                  <p className="text-[9.5px] text-gray-500">Date: {conf.date} • Time: {conf.time}</p>
                  <span className="text-[8px] bg-indigo-50 border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded font-extrabold uppercase mt-1.5 inline-block">
                    {conf.status}
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
