// Applies the RLS-only migration against DATABASE_URL.
// Run after `npx prisma db push` (which creates the tables + ENUM type).
// Usage: `npm run db:rls`

import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import pg from 'pg';

const { Client } = pg;
const here = dirname(fileURLToPath(import.meta.url));
const migrationPath = join(here, '..', 'prisma', 'migrations', '01_init_rls', 'migration.sql');

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set. Add it to .env first.');
  process.exit(1);
}

const sql = readFileSync(migrationPath, 'utf8');
const client = new Client({ connectionString: process.env.DATABASE_URL });

try {
  await client.connect();
  console.log('🛡️  Applying RLS migration to', maskDsn(process.env.DATABASE_URL));
  await client.query(sql);
  console.log('✅ Row-Level Security helpers + policies installed.');
} catch (err) {
  console.error('❌ RLS migration failed:', err.message);
  process.exit(1);
} finally {
  await client.end();
}

function maskDsn(dsn) {
  return dsn.replace(/:\/\/[^@]+@/, '://***:***@');
}
