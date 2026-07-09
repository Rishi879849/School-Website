import React, { useState } from 'react';
import { BookOpen, Users, BarChart2, ShieldCheck, GraduationCap, Calendar, Layers, ClipboardCheck } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#2F221E] to-[#45322D] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
            Department Head Portal
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-serif">Academic Department Head Dashboard</h3>
          <p className="text-xs text-white/70">
            Monitor faculty performance, verify syllabus schedules, and manage math, biology, commerce, and arts departments.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-[#2E1E17]/10 text-xs font-bold text-gray-500 bg-white rounded-3xl overflow-hidden shadow-sm">
        {Object.keys(departments).map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveDept(dept)}
            className={`flex-1 py-4 px-3 border-r border-[#2E1E17]/5 transition-all text-center flex items-center justify-center gap-2 uppercase tracking-wider text-[10px] ${
              activeDept === dept 
                ? 'bg-[#FF733B]/5 text-[#FF733B] border-b-2 border-b-[#FF733B]' 
                : 'hover:bg-gray-50 bg-white'
            }`}
          >
            <Layers size={14} />
            <span>{dept}</span>
          </button>
        ))}
      </div>

      {/* Main Stats and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - Roster & Performance */}
        <div className="lg:col-span-8 space-y-6">
          {/* Faculty Roster */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4 text-left">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <Users size={18} className="text-[#FF733B]" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Faculty Roster & Roles</h4>
            </div>

            <div className="space-y-3">
              {departments[activeDept].teachers.map((teacher, idx) => (
                <div key={idx} className="p-4 bg-[#FAF6F0]/50 rounded-2xl border border-[#2E1E17]/5 flex justify-between items-center">
                  <div>
                    <h5 className="text-xs font-extrabold text-[#2E1E17]">{teacher.name}</h5>
                    <p className="text-[10px] text-gray-500 font-medium mt-0.5">{teacher.qualification}</p>
                  </div>
                  <span className="text-[10px] bg-[#FF733B]/10 text-[#FF733B] font-bold px-2.5 py-1 rounded-xl">
                    {teacher.classAssigned}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Progress */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4 text-left">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <BookOpen size={18} className="text-[#FF733B]" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Curriculum Progress</h4>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#2E1E17] mb-1.5">
                  <span>Term Syllabus Completion</span>
                  <span>{departments[activeDept].syllabusProgress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF733B] to-[#FF9A5C] transition-all duration-500" 
                    style={{ width: `${departments[activeDept].syllabusProgress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {departments[activeDept].subjects.map((sub, idx) => (
                  <div key={idx} className="p-3 bg-[#FAF6F0]/30 rounded-xl border border-[#2E1E17]/5 text-center text-xs font-bold text-[#2E1E17]">
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tasks & Quick Actions */}
        <div className="lg:col-span-4 space-y-6 text-left">
          {/* Stats Summary */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <BarChart2 size={18} className="text-[#FF733B]" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Performance Index</h4>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500">Subject Average</span>
                <span className="text-xs font-extrabold text-[#2E1E17]">{departments[activeDept].performance}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500">Board Results</span>
                <span className="text-xs font-extrabold text-[#2E1E17]">{departments[activeDept].passRate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500">Department Head</span>
                <span className="text-xs font-extrabold text-[#FF733B]">{departments[activeDept].head}</span>
              </div>
            </div>
          </div>

          {/* Action Tasks */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <ClipboardCheck size={18} className="text-[#FF733B]" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Required Actions</h4>
            </div>

            <div className="space-y-3">
              {departments[activeDept].tasks.map((task) => (
                <div key={task.id} className="p-3 bg-[#FAF6F0]/50 rounded-xl border border-[#2E1E17]/5 space-y-2">
                  <span className="text-[10px] font-extrabold text-[#2E1E17] block leading-snug">{task.title}</span>
                  <div className="flex justify-between items-center">
                    <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {task.status}
                    </span>
                    <button 
                      onClick={() => alert(`Task "${task.title}" action completed.`)}
                      className="text-[9px] text-[#FF733B] font-extrabold hover:underline"
                    >
                      Process Action
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
