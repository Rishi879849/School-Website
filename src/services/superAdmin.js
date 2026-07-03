// Super admin endpoints. Cross-tenant.
import api from './api.js';

export const listSchools = () => api.get('/super-admin/schools').then((r) => r.data.schools);
export const createSchool = (payload) => api.post('/super-admin/schools', payload).then((r) => r.data.school);

export const createUser = (payload) => api.post('/super-admin/users', payload).then((r) => r.data.user);

export const getWhiteLabel = () => api.get('/super-admin/whitelabel').then((r) => r.data.config);
export const updateWhiteLabel = (payload) =>
  api.patch('/super-admin/whitelabel', payload).then((r) => r.data.config);
