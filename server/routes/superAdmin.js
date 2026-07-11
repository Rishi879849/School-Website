// Super Admin routes — cross-tenant operations.
// The RLS policies in prisma/migrations/01_init_rls/migration.sql treat super_admin
// as GLOBAL via is_super_admin(), so these routes don't need to scope by school.

import express from 'express';
import { authenticateTenant, requireRole, runInTenantContext } from '../../database/tenantGuard.js';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';

const router = express.Router();

const SUPER_ONLY = [authenticateTenant, requireRole('super_admin')];

// GET /api/super-admin/schools — list all schools.
router.get('/schools', SUPER_ONLY, async (req, res) => {
  try {
    const schools = await runInTenantContext(req, async (tx) => {
      return tx.school.findMany({ orderBy: { createdAt: 'desc' } });
    });
    res.json({ schools });
  } catch (err) {
    console.error('list schools:', err);
    res.status(500).json({ error: 'Failed to list schools.' });
  }
});

// POST /api/super-admin/schools — onboard a new school.
router.post('/schools', SUPER_ONLY, async (req, res) => {
  const { name, subdomain, contactEmail, contactPhone, address } = req.body || {};
  if (!name || !subdomain) {
    return res.status(400).json({ error: 'name and subdomain are required.' });
  }
  try {
    const school = await prisma.school.create({
      data: {
        name,
        subdomain,
        contactEmail,
        contactPhone,
        address,
        subscriptionStatus: 'trial',
      },
    });
    res.status(201).json({ school });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Subdomain already in use.' });
    }
    res.status(500).json({ error: 'Failed to create school.' });
  }
});

// POST /api/super-admin/users — create a new user (any role, any school).
router.post('/users', SUPER_ONLY, async (req, res) => {
  const { email, password, role, firstName, lastName, schoolId, phoneNumber } = req.body || {};
  if (!email || !password || !role || !firstName || !lastName) {
    return res.status(400).json({ error: 'email, password, role, firstName, lastName required.' });
  }
  if (role !== 'super_admin' && !schoolId) {
    return res.status(400).json({ error: 'schoolId is required for non-super_admin roles.' });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: String(email).toLowerCase(),
        passwordHash,
        role,
        firstName,
        lastName,
        phoneNumber,
        schoolId: role === 'super_admin' ? null : schoolId,
      },
    });
    res.status(201).json({ user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Email already in use.' });
    }
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

// GET /api/super-admin/whitelabel — current white-label config (single-tenant demo).
router.get('/whitelabel', SUPER_ONLY, async (req, res) => {
  // The mock used a single in-memory config; for the demo we read the first school.
  // A real product would store this in a `school_settings` table.
  try {
    const school = await prisma.school.findFirst({ orderBy: { createdAt: 'asc' } });
    if (!school) return res.json({ config: defaultWhitelabel() });
    res.json({
      config: {
        theme: 'Warm Off-White',
        schoolName: school.name,
        logoUrl: school.logoUrl || defaultWhitelabel().logoUrl,
        primaryColor: '#FF733B',
        accentColor: '#2E1E17',
        schoolId: school.id,
      },
    });
  } catch (err) {
    console.error('read whitelabel:', err);
    res.status(500).json({ error: 'Failed to read whitelabel config.' });
  }
});

// PATCH /api/super-admin/whitelabel — update the active school's name + logo.
router.patch('/whitelabel', SUPER_ONLY, async (req, res) => {
  const { schoolName, logoUrl, primaryColor, schoolId } = req.body || {};
  try {
    const target = schoolId
      ? await prisma.school.findUnique({ where: { id: schoolId } })
      : await prisma.school.findFirst({ orderBy: { createdAt: 'asc' } });
    if (!target) return res.status(404).json({ error: 'School not found.' });

    const updated = await prisma.school.update({
      where: { id: target.id },
      data: {
        name: schoolName || target.name,
        logoUrl: logoUrl || target.logoUrl,
      },
    });
    res.json({ config: { schoolName: updated.name, logoUrl: updated.logoUrl, primaryColor: primaryColor || '#FF733B' } });
  } catch (err) {
    console.error('update whitelabel:', err);
    res.status(500).json({ error: 'Failed to update whitelabel.' });
  }
});

function defaultWhitelabel() {
  return {
    theme: 'Warm Off-White',
    schoolName: 'DTV School Support',
    logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=100&auto=format&fit=crop&q=60',
    primaryColor: '#FF733B',
    accentColor: '#2E1E17',
  };
}

export default router;
