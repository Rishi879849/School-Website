// Server entrypoint. Run with `npm run server` or as part of `npm run dev:all`.

import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './routes/auth.js';
import superAdminRouter from './routes/superAdmin.js';
import schoolAdminRouter from './routes/schoolAdmin.js';
import principalRouter from './routes/principal.js';
import teacherRouter from './routes/teacher.js';
import studentRouter from './routes/student.js';
import commonRouter from './routes/common.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// CORS — only relevant in dev when the Vite dev server (5173) hits the API directly.
// In prod, the API and the static site are on the same origin.
const isProd = process.env.NODE_ENV === 'production';
app.use(
  cors({
    origin: isProd ? false : ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Health check — handy for the verification step.
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

app.use('/api/auth', authRouter);
app.use('/api/super-admin', superAdminRouter);
app.use('/api/school-admin', schoolAdminRouter);
app.use('/api/principal', principalRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/student', studentRouter);
app.use('/api', commonRouter);

// Centralized error handler.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`🚀 DTV × Eduka API listening on http://localhost:${PORT}`);
});
