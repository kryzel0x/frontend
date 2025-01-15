import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer', // Add Buffer polyfill
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Define globalThis for Node.js compatibility
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // Enable Buffer polyfill
        }),
      ],
    },
  },
});
