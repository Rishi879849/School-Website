// Auth routes: /api/auth/login, /api/auth/logout, /api/auth/refresh, /api/auth/me
//
// Cookie contract (matches src/services/api.js):
//   - `session_token`  (HttpOnly, 7d)  - short-lived access JWT
//   - `refresh_token`  (HttpOnly, 30d) - long-lived refresh JWT
//
// On 401 from any protected endpoint, api.js calls /refresh; we issue a new
// access token (and rotate the refresh token) so the original request can retry.

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { authenticateTenant } from '../../database/tenantGuard.js';
import { setSessionCookie, setRefreshCookie, clearAuthCookies } from '../lib/cookies.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const REFRESH_SECRET = process.env.REFRESH_SECRET_KEY || JWT_SECRET;

function signAccessToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function signRefreshToken(user) {
  return jwt.sign(
    { userId: user.id, role: user.role },
    REFRESH_SECRET,
    { expiresIn: '30d' }
  );
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    schoolId: user.schoolId,
    avatarUrl: user.avatarUrl,
  };
}

// POST /api/auth/register — self-service signup for student / teacher / parent.
router.post('/register', async (req, res) => {
  const {
    email,
    password,
    role,
    firstName,
    lastName,
    dob,
    gender,
    address,
    prevSchool,
    specialization,
  } = req.body || {};

  if (!email || !password || !firstName || !lastName || !role) {
    return res.status(400).json({ error: 'Email, password, name, and role are required.' });
  }

  const allowedRoles = ['student', 'teacher', 'parent'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ error: 'Only student, teacher, or parent accounts can self-register.' });
  }

  const school = await prisma.school.findFirst({ orderBy: { createdAt: 'asc' } });
  if (!school) {
    return res.status(503).json({ error: 'No school configured yet. Run npm run db:seed first.' });
  }

  try {
    const passwordHash = await bcrypt.hash(String(password), 10);
    const normalizedEmail = String(email).toLowerCase();

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          role,
          firstName,
          lastName,
          schoolId: school.id,
        },
      });

      if (role === 'teacher') {
        await tx.teacherProfile.create({
          data: {
            userId: newUser.id,
            specialization: specialization || null,
            joinedDate: new Date(),
          },
        });
      }

      if (role === 'parent') {
        await tx.parentProfile.create({
          data: {
            userId: newUser.id,
            emergencyContactPhone: '+10000000000',
            address: address || null,
          },
        });
      }

      if (role === 'student') {
        await tx.studentProfile.create({
          data: {
            userId: newUser.id,
            dateOfBirth: dob ? new Date(dob) : new Date('2010-01-01'),
            gender: gender || 'Male',
            previousSchool: prevSchool || null,
          },
        });
      }

      return newUser;
    });

    return res.status(201).json({ success: true, user: publicUser(user) });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'That email is already registered.' });
    }
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Registration failed.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Bump last_login_at without blocking the response.
    prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    }).catch(() => {});

    setSessionCookie(res, signAccessToken(user));
    setRefreshCookie(res, signRefreshToken(user));

    return res.json({ success: true, user: publicUser(user) });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed.' });
  }
});

// POST /api/auth/logout — clears both cookies.
router.post('/logout', (_req, res) => {
  clearAuthCookies(res);
  return res.json({ success: true });
});

// POST /api/auth/refresh — issues a new access token from the refresh cookie.
router.post('/refresh', async (req, res) => {
  const refresh = req.cookies?.refresh_token;
  if (!refresh) {
    return res.status(401).json({ error: 'Refresh token missing.' });
  }

  try {
    const payload = jwt.verify(refresh, REFRESH_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || !user.isActive) {
      clearAuthCookies(res);
      return res.status(401).json({ error: 'Account inactive or removed.' });
    }

    setSessionCookie(res, signAccessToken(user));
    // Rotate the refresh token too, so a stolen one has a 30d ceiling.
    setRefreshCookie(res, signRefreshToken(user));
    return res.json({ success: true });
  } catch {
    clearAuthCookies(res);
    return res.status(401).json({ error: 'Refresh token invalid or expired.' });
  }
});

// GET /api/auth/me — for App.jsx's session-restore on mount.
router.get('/me', authenticateTenant, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  return res.json({ user: publicUser(user) });
});

export default router;
