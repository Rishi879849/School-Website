// School Admin routes — scoped to the authenticated user's school via RLS.

import express from 'express';
import { authenticateTenant, requireRole, runInTenantContext } from '../../database/tenantGuard.js';

const router = express.Router();

const SCHOOL_ADMIN_ONLY = [authenticateTenant, requireRole('school_admin', 'principal')];

// GET /api/school-admin/students — list students in this school.
router.get('/students', SCHOOL_ADMIN_ONLY, async (req, res) => {
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

// GET /api/school-admin/teachers — list teachers in this school.
router.get('/teachers', SCHOOL_ADMIN_ONLY, async (req, res) => {
  try {
    const teachers = await runInTenantContext(req, async (tx) => {
      return tx.teacherProfile.findMany({
        include: { user: { select: { firstName: true, lastName: true, email: true, avatarUrl: true } } },
      });
    });
    res.json({ teachers });
  } catch (err) {
    console.error('list teachers:', err);
    res.status(500).json({ error: 'Failed to list teachers.' });
  }
});

// GET /api/school-admin/broadcasts — school's broadcasts.
router.get('/broadcasts', SCHOOL_ADMIN_ONLY, async (req, res) => {
  try {
    const broadcasts = await runInTenantContext(req, async (tx) => {
      return tx.schoolBroadcast.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
    });
    res.json({ broadcasts });
  } catch (err) {
    console.error('list broadcasts:', err);
    res.status(500).json({ error: 'Failed to list broadcasts.' });
  }
});

// POST /api/school-admin/broadcasts — publish a new school-wide broadcast.
router.post('/broadcasts', SCHOOL_ADMIN_ONLY, async (req, res) => {
  const { title, content, targetAudience, expiresAt } = req.body || {};
  if (!title || !content) return res.status(400).json({ error: 'title and content are required.' });
  if (!req.user.schoolId) return res.status(400).json({ error: 'User is not scoped to a school.' });

  try {
    const broadcast = await runInTenantContext(req, async (tx) => {
      return tx.schoolBroadcast.create({
        data: {
          schoolId: req.user.schoolId,
          senderId: req.user.id,
          title,
          content,
          targetAudience: targetAudience || 'all',
          expiresAt: expiresAt ? new Date(expiresAt) : null,
        },
      });
    });
    res.status(201).json({ broadcast });
  } catch (err) {
    console.error('create broadcast:', err);
    res.status(500).json({ error: 'Failed to publish broadcast.' });
  }
});

// GET /api/school-admin/fees/analytics — fee rollup for the school.
router.get('/fees/analytics', SCHOOL_ADMIN_ONLY, async (req, res) => {
  try {
    const analytics = await runInTenantContext(req, async (tx) => {
      const ledgers = await tx.studentFeeLedger.findMany({
        select: { amountDue: true, amountPaid: true, status: true },
      });
      return ledgers.reduce(
        (acc, l) => {
          acc.totalDue += Number(l.amountDue);
          acc.totalPaid += Number(l.amountPaid);
          if (l.status === 'paid') acc.fullyPaidCount++;
          else if (l.status === 'unpaid') acc.unpaidCount++;
          else acc.partialCount++;
          return acc;
        },
        { totalDue: 0, totalPaid: 0, fullyPaidCount: 0, unpaidCount: 0, partialCount: 0 }
      );
    });
    res.json({ analytics });
  } catch (err) {
    console.error('fee analytics:', err);
    res.status(500).json({ error: 'Failed to compute fee analytics.' });
  }
});

export default router;
