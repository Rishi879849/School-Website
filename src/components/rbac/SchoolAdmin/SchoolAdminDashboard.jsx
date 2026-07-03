import React, { useState } from 'react';
import { useRBAC } from '../context/RBACContext';
import { Calendar, Plus, Clock, MapPin, BookOpen, Trash2, ShieldCheck, DollarSign } from 'lucide-react';

export default function SchoolAdminDashboard() {
  const { 
    timetable, 
    addTimetableEntry, 
    teachers, 
    calendarEvents, 
    addCalendarEvent, 
    feeLedger,
    updateFeeStructure 
  } = useRBAC();

  // Timetable builder states
  const [classInput, setClassInput] = useState('Grade 10-A');
  const [dayInput, setDayInput] = useState('Monday');
  const [periodInput, setPeriodInput] = useState('Period 1');
  const [timeSlotInput, setTimeSlotInput] = useState('08:30 AM - 09:30 AM');
  const [subjectInput, setSubjectInput] = useState('Mathematics');
  const [teacherInput, setTeacherInput] = useState('T201');
  const [roomInput, setRoomInput] = useState('Room 101');

  // Calendar Event states
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('holiday');

  // Fee management states
  const [feeStudentId, setFeeStudentId] = useState('S101');
  const [feeStatus, setFeeStatus] = useState('paid');
  const [feePaidAmount, setFeePaidAmount] = useState(3500);

  const handleAddTimetable = (e) => {
    e.preventDefault();
    addTimetableEntry({
      classId: classInput,
      day: dayInput,
      period: periodInput,
      timeSlot: timeSlotInput,
      subject: subjectInput,
      teacherId: teacherInput,
      room: roomInput
    });
    alert('Master Timetable Slot updated successfully!');
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    addCalendarEvent({
      title: eventTitle,
      date: eventDate,
      type: eventType
    });
    setEventTitle('');
    setEventDate('');
    alert('Academic Calendar event published!');
  };

  const handleUpdateStudentFee = (e) => {
    e.preventDefault();
    updateFeeStructure(feeStudentId, feeStatus, feePaidAmount);
    alert('Student fee payment status updated!');
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#2E1E17] to-[#4A3226] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute right-[-5%] top-[-20%] w-64 h-64 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
            Campus Operator Controls
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-serif">Campus Configuration Console</h3>
          <p className="text-xs text-white/70">
            Configure Master Timetable, Calendar, and Fees.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Engine A: Timetable Builder */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3 justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-[#FF733B]" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Visual Master Timetable Builder</h4>
            </div>
            <span className="text-[10px] text-gray-500 font-extrabold uppercase font-mono">{timetable.length} Active Slots</span>
          </div>

          <form onSubmit={handleAddTimetable} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-[#FAF6F0]/40 p-4 rounded-2xl border border-[#2E1E17]/5">
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Class Segment</label>
              <select value={classInput} onChange={(e) => setClassInput(e.target.value)} className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                <option value="Grade 9-A">Grade 9-A</option>
                <option value="Grade 10-A">Grade 10-A</option>
                <option value="Grade 11-A">Grade 11-A</option>
                <option value="Grade 12-A">Grade 12-A</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Day of Week</label>
              <select value={dayInput} onChange={(e) => setDayInput(e.target.value)} className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Period Slot</label>
              <select value={periodInput} onChange={(e) => setPeriodInput(e.target.value)} className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                <option value="Period 1">Period 1 (08:30 AM)</option>
                <option value="Period 2">Period 2 (10:00 AM)</option>
                <option value="Period 3">Period 3 (11:30 AM)</option>
                <option value="Period 4">Period 4 (01:30 PM)</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Time Range</label>
              <input type="text" value={timeSlotInput} onChange={(e) => setTimeSlotInput(e.target.value)} className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]" required />
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Subject</label>
              <input type="text" value={subjectInput} onChange={(e) => setSubjectInput(e.target.value)} className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]" required />
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Room Code</label>
              <input type="text" value={roomInput} onChange={(e) => setRoomInput(e.target.value)} className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]" required />
            </div>
            <div className="sm:col-span-2 md:col-span-3 flex justify-end pt-2">
              <button type="submit" className="bg-[#2E1E17] hover:bg-black text-white font-extrabold text-[10px] px-5 py-2 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition">
                <Plus size={12} /> Add Timetable Slot
              </button>
            </div>
          </form>

          {/* Timetable visual list */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {timetable.map((slot) => {
              const teacherObj = teachers.find(t => t.id === slot.teacherId);
              return (
                <div key={slot.id} className="p-3.5 bg-white border border-[#2E1E17]/10 rounded-2xl flex items-center justify-between text-xs text-left transition hover:scale-[1.01]">
                  <div>
                    <h5 className="font-extrabold text-[#2E1E17]">{slot.subject} - {slot.classId}</h5>
                    <span className="text-[9.5px] text-gray-500 block mt-0.5 font-semibold">Teacher: {teacherObj ? teacherObj.name : slot.teacherId}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-[9.5px] text-gray-400 font-bold flex items-center gap-1"><Clock size={11} /> {slot.day} • {slot.period}</span>
                    <span className="text-[9.5px] text-gray-400 font-bold flex items-center gap-1"><MapPin size={11} /> {slot.room}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Academic Calendar Holidays & Events */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between min-h-[350px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <Calendar size={18} className="text-indigo-600" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Academic Calendar Manager</h4>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3.5">
              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Event Header</label>
                <input 
                  type="text" 
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Science Exhibition"
                  className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Date</label>
                  <input 
                    type="date" 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Type</label>
                  <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                    <option value="holiday">Holiday</option>
                    <option value="milestone">Milestone</option>
                    <option value="term">Term Start</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#2E1E17] hover:bg-black text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-widest transition">
                Add Event
              </button>
            </form>

            <div className="space-y-2 mt-4 max-h-40 overflow-y-auto pr-1">
              {calendarEvents.map((event) => (
                <div key={event.id} className="p-2.5 bg-[#FAF6F0]/40 rounded-xl border border-[#2E1E17]/5 text-xs text-left flex justify-between items-center">
                  <div>
                    <h5 className="font-extrabold text-[#2E1E17]">{event.title}</h5>
                    <span className="text-[9px] text-gray-400 block font-mono">{event.date}</span>
                  </div>
                  <span className={`text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${
                    event.type === 'holiday' 
                      ? 'bg-red-50 text-red-700 border-red-100'
                      : event.type === 'milestone'
                      ? 'bg-purple-50 text-purple-700 border-purple-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  }`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Campus Fee Structure & Due Dates */}
      <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
          <DollarSign size={18} className="text-emerald-600" />
          <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Campus Fee Structures & Due Dates Manager</h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <form onSubmit={handleUpdateStudentFee} className="lg:col-span-4 space-y-3.5 text-left">
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Select Student</label>
              <select value={feeStudentId} onChange={(e) => setFeeStudentId(e.target.value)} className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                <option value="S101">Alexander Vance</option>
                <option value="S102">Elena Rostova</option>
                <option value="S103">Kaelen Miller</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Status</label>
                <select value={feeStatus} onChange={(e) => setFeeStatus(e.target.value)} className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                  <option value="paid">Paid</option>
                  <option value="partial">Partial</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Amount Paid ($)</label>
                <input 
                  type="number" 
                  value={feePaidAmount}
                  onChange={(e) => setFeePaidAmount(Number(e.target.value))}
                  className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-widest transition">
              Update Student Balance
            </button>
          </form>

          <div className="lg:col-span-8 overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2E1E17]/10 text-gray-400 font-bold">
                  <th className="py-2.5">Student Name</th>
                  <th className="py-2.5">Total Dues</th>
                  <th className="py-2.5">Amount Paid</th>
                  <th className="py-2.5">Due Date</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {feeLedger.map((fee) => (
                  <tr key={fee.id} className="border-b border-[#2E1E17]/5 hover:bg-gray-50/50 transition">
                    <td className="py-3 font-extrabold text-[#2E1E17]">{fee.studentName}</td>
                    <td className="py-3 text-gray-500 font-bold">${fee.amountDue}</td>
                    <td className="py-3 text-gray-500">${fee.amountPaid}</td>
                    <td className="py-3 text-gray-500 font-mono">{fee.dueDate}</td>
                    <td className="py-3 text-right">
                      <span className={`text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded border inline-block ${
                        fee.status === 'paid' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : fee.status === 'partial'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                      }`}>
                        {fee.status}
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
