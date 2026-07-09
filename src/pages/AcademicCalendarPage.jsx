import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';

export default function AcademicCalendarPage() {
  const dates = [
    { date: 'July 10, 2026', event: 'New Academic Session Commences', type: 'commence' },
    { date: 'August 15, 2026', event: 'Independence Day Celebrations & Holiday', type: 'holiday' },
    { date: 'September 20-25, 2026', event: 'Half-Yearly Written Examinations', type: 'evaluation' },
    { date: 'October 12, 2026', event: 'Syllabus completion & Progress Report Compilation', type: 'lock' },
    { date: 'November 15-30, 2026', event: 'Annual School Board Examinations', type: 'exam' }
  ];

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-[#2E1E17]/10 p-8 md:p-10 shadow-xl space-y-8 relative overflow-hidden">
        <div className="absolute right-[-5%] top-[-5%] w-[200px] h-[200px] bg-[#FF733B]/5 rounded-full blur-[40px] pointer-events-none" />

        <div className="space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Academic Calendar</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Term Schedules & Events</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Track key school dates, parent-teacher meetings, examinations weeks, and academic activities.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2E1E17]/10">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <Calendar size={16} className="text-[#FF733B]" /> Academic Year 2026 Schedule
          </h3>
          
          <div className="overflow-x-auto rounded-2xl border border-[#2E1E17]/10">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-[#2E1E17]/10 font-bold text-gray-500">
                  <th className="p-4 w-40">Scheduled Date</th>
                  <th className="p-4">Event Description</th>
                  <th className="p-4 w-32 text-center">Event Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2E1E17]/10 font-semibold text-[#2E1E17]/80">
                {dates.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF6F0]/20 transition">
                    <td className="p-4 font-extrabold text-[#FF733B]">{item.date}</td>
                    <td className="p-4 text-[#2E1E17] flex items-center gap-2">
                      <FileText size={12} className="text-gray-400" /> {item.event}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                        item.type === 'commence' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : item.type === 'exam' 
                            ? 'bg-red-100 text-red-700'
                            : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
