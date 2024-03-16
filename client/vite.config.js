// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/main.jsx',
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3100",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
