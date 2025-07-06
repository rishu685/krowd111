import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@safe-globalThis/safe-ethers-adapters': path.resolve(
        __dirname,
        'node_modules/@safe-global/safe-ethers-adapters'
      ),
    },
  },
  build: {
    rollupOptions: {
      external: ['atropos/css'],
    },
  },
});
