import React, { createContext, useContext, useState, useEffect } from 'react';

const RBACContext = createContext();

export function RBACProvider({ children }) {
  // 1. Initial State Data (Mocks SQL Schema Relationships)
  const [users, setUsers] = useState([
    { email: 'superadmin@school.edu', password: '123456', role: 'super_admin', name: 'Super Admin Operator' },
    { email: 'schooladmin@school.edu', password: '123456', role: 'school_admin', name: 'Campus Manager' },
    { email: 'principal@school.edu', password: '123456', role: 'principal', name: 'Dr. Arthur Pendelton' },
    { email: 'teacher@school.edu', password: '123456', role: 'teacher', name: 'Dr. Christopher Vance' },
    { email: 'student@school.edu', password: '123456', role: 'student', name: 'Alexander Vance' },
    { email: 'parent@school.edu', password: '123456', role: 'parent', name: 'Marcus K. Sterling' }
  ]);

  const [students, setStudents] = useState([
    { id: 'S101', name: 'Alexander Vance', roll: 'DTV-009-26', class: 'Grade 10-A', parentEmail: 'parent@school.edu', xp: 450, level: 4, badges: ['Perfect Attendee', 'Math Whiz'], avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60' },
    { id: 'S102', name: 'Elena Rostova', roll: 'DTV-014-26', class: 'Grade 10-A', parentEmail: 'parent@school.edu', xp: 320, level: 3, badges: ['Science Explorer'], avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60' },
    { id: 'S103', name: 'Kaelen Miller', roll: 'DTV-031-26', class: 'Grade 10-A', parentEmail: 'otherparent@school.edu', xp: 120, level: 1, badges: ['Pioneer'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60' }
  ]);

  const [teachers, setTeachers] = useState([
    { id: 'T201', name: 'Dr. Christopher Vance', specialization: 'Mathematics', class: 'Grade 10-A', score: 4.9 },
    { id: 'T202', name: 'Sarah Lin, M.Sc.', specialization: 'General Science', class: 'Grade 10-B', score: 4.8 },
    { id: 'T203', name: 'Prof. Alistair Cook', specialization: 'Computer Studies', class: 'Grade 11-A', score: 4.6 }
  ]);

  // Master Timetable Schema
  const [timetable, setTimetable] = useState([
    { id: 'TT001', classId: 'Grade 10-A', day: 'Monday', period: 'Period 1', timeSlot: '08:30 AM - 09:30 AM', subject: 'Mathematics', teacherId: 'T201', room: 'Room 101' },
    { id: 'TT002', classId: 'Grade 10-A', day: 'Monday', period: 'Period 2', timeSlot: '10:00 AM - 11:00 AM', subject: 'General Science', teacherId: 'T202', room: 'Science Lab' },
    { id: 'TT003', classId: 'Grade 10-A', day: 'Monday', period: 'Period 3', timeSlot: '11:30 AM - 12:30 PM', subject: 'English Grammar', teacherId: 'T203', room: 'Room 103' },
    { id: 'TT004', classId: 'Grade 10-A', day: 'Monday', period: 'Period 4', timeSlot: '01:30 PM - 02:30 PM', subject: 'Computer Studies', teacherId: 'T201', room: 'Computer Lab' }
  ]);

  // Periodic Attendance Schema
  const [attendance, setAttendance] = useState([
    { studentId: 'S101', timetableId: 'TT001', period: 'Period 1', status: 'Present', timestamp: '2026-07-03 08:35 AM', teacherId: 'T201' },
    { studentId: 'S102', timetableId: 'TT001', period: 'Period 1', status: 'Present', timestamp: '2026-07-03 08:36 AM', teacherId: 'T201' }
  ]);

  // Live alerts mapping to active-period attendance
  const [attendanceAlerts, setAttendanceAlerts] = useState([]);

  // Fee ledger schema
  const [feeLedger, setFeeLedger] = useState([
    { id: 'FL001', studentId: 'S101', studentName: 'Alexander Vance', amountDue: 3500, amountPaid: 3500, status: 'paid', dueDate: '2026-08-01' },
    { id: 'FL002', studentId: 'S102', studentName: 'Elena Rostova', amountDue: 3500, amountPaid: 2000, status: 'partial', dueDate: '2026-08-01' },
    { id: 'FL003', studentId: 'S103', studentName: 'Kaelen Miller', amountDue: 3500, amountPaid: 0, status: 'unpaid', dueDate: '2026-07-01' }
  ]);

  // Broadcasts
  const [broadcasts, setBroadcasts] = useState([
    { id: 1, title: 'Term 1 Grading Closure', content: 'All teachers must lock grade sheets by July 10th.', date: '2026-07-02', target: 'teachers', sender: 'School Admin' },
    { id: 2, title: 'Science Exhibition', content: 'Parents are invited to review student robotics project twins on Aug 15.', date: '2026-07-01', target: 'all', sender: 'Principal' }
  ]);

  // Academic calendar holidays & terms
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 'CE001', title: 'Summer Term Commencement', date: '2026-09-01', type: 'term' },
    { id: 'CE002', title: 'Independence Day Break', date: '2026-07-04', type: 'holiday' },
    { id: 'CE003', title: 'Midterm Assessments', date: '2026-10-12', type: 'milestone' }
  ]);

  // White label config (Super Admin)
  const [whiteLabelConfig, setWhiteLabelConfig] = useState({
    theme: 'Warm Off-White',
    schoolName: 'Edukids Academy',
    logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=100&auto=format&fit=crop&q=60',
    primaryColor: '#FF733B',
    accentColor: '#2E1E17'
  });

  // 2. Action Handlers
  const addTimetableEntry = (entry) => {
    const newEntry = {
      id: `TT${Date.now()}`,
      ...entry
    };
    setTimetable(prev => [...prev, newEntry]);
  };

  const submitAttendance = (studentId, timetableId, period, status, teacherId) => {
    const timestamp = new Date().toLocaleString();
    const newRecord = { studentId, timetableId, period, status, timestamp, teacherId };

    setAttendance(prev => {
      // Remove any existing record for same student and period today
      const filtered = prev.filter(r => !(r.studentId === studentId && r.period === period));
      return [...filtered, newRecord];
    });

    // Reactive alerts: If Absent/Tardy, dispatch real-time warning to parent messages
    if (status === 'Absent' || status === 'Tardy') {
      const studentObj = students.find(s => s.id === studentId);
      const studentName = studentObj ? studentObj.name : 'Your scholar';
      
      const newAlert = {
        id: Date.now(),
        studentId,
        studentName,
        message: `${studentName} was marked ${status} in ${period} today at ${timestamp}.`,
        timestamp,
        status
      };
      
      setAttendanceAlerts(prev => [newAlert, ...prev]);
    }
  };

  const updateFeeStructure = (studentId, status, amountPaid) => {
    setFeeLedger(prev => prev.map(fee => {
      if (fee.studentId === studentId) {
        return { 
          ...fee, 
          status, 
          amountPaid: status === 'paid' ? fee.amountDue : amountPaid 
        };
      }
      return fee;
    }));
  };

  const addCalendarEvent = (event) => {
    const newEvent = {
      id: `CE${Date.now()}`,
      ...event
    };
    setCalendarEvents(prev => [...prev, newEvent]);
  };

  const addBroadcast = (title, content, target, sender) => {
    const newBroadcast = {
      id: Date.now(),
      title,
      content,
      target,
      sender,
      date: new Date().toISOString().split('T')[0]
    };
    setBroadcasts(prev => [newBroadcast, ...prev]);
  };

  return (
    <RBACContext.Provider value={{
      users,
      students,
      teachers,
      timetable,
      attendance,
      attendanceAlerts,
      feeLedger,
      broadcasts,
      calendarEvents,
      whiteLabelConfig,
      setWhiteLabelConfig,
      addTimetableEntry,
      submitAttendance,
      updateFeeStructure,
      addCalendarEvent,
      addBroadcast
    }}>
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
}
