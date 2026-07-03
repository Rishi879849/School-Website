// Student / parent endpoints.
import api from './api.js';

export const getMyFees = () => api.get('/student/fees').then((r) => r.data.ledgers);
export const getMyGradebook = () => api.get('/student/gradebook').then((r) => r.data.entries);
export const getMyAiChats = () => api.get('/student/ai-chats').then((r) => r.data.chats);
