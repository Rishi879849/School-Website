import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="space-y-6 text-left">
      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#2E1E17] to-[#1F140F] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-[#FF733B]/10">
        <div className="absolute right-[-5%] top-[-20%] w-64 h-64 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-3 py-0.5 rounded-full tracking-widest inline-block">
            Campus Operator Controls
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-serif mt-1">Campus Configuration Console</h3>
          <p className="text-xs text-white/70">
            Configure Master Timetable slots, publish Calendar events, and audit student tuition fee parameters.
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

          <form onSubmit={handleAddTimetable} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-[#FAF6F0]/40 p-4 rounded-2xl border border-[#2E1E17]/5">
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Class Segment</label>
              <select value={classInput} onChange={(e) => setClassInput(e.target.value)} className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                <option value="Grade 9-A">Grade 9-A</option>
                <option value="Grade 10-A">Grade 10-A</option>
                <option value="Grade 11-A">Grade 11-A</option>
                <option value="Grade 12-A">Grade 12-A</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Day of Week</label>
              <select value={dayInput} onChange={(e) => setDayInput(e.target.value)} className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Period Slot</label>
              <select value={periodInput} onChange={(e) => setPeriodInput(e.target.value)} className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                <option value="Period 1">Period 1 (08:30 AM)</option>
                <option value="Period 2">Period 2 (10:00 AM)</option>
                <option value="Period 3">Period 3 (11:30 AM)</option>
                <option value="Period 4">Period 4 (01:30 PM)</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Time Range</label>
              <input type="text" value={timeSlotInput} onChange={(e) => setTimeSlotInput(e.target.value)} className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]" required />
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Subject</label>
              <input type="text" value={subjectInput} onChange={(e) => setSubjectInput(e.target.value)} className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]" required />
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Room Code</label>
              <input type="text" value={roomInput} onChange={(e) => setRoomInput(e.target.value)} className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]" required />
            </div>
            <div className="sm:col-span-2 md:col-span-3 flex justify-end pt-2">
              <button type="submit" className="bg-[#2E1E17] hover:bg-black text-white font-extrabold text-[10px] px-5 py-2.5 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer">
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
                    <div className="flex gap-4 text-gray-400 font-bold mt-1 text-[10.5px]">
                      <span className="flex items-center gap-1"><Clock size={11} /> {slot.day} • {slot.timeSlot}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} /> Room {slot.room}</span>
                    </div>
                  </div>
                  <span className="text-[9px] bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-lg font-extrabold">
                    {slot.period}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Fee Audit & Calendar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Fee Manager */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <DollarSign size={18} className="text-emerald-600" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Configure Student Dues</h4>
            </div>

            <form onSubmit={handleUpdateStudentFee} className="space-y-3.5 text-xs text-left">
              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Select Student</label>
                <select value={feeStudentId} onChange={(e) => setFeeStudentId(e.target.value)} className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                  <option value="S101">Alexander Vance (Grade 10-A)</option>
                  <option value="S102">Kaelen Miller (Grade 10-A)</option>
                  <option value="S103">Mabel Watson (Grade 10-A)</option>
                  <option value="S104">Rowan Vance (Grade 10-A)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Status</label>
                  <select value={feeStatus} onChange={(e) => setFeeStatus(e.target.value)} className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="partial">Partial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Amount Paid ($)</label>
                  <input type="number" value={feePaidAmount} onChange={(e) => setFeePaidAmount(Number(e.target.value))} className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]" required />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer">
                Update Fee Record
              </button>
            </form>
          </div>

          {/* Academic Calendar Events */}
          <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#2E1E17]/5 pb-3">
              <Calendar size={18} className="text-purple-600" />
              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Academic Calendar Event</h4>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3.5 text-xs text-left">
              <div>
                <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Event Header Title</label>
                <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="e.g. Science Fair 2026" className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Date</label>
                  <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]" required />
                </div>
                <div>
                  <label className="block text-[9px] text-gray-500 uppercase font-extrabold mb-1">Event Category</label>
                  <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]">
                    <option value="holiday">Holiday Break</option>
                    <option value="term">Term Landmark</option>
                    <option value="milestone">Academic Milestone</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#2E1E17] hover:bg-black text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer">
                Publish Calendar Event
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
