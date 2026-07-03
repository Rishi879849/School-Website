// Principal routes — school-level operations (broadcasts, calendar, fee oversight).
// Note: the previous principalController.js referenced an `event_applications` table
// that doesn't exist in the schema. Those endpoints are intentionally not re-implemented
// here until the schema gains that table.

import express from 'express';
import { authenticateTenant, requireRole, runInTenantContext } from '../../database/tenantGuard.js';

const router = express.Router();

const PRINCIPAL_ONLY = [authenticateTenant, requireRole('principal', 'school_admin')];

// GET /api/principal/broadcasts
router.get('/broadcasts', PRINCIPAL_ONLY, async (req, res) => {
  try {
    const broadcasts = await runInTenantContext(req, async (tx) => {
      return tx.schoolBroadcast.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
    });
    res.json({ broadcasts });
  } catch (err) {
    console.error('list principal broadcasts:', err);
    res.status(500).json({ error: 'Failed to list broadcasts.' });
  }
});

// POST /api/principal/broadcasts — target locked to 'parents' (parity with old API).
router.post('/broadcasts/parents', PRINCIPAL_ONLY, async (req, res) => {
  const { title, content } = req.body || {};
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
          targetAudience: 'parents',
        },
      });
    });
    // The old code dispatched a "real-time notification" — keep that as a console hook
    // until a real channel (SMS/email/WS) is wired up.
    console.log(`✉️ REAL-TIME NOTIFICATION (parents) → school=${req.user.schoolId} title="${title}"`);
    res.status(201).json({ broadcast });
  } catch (err) {
    console.error('publish parent broadcast:', err);
    res.status(500).json({ error: 'Failed to publish parent broadcast.' });
  }
});

export default router;
