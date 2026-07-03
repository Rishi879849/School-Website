import React, { useState } from 'react';
import { useRBAC } from '../context/RBACContext';
import { Award, BookOpen, Clock, CheckSquare, Smile, Calendar } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#FF733B] to-[#E6622E] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <span className="text-[9px] bg-white text-[#FF733B] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
            Gamified Learner Portal
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-serif">Welcome back, {studentObj.name}!</h3>
          <p className="text-xs text-white/80">
            Track your XP standings, review class periods, check off homework tasks, and log your well-being.
          </p>
        </div>
      </div>

      {/* Gamification metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-2xl p-4 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Level Standing</span>
          <h5 className="text-3xl font-extrabold text-[#2E1E17] mt-1">Lvl {studentObj.level}</h5>
          <span className="text-[10px] text-[#FF733B] font-bold block mt-1">{studentObj.xp} Cumulative XP</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between">
          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Cumulative Attendance</span>
          <h5 className="text-3xl font-extrabold text-[#2E1E17] mt-1">{attendancePercentage}%</h5>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">Excellent Record</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#2E1E17]/10 shadow-sm">
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
              <CheckSquare size={18} className="text-indigo-600" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Study Tasks To-Do</h4>
            </div>

            <form onSubmit={handleAddTask} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Add new study goal..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="flex-1 py-1.5 px-3 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17]"
              />
              <button type="submit" className="bg-[#2E1E17] text-white text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-xl">Add</button>
            </form>

            <div className="space-y-2 mt-3">
              {todoList.map((todo) => (
                <div key={todo.id} className="flex items-center justify-between text-xs p-2 bg-[#FAF6F0]/40 rounded-xl border border-[#2E1E17]/5">
                  <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-[#2E1E17]'}`}>{todo.text}</span>
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={() => handleToggleTask(todo.id)}
                    className="w-4 h-4 rounded cursor-pointer accent-[#FF733B]" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Wellbeing */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4 text-left">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <Smile size={18} className="text-emerald-600" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Well-Being Check-in</h4>
            </div>
            
            <p className="text-[11px] text-gray-500">How is your study pace and energy balance today?</p>
            <div className="flex justify-between gap-2 mt-2">
              {[
                { label: 'Energetic', emoji: '🌟', moodVal: 'happy' },
                { label: 'Balanced', emoji: '😊', moodVal: 'good' },
                { label: 'Exhausted', emoji: '🥱', moodVal: 'tired' },
                { label: 'Anxious', emoji: '😟', moodVal: 'anxious' }
              ].map((m) => (
                <button
                  key={m.moodVal}
                  onClick={() => {
                    setMood(m.moodVal);
                    alert(`Thanks for checking in! Your homeroom team has been logged.`);
                  }}
                  className={`flex-1 p-2 rounded-xl text-center border transition-all ${
                    mood === m.moodVal ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-[#2E1E17]/10'
                  }`}
                >
                  <span className="text-xl block">{m.emoji}</span>
                  <span className="text-[8px] text-gray-500 font-bold block mt-1">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
