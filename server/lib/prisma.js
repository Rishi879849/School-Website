// Singleton PrismaClient.
// Why a singleton: in dev, Vite + nodemon can hot-reload and re-evaluate modules;
// without this, you accumulate open Postgres connections until the pool exhausts.
// In prod, this just imports the one PrismaClient the app uses.

import { PrismaClient } from '@prisma/client';

const prisma = globalThis.__dtvPrisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'production' ? ['error'] : ['warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__dtvPrisma = prisma;
}

export default prisma;
