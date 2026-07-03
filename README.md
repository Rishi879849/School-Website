# DTV × Eduka — School Website

A multi-tenant React + Vite frontend with a Node/Express + Prisma + PostgreSQL backend. Public marketing site plus five role-scoped dashboards (Super Admin, School Admin, Principal, Teacher, Student) with Row-Level Security enforced at the database level.

## Stack

- **Frontend:** React 19, Vite 8, React Router 7, Tailwind CSS 4, lucide-react.
- **Backend:** Express 4, Prisma 5, PostgreSQL 15+, JWT (HTTP-only cookies), bcryptjs.
- **Lint:** Oxlint.

## Two-step database setup

The schema is split deliberately. **`prisma/schema.prisma` owns the tables and the `user_role` enum.** **`prisma/migrations/01_init_rls/migration.sql` contains only the RLS helper functions and `CREATE POLICY` statements.** Apply them in order:

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env
# then edit .env and set DATABASE_URL + JWT_SECRET_KEY

# 3. Create the tables + enum
npx prisma db push

# 4. Enable Row-Level Security
npm run db:rls

# 5. Seed the Super Admin
npm run db:seed
```

The `db:seed` script creates `superadmin@school.edu`. Default password comes from `INITIAL_SUPERADMIN_PASSWORD` (falls back to `superpassword123` — **change it after first login**).

## Running

```bash
# Frontend only (Vite, port 5173)
npm run dev

# Backend only (Express, port 3001)
npm run server

# Both, side-by-side
npm run dev:all
```

`vite.config.js` proxies `/api/*` to `http://localhost:3001`, so `src/services/api.js` (which uses `baseURL: '/api'`) works in dev without any CORS surprises beyond the proxy itself.

## Authentication contract

- Login: `POST /api/auth/login` with `{ email, password }` returns the public user record. The server sets two HTTP-only cookies: `session_token` (7d access JWT) and `refresh_token` (30d refresh JWT).
- Session restore on mount: `GET /api/auth/me` returns the current user, or 401 if no valid session.
- Refresh on 401: `src/services/api.js` automatically calls `POST /api/auth/refresh` and retries the original request. The 30-day refresh token rotates on every refresh.
- Logout: `POST /api/auth/logout` clears both cookies.

## Multi-tenant isolation

PostgreSQL Row-Level Security enforces tenant scoping at the database level. `database/tenantGuard.js` opens a transaction and sets `app.current_school_id` + `app.current_user_role` as session GUCs via `SET LOCAL`. RLS policies in `prisma/migrations/01_init_rls/migration.sql` read those GUCs to filter every query. Super Admins are exempt via the `is_super_admin()` helper function.

If you skip step 4 (`npm run db:rls`), all RLS policies are absent and tenant isolation is **off** — `runInTenantContext` is still called, but the database will happily return rows from any school.

## Project layout

```
prisma/
  schema.prisma                   # source of truth for tables
  migrations/01_init_rls/         # RLS helpers + policies (apply after db push)
  seed.js                         # bootstraps the Super Admin

server/
  index.js                        # Express entrypoint
  lib/prisma.js                   # singleton PrismaClient
  lib/cookies.js                  # HTTP-only cookie helpers
  routes/                         # auth, super-admin, school-admin, principal, teacher, student, common

database/
  tenantGuard.js                  # authenticateTenant, runInTenantContext, requireRole

src/
  App.jsx                         # routes; hydrates session on mount
  services/
    api.js                        # Axios client: withCredentials, 401 → silent refresh
    auth.js                       # login / logout / fetchCurrentUser / refreshSession
    superAdmin.js, schoolAdmin.js, principal.js, teacher.js, student.js, common.js
  components/
    rbac/
      context/RBACContext.jsx     # useRBAC() — fetches slices, exposes the same API as before
      PortalLayout.jsx            # role → dashboard switch
      SuperAdmin / SchoolAdmin / Principal / Teacher / Student / Parent
```

## Deploying

`db push` is fine for prototyping. For a production multi-tenant database, use `prisma migrate dev` to generate versioned migrations from `schema.prisma`, commit them, and apply with `prisma migrate deploy`. The RLS migration is intentionally kept as a separate, one-time SQL step because Prisma cannot model `SECURITY DEFINER` functions or row-level policies.
