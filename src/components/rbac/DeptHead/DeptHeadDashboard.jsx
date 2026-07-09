import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, BarChart2, ShieldCheck, GraduationCap, Calendar, Layers, ClipboardCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DeptHeadDashboard() {
  const [activeDept, setActiveDept] = useState('maths');

  const departments = {
    maths: {
      head: 'Mr. Rajesh Kumar (Acting Head)',
      subjects: ['Algebra', 'Geometry', 'Trigonometry', 'Commercial Math'],
      teachers: [
        { name: 'Mrs. Anjali Sharma', qualification: 'M.Sc. Mathematics, B.Ed.', classAssigned: 'Class 9 & 10' },
        { name: 'Mr. Amit Verma', qualification: 'M.Sc. Statistics', classAssigned: 'Class 11 & 12' }
      ],
      performance: '94.5% Average Score',
      passRate: '100% Board Pass Rate',
      syllabusProgress: 85,
      tasks: [
        { id: 1, title: 'Approve Class 10 Term-1 Math Question Paper', status: 'Pending Approval' },
        { id: 2, title: 'Schedule Math Olympiad Training Sessions', status: 'In Progress' }
      ]
    },
    biology: {
      head: 'Dr. Sunita Deshmukh',
      subjects: ['Botany', 'Zoology', 'Human Anatomy', 'Environmental Science'],
      teachers: [
        { name: 'Dr. Sunita Deshmukh', qualification: 'Ph.D. in Botany, B.Ed.', classAssigned: 'Class 11 & 12' },
        { name: 'Mrs. Neha Gupta', qualification: 'M.Sc. Zoology, B.Ed.', classAssigned: 'Class 8, 9 & 10' }
      ],
      performance: '92.1% Average Score',
      passRate: '98.5% Board Pass Rate',
      syllabusProgress: 78,
      tasks: [
        { id: 1, title: 'Inspect Biology Laboratory Lab B Equipment', status: 'Pending Review' },
        { id: 2, title: 'Approve Botany Practical Examination Guidelines', status: 'Completed' }
      ]
    },
    commerce: {
      head: 'Mr. Satish Chandra',
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Entrepreneurship'],
      teachers: [
        { name: 'Mr. Satish Chandra', qualification: 'M.Com., MBA (Finance)', classAssigned: 'Class 11 & 12' },
        { name: 'Mrs. Pooja Mehta', qualification: 'M.A. Economics, B.Ed.', classAssigned: 'Class 11 & 12' }
      ],
      performance: '95.2% Average Score',
      passRate: '100% Board Pass Rate',
      syllabusProgress: 90,
      tasks: [
        { id: 1, title: 'Review Accountancy Ledger Practice Sheets', status: 'Completed' },
        { id: 2, title: 'Schedule Commerce Departmental Faculty Meeting', status: 'Pending' }
      ]
    },
    arts: {
      head: 'Mrs. Shweta Sen',
      subjects: ['English Literature', 'History', 'Geography', 'Fine Arts'],
      teachers: [
        { name: 'Mrs. Shweta Sen', qualification: 'M.A. English Literature, B.Ed.', classAssigned: 'Class 10, 11 & 12' },
        { name: 'Mr. Vikram Rathore', qualification: 'Master of Fine Arts (MFA)', classAssigned: 'Class 6 to 12' }
      ],
      performance: '91.8% Average Score',
      passRate: '99% Board Pass Rate',
      syllabusProgress: 82,
      tasks: [
        { id: 1, title: 'Review Annual English Drama Script', status: 'In Progress' },
        { id: 2, title: 'Approve Fine Arts Exhibition Gallery Setup', status: 'Pending Approval' }
      ]
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#2F221E] to-[#1E120F] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-white/5">
        <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-3 py-0.5 rounded-full tracking-widest inline-block">
            Department Head Portal
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-serif mt-1">Academic Department Head Dashboard</h3>
          <p className="text-xs text-white/70">
            Monitor faculty performance, verify syllabus schedules, and manage math, biology, commerce, and arts departments.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap p-1.5 bg-white border border-[#2E1E17]/10 rounded-2xl shadow-sm gap-1">
        {Object.keys(departments).map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveDept(dept)}
            className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] font-bold cursor-pointer ${
              activeDept === dept 
                ? 'bg-[#2E1E17] text-white shadow-md' 
                : 'hover:bg-gray-100 text-gray-500 bg-white'
            }`}
          >
            <Layers size={13} />
            <span>{dept}</span>
          </button>
        ))}
      </div>

      {/* Main Stats and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - Roster & Performance */}
        <div className="lg:col-span-8 space-y-6">
          {/* Faculty Roster */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <Users size={18} className="text-[#FF733B]" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Faculty Roster & Roles</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments[activeDept].teachers.map((teacher, idx) => (
                <div key={idx} className="p-4.5 bg-[#FAF6F0]/40 rounded-2xl border border-[#2E1E17]/5 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h5 className="text-xs font-extrabold text-[#2E1E17]">{teacher.name}</h5>
                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">{teacher.qualification}</p>
                  </div>
                  <span className="text-[9px] bg-[#FF733B]/10 text-[#FF733B] font-extrabold px-2.5 py-1 rounded-xl self-start mt-3">
                    {teacher.classAssigned}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Progress */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <BookOpen size={18} className="text-[#FF733B]" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Curriculum Progress</h4>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#2E1E17] mb-2">
                  <span>Term Syllabus Completion</span>
                  <span>{departments[activeDept].syllabusProgress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#FF733B] to-amber-400 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${departments[activeDept].syllabusProgress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Status Metrics */}
        <div className="lg:col-span-4 space-y-6">
          {/* Department Overview */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <BarChart2 size={18} className="text-[#FF733B]" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Performance Index</h4>
            </div>

            <div className="space-y-3.5">
              <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[9px] text-emerald-800 uppercase font-bold block">Average Grade Score</span>
                  <span className="font-extrabold text-emerald-950 block mt-0.5">{departments[activeDept].performance}</span>
                </div>
                <GraduationCap size={20} className="text-emerald-700" />
              </div>

              <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[9px] text-blue-800 uppercase font-bold block">Board Pass Rate</span>
                  <span className="font-extrabold text-blue-950 block mt-0.5">{departments[activeDept].passRate}</span>
                </div>
                <ShieldCheck size={20} className="text-blue-700" />
              </div>
            </div>
          </div>

          {/* Departmental Tasks */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <ClipboardCheck size={18} className="text-indigo-600" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Departmental Tasks</h4>
            </div>

            <div className="space-y-2">
              {departments[activeDept].tasks.map((task) => (
                <div key={task.id} className="p-3 bg-[#FAF6F0]/40 rounded-xl border border-[#2E1E17]/5 text-xs">
                  <h5 className="font-bold text-[#2E1E17]">{task.title}</h5>
                  <div className="flex justify-between items-center mt-2.5">
                    <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${
                      task.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : task.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {task.status}
                    </span>
                    <button 
                      onClick={() => alert(`Task status updated for: ${task.title}`)}
                      className="text-[9px] font-bold text-[#FF733B] hover:text-[#E6622E] cursor-pointer"
                    >
                      Action
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
