// Teacher routes — attendance, marks, parent messages.

import express from 'express';
import { authenticateTenant, requireRole, runInTenantContext } from '../../database/tenantGuard.js';

const router = express.Router();

const TEACHER_ONLY = [authenticateTenant, requireRole('teacher', 'school_admin', 'principal')];

const isWithin24Hours = (d) => {
  const diff = Math.abs(Date.now() - new Date(d).getTime());
  return diff <= 24 * 60 * 60 * 1000;
};

// GET /api/teacher/timetable — teacher's periods.
router.get('/timetable', TEACHER_ONLY, async (req, res) => {
  try {
    const timetable = await runInTenantContext(req, async (tx) => {
      const teacher = await tx.teacherProfile.findFirst({ where: { userId: req.user.id } });
      if (!teacher) return [];
      const assignments = await tx.teacherSectionSubject.findMany({
        where: { teacherId: teacher.id },
        include: { classSection: true, subject: true },
      });
      // The mock data was small/flat; for now return the assignments as timetable entries.
      return assignments.map((a, i) => ({
        id: `TT${a.id}`,
        classId: a.classSection?.sectionName || '',
        day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][i % 5],
        period: `Period ${(i % 6) + 1}`,
        timeSlot: '08:30 AM - 09:30 AM',
        subject: a.subject?.name || '',
        teacherId: teacher.id,
        room: a.classSection?.roomNumber || 'TBD',
      }));
    });
    res.json({ timetable });
  } catch (err) {
    console.error('list timetable:', err);
    res.status(500).json({ error: 'Failed to list timetable.' });
  }
});

// GET /api/teacher/students — students in this teacher's sections.
router.get('/students', TEACHER_ONLY, async (req, res) => {
  try {
    const students = await runInTenantContext(req, async (tx) => {
      return tx.studentProfile.findMany({
        include: { user: { select: { firstName: true, lastName: true, email: true, avatarUrl: true } } },
        orderBy: { rollNumber: 'asc' },
      });
    });
    res.json({ students });
  } catch (err) {
    console.error('list students:', err);
    res.status(500).json({ error: 'Failed to list students.' });
  }
});

// POST /api/teacher/attendance — record/update an attendance row.
router.post('/attendance', TEACHER_ONLY, async (req, res) => {
  const { studentId, classSectionId, attendanceDate, status, remarks } = req.body || {};
  if (!studentId || !classSectionId || !attendanceDate || !status) {
    return res.status(400).json({ error: 'studentId, classSectionId, attendanceDate, status required.' });
  }
  if (!['present', 'absent', 'late', 'excused'].includes(status)) {
    return res.status(400).json({ error: 'status must be present|absent|late|excused.' });
  }

  // Lock check: teachers can't back-fill >24h, admins/principals can.
  if (req.user.role === 'teacher' && !isWithin24Hours(attendanceDate)) {
    return res.status(403).json({ error: 'Attendance log locked: 24-hour update window has expired.' });
  }

  try {
    const record = await runInTenantContext(req, async (tx) => {
      return tx.attendanceRecord.upsert({
        where: { studentId_attendanceDate: { studentId, attendanceDate: new Date(attendanceDate) } },
        update: { status, remarks, markedBy: req.user.id, isLocked: req.user.role !== 'teacher' },
        create: {
          studentId,
          classSectionId,
          markedBy: req.user.id,
          attendanceDate: new Date(attendanceDate),
          status,
          remarks,
          isLocked: req.user.role !== 'teacher',
        },
      });
    });
    res.json({ record });
  } catch (err) {
    console.error('record attendance:', err);
    res.status(500).json({ error: 'Failed to record attendance.' });
  }
});

// GET /api/teacher/attendance?date=YYYY-MM-DD — for the dashboard's date filter.
router.get('/attendance', TEACHER_ONLY, async (req, res) => {
  const { date } = req.query;
  try {
    const records = await runInTenantContext(req, async (tx) => {
      return tx.attendanceRecord.findMany({
        where: date ? { attendanceDate: new Date(date) } : {},
        orderBy: { markedAt: 'desc' },
        take: 200,
      });
    });
    res.json({ records });
  } catch (err) {
    console.error('list attendance:', err);
    res.status(500).json({ error: 'Failed to list attendance.' });
  }
});

// POST /api/teacher/marks — record a gradebook entry.
router.post('/marks', TEACHER_ONLY, async (req, res) => {
  const { studentId, subjectId, scoreObtained, maxScore, term, feedback } = req.body || {};
  if (!studentId || !subjectId || scoreObtained == null || !maxScore) {
    return res.status(400).json({ error: 'studentId, subjectId, scoreObtained, maxScore required.' });
  }
  const score = Number(scoreObtained);
  const max = Number(maxScore);
  if (score < 0 || score > max) {
    return res.status(400).json({ error: `scoreObtained (${score}) must be 0..${max}.` });
  }
  const termName = term || 'Finals';
  const gradeLetter = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';

  try {
    const entry = await runInTenantContext(req, async (tx) => {
      return tx.gradebookEntry.upsert({
        where: { studentId_subjectId_term: { studentId, subjectId, term: termName } },
        update: { examScore: score, totalScore: score, gradeLetter, teacherFeedback: feedback, enteredBy: req.user.id },
        create: {
          studentId,
          subjectId,
          term: termName,
          examScore: score,
          totalScore: score,
          gradeLetter,
          teacherFeedback: feedback,
          enteredBy: req.user.id,
        },
      });
    });
    res.json({ entry });
  } catch (err) {
    console.error('post marks:', err);
    res.status(500).json({ error: 'Failed to post marks.' });
  }
});

export default router;
