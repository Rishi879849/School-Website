import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRBAC } from '../context/RBACContext';
import { Clock, CheckSquare, Sparkles, Send, UserCheck, Star, HelpCircle, AlertCircle } from 'lucide-react';

export default function TeacherDashboard() {
  const { 
    students, 
    timetable, 
    attendance, 
    submitAttendance, 
    addBroadcast 
  } = useRBAC();

  const [selectedPeriod, setSelectedPeriod] = useState('Period 1');
  const [selectedStudent, setSelectedStudent] = useState('S101');
  const [marksInput, setMarksInput] = useState(85);
  const [aiFeedbackText, setAiFeedbackText] = useState('');
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);

  // Message compiler to parents
  const [msgTitle, setMsgTitle] = useState('');
  const [msgContent, setMsgContent] = useState('');

  // Handle periodic attendance toggling
  const handleToggleAttendance = (studentId, status) => {
    const activeTimetableSlot = timetable.find(t => t.period === selectedPeriod) || timetable[0];
    submitAttendance(studentId, activeTimetableSlot.id, selectedPeriod, status, 'T201');
  };

  // Generate AI feedback suggestions
  const generateAiFeedback = () => {
    setIsGeneratingFeedback(true);
    setTimeout(() => {
      let gradeFeedback = '';
      if (marksInput >= 90) {
        gradeFeedback = 'Demonstrates exemplary understanding of computational logic and conceptual workflows. Keep pushing the boundaries of your coursework!';
      } else if (marksInput >= 75) {
        gradeFeedback = 'Shows steady competency across core modules. A minor focus on review sessions and peer studying will push this to outstanding performance.';
      } else {
        gradeFeedback = 'Requires structured intervention and guided practice. Recommend scheduling an extra study support block to align core skills.';
      }
      setAiFeedbackText(gradeFeedback);
      setIsGeneratingFeedback(false);
    }, 1000);
  };

  const handlePostMessage = (e) => {
    e.preventDefault();
    addBroadcast(msgTitle, msgContent, 'parents', 'Teacher Dr. Christopher Vance');
    setMsgTitle('');
    setMsgContent('');
    alert('Attendance and grading alerts posted successfully to Parents feed!');
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-white/5">
        <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-3 py-0.5 rounded-full tracking-widest inline-block">
            Classroom Leader Portal
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-serif mt-1">Teacher Homeroom Advisor Workspace</h3>
          <p className="text-xs text-white/70">
            Log periodic attendance, configure study feedback with AI, and alert parent profiles instantly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Engine B: Attendance Logger */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
            <div className="flex items-center gap-2">
              <CheckSquare size={18} className="text-[#FF733B]" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Periodic Attendance Logger</h4>
            </div>

            <div className="flex gap-2">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="py-1.5 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none"
              >
                <option value="Period 1">Period 1 (08:30 AM)</option>
                <option value="Period 2">Period 2 (10:00 AM)</option>
                <option value="Period 3">Period 3 (11:30 AM)</option>
                <option value="Period 4">Period 4 (01:30 PM)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2E1E17]/10 text-gray-400 font-bold">
                  <th className="py-2.5">Student Name</th>
                  <th className="py-2.5">Roll No</th>
                  <th className="py-2.5">Current Status</th>
                  <th className="py-2.5 text-right">Attendance Action Toggles</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const studentLog = attendance.find(r => r.studentId === student.id && r.period === selectedPeriod);
                  const currentStatus = studentLog ? studentLog.status : 'Present';
                  
                  return (
                    <tr key={student.id} className="border-b border-[#2E1E17]/5 hover:bg-gray-50/50 transition">
                      <td className="py-3 flex items-center gap-2">
                        <img src={student.avatar} alt="" className="w-6 h-6 rounded-full object-cover border border-[#2E1E17]/10" />
                        <span className="font-bold text-[#2E1E17]">{student.name}</span>
                      </td>
                      <td className="py-3 text-gray-500 font-mono">{student.roll}</td>
                      <td className="py-3">
                        <span className={`text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded border inline-block ${
                          currentStatus === 'Present' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : currentStatus === 'Tardy'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                        }`}>
                          {currentStatus}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="inline-flex gap-1 bg-[#FAF6F0] p-1 rounded-xl border border-[#2E1E17]/5">
                          {['Present', 'Absent', 'Tardy'].map((st) => (
                            <button
                              key={st}
                              onClick={() => handleToggleAttendance(student.id, st)}
                              className={`text-[8.5px] font-extrabold uppercase px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                                currentStatus === st
                                  ? 'bg-[#2E1E17] text-white border-black shadow-sm'
                                  : 'bg-transparent hover:bg-white text-gray-500 border-transparent'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Engine C: Gradebook with AI study suggestions */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
            <Sparkles size={18} className="text-[#FF733B]" />
            <h4 className="text-sm font-bold text-[#2E1E17] font-serif">AI Feedback Engine</h4>
          </div>

          <div className="space-y-4 text-xs text-left">
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Select Student</label>
              <select 
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.roll})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Assigned Marks (Max 100)</label>
              <input 
                type="number"
                min="0"
                max="100"
                value={marksInput}
                onChange={(e) => setMarksInput(Number(e.target.value))}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none"
              />
            </div>

            <button 
              onClick={generateAiFeedback}
              disabled={isGeneratingFeedback}
              className="w-full bg-[#2E1E17] hover:bg-black text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-widest transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isGeneratingFeedback ? (
                <>
                  <RefreshCw size={12} className="animate-spin" /> Synthesizing Suggestions...
                </>
              ) : (
                <>
                  <Sparkles size={12} /> Generate AI Feedback Suggestions
                </>
              )}
            </button>

            {aiFeedbackText && (
              <div className="p-3.5 bg-indigo-50/50 border border-indigo-150 rounded-2xl space-y-1.5">
                <span className="text-[9px] text-indigo-800 uppercase font-bold tracking-wider block">Suggested Feedback:</span>
                <p className="text-[10px] text-indigo-950 leading-relaxed font-semibold">{aiFeedbackText}</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Dispatch alerts to parent profiles */}
      <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
          <Send size={18} className="text-emerald-600" />
          <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Post Roster Alert Notice</h4>
        </div>

        <form onSubmit={handlePostMessage} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Alert Headline</label>
              <input 
                type="text" 
                value={msgTitle}
                onChange={(e) => setMsgTitle(e.target.value)}
                placeholder="e.g. Absentee Alert: Algebra Homework"
                className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Target Guardian Group</label>
              <select className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none">
                <option value="parents">Linked Parents (Grade 10-A)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Detailed Message Content</label>
            <textarea 
              rows={2}
              value={msgContent}
              onChange={(e) => setMsgContent(e.target.value)}
              placeholder="Provide exact details for parental attention..."
              className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B]"
              required
            ></textarea>
          </div>

          <button type="submit" className="bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer">
            Broadcast Alert to Parents
          </button>
        </form>
      </div>

    </div>
  );
}
