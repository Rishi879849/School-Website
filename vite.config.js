import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Forward /api/* to the Express server during dev.
  // src/services/api.js uses baseURL '/api', which hits this proxy in dev
  // and the same origin in prod.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
