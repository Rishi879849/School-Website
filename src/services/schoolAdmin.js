// School-admin endpoints. Scoped to the caller's school via RLS.
import api from './api.js';

export const listStudents = () => api.get('/school-admin/students').then((r) => r.data.students);
export const listTeachers = () => api.get('/school-admin/teachers').then((r) => r.data.teachers);

export const listBroadcasts = () => api.get('/school-admin/broadcasts').then((r) => r.data.broadcasts);
export const createBroadcast = ({ title, content, targetAudience }) =>
  api.post('/school-admin/broadcasts', { title, content, targetAudience }).then((r) => r.data.broadcast);

export const getFeeAnalytics = () => api.get('/school-admin/fees/analytics').then((r) => r.data.analytics);
