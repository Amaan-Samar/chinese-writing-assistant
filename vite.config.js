import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/chinese-writing-assistant/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure clean builds
    emptyOutDir: true,
    // Add source maps for better debugging
    sourcemap: true,
    // Increase build timeout
    timeout: 120000,
  },
  server: {
    port: 3000,
    open: true,
  },
})