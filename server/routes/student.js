// Student / shared routes — fee ledger (own), gradebook (own), AI compass chat.
// Note: Parent dashboard is reachable but uses the same student-scoped endpoints
// via the parent's linked StudentProfile.

import express from 'express';
import { authenticateTenant, requireRole, runInTenantContext } from '../../database/tenantGuard.js';

const router = express.Router();

const STUDENT_OR_PARENT = [authenticateTenant, requireRole('student', 'parent')];

async function getLinkedStudentId(req, tx) {
  if (req.user.role === 'student') {
    const sp = await tx.studentProfile.findFirst({ where: { userId: req.user.id } });
    return sp?.id || null;
  }
  if (req.user.role === 'parent') {
    const pp = await tx.parentProfile.findFirst({
      where: { userId: req.user.id },
      include: { students: true },
    });
    return pp?.students?.[0]?.id || null;
  }
  return null;
}

// GET /api/student/fees — own fee ledger.
router.get('/fees', STUDENT_OR_PARENT, async (req, res) => {
  try {
    const ledgers = await runInTenantContext(req, async (tx) => {
      const studentId = await getLinkedStudentId(req, tx);
      if (!studentId) return [];
      return tx.studentFeeLedger.findMany({ where: { studentId } });
    });
    res.json({ ledgers });
  } catch (err) {
    console.error('list fees:', err);
    res.status(500).json({ error: 'Failed to list fee ledger.' });
  }
});

// GET /api/student/gradebook — own grade entries.
router.get('/gradebook', STUDENT_OR_PARENT, async (req, res) => {
  try {
    const entries = await runInTenantContext(req, async (tx) => {
      const studentId = await getLinkedStudentId(req, tx);
      if (!studentId) return [];
      return tx.gradebookEntry.findMany({ where: { studentId } });
    });
    res.json({ entries });
  } catch (err) {
    console.error('list gradebook:', err);
    res.status(500).json({ error: 'Failed to list gradebook.' });
  }
});

// GET /api/student/ai-chats — list this student's AI compass chat sessions.
router.get('/ai-chats', STUDENT_OR_PARENT, async (req, res) => {
  try {
    const chats = await runInTenantContext(req, async (tx) => {
      const studentId = await getLinkedStudentId(req, tx);
      if (!studentId) return [];
      return tx.aiCompassChat.findMany({
        where: { studentId },
        include: { messages: { orderBy: { sentAt: 'asc' } } },
        orderBy: { createdAt: 'desc' },
      });
    });
    res.json({ chats });
  } catch (err) {
    console.error('list ai-chats:', err);
    res.status(500).json({ error: 'Failed to list AI chats.' });
  }
});

export default router;
