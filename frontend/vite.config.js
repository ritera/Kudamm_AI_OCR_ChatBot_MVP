// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,                 // 원하시는 포트(예: 3003)
    proxy: {
      '/api': {
        target: 'http://backend:8000', // docker compose 네트워크에서 백엔드 이름
        changeOrigin: true,
        secure: false,
        rewrite: p => p.replace(/^\/api/, '')
      }
    }
  }
})
