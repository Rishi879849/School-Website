import axios from 'axios';

// Configure standard API instance for the Multi-Tenant Platform
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // CRITICAL: Automatically passes HTTP-only cookies (SameSite=Strict JWT) in cross-origin scenarios
  withCredentials: true 
});

// Optional Request Interceptor to dynamically attach headers (if using localStorage tokens instead of HTTP-only cookies)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor to catch authentication expiry (401/403) and trigger global redirects
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error('🚨 Network Connectivity Dropped! Dispatching offline alert.');
      window.dispatchEvent(new CustomEvent('app-offline', { detail: { isOffline: true } }));
      return Promise.reject(error);
    }

    // Capture token expiration (401) and attempt silent automatic token refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Execute silent refresh request (refresh cookie parsed server-side)
        await axios.post('/api/auth/refresh', {}, { withCredentials: true });
        
        isRefreshing = false;
        processQueue(null);
        
        // Retry original failed request
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);
        
        console.warn('⚠️ Silent session refresh failed. Clearing credentials and logging out.');
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle persistent 403 Forbidden redirects
    if (error.response.status === 403) {
      console.warn('⚠️ Session lacks authorization privileges.');
    }

    return Promise.reject(error);
  }
);

export default api;
