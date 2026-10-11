import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forms talk to the Express server while you develop locally
      '/api': 'http://localhost:5000',
    },
  },
});
