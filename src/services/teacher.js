// Teacher endpoints.
import api from './api.js';

export const getTimetable = () => api.get('/teacher/timetable').then((r) => r.data.timetable);
export const getStudents = () => api.get('/teacher/students').then((r) => r.data.students);

export const recordAttendance = (payload) =>
  api.post('/teacher/attendance', payload).then((r) => r.data.record);

export const getAttendance = (date) =>
  api.get('/teacher/attendance', { params: date ? { date } : {} }).then((r) => r.data.records);

export const postMarks = (payload) =>
  api.post('/teacher/marks', payload).then((r) => r.data.entry);
