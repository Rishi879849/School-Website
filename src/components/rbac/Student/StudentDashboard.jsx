import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRBAC } from '../context/RBACContext';
import { Award, BookOpen, Clock, CheckSquare, Smile, Calendar, CheckCircle2, Circle } from 'lucide-react';

export default function StudentDashboard() {
  const { 
    timetable, 
    attendance, 
    students 
  } = useRBAC();

  const studentObj = students.find(s => s.id === 'S101') || students[0];

  // Gamified study task lists
  const [todoList, setTodoList] = useState([
    { id: 1, text: 'Solve quadratic algebra practice set 4', completed: false },
    { id: 2, text: 'Read Biology chapter on plant cell replication', completed: true },
    { id: 3, text: 'Submit computational coding logic script', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  // Well-being state
  const [mood, setMood] = useState(null);

  const handleToggleTask = (id) => {
    setTodoList(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTodoList(prev => [
      ...prev,
      { id: Date.now(), text: newTaskText, completed: false }
    ]);
    setNewTaskText('');
  };

  // Cumulative Attendance Calculation
  const studentLogs = attendance.filter(log => log.studentId === studentObj.id);
  const presentCount = studentLogs.filter(log => log.status === 'Present').length;
  const totalMarked = studentLogs.length;
  const attendancePercentage = totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 100;

  return (
    <div className="space-y-6 text-left">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#FF733B] to-[#D85620] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-white/5">
        <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <span className="text-[9px] bg-white text-[#FF733B] font-extrabold uppercase px-3 py-0.5 rounded-full tracking-widest inline-block">
            Gamified Learner Portal
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-serif mt-1">Welcome back, {studentObj.name}!</h3>
          <p className="text-xs text-white/80">
            Track your XP standings, review class periods, check off study tasks, and log your daily well-being status.
          </p>
        </div>
      </div>

      {/* Gamification metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-2xl p-5 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Level Standing</span>
          <h5 className="text-3xl font-extrabold text-[#2E1E17] mt-1.5">Lvl {studentObj.level}</h5>
          <span className="text-[10px] text-[#FF733B] font-bold block mt-1">{studentObj.xp} Cumulative XP</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Cumulative Attendance</span>
          <h5 className="text-3xl font-extrabold text-[#2E1E17] mt-1.5">{attendancePercentage}%</h5>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">Excellent Record</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider mb-2 block">Acquired Badges</span>
          <div className="flex justify-center gap-1.5 flex-wrap">
            {studentObj.badges.map((b, idx) => (
              <span key={idx} className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Award size={10} /> {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Dynamic Timeline Today */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
            <Calendar size={18} className="text-[#FF733B]" />
            <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Today's Academic Timeline</h4>
          </div>

          <div className="space-y-3">
            {timetable.map((slot) => {
              const attendanceLog = attendance.find(r => r.studentId === studentObj.id && r.period === slot.period);
              const attendanceStatus = attendanceLog ? attendanceLog.status : 'Not Marked';

              return (
                <div key={slot.id} className="p-3.5 bg-[#FAF6F0]/40 rounded-2xl border border-[#2E1E17]/5 text-xs text-left flex items-center justify-between gap-4 transition hover:bg-[#FAF6F0]/80">
                  <div>
                    <h5 className="font-extrabold text-[#2E1E17]">{slot.subject}</h5>
                    <span className="text-[9.5px] text-gray-500 block mt-0.5 font-mono"><Clock size={11} className="inline mr-1" /> {slot.timeSlot}</span>
                    <span className="text-[9.5px] text-gray-400 block font-semibold">Location: {slot.room}</span>
                  </div>
                  
                  <span className={`text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded border inline-block ${
                    attendanceStatus === 'Present' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : attendanceStatus === 'Tardy'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : attendanceStatus === 'Absent'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-gray-50 text-gray-500 border-gray-200'
                  }`}>
                    {attendanceStatus}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Study Checklist & Wellbeing */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Study checklist */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <CheckSquare size={18} className="text-[#FF733B]" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Study Tasks To-Do</h4>
            </div>

            <form onSubmit={handleAddTask} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Add new study goal..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="flex-1 py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B] transition"
              />
              <button type="submit" className="bg-[#2E1E17] text-white text-[10px] font-extrabold uppercase px-4 py-2 rounded-xl cursor-pointer">Add</button>
            </form>

            <div className="space-y-2 mt-3">
              {todoList.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleToggleTask(item.id)}
                  className={`p-3 rounded-xl border text-xs text-left cursor-pointer flex items-center justify-between transition ${
                    item.completed 
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800 line-through' 
                      : 'bg-[#FAF6F0]/30 border-[#2E1E17]/5 text-[#2E1E17] hover:bg-[#FAF6F0]/80'
                  }`}
                >
                  <span className="font-semibold">{item.text}</span>
                  {item.completed ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Circle size={14} className="text-gray-400" />}
                </div>
              ))}
            </div>
          </div>

          {/* Daily Well-being */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <Smile size={18} className="text-indigo-600" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Daily Well-being Tracker</h4>
            </div>

            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
              How are you feeling today? Log status for principal check-ins.
            </p>

            <div className="flex gap-2.5 justify-between">
              {[
                { emoji: '😊', label: 'Motivated' },
                { emoji: '🥱', label: 'Tired' },
                { emoji: '🤯', label: 'Stressed' },
                { emoji: '🤩', label: 'Inspired' }
              ].map((m, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    setMood(m.label);
                    alert(`Well-being logged: ${m.label}`);
                  }}
                  className={`flex-1 p-2.5 rounded-xl border text-center transition cursor-pointer ${
                    mood === m.label 
                      ? 'bg-indigo-50 border-indigo-400 shadow-sm' 
                      : 'bg-white hover:bg-gray-50 border-[#2E1E17]/10'
                  }`}
                >
                  <span className="text-lg block">{m.emoji}</span>
                  <span className="text-[8.5px] font-bold text-gray-500 block mt-1 uppercase tracking-wider">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
