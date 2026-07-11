import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, BarChart2, Star, CheckCircle, Mail, Phone, Calendar, BookOpen, X } from 'lucide-react';

export default function DepartmentalProfilePage() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Roster of mock teachers
  const teachers = [
    {
      id: 1,
      name: 'Dr. Sarah Connor',
      dept: 'Science',
      role: 'Head of Science Department',
      bio: 'Dr. Connor holds a Ph.D. in Biological Sciences and has over 12 years of teaching experience. She leads our biology lab research projects and coordinates the annual Science Fair.',
      email: 's.connor@dtvschoolsupport.edu',
      phone: '+91 755 267-8812 (Ext: 101)',
      hours: 'Mon - Fri: 2:00 PM - 4:00 PM',
      rating: '4.9/5',
      classes: 'Grade 10 Biology, Grade 11 Chemistry',
      avatar: '👩‍🔬'
    },
    {
      id: 2,
      name: 'Prof. Alex Mercer',
      dept: 'Mathematics',
      role: 'Head of Mathematics Department',
      bio: 'Prof. Mercer has a Master\'s in Mathematics and is passionate about calculus and spatial geometry. He mentors our student math olympiad teams and leads algebra learning tracks.',
      email: 'a.mercer@dtvschoolsupport.edu',
      phone: '+91 755 267-8812 (Ext: 102)',
      hours: 'Mon - Wed: 1:00 PM - 3:00 PM',
      rating: '4.8/5',
      classes: 'Grade 9 Algebra, Grade 12 Calculus',
      avatar: '👨‍💻'
    },
    {
      id: 3,
      name: 'Mrs. Eleanor Vance',
      dept: 'Humanities',
      role: 'Subject Lead - Geography & Civics',
      bio: 'Mrs. Vance has spent a decade teaching history and world geography. She organizes the Student Mock Parliament and helps middle-schoolers develop strong citizenship values.',
      email: 'e.vance@dtvschoolsupport.edu',
      phone: '+91 755 267-8812 (Ext: 103)',
      hours: 'Tue - Thu: 3:00 PM - 5:00 PM',
      rating: '4.9/5',
      classes: 'Grade 8 Social Studies, Grade 10 Civics',
      avatar: '👩‍🏫'
    },
    {
      id: 4,
      name: 'Mr. Julian Devlin',
      dept: 'Languages',
      role: 'Senior English Literature Coach',
      bio: 'Mr. Devlin is an author and English Language expert. He guides the creative writing workshops, school magazine editorial board, and student debate clubs.',
      email: 'j.devlin@dtvschoolsupport.edu',
      phone: '+91 755 267-8812 (Ext: 104)',
      hours: 'Mon - Fri: 9:00 AM - 10:30 AM',
      rating: '4.9/5',
      classes: 'Grade 9 English, Grade 11 Literature',
      avatar: '👨‍🏫'
    }
  ];

  const filteredTeachers = selectedDept === 'All'
    ? teachers
    : teachers.filter(t => t.dept === selectedDept);

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-12 text-left relative">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="space-y-8">
        {/* Academic Overview Card */}
        <div className="bg-white rounded-[2.5rem] border border-[#2E1E17]/10 p-8 md:p-10 shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute right-[-5%] top-[-5%] w-[200px] h-[200px] bg-[#FF733B]/5 rounded-full blur-[40px] pointer-events-none" />

          <div className="space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B] block">Academic Directory</span>
            <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Meet Our Certified Educators</h2>
            <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
              At DTV School Support, our teachers are certified experts committed to nurturing students, mentoring sports activities, and facilitating advanced smart learning guides.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
              <Users className="text-[#FF733B]" size={22} />
              <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Teaching Faculty</h4>
              <span className="block text-2xl font-bold font-serif text-[#2E1E17]">40+ Educators</span>
              <p className="text-[10px] text-gray-500 font-semibold">Trained & certified teachers with years of academic experience.</p>
            </div>

            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
              <BarChart2 className="text-[#FF733B]" size={22} />
              <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Board Success Rate</h4>
              <span className="block text-2xl font-bold font-serif text-[#2E1E17]">100% Passes</span>
              <p className="text-[10px] text-gray-500 font-semibold">Consistent top grades in Class 10 & Class 12 board exams.</p>
            </div>

            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#2E1E17]/5 space-y-2">
              <Star className="text-[#FF733B]" size={22} />
              <h4 className="text-xs font-bold text-[#2E1E17] uppercase tracking-wider">Parent Satisfaction</h4>
              <span className="block text-2xl font-bold font-serif text-[#2E1E17]">4.9 / 5.0 Rating</span>
              <p className="text-[10px] text-gray-500 font-semibold">Based on annual parent feedback audits and PTM records.</p>
            </div>
          </div>
        </div>

        {/* Directory Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4">
          <h3 className="text-lg font-serif font-normal text-[#2E1E17]">Faculty Roster</h3>
          
          <div className="flex flex-wrap gap-2">
            {['All', 'Science', 'Mathematics', 'Humanities', 'Languages'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`text-xs px-4 py-2 rounded-full border transition-all uppercase tracking-wider font-extrabold ${
                  selectedDept === dept
                    ? 'bg-[#FF733B] border-none text-white shadow-md'
                    : 'bg-white border-[#2E1E17]/15 text-gray-500 hover:bg-gray-50 cursor-pointer'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Teachers Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTeachers.map((teacher) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher)}
                className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-64 hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <BookOpen size={14} className="text-[#FF733B]" />
                </div>

                <div className="space-y-4">
                  <div className="text-4xl">{teacher.avatar}</div>
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#FF733B]">{teacher.dept}</span>
                    <h4 className="text-sm font-bold text-[#2E1E17] group-hover:text-[#FF733B] transition-colors mt-0.5">{teacher.name}</h4>
                    <p className="text-[10px] text-gray-400 font-extrabold">{teacher.role}</p>
                  </div>
                </div>

                <div className="border-t border-[#2E1E17]/5 pt-3 flex items-center justify-between text-[10px] font-bold text-gray-500">
                  <span className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400" /> {teacher.rating}</span>
                  <span className="text-[#FF733B] group-hover:underline">View Profile &rarr;</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Teacher Profile Modal Side Drawer */}
      <AnimatePresence>
        {selectedTeacher && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeacher(null)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              className="fixed right-0 top-0 bottom-0 max-w-md w-full bg-white border-l border-[#2E1E17]/10 z-50 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              <div className="absolute right-[-10%] top-[-10%] w-[180px] h-[180px] bg-[#FF733B]/5 rounded-full blur-[40px] pointer-events-none" />

              <div>
                {/* Close Button */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Faculty Profile</span>
                  <button 
                    onClick={() => setSelectedTeacher(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
                  >
                    <X size={16} className="text-[#2E1E17]" />
                  </button>
                </div>

                {/* Profile header */}
                <div className="flex items-start gap-4">
                  <div className="text-5xl bg-[#FAF6F0] p-4 rounded-3xl border border-[#2E1E17]/5">{selectedTeacher.avatar}</div>
                  <div className="text-left">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">{selectedTeacher.dept}</span>
                    <h3 className="text-lg font-bold text-[#2E1E17] mt-0.5">{selectedTeacher.name}</h3>
                    <p className="text-xs text-gray-400 font-extrabold">{selectedTeacher.role}</p>
                  </div>
                </div>

                {/* Bio content */}
                <div className="mt-8 space-y-6 text-xs text-left">
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#2E1E17] uppercase tracking-wider text-[10px]">Biography</h4>
                    <p className="text-gray-500 font-semibold leading-relaxed bg-[#FAF6F0] p-4 rounded-2xl border border-[#2E1E17]/5">{selectedTeacher.bio}</p>
                  </div>

                  <div className="space-y-3.5 font-bold text-[#2E1E17]/80">
                    <div className="flex items-center gap-2.5">
                      <BookOpen size={14} className="text-[#FF733B]" />
                      <span>Classes: <span className="text-gray-500">{selectedTeacher.classes}</span></span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Calendar size={14} className="text-[#FF733B]" />
                      <span>Office Hours: <span className="text-gray-500">{selectedTeacher.hours}</span></span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Star size={14} className="text-[#FF733B]" />
                      <span>Parent Audit Score: <span className="text-gray-500">{selectedTeacher.rating}</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Footer */}
              <div className="border-t border-[#2E1E17]/10 pt-6 space-y-3 text-xs text-left">
                <a href={`mailto:${selectedTeacher.email}`} className="flex items-center gap-2.5 hover:text-[#FF733B] transition font-bold text-[#2E1E17]/80">
                  <Mail size={14} className="text-[#FF733B]" /> {selectedTeacher.email}
                </a>
                <div className="flex items-center gap-2.5 font-bold text-[#2E1E17]/80">
                  <Phone size={14} className="text-[#FF733B]" /> {selectedTeacher.phone}
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
