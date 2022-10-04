import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  css: {
    devSourcemap: true
  },
  build: {
    sourcemap: true
  }
})


/*
,
    watch: {
      usePolling: true
    }
 */