// vite.config.js - Simplified build configuration
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      external: [
        '@safe-globalThis/safe-ethers-adapters',
        '@safe-globalThis/safe-core-sdk',
        '@safe-globalThis/safe-ethers-lib',
        '@safe-global/safe-ethers-adapters',
        '@safe-global/safe-core-sdk',
        '@safe-global/safe-ethers-lib',
        '@safe-global/safe-core-sdk-types'
      ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  define: {
    global: 'globalThis',
  },
  esbuild: {
    target: 'es2020',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: [
      '@safe-globalThis/safe-ethers-adapters',
      '@safe-globalThis/safe-core-sdk',
      '@safe-global/safe-ethers-adapters',
      '@safe-global/safe-core-sdk'
    ],
    esbuildOptions: {
      target: 'es2020',
    }
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
});