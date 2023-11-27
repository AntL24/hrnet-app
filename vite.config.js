// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Options spécifiques à Vitest
    globals: true,
    environment: 'jsdom',
  },
});
