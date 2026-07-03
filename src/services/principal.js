// Principal endpoints.
import api from './api.js';

export const listBroadcasts = () => api.get('/principal/broadcasts').then((r) => r.data.broadcasts);
export const publishParentBroadcast = ({ title, content }) =>
  api.post('/principal/broadcasts/parents', { title, content }).then((r) => r.data.broadcast);
