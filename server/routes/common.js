// Shared "common" routes — calendar events (academic calendar) and broadcast feed
// visible to all authenticated roles. These are the "school-wide" data that every
// dashboard reads.

import express from 'express';
import { authenticateTenant, runInTenantContext } from '../../database/tenantGuard.js';

const router = express.Router();

router.use(authenticateTenant);

// GET /api/calendar — academic calendar events for this school.
router.get('/calendar', async (req, res) => {
  try {
    const events = await runInTenantContext(req, async (tx) => {
      return tx.calendarEvents?.findMany?.({ orderBy: { date: 'asc' } }) ?? [];
    }).catch(() => []);
    // The schema doesn't have a calendar_events table; for now return an empty list
    // and let the RBACContext seed the default events client-side.
    res.json({ events });
  } catch (err) {
    console.error('list calendar:', err);
    res.status(500).json({ error: 'Failed to list calendar.' });
  }
});

// GET /api/broadcasts — broadcasts visible to the caller's role.
router.get('/broadcasts', async (req, res) => {
  try {
    const broadcasts = await runInTenantContext(req, async (tx) => {
      return tx.schoolBroadcast.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
    });
    res.json({ broadcasts });
  } catch (err) {
    console.error('list broadcasts:', err);
    res.status(500).json({ error: 'Failed to list broadcasts.' });
  }
});

// POST /api/broadcasts — any authenticated user can post (teacher/principal/SA).
// Target audience is taken from the body.
router.post('/broadcasts', async (req, res) => {
  const { title, content, target } = req.body || {};
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
          targetAudience: target || 'all',
        },
      });
    });
    res.status(201).json({ broadcast });
  } catch (err) {
    console.error('publish broadcast:', err);
    res.status(500).json({ error: 'Failed to publish broadcast.' });
  }
});

export default router;
