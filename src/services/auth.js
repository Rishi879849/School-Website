// Auth service — wraps /api/auth/* for App.jsx.
// The HTTP-only cookie is set by the server; the browser stores it.
// We never touch the token from JS (XSS-safe).

import api from './api.js';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data.user;
}

export async function logout() {
  await api.post('/auth/logout');
}

export async function fetchCurrentUser() {
  const { data } = await api.get('/auth/me');
  return data.user;
}

export async function refreshSession() {
  await api.post('/auth/refresh', {});
}
