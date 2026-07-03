// Tenant-aware authentication + database context for DTV × Eduka.
//
// Flow:
//   1. `authenticateTenant` reads the HTTP-only `session_token` cookie, verifies the JWT,
//      and attaches `{ id, email, role, schoolId }` to `req.user`.
//   2. `runInTenantContext` wraps a callback in a Prisma transaction and sets
//      `app.current_school_id` and `app.current_user_role` as Postgres session GUCs.
//      Row-Level Security policies in prisma/migrations/01_init_rls/migration.sql read
//      those GUCs to filter rows per tenant.
//   3. `requireRole(...allowed)` is a 403 guard for per-route role checks.
//
// Notes:
//   - The `prisma` import comes from server/lib/prisma.js so we share one PrismaClient
//     across modules (the previous version created its own and would leak connections
//     in dev hot-reload).
//   - `prisma.user` (not `prisma.users`) is the correct accessor because our schema
//     uses singular model names.

import jwt from 'jsonwebtoken';
import prisma from '../server/lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
  // Fail fast. The server can't run without this.
  throw new Error('JWT_SECRET_KEY is not set. Add it to .env before starting the server.');
}

export function authenticateTenant(req, res, next) {
  const token = req.cookies?.session_token;

  if (!token) {
    return res.status(401).json({ error: 'Session token missing or expired. Access denied.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
      schoolId: payload.schoolId, // null for super_admin
    };
    next();
  } catch {
    return res.status(403).json({ error: 'Session credentials verification failed.' });
  }
}

export async function runInTenantContext(req, databaseQueryCallback) {
  const schoolId = req.user?.schoolId;
  const userRole = req.user?.role || 'guest';
  const userId = req.user?.id || 'anonymous';

  try {
    return await prisma.$transaction(async (tx) => {
      // Bind tenant GUCs. Using parameterized SET LOCAL via $executeRaw would be safer
      // than string interpolation, but Prisma's $executeRaw does not accept SET statements
      // as parameters. The values come from a verified JWT so the injection risk is low,
      // and we still keep them scoped to the transaction (SET LOCAL).
      const schoolIdLiteral = schoolId ? `'${schoolId}'` : 'NULL';
      await tx.$executeRawUnsafe(
        `SET LOCAL app.current_school_id = ${schoolIdLiteral};`
      );
      await tx.$executeRawUnsafe(
        `SET LOCAL app.current_user_role = '${userRole}';`
      );

      return await databaseQueryCallback(tx);
    });
  } catch (error) {
    // 42501 = insufficient_privilege (RLS violation). Log for security audits.
    const msg = String(error?.message || '');
    const isRls = error?.code === 'P2010' || msg.includes('42501');
    if (isRls) {
      console.error(
        `🚨 RLS violation: school=${schoolId || 'GLOBAL'} user=${userId} role=${userRole} — ${msg}`
      );
    }
    throw error;
  }
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient workspace permissions.' });
    }
    next();
  };
}

// Backwards-compat alias (older routes imported `checkRole`).
export const checkRole = requireRole;
