import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['knockout'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
  },
  resolve: {
    alias: {
      '@app':      resolve(__dirname, 'src/app'),
      '@core':     resolve(__dirname, 'src/core'),
      '@ui':       resolve(__dirname, 'src/ui'),
      '@features': resolve(__dirname, 'src/features'),
    },
  },
});
