import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Book, User, ArrowLeft } from 'lucide-react';

export default function TimeTablePage() {
  const [selectedGrade, setSelectedGrade] = useState('Grade 10-A');

  const timetables = {
    'Grade 10-A': [
      { day: 'Monday', slots: [
        { time: '09:00 - 10:30 AM', subject: 'Genomics & AI', teacher: 'Dr. Christopher Vance', room: 'Lab 3-A' },
        { time: '10:45 - 12:15 PM', subject: 'Quantum Physics', teacher: 'Sarah Lin, M.Sc.', room: 'Hall 102' },
        { time: '01:00 - 02:30 PM', subject: 'Computational English', teacher: 'Prof. Alistair Cook', room: 'Room 204' }
      ]},
      { day: 'Tuesday', slots: [
        { time: '09:00 - 10:30 AM', subject: 'Computational English', teacher: 'Prof. Alistair Cook', room: 'Room 204' },
        { time: '10:45 - 12:15 PM', subject: 'WebGL Design', teacher: 'Sarah Lin, M.Sc.', room: 'Lab 5-B' },
        { time: '02:45 - 04:15 PM', subject: 'Physics Practical', teacher: 'Sarah Lin, M.Sc.', room: 'Lab 3-A' }
      ]},
      { day: 'Wednesday', slots: [
        { time: '09:00 - 10:30 AM', subject: 'Genomics & AI', teacher: 'Dr. Christopher Vance', room: 'Lab 3-A' },
        { time: '10:45 - 12:15 PM', subject: 'Quantum Physics', teacher: 'Sarah Lin, M.Sc.', room: 'Hall 102' },
        { time: '01:00 - 02:30 PM', subject: 'Creative Lab', teacher: 'Prof. Alistair Cook', room: 'VR Sandbox' }
      ]},
      { day: 'Thursday', slots: [
        { time: '10:45 - 12:15 PM', subject: 'WebGL Design', teacher: 'Sarah Lin, M.Sc.', room: 'Lab 5-B' },
        { time: '01:00 - 02:30 PM', subject: 'Internet Jurisprudence', teacher: 'Prof. Alistair Cook', room: 'Room 204' }
      ]},
      { day: 'Friday', slots: [
        { time: '09:00 - 10:30 AM', subject: 'Genomics & AI', teacher: 'Dr. Christopher Vance', room: 'Lab 3-A' },
        { time: '10:45 - 12:15 PM', subject: 'Quantum Physics', teacher: 'Sarah Lin, M.Sc.', room: 'Hall 102' },
        { time: '01:00 - 02:30 PM', subject: 'Progress Evaluation', teacher: 'Academic Panel', room: 'Online Portal' }
      ]}
    ],
    'Grade 11-A': [
      { day: 'Monday', slots: [
        { time: '09:00 - 10:30 AM', subject: 'Algorithmic Trading', teacher: 'Dr. Christopher Vance', room: 'Trading Lab' },
        { time: '01:00 - 02:30 PM', subject: 'Micro-Market Economics', teacher: 'Prof. Alistair Cook', room: 'Room 301' }
      ]},
      { day: 'Tuesday', slots: [
        { time: '10:45 - 12:15 PM', subject: 'Quantitative Finance', teacher: 'Dr. Christopher Vance', room: 'Lab 3-A' },
        { time: '01:00 - 02:30 PM', subject: 'Micro-Market Economics', teacher: 'Prof. Alistair Cook', room: 'Room 301' }
      ]},
      { day: 'Wednesday', slots: [
        { time: '09:00 - 10:30 AM', subject: 'Algorithmic Trading', teacher: 'Dr. Christopher Vance', room: 'Trading Lab' },
        { time: '10:45 - 12:15 PM', subject: 'VR Financial Sandbox', teacher: 'Sarah Lin, M.Sc.', room: 'VR Sandbox' }
      ]},
      { day: 'Thursday', slots: [
        { time: '09:00 - 10:30 AM', subject: 'AI Algorithmic Code', teacher: 'Sarah Lin, M.Sc.', room: 'Lab 5-B' },
        { time: '01:00 - 02:30 PM', subject: 'Micro-Market Economics', teacher: 'Prof. Alistair Cook', room: 'Room 301' }
      ]},
      { day: 'Friday', slots: [
        { time: '10:45 - 12:15 PM', subject: 'Quantitative Finance', teacher: 'Dr. Christopher Vance', room: 'Lab 3-A' },
        { time: '01:00 - 02:30 PM', subject: 'Audit & Evaluation', teacher: 'Academic Panel', room: 'Hall 102' }
      ]}
    ]
  };

  const scheduleList = timetables[selectedGrade] || timetables['Grade 10-A'];

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Schedule Ledgers</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17]">Academic Time Table</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto font-medium">
            Monitor weekly course distributions, simulator sandboxes scheduled hours, and teacher availability.
          </p>
        </div>

        {/* Grade Selector */}
        <div className="flex justify-center gap-2">
          {['Grade 10-A', 'Grade 11-A'].map(grade => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-5 py-2 rounded-full border transition-all text-xs font-bold uppercase tracking-wider ${
                selectedGrade === grade
                  ? 'bg-[#FF733B] border-none text-white shadow-md'
                  : 'bg-white border-[#2E1E17]/10 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {scheduleList.map((daySchedule, idx) => (
            <div key={idx} className="bg-white border border-[#2E1E17]/10 rounded-[2rem] p-5 shadow-sm space-y-4 hover:shadow-md transition duration-300">
              <div className="border-b border-[#2E1E17]/10 pb-2 flex justify-between items-center">
                <h4 className="text-sm font-extrabold text-[#2E1E17] font-serif">{daySchedule.day}</h4>
                <Calendar size={12} className="text-[#FF733B]" />
              </div>
              
              <div className="space-y-3">
                {daySchedule.slots.length > 0 ? (
                  daySchedule.slots.map((slot, sIdx) => (
                    <div key={sIdx} className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#2E1E17]/5 space-y-2 text-xs relative group hover:border-[#FF733B]/30 transition duration-200">
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-extrabold">
                        <Clock size={10} /> {slot.time}
                      </div>
                      
                      <div className="font-extrabold text-[#2E1E17] text-xs leading-snug">
                        {slot.subject}
                      </div>
                      
                      <div className="space-y-0.5 text-[10px] text-gray-500 font-semibold">
                        <div className="flex items-center gap-1">
                          <User size={9} /> {slot.teacher}
                        </div>
                        <div className="flex items-center gap-1">
                          <Book size={9} /> Room: {slot.room}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-gray-400 font-semibold py-6 text-center">No modules scheduled</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
