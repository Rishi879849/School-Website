// Shared endpoints (broadcasts visible to everyone, calendar events).
import api from './api.js';

export const getCalendar = () => api.get('/calendar').then((r) => r.data.events);
export const listBroadcasts = () => api.get('/broadcasts').then((r) => r.data.broadcasts);
export const createBroadcast = ({ title, content, target }) =>
  api.post('/broadcasts', { title, content, target }).then((r) => r.data.broadcast);
