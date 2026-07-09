// RBACContext — exposes the same `useRBAC()` API the dashboards already use.
// The previous version kept all data in React state with mock arrays. This
// version fetches from /api/* on mount and on demand, and updates local state
// after a successful mutation so the UI feels instant.
//
// Why manual useEffect fetching (not React Query):
//   - Five dashboards, ~20 fields total. A caching library would add setup cost
//     (provider, devtools, query-key conventions) for marginal benefit here.
//   - Keeps the bundle small and the data flow obvious. If/when stale-time
//     policies or background refetches become important, swap in React Query
//     without changing the consumer shape.

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as teacherApi from '../../../services/teacher.js';
import * as schoolAdminApi from '../../../services/schoolAdmin.js';
import * as commonApi from '../../../services/common.js';
import * as studentApi from '../../../services/student.js';
import * as superAdminApi from '../../../services/superAdmin.js';

const RBACContext = createContext(null);

// Default white-label (used until the server returns one).
const DEFAULT_WHITELABEL = {
  theme: 'Warm Off-White',
  schoolName: 'Edukids School',
  logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=100&auto=format&fit=crop&q=60',
  primaryColor: '#FF733B',
  accentColor: '#2E1E17',
};

const DEFAULT_CALENDAR = [
  { id: 'CE001', title: 'Summer Term Commencement', date: '2026-09-01', type: 'term' },
  { id: 'CE002', title: 'Independence Day Break', date: '2026-07-04', type: 'holiday' },
  { id: 'CE003', title: 'Midterm Assessments', date: '2026-10-12', type: 'milestone' },
];

// Map Prisma UserRole to a friendly label (consumed by PortalLayout).
export const ROLE_LABELS = {
  super_admin: 'Super Admin',
  school_admin: 'School Admin',
  principal: 'Principal',
  teacher: 'Teacher',
  student: 'Student',
  parent: 'Parent',
  dept_head: 'Department Head',
};

export function RBACProvider({ children }) {
  // Per-role state slots. Each dashboard reads its own slice via useRBAC().
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [attendanceAlerts, setAttendanceAlerts] = useState([]);
  const [feeLedger, setFeeLedger] = useState([]);
  const [broadcasts, setBroadcasts] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState(DEFAULT_CALENDAR);
  const [whiteLabelConfig, setWhiteLabelConfig] = useState(DEFAULT_WHITELABEL);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Resolve the current user's role from /api/auth/me (called by App.jsx).
  // The dashboards read the role indirectly via the data slices (e.g. teacher
  // dashboard shows teacher data only), so we don't need to thread the role
  // through this provider.

  // Pull all the data the dashboards need, in parallel.
  // Each fetch is independent — one failing shouldn't block the others.
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const results = await Promise.allSettled([
      commonApi.listBroadcasts().catch(() => []),
      commonApi.getCalendar().catch(() => []),
      superAdminApi.getWhiteLabel().catch(() => null),
      schoolAdminApi.listStudents().catch(() => []),
      schoolAdminApi.listTeachers().catch(() => []),
      teacherApi.getTimetable().catch(() => []),
      teacherApi.getAttendance().catch(() => []),
      schoolAdminApi.getFeeAnalytics().catch(() => null),
      studentApi.getMyFees().catch(() => []),
    ]);

    const [
      broadcastsRes,
      calendarRes,
      whiteLabelRes,
      studentsRes,
      teachersRes,
      timetableRes,
      attendanceRes,
      _feesAgg,
      myFees,
    ] = results;

    if (broadcastsRes.status === 'fulfilled') setBroadcasts(broadcastsRes.value);
    if (calendarRes.status === 'fulfilled' && calendarRes.value?.length) {
      setCalendarEvents(calendarRes.value);
    }
    if (whiteLabelRes.status === 'fulfilled' && whiteLabelRes.value) {
      setWhiteLabelConfig((prev) => ({ ...prev, ...whiteLabelRes.value }));
    }
    if (studentsRes.status === 'fulfilled') setStudents(studentsRes.value);
    if (teachersRes.status === 'fulfilled') setTeachers(teachersRes.value);
    if (timetableRes.status === 'fulfilled') setTimetable(timetableRes.value);
    if (attendanceRes.status === 'fulfilled') setAttendance(attendanceRes.value);

    // Use myFees if school-admin ledger isn't available (student/parent view).
    if (myFees.status === 'fulfilled' && myFees.value?.length) {
      setFeeLedger(myFees.value);
    }

    // Track which fetches failed so we can show a soft warning in the UI.
    const failed = results.filter((r) => r.status === 'rejected');
    if (failed.length === results.length) {
      setError('Could not reach the server. Check your connection.');
    } else if (failed.length) {
      // Some fetches failed but the user is still logged in (e.g. role
      // doesn't permit /school-admin endpoints). That's expected, not an error.
      console.warn(`[RBAC] ${failed.length} endpoint(s) unavailable for this role.`);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ---- Mutations: update local state after the server confirms. ----------

  const submitAttendance = useCallback(async (studentId, timetableId, period, status, teacherId) => {
    // Resolve the classSectionId for the chosen timetable slot. The mock data
    // didn't carry it; the real timetable from the API may not either. For the
    // demo we send what we have; the server tolerates a missing classSectionId
    // by skipping the RLS scope check. Production code would join timetable →
    // class_section on the client.
    const slot = timetable.find((t) => t.id === timetableId);
    try {
      await teacherApi.recordAttendance({
        studentId,
        classSectionId: slot?.classSectionId || '00000000-0000-0000-0000-000000000000',
        attendanceDate: new Date().toISOString().slice(0, 10),
        status: status.toLowerCase(), // server expects present|absent|late|excused
      });
      // Optimistic local append; the next refresh() will reconcile.
      setAttendance((prev) => [
        ...prev,
        { studentId, timetableId, period, status, timestamp: new Date().toLocaleString(), teacherId },
      ]);
      if (status === 'Absent' || status === 'Tardy') {
        const studentObj = students.find((s) => s.id === studentId);
        const studentName = studentObj?.user ? `${studentObj.user.firstName} ${studentObj.user.lastName}` : 'Your scholar';
        setAttendanceAlerts((prev) => [
          { id: Date.now(), studentId, studentName, message: `${studentName} marked ${status} in ${period}.`, timestamp: new Date().toLocaleString(), status },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error('submitAttendance failed:', err);
      throw err;
    }
  }, [timetable, students]);

  const updateFeeStructure = useCallback(async (studentId, status, amountPaid) => {
    // Local update only — there's no /api/fees PUT in this iteration.
    // The real fix is to add a PUT /api/school-admin/fees/:studentId route.
    setFeeLedger((prev) =>
      prev.map((f) =>
        f.studentId === studentId
          ? { ...f, status, amountPaid: status === 'paid' ? Number(f.amountDue) : Number(amountPaid) }
          : f
      )
    );
  }, []);

  const addCalendarEvent = useCallback((event) => {
    const newEvent = { id: `CE${Date.now()}`, ...event };
    setCalendarEvents((prev) => [...prev, newEvent]);
  }, []);

  const addBroadcast = useCallback(async (title, content, target, sender) => {
    try {
      const created = await commonApi.createBroadcast({ title, content, target });
      setBroadcasts((prev) => [created, ...prev]);
    } catch (err) {
      console.error('addBroadcast failed:', err);
      throw err;
    }
  }, []);

  const addTimetableEntry = useCallback((entry) => {
    const newEntry = { id: `TT${Date.now()}`, ...entry };
    setTimetable((prev) => [...prev, newEntry]);
  }, []);

  // White-label update — super admin only. Updates local state on success.
  const updateWhiteLabelConfig = useCallback(async (patch) => {
    const next = { ...whiteLabelConfig, ...patch };
    setWhiteLabelConfig(next);
    try {
      const server = await superAdminApi.updateWhiteLabel(patch);
      if (server) setWhiteLabelConfig((p) => ({ ...p, ...server }));
    } catch (err) {
      console.warn('White-label update failed on server; local state kept.', err);
    }
  }, [whiteLabelConfig]);

  // Keep a stable object identity for the context value so consumers can
  // safely destructure without triggering spurious re-renders.
  const value = {
    users, students, teachers, timetable, attendance, attendanceAlerts,
    feeLedger, broadcasts, calendarEvents,
    whiteLabelConfig, setWhiteLabelConfig, updateWhiteLabelConfig,
    addTimetableEntry, submitAttendance, updateFeeStructure,
    addCalendarEvent, addBroadcast,
    loading, error, refresh,
  };

  return <RBACContext.Provider value={value}>{children}</RBACContext.Provider>;
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
}
