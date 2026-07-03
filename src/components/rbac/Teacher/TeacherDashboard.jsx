import React, { useState } from 'react';
import { useRBAC } from '../context/RBACContext';
import { Clock, CheckSquare, Sparkles, Send, UserCheck, Star, HelpCircle } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
            Classroom Leader Portal
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-serif">Teacher Homeroom Advisor Workspace</h3>
          <p className="text-xs text-white/70">
            Log periodic attendance, configure study feedback with AI, and alert parent profiles.
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
                className="py-1 px-3.5 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
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
                        <div className="inline-flex gap-1">
                          {['Present', 'Absent', 'Tardy'].map((st) => (
                            <button
                              key={st}
                              onClick={() => handleToggleAttendance(student.id, st)}
                              className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded border transition-all ${
                                currentStatus === st
                                  ? 'bg-[#2E1E17] text-white border-black'
                                  : 'bg-white hover:bg-gray-100 text-gray-500 border-gray-200'
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

        {/* AI-Assisted Grading Feedbacks */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between min-h-[350px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <Sparkles size={18} className="text-[#FF733B]" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">AI-Assisted Student Grading Feedback</h4>
            </div>

            <div className="space-y-3.5 text-left">
              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Select Student</label>
                <select 
                  value={selectedStudent} 
                  onChange={(e) => {
                    setSelectedStudent(e.target.value);
                    setAiFeedbackText('');
                  }} 
                  className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                >
                  {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Assigned Mark / Score (%)</label>
                <input 
                  type="number" 
                  value={marksInput}
                  onChange={(e) => setMarksInput(Number(e.target.value))}
                  className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                />
              </div>

              <button 
                onClick={generateAiFeedback}
                disabled={isGeneratingFeedback}
                className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-widest transition flex items-center justify-center gap-1.5"
              >
                {isGeneratingFeedback ? 'Evaluating...' : 'Generate AI Feedback'}
              </button>

              {aiFeedbackText && (
                <div className="p-3 bg-purple-50/50 border border-purple-200/55 rounded-2xl text-[10px] text-purple-900 leading-relaxed italic text-left">
                  <strong>AI Generated Paragraph:</strong> "{aiFeedbackText}"
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Parent communications hub */}
      <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
          <Clock size={18} className="text-indigo-600" />
          <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Parent Communications & Advisories Channel</h4>
        </div>

        <form onSubmit={handlePostMessage} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4 space-y-3.5 text-left">
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Alert Topic</label>
              <input 
                type="text"
                value={msgTitle}
                onChange={(e) => setMsgTitle(e.target.value)}
                placeholder="e.g. Unit Test Results Advisory"
                className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#2E1E17] hover:bg-black text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest transition">
              Post Advisory Log
            </button>
          </div>

          <div className="lg:col-span-8">
            <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1 text-left">Advisory Message Content</label>
            <textarea 
              rows={3}
              value={msgContent}
              onChange={(e) => setMsgContent(e.target.value)}
              placeholder="Detail comments or classroom updates to parents..."
              className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none"
              required
            ></textarea>
          </div>
        </form>
      </div>

    </div>
  );
}
